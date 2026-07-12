import { readFileSync } from 'fs';
import { join } from 'path';

function loadKnowledgeBase() {
  try {
    return readFileSync(join(process.cwd(), 'meddia_knowledge_base.md'), 'utf8');
  } catch (e) {
    console.error('No se pudo cargar meddia_knowledge_base.md:', e.message);
    return '';
  }
}

function buildSystemPrompt(mode, kb) {
  if (mode === 'ventas') {
    return `Eres el asistente de ventas de Meddia. Tu objetivo es ayudar al visitante a entender si Meddia es la solución correcta para su organización y guiarlo hacia agendar una demo o dejar sus datos de contacto.

FUENTE DE VERDAD — usa exclusivamente esta base de conocimiento para responder:
---
${kb}
---

INSTRUCCIONES ADICIONALES PARA VENTAS:
- Sé consultivo: haz preguntas para entender las necesidades del prospecto antes de presentar el producto.
- Enfatiza el IA Reputation Index como diferenciador único en Chile.
- Si hay interés, ofrece agendar una demo o capturar los datos de contacto del visitante.
- Tono profesional pero cercano, tuteo.
- Respuestas cortas (2-3 párrafos) para mantener el diálogo activo.`;
  }

  return `Eres el asistente conversacional de Meddia.

FUENTE DE VERDAD — usa exclusivamente esta base de conocimiento para responder:
---
${kb}
---`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, mode = 'general' } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chat no disponible temporalmente' });
  }

  const kb = loadKnowledgeBase();
  const systemPrompt = buildSystemPrompt(mode, kb);

  const payload = {
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-12)
    ],
    stream: true,
    max_tokens: 800,
    temperature: 0.6
  };

  try {
    const upstream = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!upstream.ok) {
      const err = await upstream.text();
      console.error('DeepSeek error:', err);
      return res.status(502).json({ error: 'Error al conectar con el servicio de chat' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Accel-Buffering', 'no');

    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }

    res.end();
  } catch (err) {
    console.error('Chat handler error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}
