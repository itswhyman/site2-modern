/* SITE 2 — MODERN MOTION ENGINE */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const isMobile = window.matchMedia('(max-width: 860px)').matches;

  /* -------- 1. HERO — word-by-word spring reveal -------- */
  function initHero() {
    const title = document.getElementById('hero-title');
    const badge = document.querySelector('.hero-badge');
    const sub = document.getElementById('hero-sub');
    const header = document.getElementById('header');
    const cta = document.getElementById('hero-cta');

    if (title && !title.querySelector('.word')) {
      const text = title.textContent.trim();
      title.innerHTML = text.split(/\s+/).map(w =>
        `<span class="word-wrap"><span class="word">${w}</span></span>`
      ).join(' ');
    }

    requestAnimationFrame(() => {
      header?.classList.add('is-loaded');
    });

    setTimeout(() => {
      badge?.classList.add('is-visible');
      title?.querySelectorAll('.word').forEach((w, i) => {
        setTimeout(() => w.classList.add('is-visible'), 80 + i * 90);
      });
      const totalTitleTime = 80 + (title?.querySelectorAll('.word').length || 0) * 90;
      setTimeout(() => sub?.classList.add('is-visible'), totalTitleTime + 100);
      setTimeout(() => {
        document.querySelectorAll('.hero-actions .btn').forEach(b => b.classList.add('is-visible'));
      }, totalTitleTime + 260);
    }, 100);
  }

  /* -------- 2. Magnetic buttons (desktop only) -------- */
  function initMagnetic() {
    if (isMobile) return;
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      const strength = 0.28;
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* -------- 3. Scroll reveals -------- */
  function initScrollReveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    document.querySelectorAll('[data-pop], [data-scale-in]').forEach(el => io.observe(el));

    document.querySelectorAll('.service-card').forEach((el, i) => {
      el.style.transitionDelay = (i * 90) + 'ms';
      io.observe(el);
    });

    document.querySelectorAll('.gallery-item').forEach((el, i) => {
      el.style.transitionDelay = (i * 80) + 'ms';
      io.observe(el);
    });

    document.querySelectorAll('.testi-card').forEach((el, i) => {
      el.style.transitionDelay = (i * 100) + 'ms';
      io.observe(el);
    });

    // Form fields trigger class
    const form = document.getElementById('contact-form');
    if (form) {
      const formIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { form.classList.add('is-visible'); formIO.disconnect(); }
        });
      }, { threshold: 0.25 });
      formIO.observe(form);
    }
  }

  /* -------- 4. 3D tilt on service cards (subtle, desktop) -------- */
  function initCardTilt() {
    if (isMobile) return;
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-3px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* -------- 5. Subtle hero parallax -------- */
  function initHeroParallax() {
    if (isMobile) return;
    const bg = document.getElementById('hero-bg');
    if (!bg) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          bg.style.transform = `translateY(${y * 0.28}px) scale(1.08)`;
        }
        ticking = false;
      });
      ticking = true;
    }, { passive: true });
  }

  /* -------- 6. Nav pill magnetic feedback -------- */
  function initNavPills() {
    document.querySelectorAll('.nav--pill a').forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-1px)';
      });
      link.addEventListener('mouseleave', () => {
        link.style.transform = '';
      });
    });
  }

  /* -------- Boot -------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  function boot() {
    initHero();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initScrollReveals();
        initMagnetic();
        initCardTilt();
        initHeroParallax();
        initNavPills();
      });
    });
  }
})();