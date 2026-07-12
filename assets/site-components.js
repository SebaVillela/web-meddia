/**
 * Componentes compartidos de Meddia
 * Inyecta nav, footer y chat widget en páginas nuevas.
 *
 * MÓDULOS: cambiar a true cuando la página del módulo esté lista en producción.
 */
(function () {
  'use strict';

  var MODULES = {
    soluciones: false,
    planes:     false,
    blog:       false,
    contacto:   false,
  };

  // ── NAV ────────────────────────────────────────────────────────────────────
  var NAV_CSS = `
    nav{position:fixed;top:0;left:0;right:0;z-index:100;height:72px;background:rgba(250,249,246,0.82);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border-bottom:1px solid rgba(232,229,222,0.7);display:flex;align-items:center}
    .sc-nav-inner{max-width:1240px;margin:0 auto;padding:0 40px;width:100%;display:flex;align-items:center;justify-content:space-between;position:relative}
    .sc-nav-logo{display:flex;align-items:center;text-decoration:none}
    .sc-nav-logo img{height:30px;width:auto;display:block}
    .sc-nav-links{display:flex;align-items:center;gap:4px;list-style:none}
    .sc-nav-links a{font-size:14px;font-weight:400;color:#5A554D;text-decoration:none;padding:10px 16px;border-radius:6px;letter-spacing:-0.005em;display:inline-block;transition:color 0.2s}
    .sc-nav-links a:hover{color:#1F1B17}
    .sc-nav-has-dropdown{position:relative}
    .sc-nav-links a.sc-nav-drop-trigger{display:inline-flex;align-items:center;gap:5px}
    .sc-nav-caret{transition:transform 0.3s ease;color:#8F8A80;flex-shrink:0}
    .sc-nav-has-dropdown:hover .sc-nav-caret,.sc-nav-has-dropdown:focus-within .sc-nav-caret{transform:rotate(180deg);color:#E8197D}
    .sc-nav-dropdown{position:absolute;top:calc(100% + 14px);left:50%;transform:translateX(-50%) translateY(8px);width:748px;background:#FAF9F6;border:1px solid #E8E5DE;border-radius:14px;padding:20px;box-shadow:0 20px 56px rgba(31,27,23,0.15),0 4px 14px rgba(31,27,23,0.05);opacity:0;visibility:hidden;pointer-events:none;transition:opacity 0.28s ease,transform 0.32s cubic-bezier(0.16,1,0.3,1)}
    .sc-nav-dropdown::before{content:'';position:absolute;top:-16px;left:0;right:0;height:16px}
    .sc-nav-has-dropdown:hover .sc-nav-dropdown,.sc-nav-has-dropdown:focus-within .sc-nav-dropdown{opacity:1;visibility:visible;pointer-events:auto;transform:translateX(-50%) translateY(0)}
    .sc-nav-mega{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .sc-nav-links a.sc-nav-mega-item{display:flex;gap:16px;align-items:flex-start;padding:24px 22px;border-radius:12px;text-decoration:none;transition:background 0.2s ease}
    .sc-nav-mega-item:hover{background:#F4F2EC}
    .sc-nav-mega-icon{flex-shrink:0;width:42px;height:42px;border-radius:11px;background:#fff;border:1px solid #E8E5DE;display:flex;align-items:center;justify-content:center;color:#5A554D;transition:border-color 0.2s,color 0.2s,background 0.2s}
    .sc-nav-mega-item:hover .sc-nav-mega-icon{border-color:#E8197D;color:#E8197D;background:#FBEBF2}
    .sc-nav-mega-txt{display:flex;flex-direction:column;gap:5px;min-width:0;padding-top:2px}
    .sc-nav-mega-title{display:flex;align-items:center;gap:6px;font-size:14.5px;font-weight:500;color:#1F1B17;letter-spacing:-0.01em;line-height:1.25}
    .sc-nav-mega-arrow{opacity:0;transform:translateX(-3px);color:#E8197D;flex-shrink:0;transition:opacity 0.2s,transform 0.2s}
    .sc-nav-mega-item:hover .sc-nav-mega-arrow{opacity:1;transform:translateX(0)}
    .sc-nav-mega-desc{font-size:12.5px;color:#8F8A80;line-height:1.5;letter-spacing:-0.005em}
    .sc-btn-ghost{display:inline-flex;align-items:center;gap:6px;font-family:inherit;font-size:14px;font-weight:400;color:#1F1B17;background:transparent;border:1px solid #E8E5DE;border-radius:8px;padding:8px 16px;text-decoration:none;cursor:pointer;letter-spacing:-0.005em;transition:border-color 0.2s,color 0.2s}
    .sc-btn-ghost:hover{border-color:#1F1B17}
    .sc-btn-dark{display:inline-flex;align-items:center;gap:6px;font-family:inherit;font-size:14px;font-weight:450;color:#FAF9F6;background:#2A1825;border:1px solid #2A1825;border-radius:8px;padding:8px 18px;text-decoration:none;cursor:pointer;letter-spacing:-0.005em;transition:background 0.2s,border-color 0.2s}
    .sc-btn-dark:hover{background:#E8197D;border-color:#E8197D}
    .sc-nav-cta{display:flex;align-items:center;gap:10px}
    @media(max-width:768px){.sc-nav-links{display:none}.sc-nav-inner{padding:0 24px}}
  `;

  function buildNav() {
    var navEl = document.getElementById('site-nav');
    if (!navEl) return;

    var styleEl = document.createElement('style');
    styleEl.textContent = NAV_CSS;
    document.head.appendChild(styleEl);

    var solMenu = MODULES.soluciones ? `
      <li class="sc-nav-has-dropdown">
        <a href="#" class="sc-nav-drop-trigger">
          Soluciones
          <svg class="sc-nav-caret" width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2.5 4L5.5 7L8.5 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <div class="sc-nav-dropdown">
          <div class="sc-nav-mega">
            <a href="/reputacion-ia" class="sc-nav-mega-item">
              <span class="sc-nav-mega-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2.5l1.6 4 4 1.6-4 1.6L10 13.7 8.4 9.7l-4-1.6 4-1.6L10 2.5z"/></svg></span>
              <span class="sc-nav-mega-txt">
                <span class="sc-nav-mega-title">Reputación en IA<svg class="sc-nav-mega-arrow" width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                <span class="sc-nav-mega-desc">Mide y mejora tu presencia en ChatGPT, Gemini, Perplexity y Claude.</span>
              </span>
            </a>
            <a href="/gestion-de-prensa" class="sc-nav-mega-item">
              <span class="sc-nav-mega-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3L2.5 8.2l5.6 2 2 5.6L17 3z"/></svg></span>
              <span class="sc-nav-mega-txt">
                <span class="sc-nav-mega-title">Gestión de prensa<svg class="sc-nav-mega-arrow" width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                <span class="sc-nav-mega-desc">Distribuye comunicados a +2.000 medios y reporta resultados.</span>
              </span>
            </a>
            <a href="/monitoreo-inteligencia-medios" class="sc-nav-mega-item">
              <span class="sc-nav-mega-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10.5h3l2-5 3 9 2-6 1.5 2H18"/></svg></span>
              <span class="sc-nav-mega-txt">
                <span class="sc-nav-mega-title">Monitoreo e Inteligencia<svg class="sc-nav-mega-arrow" width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                <span class="sc-nav-mega-desc">Sigue lo que se publica de tu marca, con análisis de IA.</span>
              </span>
            </a>
            <a href="/agentes-ia" class="sc-nav-mega-item">
              <span class="sc-nav-mega-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6.5" width="12" height="9" rx="2.5"/><path d="M10 6.5V3.5"/></svg></span>
              <span class="sc-nav-mega-txt">
                <span class="sc-nav-mega-title">Agentes IA especializados<svg class="sc-nav-mega-arrow" width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                <span class="sc-nav-mega-desc">Equipos de agentes de IA para tu área de comunicaciones.</span>
              </span>
            </a>
          </div>
        </div>
      </li>` : '';

    var planesMenu = MODULES.planes ? `
      <li class="sc-nav-has-dropdown">
        <a href="/planes" class="sc-nav-drop-trigger">
          Planes
          <svg class="sc-nav-caret" width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2.5 4L5.5 7L8.5 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <div class="sc-nav-dropdown">
          <div class="sc-nav-mega">
            <a href="/planes" class="sc-nav-mega-item">
              <span class="sc-nav-mega-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="5.5" height="5.5" rx="1.2"/><rect x="11" y="3.5" width="5.5" height="5.5" rx="1.2"/><rect x="3.5" y="11" width="5.5" height="5.5" rx="1.2"/><rect x="11" y="11" width="5.5" height="5.5" rx="1.2"/></svg></span>
              <span class="sc-nav-mega-txt">
                <span class="sc-nav-mega-title">Ver todos los planes</span>
                <span class="sc-nav-mega-desc">Compara todas las opciones en una sola vista.</span>
              </span>
            </a>
            <a href="/planes/corporativos" class="sc-nav-mega-item">
              <span class="sc-nav-mega-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16.5V5a1 1 0 011-1h6a1 1 0 011 1v11.5"/><path d="M3 16.5h14"/></svg></span>
              <span class="sc-nav-mega-txt">
                <span class="sc-nav-mega-title">Equipos corporativos</span>
                <span class="sc-nav-mega-desc">Toda la operación de comunicaciones en un lugar.</span>
              </span>
            </a>
            <a href="/planes/agencias" class="sc-nav-mega-item">
              <span class="sc-nav-mega-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="8" r="2.3"/><path d="M3.5 16c0-2.2 1.8-3.6 4-3.6s4 1.4 4 3.6"/></svg></span>
              <span class="sc-nav-mega-txt">
                <span class="sc-nav-mega-title">Agencias de comunicaciones</span>
                <span class="sc-nav-mega-desc">Multi-cliente con métricas de IA exclusivas.</span>
              </span>
            </a>
            <a href="/planes/startups-pymes" class="sc-nav-mega-item">
              <span class="sc-nav-mega-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3c2.4 1.3 3.8 3.7 3.8 6.6 0 1.2-.2 2.3-.7 3.2H6.9c-.5-.9-.7-2-.7-3.2C6.2 6.7 7.6 4.3 10 3z"/></svg></span>
              <span class="sc-nav-mega-txt">
                <span class="sc-nav-mega-title">Startups &amp; Pymes</span>
                <span class="sc-nav-mega-desc">Visibilidad profesional sin equipo dedicado.</span>
              </span>
            </a>
          </div>
        </div>
      </li>` : '';

    var blogLink = MODULES.blog ? `<li><a href="/blog">Blog</a></li>` : '';
    var contactoLink = MODULES.contacto ? `<li><a href="/contacto">Contacto</a></li>` : '';

    navEl.innerHTML = `
      <nav>
        <div class="sc-nav-inner">
          <a href="/" class="sc-nav-logo" aria-label="Meddia">
            <img src="/assets/logo-meddia.png" alt="Meddia">
          </a>
          <ul class="sc-nav-links">
            <li><a href="/">Inicio</a></li>
            ${solMenu}
            ${planesMenu}
            ${blogLink}
            ${contactoLink}
          </ul>
          <div class="sc-nav-cta">
            <a href="https://app.meddia.io/" class="sc-btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.4-6.5 8-6.5s8 2.5 8 6.5"/></svg>
              Ingresar
            </a>
            <a href="https://tools.meddia.io/meetings/meddiacloud/reunion-demo-meddiacloud" class="sc-btn-dark">
              Agendar DEMO
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>
      </nav>
      <div style="height:72px"></div>`;
  }

  // ── FOOTER ─────────────────────────────────────────────────────────────────
  var FOOTER_CSS = `
    .sc-footer{background:#2A1825;color:rgba(250,249,246,0.7);padding:64px 0 32px}
    .sc-footer-in{max-width:1240px;margin:0 auto;padding:0 40px}
    .sc-footer-top{display:grid;grid-template-columns:1fr auto auto 1fr;gap:48px;align-items:start;margin-bottom:48px}
    .sc-footer-logo img{height:28px;width:auto;display:block;margin-bottom:14px;opacity:0.9}
    .sc-footer-claim{font-size:13.5px;line-height:1.6;letter-spacing:-0.005em;max-width:240px;margin-bottom:20px}
    .sc-footer-socials{display:flex;gap:8px}
    .sc-social-btn{width:34px;height:34px;border-radius:8px;background:rgba(250,249,246,0.08);color:rgba(250,249,246,0.6);display:flex;align-items:center;justify-content:center;text-decoration:none;transition:background 0.2s,color 0.2s}
    .sc-social-btn:hover{background:rgba(232,25,125,0.2);color:#E8197D}
    .sc-footer-col-ttl{font-size:11px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:rgba(250,249,246,0.4);margin-bottom:20px}
    .sc-footer-links{list-style:none;display:flex;flex-direction:column;gap:12px}
    .sc-footer-links a{font-size:13.5px;color:rgba(250,249,246,0.6);text-decoration:none;transition:color 0.2s;letter-spacing:-0.005em}
    .sc-footer-links a:hover{color:#FAF9F6}
    .sc-footer-newsletter-desc{font-size:13px;line-height:1.6;margin-bottom:16px;letter-spacing:-0.005em}
    .sc-footer-form{display:flex;gap:8px}
    .sc-footer-input{flex:1;padding:10px 14px;background:rgba(250,249,246,0.08);border:1px solid rgba(250,249,246,0.15);border-radius:8px;color:#FAF9F6;font-family:inherit;font-size:13.5px;outline:none;transition:border-color 0.2s;letter-spacing:-0.005em}
    .sc-footer-input::placeholder{color:rgba(250,249,246,0.35)}
    .sc-footer-input:focus{border-color:rgba(250,249,246,0.4)}
    .sc-footer-submit{padding:10px 16px;background:#E8197D;color:#fff;border:none;border-radius:8px;font-family:inherit;font-size:13.5px;font-weight:450;cursor:pointer;white-space:nowrap;transition:background 0.2s;letter-spacing:-0.005em}
    .sc-footer-submit:hover{background:#C41468}
    .sc-footer-ok{font-size:12.5px;color:#E8197D;margin-top:10px;display:none}
    .sc-footer-ok.is-on{display:block}
    .sc-footer-btm{border-top:1px solid rgba(250,249,246,0.1);padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
    .sc-footer-legal{font-size:12px;color:rgba(250,249,246,0.35);letter-spacing:-0.005em}
    @media(max-width:900px){.sc-footer-top{grid-template-columns:1fr 1fr;gap:32px}.sc-footer-in{padding:0 24px}}
    @media(max-width:600px){.sc-footer-top{grid-template-columns:1fr}.sc-footer-form{flex-direction:column}}
  `;

  function buildFooter() {
    var footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    var styleEl = document.createElement('style');
    styleEl.textContent = FOOTER_CSS;
    document.head.appendChild(styleEl);

    var okId = 'sc-footer-ok-' + Date.now();

    footerEl.innerHTML = `
      <footer class="sc-footer">
        <div class="sc-footer-in">
          <div class="sc-footer-top">
            <div>
              <a href="/" class="sc-footer-logo" aria-label="Meddia">
                <img src="/assets/logo-meddia.png" alt="Meddia">
              </a>
              <p class="sc-footer-claim">Tecnología para gestionar la reputación en la era de la IA.</p>
              <div class="sc-footer-socials">
                <a href="https://www.linkedin.com/company/meddiaio" class="sc-social-btn" aria-label="LinkedIn" target="_blank" rel="noopener">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3.2 2C3.2 2.88 2.48 3.6 1.6 3.6S0 2.88 0 2 .72.4 1.6.4 3.2 1.12 3.2 2zM0 5h3.2v9H0V5zm5.1 0H8v1.2c.5-.9 1.6-1.4 2.8-1.4 2.5 0 3.2 1.6 3.2 3.8V14h-3.2V9.5c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2v4.6H5.1V5z"/></svg>
                </a>
                <a href="#" class="sc-social-btn" aria-label="Instagram">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="1" y="1" width="12" height="12" rx="3"/><circle cx="7" cy="7" r="3"/><circle cx="10.5" cy="3.5" r="0.5" fill="currentColor" stroke="none"/></svg>
                </a>
              </div>
            </div>
            <div>
              <div class="sc-footer-col-ttl">Explora</div>
              <ul class="sc-footer-links">
                <li><a href="/que-es-meddia">Qué es Meddia</a></li>
                <li><a href="/para-quien">Para quién es Meddia</a></li>
                <li><a href="/faq">Preguntas frecuentes</a></li>
                <li><a href="/contacto">Contacto</a></li>
              </ul>
            </div>
            <div>
              <div class="sc-footer-col-ttl">Legal</div>
              <ul class="sc-footer-links">
                <li><a href="/politica-de-privacidad">Política de Privacidad</a></li>
                <li><a href="/terminos-y-condiciones">Términos y Condiciones</a></li>
                <li><a href="/politica-de-cookies">Política de Cookies</a></li>
                <li><a href="/dpa">Acuerdo de Procesamiento de Datos</a></li>
              </ul>
            </div>
            <div>
              <div class="sc-footer-col-ttl">IA, reputación y comunicación</div>
              <p class="sc-footer-newsletter-desc">Noticias y análisis sobre cómo la IA está redefiniendo la reputación corporativa. Sin spam.</p>
              <form class="sc-footer-form" id="sc-footer-form">
                <input type="email" class="sc-footer-input" placeholder="tu@email.com" required autocomplete="email" aria-label="Tu email">
                <button type="submit" class="sc-footer-submit">Suscribirse</button>
              </form>
              <p class="sc-footer-ok" id="${okId}">¡Gracias! Te avisamos con lo que vale la pena leer.</p>
            </div>
          </div>
          <div class="sc-footer-btm">
            <span class="sc-footer-legal">© 2026 Meddia. Todos los derechos reservados. Américo Vespucio Sur 700 piso 4, Las Condes, Santiago, Chile.</span>
            <span class="sc-footer-legal">Acelerada en AceleraLatam</span>
          </div>
        </div>
      </footer>`;

    document.getElementById('sc-footer-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var input = this.querySelector('input[type=email]');
      var ok = document.getElementById(okId);
      // TODO: replace with HubSpot portal ID and form ID
      // fetch('https://api.hsforms.com/submissions/v3/integration/submit/PORTAL_ID/FORM_ID', {...})
      ok.classList.add('is-on');
      input.value = '';
      setTimeout(function(){ ok.classList.remove('is-on'); }, 4000);
    });
  }

  // ── Chat widget ────────────────────────────────────────────────────────────
  function loadChatWidget() {
    var s = document.createElement('script');
    s.src = '/assets/chat-widget.js';
    document.body.appendChild(s);
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  function init() {
    buildNav();
    buildFooter();
    loadChatWidget();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
