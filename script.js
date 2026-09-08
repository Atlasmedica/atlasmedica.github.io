/* ===== ATLASMEDICA — Landing v2 ===== */

/* Nav scrolled + burger */
function initNav(){
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), {passive:true});
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    links.classList.remove('open');
  }));
}

/* Scroll reveal */
function initReveal(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12});
  els.forEach(el => io.observe(el));
}

/* Animated counters */
function initCounters(){
  const nums = document.querySelectorAll('.stat-num');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const el = e.target;
      io.unobserve(el);
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const dur = 1400; const t0 = performance.now();
      (function tick(now){
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if(p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, {threshold:.4});
  nums.forEach(n => io.observe(n));
}

/* WhatsApp link fill */
function initWhatsapp(){
  const btn = document.getElementById('waBtn');
  const msg = 'Bonjour ATLASMEDICA, je souhaite des informations sur vos offres.';
  btn.href = 'https://wa.me/213770871850?text=' + encodeURIComponent(msg);
}

/* Contact form (Netlify Forms) */
function initForm(){
  const form = document.getElementById('contactForm');
  const ok = document.getElementById('formOk');
  if(!form || !ok) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const original = btn.textContent;
    btn.textContent = 'Envoi en cours…';
    btn.style.pointerEvents = 'none';
    try {
      const resp = await fetch('https://atlasmedica.netlify.app/', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if(!resp.ok) throw new Error('Erreur serveur');
      btn.textContent = '✓ Message envoyé !';
      form.reset();
    } catch(err) {
      btn.textContent = '✗ Échec. Réessayez.';
    }
    setTimeout(() => {
      btn.textContent = original;
      btn.style.pointerEvents = '';
    }, 3000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav(); initReveal(); initCounters(); initWhatsapp(); initForm();
});