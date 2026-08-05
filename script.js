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
const revealEls = document.querySelectorAll('.feature-card, .offer-card');
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

// ===== FORM SUBMIT (WhatsApp) =====
// Le formulaire construit un message et l'ouvre pre-rempli dans WhatsApp
// vers le numero de l'equipe. Aucune cle API, fonctionne sur tout hebergement.
const WHATSAPP_NUMBER = '213770871850';

const contactForm = document.getElementById('contactForm');
const offreSelect = document.getElementById('offreSelect');
const formStatus = document.getElementById('formStatus');

// Pré-sélectionne l'offre quand le client clique sur "Choisir {OFFRE}"
document.querySelectorAll('.offer-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const offer = btn.closest('.offer-card')?.querySelector('h3')?.textContent.trim();
    if (offer && offreSelect) {
      offreSelect.value = offer;
    }
  });
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.textContent = '';
  formStatus.style.color = '';

  const nom = document.getElementById('contactNom').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const tel = document.getElementById('contactTel').value.trim();
  const offre = offreSelect.value;
  const message = document.getElementById('contactMsg').value.trim();

  if (!offre) {
    formStatus.textContent = 'Veuillez choisir une offre.';
    formStatus.style.color = '#fca5a5';
    return;
  }

  let text = `Bonjour ATLASMEDICA,\n`;
  text += `Je souhaite des informations pour l'offre *${offre}*.\n\n`;
  text += `Nom : ${nom}\n`;
  text += `Email : ${email}\n`;
  if (tel) text += `Téléphone : ${tel}\n`;
  if (message) text += `\nMessage : ${message}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  formStatus.textContent = 'Ouverture de WhatsApp…';
  formStatus.style.color = '#86efac';
  window.open(url, '_blank');
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
