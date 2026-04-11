/**
 * site-footer.js — Web Component Vanilla JS
 * Usage: <site-footer lang="fr"></site-footer>
 */

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const lang = this.getAttribute('lang') || 'fr';
    this.innerHTML = this._getHTML(lang);
  }

  _getHTML(lang) {
    const phoneIcon = `<svg class="footer-icon" width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>`;
    const emailIcon = `<svg class="footer-icon" width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>`;
    const pinIcon  = `<svg class="footer-icon" width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>`;

    const data = {
      fr: {
        about: 'À propos', aboutText: 'Pretty Tours — Guide locale mauricienne passionnée. Licenciée par la Tourism Authority of Mauritius. Petits groupes, grandes émotions.',
        nav: 'Navigation', contact: 'Contact', legal: 'Informations légales',
        links: [
          { href: '/fr/', label: 'Accueil' }, { href: '/fr/excursions/', label: 'Excursions' },
          { href: '/fr/services/', label: 'Services' }, { href: '/fr/mon-histoire/', label: 'Mon Histoire' },
          { href: '/fr/contact/', label: 'Contact' }
        ],
        legalLinks: [
          { href: '/fr/mentions-legales/', label: 'Mentions légales' },
          { href: '/fr/politique-confidentialite/', label: 'Politique de confidentialité (RGPD)' },
          { href: '/fr/conditions-generales-vente/', label: 'Conditions générales de vente' },
          { href: '/fr/politique-cookies/', label: 'Gestion des cookies' }
        ],
        licensed: 'Licenciée Tourism Authority of Mauritius', rights: 'Tous droits réservés.',
        signature: 'Conçu avec passion pour partager la vraie Maurice.', location: 'Flic En Flac, Mauritius'
      },
      en: {
        about: 'About', aboutText: 'Pretty Tours — Passionate Mauritian local guide. Licensed by the Tourism Authority of Mauritius. Small groups, big emotions.',
        nav: 'Quick Links', contact: 'Contact', legal: 'Legal',
        links: [
          { href: '/en/', label: 'Home' }, { href: '/en/excursions/', label: 'Excursions' },
          { href: '/en/services/', label: 'Services' }, { href: '/en/my-story/', label: 'My Story' },
          { href: '/en/contact/', label: 'Contact' }
        ],
        legalLinks: [
          { href: '/en/legal-notice/', label: 'Legal Notice' },
          { href: '/en/privacy-policy/', label: 'Privacy Policy (GDPR)' },
          { href: '/en/terms-conditions/', label: 'Terms &amp; Conditions' },
          { href: '/en/cookie-policy/', label: 'Cookie Policy' }
        ],
        licensed: 'Licensed by Tourism Authority of Mauritius', rights: 'All rights reserved.',
        signature: 'Crafted with passion to share the real Mauritius.', location: 'Flic En Flac, Mauritius'
      },
      mau: {
        about: 'Konesans', aboutText: 'Pretty Tours — Gid lokal morisien pasioné. Lisansié par Tourism Authority of Mauritius. Ti group, gran emosion.',
        nav: 'Navigasion', contact: 'Kontak', legal: 'Info Legal',
        links: [
          { href: '/mau/', label: 'Akey' }, { href: '/mau/excursions/', label: 'Exkirsion' },
          { href: '/mau/services/', label: 'Servis' }, { href: '/mau/mo-listwar/', label: 'Mo Listwar' },
          { href: '/mau/kontakt/', label: 'Kontak' }
        ],
        legalLinks: [
          { href: '/mau/minsion-legal/', label: 'Minsion Legal' },
          { href: '/mau/politik-konfidansialite/', label: 'Politik Konfidansialite (RGPD)' },
          { href: '/mau/kondision-vant/', label: 'Kondision Zénéral Lavant' },
          { href: '/mau/zestion-cookies/', label: 'Zestion Cookies' }
        ],
        licensed: 'Lisansié par Tourism Authority of Mauritius', rights: 'Tou drwa rezervé.',
        signature: 'Kreé ek pasion pou partaz vré Moris.', location: 'Flic En Flac, Moris'
      }
    }[lang] || {};

    const navLinks = data.links.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('\n          ');
    const legalLinks = data.legalLinks.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('\n          ');

    return `
<footer class="footer">
  <div class="footer-container">
    <div class="footer-section footer-about">
      <h3 class="footer-title">${data.about}</h3>
      <p class="footer-text">${data.aboutText}</p>
      <div class="footer-badges">
        <img src="/assets/images/badge-tourism-authority.svg" alt="Tourism Authority Mauritius" class="footer-badge" width="140" height="48" loading="lazy">
        <img src="/assets/images/badge-licence.svg" alt="Licensed Tour Operator" class="footer-badge" width="120" height="48" loading="lazy">
      </div>
    </div>
    <div class="footer-section footer-nav">
      <h3 class="footer-title">${data.nav}</h3>
      <ul class="footer-links">
          ${navLinks}
      </ul>
    </div>
    <div class="footer-section footer-contact-section">
      <h3 class="footer-title">${data.contact}</h3>
      <ul class="footer-contact-list">
        <li>${phoneIcon}<a href="https://wa.me/23059042969" target="_blank" rel="noopener noreferrer">+230 5904 2969</a></li>
        <li>${emailIcon}<a href="mailto:prettytours@outlook.com">prettytours@outlook.com</a></li>
        <li>${pinIcon}<span>${data.location}</span></li>
      </ul>
    </div>
    <div class="footer-section footer-legal-section">
      <h3 class="footer-title">${data.legal}</h3>
      <ul class="footer-links">
          ${legalLinks}
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-bottom-container">
      <div class="footer-legal-info">
        <p><strong>Pretty Tours Ltd</strong> | BRN : C20171385 | <span>${data.licensed}</span> (10/09/2024)</p>
        <p class="footer-address">Avenue Cacatoes, Flic En Flac 1905-04, Mauritius</p>
      </div>
      <div class="footer-copyright">
        <p>© 2026 Pretty Tours Ltd. ${data.rights}</p>
        <p class="footer-signature">${data.signature}</p>
      </div>
    </div>
  </div>
</footer>`;
  }
}

customElements.define('site-footer', SiteFooter);
