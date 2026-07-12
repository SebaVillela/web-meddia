(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────────────────────────
  var messages = [];
  var isOpen = false;
  var isStreaming = false;
  var currentMode = 'general';

  // ── Styles ─────────────────────────────────────────────────────────────────
  var css = `
    #mc-widget{
      position:fixed;bottom:24px;right:24px;z-index:9999;
      font-family:'Inter Tight',-apple-system,sans-serif;
      font-size:14px;line-height:1.5;
      -webkit-font-smoothing:antialiased;
    }
    #mc-btn{
      width:52px;height:52px;border-radius:50%;
      background:#2A1825;color:#fff;
      border:none;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 4px 20px rgba(42,24,37,0.35);
      transition:transform 0.2s ease,background 0.2s ease;
    }
    #mc-btn:hover{background:#E8197D;transform:scale(1.06)}
    #mc-window{
      position:absolute;bottom:68px;right:0;
      width:360px;max-height:520px;
      background:#FAF9F6;
      border:1px solid #E8E5DE;border-radius:18px;
      box-shadow:0 24px 64px rgba(31,27,23,0.18),0 4px 16px rgba(31,27,23,0.06);
      display:flex;flex-direction:column;
      overflow:hidden;
      opacity:0;transform:translateY(12px) scale(0.97);pointer-events:none;
      transition:opacity 0.22s ease,transform 0.28s cubic-bezier(0.16,1,0.3,1);
    }
    #mc-window.is-open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
    #mc-header{
      padding:16px 18px;
      background:#2A1825;color:#FAF9F6;
      display:flex;align-items:center;justify-content:space-between;
      flex-shrink:0;
    }
    #mc-header-info{display:flex;align-items:center;gap:10px}
    #mc-avatar{
      width:32px;height:32px;border-radius:50%;
      background:#E8197D;
      display:flex;align-items:center;justify-content:center;
      font-size:16px;font-weight:600;color:#fff;flex-shrink:0;
    }
    #mc-header-title{font-size:14px;font-weight:500;letter-spacing:-0.01em}
    #mc-header-sub{font-size:11.5px;color:rgba(250,249,246,0.6);letter-spacing:-0.005em}
    #mc-close-btn{
      background:none;border:none;cursor:pointer;
      color:rgba(250,249,246,0.6);padding:4px;line-height:0;
      border-radius:6px;transition:color 0.15s;
    }
    #mc-close-btn:hover{color:#FAF9F6}
    #mc-messages{
      flex:1;overflow-y:auto;padding:16px;
      display:flex;flex-direction:column;gap:10px;
      scroll-behavior:smooth;
    }
    #mc-messages::-webkit-scrollbar{width:4px}
    #mc-messages::-webkit-scrollbar-thumb{background:#E8E5DE;border-radius:4px}
    .mc-msg{
      max-width:88%;padding:10px 13px;border-radius:12px;
      font-size:13.5px;line-height:1.55;letter-spacing:-0.005em;
      animation:mcFadeIn 0.18s ease;
    }
    @keyframes mcFadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
    .mc-msg--bot{
      background:#EFEAE0;color:#1F1B17;
      border-bottom-left-radius:4px;align-self:flex-start;
    }
    .mc-msg--user{
      background:#2A1825;color:#FAF9F6;
      border-bottom-right-radius:4px;align-self:flex-end;
    }
    .mc-msg--typing{
      background:#EFEAE0;align-self:flex-start;
      border-bottom-left-radius:4px;
      display:flex;gap:4px;align-items:center;padding:12px 16px;
    }
    .mc-dot{
      width:6px;height:6px;border-radius:50%;background:#8F8A80;
      animation:mcBounce 1.2s infinite;
    }
    .mc-dot:nth-child(2){animation-delay:0.2s}
    .mc-dot:nth-child(3){animation-delay:0.4s}
    @keyframes mcBounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
    #mc-mode-bar{
      padding:10px 14px;border-bottom:1px solid #F0EDE5;
      display:flex;gap:6px;flex-shrink:0;
    }
    .mc-mode-btn{
      font-size:12px;font-weight:450;letter-spacing:-0.005em;
      padding:5px 11px;border-radius:20px;cursor:pointer;
      border:1px solid #E8E5DE;background:transparent;color:#5A554D;
      transition:all 0.15s ease;
    }
    .mc-mode-btn.is-active{background:#2A1825;color:#FAF9F6;border-color:#2A1825}
    .mc-mode-btn:hover:not(.is-active){border-color:#E8197D;color:#E8197D}
    #mc-input-row{
      padding:12px 14px;border-top:1px solid #F0EDE5;
      display:flex;gap:8px;align-items:flex-end;flex-shrink:0;
    }
    #mc-input{
      flex:1;resize:none;border:1px solid #E8E5DE;border-radius:10px;
      padding:9px 12px;font-family:inherit;font-size:13.5px;
      background:#fff;color:#1F1B17;outline:none;
      max-height:100px;overflow-y:auto;
      transition:border-color 0.15s;letter-spacing:-0.005em;
    }
    #mc-input:focus{border-color:#2A1825}
    #mc-send{
      width:36px;height:36px;border-radius:9px;flex-shrink:0;
      background:#2A1825;color:#FAF9F6;border:none;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      transition:background 0.2s;
    }
    #mc-send:hover{background:#E8197D}
    #mc-send:disabled{background:#C9C5BB;cursor:not-allowed}
    @media(max-width:480px){
      #mc-window{width:calc(100vw - 32px);right:-8px;bottom:72px}
    }
  `;

  function injectStyles() {
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ── DOM ────────────────────────────────────────────────────────────────────
  function buildWidget() {
    var widget = document.createElement('div');
    widget.id = 'mc-widget';
    widget.setAttribute('role', 'complementary');
    widget.setAttribute('aria-label', 'Chat con Meddia IA');

    widget.innerHTML = `
      <div id="mc-window" role="dialog" aria-labelledby="mc-header-title" aria-live="polite">
        <div id="mc-header">
          <div id="mc-header-info">
            <div id="mc-avatar">M</div>
            <div>
              <div id="mc-header-title">Meddia IA</div>
              <div id="mc-header-sub">Responde al instante</div>
            </div>
          </div>
          <button id="mc-close-btn" aria-label="Cerrar chat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div id="mc-mode-bar">
          <button class="mc-mode-btn is-active" data-mode="general">Consultas</button>
          <button class="mc-mode-btn" data-mode="ventas">Hablar con ventas</button>
        </div>
        <div id="mc-messages"></div>
        <div id="mc-input-row">
          <textarea id="mc-input" rows="1" placeholder="Escribe tu pregunta…" aria-label="Mensaje"></textarea>
          <button id="mc-send" aria-label="Enviar">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M8.5 3.5L14 8l-5.5 4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
      <button id="mc-btn" aria-label="Abrir chat con Meddia IA" aria-expanded="false">
        <svg id="mc-icon-chat" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
        <svg id="mc-icon-close" width="20" height="20" viewBox="0 0 20 20" fill="none" style="display:none"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>`;

    document.body.appendChild(widget);
  }

  // ── Logic ──────────────────────────────────────────────────────────────────
  function toggleWidget(open) {
    isOpen = (open !== undefined) ? open : !isOpen;
    var win = document.getElementById('mc-window');
    var btn = document.getElementById('mc-btn');
    win.classList.toggle('is-open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    document.getElementById('mc-icon-chat').style.display = isOpen ? 'none' : '';
    document.getElementById('mc-icon-close').style.display = isOpen ? '' : 'none';
    if (isOpen && messages.length === 0) showWelcome();
    if (isOpen) setTimeout(function(){ document.getElementById('mc-input').focus(); }, 280);
  }

  function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mc-mode-btn').forEach(function(b){
      b.classList.toggle('is-active', b.dataset.mode === mode);
    });
    if (messages.length === 0) showWelcome();
  }

  function showWelcome() {
    var msg = currentMode === 'ventas'
      ? '¡Hola! Soy el asistente de ventas de Meddia. ¿En qué tipo de organización trabajas? Cuéntame un poco sobre tu necesidad y te ayudo a evaluar si somos la solución correcta.'
      : '¡Hola! Soy el asistente de Meddia. Puedo responder dudas sobre nuestra plataforma — reputación en IA, gestión de prensa y más. ¿En qué te puedo ayudar?';
    appendMessage('bot', msg);
  }

  function appendMessage(role, text) {
    var box = document.getElementById('mc-messages');
    var div = document.createElement('div');
    div.className = 'mc-msg mc-msg--' + role;
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    if (role === 'user') messages.push({ role: 'user', content: text });
    return div;
  }

  function showTyping() {
    var box = document.getElementById('mc-messages');
    var div = document.createElement('div');
    div.id = 'mc-typing';
    div.className = 'mc-msg mc-msg--typing';
    div.innerHTML = '<div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-dot"></div>';
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function removeTyping() {
    var t = document.getElementById('mc-typing');
    if (t) t.remove();
  }

  async function sendMessage(text) {
    if (isStreaming || !text.trim()) return;
    isStreaming = true;
    document.getElementById('mc-send').disabled = true;

    appendMessage('user', text);
    showTyping();

    try {
      var res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages, mode: currentMode })
      });

      removeTyping();

      if (!res.ok) {
        appendMessage('bot', 'Lo siento, hubo un problema. Por favor intenta de nuevo.');
        isStreaming = false;
        document.getElementById('mc-send').disabled = false;
        return;
      }

      var box = document.getElementById('mc-messages');
      var botDiv = document.createElement('div');
      botDiv.className = 'mc-msg mc-msg--bot';
      botDiv.textContent = '';
      box.appendChild(botDiv);

      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var botText = '';
      var buffer = '';

      while (true) {
        var _ref = await reader.read();
        var done = _ref.done, value = _ref.value;
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        var lines = buffer.split('\n');
        buffer = lines.pop();
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i].trim();
          if (!line.startsWith('data:')) continue;
          var data = line.slice(5).trim();
          if (data === '[DONE]') continue;
          try {
            var parsed = JSON.parse(data);
            var delta = parsed.choices[0].delta.content;
            if (delta) {
              botText += delta;
              botDiv.textContent = botText;
              box.scrollTop = box.scrollHeight;
            }
          } catch(e) {}
        }
      }

      if (botText) messages.push({ role: 'assistant', content: botText });

    } catch(err) {
      removeTyping();
      appendMessage('bot', 'Hubo un problema de conexión. Por favor intenta de nuevo.');
    }

    isStreaming = false;
    document.getElementById('mc-send').disabled = false;
  }

  // ── Events ─────────────────────────────────────────────────────────────────
  function bindEvents() {
    document.getElementById('mc-btn').addEventListener('click', function(){ toggleWidget(); });
    document.getElementById('mc-close-btn').addEventListener('click', function(){ toggleWidget(false); });

    document.querySelectorAll('.mc-mode-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ setMode(btn.dataset.mode); });
    });

    var input = document.getElementById('mc-input');
    input.addEventListener('keydown', function(e){
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        var val = input.value.trim();
        if (val) { input.value = ''; sendMessage(val); }
      }
    });
    input.addEventListener('input', function(){
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });

    document.getElementById('mc-send').addEventListener('click', function(){
      var val = input.value.trim();
      if (val) { input.value = ''; input.style.height = 'auto'; sendMessage(val); }
    });
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  window.openMeddiaChat = function(mode) {
    if (mode) setMode(mode);
    toggleWidget(true);
  };

  // ── Init ───────────────────────────────────────────────────────────────────
  function init() {
    injectStyles();
    buildWidget();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
