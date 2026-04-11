/**
 * PRETTY TOURS — JavaScript Principal
 * Animations GSAP, Lenis Smooth Scroll, Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initIntro();
  initSmoothScroll();
  initNavbar();
  initWhatsAppButtons();
  initFooter();
  initAnimations();
  initSearchBar();
  initMobileMenu();
  generateExperiencesGrid();
  generateTestimonials();
});

function initSmoothScroll() {
  document.documentElement.style.scrollBehavior = 'smooth';

  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 55) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }

      if (typeof gsap !== 'undefined') {
        if (currentScroll > 350) {
          if (currentScroll > lastScroll + 8) {
            gsap.to(navbar, { y: '-100%', duration: 0.5, ease: 'power3.out' });
          } else if (currentScroll < lastScroll - 8) {
            gsap.to(navbar, { y: '0%', duration: 0.4, ease: 'power3.out' });
          }
        } else {
          gsap.to(navbar, { y: '0%', duration: 0.4, ease: 'power3.out' });
        }
      }

      lastScroll = currentScroll;
      ticking = false;
    });
  }, { passive: true });
}

function initMobileMenu() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('nav-open');
    toggle.classList.toggle('active');

    if (typeof gsap !== 'undefined') {
      if (isOpen) {
        gsap.to(menu, { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
      } else {
        gsap.to(menu, { x: '100%', opacity: 0, duration: 0.3, ease: 'power3.in' });
      }
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('nav-open');
      toggle.classList.remove('active');

      if (typeof gsap !== 'undefined') {
        gsap.to(menu, { x: '100%', opacity: 0, duration: 0.3 });
      }
    });
  });
}

function initWhatsAppButtons() {
  const pageName = document.querySelector('h1')?.textContent || 'vos excursions';
  const customMessage = `Bonjour, je souhaite des informations sur ${pageName}.`;

  document.querySelectorAll('[data-whatsapp-float], [data-whatsapp-nav], [data-whatsapp-cta], [data-whatsapp-booking]').forEach(btn => {
    btn.href = getWhatsAppLink(customMessage);
  });

  const floatBtn = document.querySelector('.whatsapp-float');
  if (floatBtn && typeof gsap !== 'undefined') {
    gsap.to(floatBtn, {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }
}

function initFooter() {
  const emailLinks = document.querySelectorAll('[data-config-email], .footer-email');
  emailLinks.forEach(link => {
    link.href = `mailto:${SITE_CONFIG.contact.email}`;
    link.textContent = SITE_CONFIG.contact.email;
  });

  const phoneLinks = document.querySelectorAll('[data-config-phone], .footer-phone');
  phoneLinks.forEach(link => {
    link.href = `tel:${SITE_CONFIG.contact.phone}`;
    link.textContent = SITE_CONFIG.contact.phone;
  });

  const instagramLinks = document.querySelectorAll('[data-config-instagram]');
  instagramLinks.forEach(link => {
    link.href = SITE_CONFIG.social.instagram;
  });

  const facebookLinks = document.querySelectorAll('[data-config-facebook]');
  facebookLinks.forEach(link => {
    link.href = SITE_CONFIG.social.facebook;
  });

  const yearElements = document.querySelectorAll('.copyright-year');
  yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const businessNameElements = document.querySelectorAll('[data-config="businessName"]');
  businessNameElements.forEach(el => {
    el.textContent = SITE_CONFIG.business.name;
  });

  const groupSizeElements = document.querySelectorAll('[data-config="maxGroupSize"]');
  groupSizeElements.forEach(el => {
    el.textContent = SITE_CONFIG.business.maxGroupSize;
  });

  generateFooterExcursions();
}

function generateFooterExcursions() {
  const container = document.getElementById('excursions-footer-links');
  if (!container) return;

  container.innerHTML = SITE_CONFIG.excursions.map(exc => `
    <li><a href="/excursions/${exc.slug}.html">${exc.name}</a></li>
  `).join('');
}

function generateExperiencesGrid() {
  const grid = document.getElementById('experiences-grid');
  if (!grid) return;

  const featured = getFeaturedExcursions();

  grid.innerHTML = featured.map((exc, index) => `
    <div class="experience-card" data-gsap-reveal style="--delay: ${index * 0.1}s">
      <a href="/excursions/${exc.slug}.html">
        <div class="experience-image">
          <picture>
            <source srcset="${exc.imageWebP}" type="image/webp">
            <img src="${exc.image}" alt="${exc.name}" loading="lazy">
          </picture>
          <div class="experience-overlay">
            <span class="experience-price">À partir de ${formatPrice(exc.price)}</span>
          </div>
        </div>
        <div class="experience-content">
          <h3>${exc.name}</h3>
          <p>${exc.tagline}</p>
          <div class="experience-meta">
            <span>⏱️ ${exc.duration}h</span>
            <span>👥 Max ${SITE_CONFIG.business.maxGroupSize}</span>
          </div>
        </div>
      </a>
    </div>
  `).join('');
}

function generateTestimonials() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;

  slider.innerHTML = SITE_CONFIG.testimonials.map((test, index) => `
    <div class="testimonial-card" data-gsap-reveal style="--delay: ${index * 0.15}s">
      <div class="testimonial-stars">
        ${'★'.repeat(test.rating)}
      </div>
      <p class="testimonial-text">"${test.text}"</p>
      <div class="testimonial-author">
        <strong>${test.author}</strong>
        <span>${test.location}</span>
      </div>
      <div class="testimonial-excursion">${test.excursion}</div>
    </div>
  `).join('');
}

function initSearchBar() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.experience-card');

    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const tagline = card.querySelector('p')?.textContent.toLowerCase() || '';

      if (title.includes(query) || tagline.includes(query)) {
        card.style.display = 'block';
        if (typeof gsap !== 'undefined') {
          gsap.to(card, { opacity: 1, y: 0, duration: 0.3 });
        }
      } else {
        if (typeof gsap !== 'undefined') {
          gsap.to(card, { opacity: 0, y: 20, duration: 0.2, onComplete: () => {
            card.style.display = 'none';
          }});
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
}

function initAnimations() {
  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const children = Array.from(section.children);
    if (!children.length) return;

    gsap.from(children, {
      scrollTrigger: {
        trigger: section,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 18,
      duration: 0.65,
      stagger: 0.07,
      ease: 'power2.out'
    });
  });

  const heroMedia = document.querySelector('.hero-image');
  if (heroMedia) {
    gsap.to(heroMedia, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 2
      },
      y: '18%',
      ease: 'none'
    });
  }
}

function initIntro() {
  const intro = document.getElementById('page-intro');
  if (!intro) return;

  // Show only once per session
  if (sessionStorage.getItem('pt-intro-shown')) {
    intro.remove();
    return;
  }

  document.body.style.overflow = 'hidden';
  document.body.classList.add('intro-active');

  function onIntroDone() {
    document.body.style.overflow = '';
    document.body.classList.remove('intro-active');
    sessionStorage.setItem('pt-intro-shown', '1');
    if (intro.parentNode) intro.remove();

    const targets = [
      document.querySelector('.hero-content h1'),
      document.querySelector('.hero-content > p'),
      document.querySelector('.search-bar'),
      document.querySelector('.scroll-indicator')
    ].filter(Boolean);

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(targets,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out', clearProps: 'transform' }
      );
    } else {
      targets.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    }
  }

  // CSS keyframe animation drives the intro — remove overlay when slide-up ends
  intro.addEventListener('animationend', (e) => {
    if (e.animationName === 'introSlideUp') onIntroDone();
  }, { once: true });

  // Hard fallback: if animationend never fires (hidden tab, reduced-motion edge cases)
  setTimeout(onIntroDone, 5500);
}

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    const botcheck = form.querySelector('[name="botcheck"]');
    if (botcheck && botcheck.checked) {
      e.preventDefault();
      console.warn('Bot detected');
      return false;
    }
  });
});

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}
