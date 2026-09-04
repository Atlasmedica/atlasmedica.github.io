// ===== NAVBAR SCROLL EFFECT + ACTIVE LINK =====
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 100;
    if (window.scrollY >= top) current = s.id;
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.feature-card, .offer-card, .gallery-item, .video-wrap');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay) || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => observer.observe(el));

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item.active').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== FORM SUBMIT (Netlify Forms) =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Envoi en cours…';
  btn.style.pointerEvents = 'none';
  try {
    const resp = await fetch('https://atlasmedica.netlify.app/', {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });
    if (resp.ok) {
      btn.textContent = '✓ Message envoyé !';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = original;
        btn.style.pointerEvents = '';
      }, 3000);
    } else {
      throw new Error('Erreur serveur');
    }
  } catch (err) {
    btn.textContent = '✗ Échec. Réessayez.';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.pointerEvents = '';
    }, 3000);
  }
});

// ===== COUNTER ANIMATION =====
const stats = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseFloat(text);
      const suffix = text.replace(/[\d.]/g, '');
      if (isNaN(num)) return;
      const duration = 1500;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * num) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
stats.forEach(s => statObserver.observe(s));

// ===== LIGHTBOX (GALERIE) =====
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="Fermer">&times;</button>
  <img alt="">
  <div class="lightbox-caption"></div>
`;
document.body.appendChild(lightbox);
const lbImg = lightbox.querySelector('img');
const lbCap = lightbox.querySelector('.lightbox-caption');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    lbImg.src = item.href;
    lbCap.textContent = item.dataset.caption || '';
    lightbox.classList.add('open');
  });
});
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
    lightbox.classList.remove('open');
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('open');
});
