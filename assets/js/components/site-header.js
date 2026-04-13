/**
 * site-header.js — Web Component Vanilla JS
 * Usage: <site-header lang="fr"></site-header>
 *
 * Injecte le CSS navbar dans <head> une seule fois.
 * Rend le HTML navbar + menu mobile en Light DOM.
 * Gère scroll effect, mobile menu, active link.
 */

/* ============================================
   MAPPING URLs inter-langues
   Clé = chemin sans slash initial (ex: "fr/mon-histoire/")
   Valeur = équivalents dans les autres langues
============================================ */
const URL_MAPPING = {
  // Homepage
  'fr/':                         { en: 'en/',    mau: 'mau/' },
  'en/':                         { fr: 'fr/',    mau: 'mau/' },
  'mau/':                        { fr: 'fr/',    en: 'en/'   },

  // Mon Histoire / My Story / Mo Listwar
  'fr/mon-histoire/':            { en: 'en/my-story/',   mau: 'mau/mo-listwar/' },
  'en/my-story/':                { fr: 'fr/mon-histoire/', mau: 'mau/mo-listwar/' },
  'mau/mo-listwar/':             { fr: 'fr/mon-histoire/', en: 'en/my-story/' },

  // Mentions légales
  'fr/mentions-legales/':        { en: 'en/legal-notice/',  mau: 'mau/minsion-legal/' },
  'en/legal-notice/':            { fr: 'fr/mentions-legales/', mau: 'mau/minsion-legal/' },
  'mau/minsion-legal/':          { fr: 'fr/mentions-legales/', en: 'en/legal-notice/' },

  // Politique de confidentialité
  'fr/politique-confidentialite/': { en: 'en/privacy-policy/', mau: 'mau/politik-konfidansialite/' },
  'en/privacy-policy/':          { fr: 'fr/politique-confidentialite/', mau: 'mau/politik-konfidansialite/' },
  'mau/politik-konfidansialite/': { fr: 'fr/politique-confidentialite/', en: 'en/privacy-policy/' },

  // CGV
  'fr/conditions-generales-vente/': { en: 'en/terms-conditions/', mau: 'mau/kondision-vant/' },
  'en/terms-conditions/':        { fr: 'fr/conditions-generales-vente/', mau: 'mau/kondision-vant/' },
  'mau/kondision-vant/':         { fr: 'fr/conditions-generales-vente/', en: 'en/terms-conditions/' },

  // Politique cookies
  'fr/politique-cookies/':       { en: 'en/cookie-policy/', mau: 'mau/zestion-cookies/' },
  'en/cookie-policy/':           { fr: 'fr/politique-cookies/', mau: 'mau/zestion-cookies/' },
  'mau/zestion-cookies/':        { fr: 'fr/politique-cookies/', en: 'en/cookie-policy/' },

  // Excursions
  'fr/excursions/':              { en: 'en/excursions/', mau: 'mau/excursions/' },
  'en/excursions/':              { fr: 'fr/excursions/', mau: 'mau/excursions/' },
  'mau/excursions/':             { fr: 'fr/excursions/', en: 'en/excursions/' },

  // Excursions — détails
  'fr/excursions/mahebourg-domaine-saint-aubin/':  { en: 'en/excursions/mahebourg-saint-aubin-estate/', mau: 'mau/excursions/mahebourg-domaine-saint-aubin/' },
  'en/excursions/mahebourg-saint-aubin-estate/':   { fr: 'fr/excursions/mahebourg-domaine-saint-aubin/', mau: 'mau/excursions/mahebourg-domaine-saint-aubin/' },
  'mau/excursions/mahebourg-domaine-saint-aubin/': { fr: 'fr/excursions/mahebourg-domaine-saint-aubin/', en: 'en/excursions/mahebourg-saint-aubin-estate/' },

  'fr/excursions/diner-romantique-flic-en-flac/':  { en: 'en/excursions/romantic-dinner-flic-en-flac/', mau: 'mau/excursions/dine-romantik-flic-en-flac/' },
  'en/excursions/romantic-dinner-flic-en-flac/':   { fr: 'fr/excursions/diner-romantique-flic-en-flac/', mau: 'mau/excursions/dine-romantik-flic-en-flac/' },
  'mau/excursions/dine-romantik-flic-en-flac/':    { fr: 'fr/excursions/diner-romantique-flic-en-flac/', en: 'en/excursions/romantic-dinner-flic-en-flac/' },

  'fr/excursions/wedding-planner-maurice/':        { en: 'en/excursions/wedding-planner-mauritius/', mau: 'mau/excursions/wedding-planner-moris/' },
  'en/excursions/wedding-planner-mauritius/':      { fr: 'fr/excursions/wedding-planner-maurice/', mau: 'mau/excursions/wedding-planner-moris/' },
  'mau/excursions/wedding-planner-moris/':         { fr: 'fr/excursions/wedding-planner-maurice/', en: 'en/excursions/wedding-planner-mauritius/' },

  'fr/excursions/ile-aux-cerfs-catamaran/':        { en: 'en/excursions/ile-aux-cerfs-catamaran/', mau: 'mau/excursions/ile-aux-cerfs-katamaran/' },
  'en/excursions/ile-aux-cerfs-catamaran/':        { fr: 'fr/excursions/ile-aux-cerfs-catamaran/', mau: 'mau/excursions/ile-aux-cerfs-katamaran/' },
  'mau/excursions/ile-aux-cerfs-katamaran/':       { fr: 'fr/excursions/ile-aux-cerfs-catamaran/', en: 'en/excursions/ile-aux-cerfs-catamaran/' },

  'fr/excursions/chamarel-terre-sept-couleurs/':   { en: 'en/excursions/chamarel-seven-colored-earth/', mau: 'mau/excursions/chamarel-ter-set-kouleur/' },
  'en/excursions/chamarel-seven-colored-earth/':   { fr: 'fr/excursions/chamarel-terre-sept-couleurs/', mau: 'mau/excursions/chamarel-ter-set-kouleur/' },
  'mau/excursions/chamarel-ter-set-kouleur/':      { fr: 'fr/excursions/chamarel-terre-sept-couleurs/', en: 'en/excursions/chamarel-seven-colored-earth/' },

  // Services
  'fr/services/':                { en: 'en/services/', mau: 'mau/services/' },
  'en/services/':                { fr: 'fr/services/', mau: 'mau/services/' },
  'mau/services/':               { fr: 'fr/services/', en: 'en/services/' },

  'fr/services/excursions-personnalisees/': { en: 'en/services/personalized-tours/', mau: 'mau/services/exkirsion-personalize/' },
  'en/services/personalized-tours/':        { fr: 'fr/services/excursions-personnalisees/', mau: 'mau/services/exkirsion-personalize/' },
  'mau/services/exkirsion-personalize/':    { fr: 'fr/services/excursions-personnalisees/', en: 'en/services/personalized-tours/' },

  'fr/services/organisation-evenements/':   { en: 'en/services/event-planning/', mau: 'mau/services/organizasion-levennman/' },
  'en/services/event-planning/':            { fr: 'fr/services/organisation-evenements/', mau: 'mau/services/organizasion-levennman/' },
  'mau/services/organizasion-levennman/':   { fr: 'fr/services/organisation-evenements/', en: 'en/services/event-planning/' },

  // Contact
  'fr/contact/':                 { en: 'en/contact/', mau: 'mau/contact/' },
  'en/contact/':                 { fr: 'fr/contact/', mau: 'mau/contact/' },
  'mau/contact/':                { fr: 'fr/contact/', en: 'en/contact/' }
};

window.switchLang = function(targetLang) {
  let currentPath = window.location.pathname;
  if (currentPath.startsWith('/')) currentPath = currentPath.substring(1);

  if (URL_MAPPING[currentPath] && URL_MAPPING[currentPath][targetLang]) {
    window.location.href = '/' + URL_MAPPING[currentPath][targetLang];
  } else {
    // Fallback : homepage de la langue cible
    window.location.href = '/' + targetLang + '/';
  }
};

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const lang = this.getAttribute('lang') || 'fr';
    this._injectStyles();
    this.innerHTML = this._getHTML(lang);
    this._initScroll();
    this._initMobileMenu();
    this._setActiveLink();
  }

  _injectStyles() {
    if (document.getElementById('site-header-styles')) return;
    const style = document.createElement('style');
    style.id = 'site-header-styles';
    style.textContent = `
      /* ============================================
         NAVBAR — Pretty Tours
      ============================================ */
      .navbar {
        position: fixed; top: 0; left: 0; right: 0;
        z-index: 1000; padding: 20px 0;
        background: linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 100%);
        transition: background 0.2s ease, box-shadow 0.2s ease, padding 0.2s ease;
      }
      .navbar.scrolled {
        background: rgba(255,255,255,0.97);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        padding: 12px 0;
        box-shadow: 0 2px 20px rgba(0,0,0,0.08);
      }
      .navbar .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
      .navbar__inner { display: flex; align-items: center; justify-content: space-between; }
      .navbar__logo {
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem; font-weight: 700; color: #fff;
        text-decoration: none; transition: color 0.4s;
      }
      .navbar.scrolled .navbar__logo { color: #1A2B3C; }
      .navbar__nav { display: flex; align-items: center; gap: 32px; list-style: none; margin: 0; padding: 0; }
      .navbar__nav a {
        font-family: 'Inter', sans-serif; font-size: 0.9375rem; font-weight: 500;
        color: rgba(255,255,255,0.9); text-decoration: none; transition: color 0.3s; position: relative;
      }
      .navbar__nav a::after {
        content: ''; position: absolute; bottom: -4px; left: 0;
        width: 0; height: 2px; background: #00CED1;
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .navbar__nav a:hover::after,
      .navbar__nav a[aria-current="page"]::after { width: 100%; }
      .navbar.scrolled .navbar__nav a { color: #1A2B3C; }
      .navbar__actions { display: flex; align-items: center; gap: 16px; }
      .lang-switcher { display: flex; gap: 8px; }
      .lang-btn {
        font-size: 0.8125rem; font-weight: 600;
        color: rgba(255,255,255,0.7); padding: 4px 8px;
        border-radius: 4px; transition: all 0.3s;
        background: none; border: none; cursor: pointer; font-family: 'Inter', sans-serif;
      }
      .lang-btn:hover, .lang-btn.active {
        color: #fff; background: rgba(255,255,255,0.15);
      }
      .lang-btn:disabled { cursor: default; }
      .navbar.scrolled .lang-btn { color: rgba(26,43,60,0.6); }
      .navbar.scrolled .lang-btn:hover,
      .navbar.scrolled .lang-btn.active {
        color: #1A2B3C; background: rgba(0,206,209,0.1);
      }
      .navbar__whatsapp {
        width: 40px; height: 40px; background: #25D366; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        transition: transform 0.3s, box-shadow 0.3s; flex-shrink: 0;
      }
      .navbar__whatsapp:hover { transform: scale(1.1); box-shadow: 0 4px 15px rgba(37,211,102,0.4); }
      .navbar__hamburger {
        display: none; flex-direction: column; gap: 5px;
        cursor: pointer; padding: 4px; background: none; border: none;
      }
      .navbar__hamburger span {
        display: block; width: 24px; height: 2px;
        background: #fff; border-radius: 2px; transition: all 0.3s;
      }
      .navbar.scrolled .navbar__hamburger span { background: #1A2B3C; }
      /* Mobile menu overlay */
      .navbar__mobile {
        display: none; position: fixed; inset: 0;
        background: #1A2B3C; z-index: 999;
        flex-direction: column; align-items: center; justify-content: center; gap: 32px;
      }
      .navbar__mobile.open { display: flex; }
      .navbar__mobile a {
        font-family: 'Playfair Display', serif; font-size: 2rem;
        color: #fff; text-decoration: none; transition: color 0.3s;
      }
      .navbar__mobile a:hover { color: #00CED1; }
      .navbar__mobile-close {
        position: absolute; top: 24px; right: 24px;
        background: none; border: none; color: #fff; font-size: 2rem; cursor: pointer; line-height: 1;
      }
      @media (max-width: 768px) {
        .navbar__nav { display: none; }
        .navbar__hamburger { display: flex; }
      }
    `;
    document.head.appendChild(style);
  }

  _getHTML(lang) {
    const t = {
      fr: {
        ariaNav: 'Navigation principale',
        ariaLang: 'Choisir la langue',
        ariaWA: 'Contacter Pretty sur WhatsApp',
        ariaMenu: 'Ouvrir le menu',
        ariaClose: 'Fermer le menu',
        waText: 'Bonjour%20Pretty,%20je%20souhaite%20d%C3%A9couvrir%20vos%20excursions',
        links: [
          { href: '/fr/', label: 'Accueil' },
          { href: '/fr/mon-histoire/', label: 'Mon Histoire' },
          { href: '/fr/excursions/', label: 'Excursions' },
          { href: '/fr/services/', label: 'Services' },
          { href: '/fr/contact/', label: 'Contact' }
        ],
        langBtns: [
          { code: 'FR', targetLang: 'fr', flag: '🇫🇷' },
          { code: 'EN', targetLang: 'en', flag: '🇬🇧' },
          { code: 'MU', targetLang: 'mau', flag: '🇲🇺' }
        ]
      },
      en: {
        ariaNav: 'Main navigation',
        ariaLang: 'Choose language',
        ariaWA: 'Contact Pretty on WhatsApp',
        ariaMenu: 'Open menu',
        ariaClose: 'Close menu',
        waText: 'Hello%20Pretty,%20I%27d%20like%20to%20discover%20your%20excursions',
        links: [
          { href: '/en/', label: 'Home' },
          { href: '/en/my-story/', label: 'My Story' },
          { href: '/en/excursions/', label: 'Excursions' },
          { href: '/en/services/', label: 'Services' },
          { href: '/en/contact/', label: 'Contact' }
        ],
        langBtns: [
          { code: 'FR', targetLang: 'fr', flag: '🇫🇷' },
          { code: 'EN', targetLang: 'en', flag: '🇬🇧' },
          { code: 'MU', targetLang: 'mau', flag: '🇲🇺' }
        ]
      },
      mau: {
        ariaNav: 'Navigasion prinsipal',
        ariaLang: 'Choisir lang',
        ariaWA: 'Kontak Pretty lor WhatsApp',
        ariaMenu: 'Ouver meni',
        ariaClose: 'Ferm meni',
        waText: 'Bonzour%20Pretty,%20mo%20anvi%20dekouver%20vot%20excursions',
        links: [
          { href: '/mau/', label: 'Akey' },
          { href: '/mau/mo-listwar/', label: 'Mo Listwar' },
          { href: '/mau/excursions/', label: 'Exkirsion' },
          { href: '/mau/services/', label: 'Servis' },
          { href: '/mau/contact/', label: 'Kontak' }
        ],
        langBtns: [
          { code: 'FR', targetLang: 'fr', flag: '🇫🇷' },
          { code: 'EN', targetLang: 'en', flag: '🇬🇧' },
          { code: 'MU', targetLang: 'mau', flag: '🇲🇺' }
        ]
      }
    }[lang] || {};

    const navItems = t.links.map(l =>
      `<li><a href="${l.href}">${l.label}</a></li>`
    ).join('\n          ');

    const mobileLinks = t.links.map(l =>
      `<a href="${l.href}">${l.label}</a>`
    ).join('\n      ');

    const langItems = t.langBtns.map(b => {
      const isActive = b.targetLang === lang;
      return `<button class="lang-btn${isActive ? ' active' : ''}" onclick="switchLang('${b.targetLang}')"${isActive ? ' disabled aria-current="true"' : ''} aria-label="${b.code}">${b.code} ${b.flag}</button>`;
    }).join('\n            ');

    const waIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`;

    return `
<header class="navbar" id="navbar">
  <div class="container">
    <nav class="navbar__inner" aria-label="${t.ariaNav}">
      <a href="/${lang}/" class="navbar__logo" aria-label="Pretty Tours">Pretty Tours</a>
      <ul class="navbar__nav" role="list">
          ${navItems}
      </ul>
      <div class="navbar__actions">
        <div class="lang-switcher" aria-label="${t.ariaLang}">
            ${langItems}
        </div>
        <a href="https://wa.me/23059042969?text=${t.waText}"
           class="navbar__whatsapp" target="_blank" rel="noopener noreferrer"
           aria-label="${t.ariaWA}">
          ${waIcon}
        </a>
        <button class="navbar__hamburger" id="siteMenuToggle" aria-label="${t.ariaMenu}" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  </div>
</header>

<nav class="navbar__mobile" id="siteMenuMobile" aria-label="${t.ariaNav}">
  <button class="navbar__mobile-close" id="siteMenuClose" aria-label="${t.ariaClose}">✕</button>
  ${mobileLinks}
</nav>`;
  }

  _initScroll() {
    const navbar = this.querySelector('#navbar');
    if (!navbar) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 60) navbar.classList.add('scrolled');
          else navbar.classList.remove('scrolled');
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  _initMobileMenu() {
    const toggle  = this.querySelector('#siteMenuToggle');
    const menu    = this.querySelector('#siteMenuMobile');
    const close   = this.querySelector('#siteMenuClose');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    });
    close?.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  _setActiveLink() {
    const path = window.location.pathname;
    this.querySelectorAll('.navbar__nav a').forEach(a => {
      if (a.getAttribute('href') === path ||
         (a.getAttribute('href') !== '/' && path.startsWith(a.getAttribute('href')))) {
        a.setAttribute('aria-current', 'page');
      }
    });
    // Lang switcher : bouton actif déjà géré via classe 'active' dans _getHTML
  }
}

customElements.define('site-header', SiteHeader);
