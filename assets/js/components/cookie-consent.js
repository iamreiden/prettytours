/**
 * cookie-consent.js — Web Component Vanilla JS
 * Usage: <cookie-consent lang="fr"></cookie-consent>
 *
 * Affiche une bannière RGPD au premier chargement.
 * Sauvegarde les préférences dans un cookie 1 an.
 */

class CookieConsent extends HTMLElement {
  connectedCallback() {
    const lang = this.getAttribute('lang') || 'fr';
    this.prefs = this.loadPreferences();

    if (!this.hasConsent()) {
      this.showBanner(lang);
    } else {
      this.applyPreferences();
    }
  }

  loadPreferences() {
    const saved = this.getCookie('pretty_tours_consent');
    return saved ? JSON.parse(decodeURIComponent(saved)) : null;
  }

  hasConsent() { return this.prefs !== null; }

  showBanner(lang) {
    const policyUrls = {
      fr: '/fr/politique-cookies/',
      en: '/en/cookie-policy/',
      mau: '/mau/zestion-cookies/'
    };

    const t = {
      fr: {
        title: '🍪 Respect de votre vie privée',
        desc: 'Nous utilisons des cookies essentiels pour faire fonctionner le site, et des cookies analytiques optionnels pour améliorer votre expérience. Vous pouvez accepter ou refuser les cookies non essentiels.',
        acceptAll: 'Tout accepter',
        rejectAll: 'Tout refuser',
        customize: 'Personnaliser',
        moreInfo: 'En savoir plus'
      },
      en: {
        title: '🍪 Your Privacy Matters',
        desc: 'We use essential cookies to keep the site running, and optional analytics cookies to improve your experience. You can accept or reject non-essential cookies.',
        acceptAll: 'Accept All',
        rejectAll: 'Reject All',
        customize: 'Customize',
        moreInfo: 'Learn More'
      },
      mau: {
        title: '🍪 Respekte ou lavi privé',
        desc: 'Nou servi cookies esansiel pou fé sit-la marse, ek cookies analitik opsionnel pou ameliore ou experyans. Ou kapav aksepte ou refize cookies ki pa esansiel.',
        acceptAll: 'Aksepte tou',
        rejectAll: 'Refize tou',
        customize: 'Personalize',
        moreInfo: 'Konn plis'
      }
    }[lang];

    const policyUrl = policyUrls[lang] || policyUrls.fr;

    document.body.style.overflow = 'hidden';

    this.innerHTML = `
<div class="cookie-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
  <div class="cookie-overlay"></div>
  <div class="cookie-content">
    <h2 class="cookie-title" id="cookie-title">${t.title}</h2>
    <p class="cookie-desc">${t.desc}</p>
    <div class="cookie-buttons">
      <button class="cookie-btn cookie-btn--accept" id="cookie-accept-all" aria-label="${t.acceptAll}">${t.acceptAll}</button>
      <button class="cookie-btn cookie-btn--reject" id="cookie-reject-all" aria-label="${t.rejectAll}">${t.rejectAll}</button>
    </div>
    <a class="cookie-more" href="${policyUrl}">${t.moreInfo}</a>
  </div>
</div>`;

    this.querySelector('#cookie-accept-all').addEventListener('click', () => this.accept(true));
    this.querySelector('#cookie-reject-all').addEventListener('click', () => this.accept(false));
  }

  accept(analytics) {
    this.savePreferences({ essential: true, analytics, timestamp: Date.now() });
    this.innerHTML = '';
    document.body.style.overflow = '';
    this.applyPreferences();
  }

  savePreferences(prefs) {
    this.prefs = prefs;
    this.setCookie('pretty_tours_consent', encodeURIComponent(JSON.stringify(prefs)), 365);
  }

  applyPreferences() {
    // Charger Google Analytics ici si this.prefs?.analytics === true
  }

  setCookie(name, value, days) {
    const exp = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value};expires=${exp};path=/;SameSite=Lax`;
  }

  getCookie(name) {
    return document.cookie.split('; ').find(r => r.startsWith(name + '='))?.split('=')[1];
  }
}

customElements.define('cookie-consent', CookieConsent);
