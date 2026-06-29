# web-meddia

Sitio web de Meddia — Press Hub SpA  
Plataforma SaaS B2B de gestión de comunicación corporativa y reputación para la era de la IA.

## Estructura

```
web-meddia/
├── index.html              # Single-file HTML (CSS + JS inline)
├── assets/
│   ├── logo-cierre.mp4     # Animación de cierre (video MP4)
│   ├── logo-cierre.webm    # Animación de cierre (video WebM)
│   └── logo-cierre-poster.png  # Poster para el video (fallback)
├── vercel.json             # Configuración de deploy en Vercel
└── README.md
```

## Dependencias externas (CDN)

- Google Fonts: Fraunces + Inter Tight
- Sin otras dependencias externas

## Deploy

Conectar el repositorio en [vercel.com](https://vercel.com). El `vercel.json` ya configura:
- URLs limpias (sin `.html`)
- Cache agresivo para assets estáticos (1 año, immutable)
- Cache no-store para `index.html` (siempre fresco)
- Headers de seguridad HTTP

## CTAs

- Agendar DEMO → https://tools.meddia.io/meetings/meddiacloud/reunion-demo-meddiacloud
- Ingresar → https://app.meddia.io/
