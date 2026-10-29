(function () {
  const cfg = Storage.load();
  const root = document.documentElement;
  Object.keys(cfg.colors || {}).forEach(k => root.style.setProperty('--' + k.replace(/([A-Z])/g, '-$1').toLowerCase(), cfg.colors[k]));

  document.title = cfg.seo?.title || cfg.business.name;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.content = cfg.seo?.description || cfg.business.tagline;

  const logoEl = document.getElementById('logo');
  if (cfg.business.logoImage) logoEl.innerHTML = `<img src="${cfg.business.logoImage}" alt="${cfg.business.name}" style="height:36px">`;
  else logoEl.textContent = cfg.business.logoText || cfg.business.name;
  document.getElementById('footer-logo').textContent = cfg.business.logoText || cfg.business.name;
  document.getElementById('footer-tagline').textContent = cfg.business.tagline;
  document.getElementById('footer-copy').textContent = `© ${new Date().getFullYear()} ${cfg.business.name}. Tüm hakları saklıdır.`;

  // Hero
  document.getElementById('hero-title').textContent = cfg.hero.title;
  document.getElementById('hero-sub').textContent = cfg.hero.subtitle;
  const heroCta = document.getElementById('hero-cta');
  heroCta.textContent = cfg.hero.ctaText;
  heroCta.href = cfg.hero.ctaLink || '#iletisim';
  const heroBg = document.getElementById('hero-bg');
  if (cfg.hero.image) {
    heroBg.style.backgroundImage = `url(${cfg.hero.image})`;
    heroBg.style.opacity = 1 - (cfg.hero.overlay || 0.3);
  }

  // Services bento
  const servicesGrid = document.getElementById('services-grid');
  const formServices = document.getElementById('form-services');
  formServices.innerHTML = '<option value="">Hizmet seçin</option>';
  (cfg.services || []).filter(s => s.visible !== false).forEach((s, i) => {
    const cls = i === 0 ? 'bento-large' : (i === 3 ? 'bento-wide' : '');
    servicesGrid.innerHTML += `
      <article class="service-card ${cls}">
        <div class="service-icon"><span class="icon-mark">${esc(s.icon||'')}</span></div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.desc)}</p>
        <div class="service-meta">
          <span class="service-price">${esc(s.price)}</span>
          ${s.duration ? `<span class="service-dur">${esc(s.duration)}</span>` : ''}
        </div>
      </article>`;
    formServices.innerHTML += `<option>${esc(s.title)}</option>`;
  });

  // Gallery marquee — duplicate items for infinite scroll
  const galleryGrid = document.getElementById('gallery-grid');
  const buildItem = g => `<figure class="marquee-item"><img src="${g.url}" alt="${esc(g.alt)}" loading="lazy"></figure>`;
  (cfg.gallery || []).forEach(g => galleryGrid.innerHTML += buildItem(g));
  (cfg.gallery || []).forEach(g => galleryGrid.innerHTML += buildItem(g));

  // About
  document.getElementById('about-title').textContent = cfg.about.title;
  document.getElementById('about-text').textContent = cfg.about.text;
  const feats = document.getElementById('about-features');
  (cfg.about.features || []).forEach(f => feats.innerHTML += `<li>${esc(f)}</li>`);
  if (cfg.about.image) document.getElementById('about-img').src = cfg.about.image;

  // Testimonials
  const testiGrid = document.getElementById('testi-grid');
  (cfg.testimonials || []).filter(t => t.approved !== false).forEach(t => {
    const initials = (t.name || '?').trim().split(' ').map(p => p[0]).slice(0,2).join('').toUpperCase();
    testiGrid.innerHTML += `
      <article class="avatar-card">
        <div class="avatar-chip">${initials}</div>
        <div class="avatar-body">
          <div class="stars">${'<span class="star"></span>'.repeat(t.rating || 5)}</div>
          <p>“${esc(t.text)}”</p>
          <cite>— ${esc(t.name)}</cite>
        </div>
      </article>`;
  });

  // Contact
  const b = cfg.business;
  document.getElementById('contact-info').innerHTML = `
    <div class="info-item"><strong>Telefon</strong><a href="tel:${b.phone.replace(/\s/g,'')}">${esc(b.phone)}</a></div>
    <div class="info-item"><strong>WhatsApp</strong><a href="https://wa.me/${b.whatsapp}" target="_blank" rel="noopener">Mesaj Gönder</a></div>
    <div class="info-item"><strong>E-posta</strong><a href="mailto:${b.email}">${esc(b.email)}</a></div>
    <div class="info-item"><strong>Adres</strong><p>${esc(b.address)}</p></div>
    <div class="info-item"><strong>Saatler</strong><p>${esc(b.hours)}</p></div>`;

  const socialEl = document.getElementById('footer-social');
  if (b.social?.instagram) socialEl.innerHTML += `<a href="${b.social.instagram}" target="_blank" rel="noopener">Instagram</a>`;
  if (b.social?.facebook) socialEl.innerHTML += `<a href="${b.social.facebook}" target="_blank" rel="noopener">Facebook</a>`;
  if (b.social?.tiktok) socialEl.innerHTML += `<a href="${b.social.tiktok}" target="_blank" rel="noopener">TikTok</a>`;

  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Teşekkürler! En kısa sürede dönüş yapacağız.');
    e.target.reset();
  });

  // Review form
  document.getElementById('review-form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const review = {
      id: 't' + Date.now(),
      name: f.name.value.trim(),
      text: f.text.value.trim(),
      rating: Math.min(5, Math.max(1, parseInt(f.rating.value) || 5)),
      approved: false
    };
    if (!review.name || !review.text) return;
    const fresh = Storage.load();
    if (!fresh.testimonials) fresh.testimonials = [];
    fresh.testimonials.push(review);
    if (Storage.save(fresh)) {
      alert('Yorumunuz alındı! Yönetici onayından sonra yayınlanacak.');
      f.reset();
    }
  });

  // ---- Animations ----
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 860px)').matches;

  // Hero — word split
  const title = document.getElementById('hero-title');
  if (title && !title.querySelector('.word')) {
    const words = title.textContent.trim().split(/\s+/);
    title.innerHTML = words.map(w => `<span class="word-wrap"><span class="word">${w}</span></span>`).join(' ');
  }
  requestAnimationFrame(() => document.getElementById('header')?.classList.add('is-loaded'));
  setTimeout(() => {
    document.querySelector('.hero-badge')?.classList.add('is-visible');
    title?.querySelectorAll('.word').forEach((w, i) => setTimeout(() => w.classList.add('is-visible'), i * 90));
    const t = 80 + (title?.querySelectorAll('.word').length || 0) * 90;
    setTimeout(() => document.getElementById('hero-sub')?.classList.add('is-visible'), t + 100);
    setTimeout(() => document.querySelectorAll('.hero-actions .btn').forEach(b => b.classList.add('is-visible')), t + 260);
  }, 100);

  // Magnetic buttons
  if (!reduce && !isMobile) {
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width/2)*0.28}px, ${(e.clientY - r.top - r.height/2)*0.28}px)`;
      });
      btn.addEventListener('mouseleave', () => btn.style.transform = '');
    });
  }

  // Scroll reveals
  if (!reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.service-card').forEach((el, i) => { el.style.transitionDelay = (i*90)+'ms'; io.observe(el); });
    document.querySelectorAll('.avatar-card').forEach((el, i) => { el.style.transitionDelay = (i*100)+'ms'; io.observe(el); });
    const aboutImg = document.getElementById('about-img'); if (aboutImg) io.observe(aboutImg);
    const aboutFeats = document.getElementById('about-features'); if (aboutFeats) io.observe(aboutFeats);
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      const fio = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { contactForm.classList.add('is-visible'); fio.disconnect(); } }), { threshold: 0.25 });
      fio.observe(contactForm);
    }
    // Hero parallax
    if (!isMobile) {
      const bg = document.getElementById('hero-bg');
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (ticking) return;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < window.innerHeight && bg) bg.style.transform = `translateY(${y*0.28}px) scale(1.08)`;
          ticking = false;
        });
        ticking = true;
      }, { passive: true });
    }
  } else {
    document.querySelectorAll('.service-card, .avatar-card, .about-img, .about-features').forEach(el => el.classList.add('is-visible'));
    document.getElementById('contact-form')?.classList.add('is-visible');
  }

  function esc(s) { return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
})();