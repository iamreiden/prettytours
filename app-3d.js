/**
 * PRETTY TOURS — App 3D
 * Alpine.js stores · GSAP ScrollTrigger · Lenis smooth scroll
 */

const COLORS_7 = [
  { name: 'Rouge Terre',    hex: '#8B3A3A' },
  { name: 'Brun Chocolat',  hex: '#5C3D2E' },
  { name: 'Sable Doré',     hex: '#D4A574' },
  { name: 'Ocre Jaune',     hex: '#C4923A' },
  { name: 'Violet Mauve',   hex: '#7B5E7B' },
  { name: 'Vert Forêt',     hex: '#3A6B3A' },
  { name: 'Bleu Océan',     hex: '#40E0D0' },
];

// ─── Alpine Store ────────────────────────────────────────────────────────────

document.addEventListener('alpine:init', () => {
  const excursions   = typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.excursions   : [];
  const testimonials = typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.testimonials : [];

  Alpine.store('app', {
    depth:            0,
    currentColor:     COLORS_7[0].name,
    currentColorHex:  COLORS_7[0].hex,
    colorProgress:    0,
    excursions,
    testimonials,
    activeTestimonial: 0,
  });
});

// ─── Bootstrap ───────────────────────────────────────────────────────────────

window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger);
  initLenis();
  initScrollTriggers();
  initHeroReveal();
  initCardTilt();
  initWhatsApp();
});

// ─── Lenis ───────────────────────────────────────────────────────────────────

function initLenis() {
  const lenis = new Lenis({
    duration:    1.4,
    easing:      t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth:      true,
    smoothTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// ─── Scroll Triggers ─────────────────────────────────────────────────────────

function store() {
  return window.Alpine ? window.Alpine.store('app') : null;
}

function initScrollTriggers() {

  // ── SECTION 2 : Underwater (pinned 150vh) ──────────────────────────────────
  ScrollTrigger.create({
    trigger: '#underwater',
    start:   'top top',
    end:     '+=150%',
    pin:     true,
    scrub:   1.2,

    onEnter()    { if (window.sceneManager) window.sceneManager.transitionTo('underwater'); },
    onLeaveBack(){ if (window.sceneManager) window.sceneManager.transitionTo('ocean'); },

    onUpdate(self) {
      const s = store();
      if (s) s.depth = Math.round(self.progress * 50);
      if (window.sceneManager) window.sceneManager.setUnderwaterProgress(self.progress);
    },
  });

  // ── SECTION 3 : 7 Couleurs (pinned 100vh) ─────────────────────────────────
  ScrollTrigger.create({
    trigger: '#seven-colors',
    start:   'top top',
    end:     '+=100%',
    pin:     true,
    scrub:   1,

    onEnter()    { if (window.sceneManager) window.sceneManager.transitionTo('colors'); },
    onLeave()    { if (window.sceneManager) window.sceneManager.transitionTo('excursions'); },
    onLeaveBack(){ if (window.sceneManager) window.sceneManager.transitionTo('underwater'); },

    onUpdate(self) {
      const s = store();
      const idx = Math.min(Math.floor(self.progress * COLORS_7.length), COLORS_7.length - 1);
      if (s) {
        s.currentColor    = COLORS_7[idx].name;
        s.currentColorHex = COLORS_7[idx].hex;
        s.colorProgress   = self.progress;
      }
      if (window.sceneManager) window.sceneManager.setColorsProgress(self.progress);
    },
  });

  // ── SECTION 5 : Testimonials (pinned 80vh) ────────────────────────────────
  ScrollTrigger.create({
    trigger: '#testimonials-3d',
    start:   'top top',
    end:     '+=80%',
    pin:     true,
    scrub:   1,

    onEnter()    { if (window.sceneManager) window.sceneManager.transitionTo('testimonials'); },
    onLeaveBack(){ if (window.sceneManager) window.sceneManager.transitionTo('excursions'); },

    onUpdate(self) {
      const s = store();
      if (!s || !s.testimonials.length) return;
      s.activeTestimonial = Math.min(
        Math.floor(self.progress * s.testimonials.length),
        s.testimonials.length - 1
      );
    },
  });

  // ── Excursion cards stagger reveal ────────────────────────────────────────
  ScrollTrigger.create({
    trigger: '#excursions-section',
    start:   'top 80%',
    once:    true,
    onEnter() {
      gsap.from('.card-3d', {
        opacity: 0,
        y: 35,
        scale: 0.97,
        duration: 0.65,
        stagger: 0.07,
        ease: 'power2.out',
      });
      if (window.sceneManager) window.sceneManager.transitionTo('excursions');
    },
  });

  // ── Hero fade on scroll into underwater ───────────────────────────────────
  gsap.to('#ocean-hero .hero-content', {
    scrollTrigger: {
      trigger: '#underwater',
      start:   'top 85%',
      end:     'top top',
      scrub:   1,
    },
    opacity: 0,
    y: -30,
  });
}

// ─── Hero text reveal ────────────────────────────────────────────────────────

function initHeroReveal() {
  const targets = document.querySelectorAll(
    '.hero-eyebrow, .hero-title, .hero-subtitle, .hero-cta, .scroll-indicator-3d'
  );
  gsap.from(targets, {
    opacity:  0,
    y:        28,
    duration: 0.9,
    stagger:  0.15,
    ease:     'power3.out',
    delay:    0.2,
  });
}

// ─── 3D card tilt on mouse move ──────────────────────────────────────────────

function initCardTilt() {
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.card-3d').forEach(card => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 1.6) {
        card.style.transform = `perspective(900px) rotateX(${dy * -7}deg) rotateY(${dx * 7}deg) translateY(-6px)`;
      } else {
        card.style.transform = '';
      }
    });
  });
}

// ─── WhatsApp CTA ────────────────────────────────────────────────────────────

function initWhatsApp() {
  if (typeof SITE_CONFIG === 'undefined' || typeof getWhatsAppLink !== 'function') return;
  const btn = document.getElementById('whatsapp-cta-3d');
  if (btn) btn.href = getWhatsAppLink('Bonjour, je souhaite des informations sur vos excursions.');
}
