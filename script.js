/* ===== ATLASMEDICA — site public 2.0 ===== */

/* Nav scrolled + burger */
function initNav(){
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  if(!nav || !burger || !links) return;

  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  const close = () => {
    burger.classList.remove('open');
    links.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const open = !links.classList.contains('open');
    burger.classList.toggle('open', open);
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  addEventListener('keydown', (e) => { if(e.key === 'Escape') close(); });
}

/* Scroll reveal */
function initReveal(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
  els.forEach(el => io.observe(el));
}

/* Animated counters */
function initCounters(){
  const nums = document.querySelectorAll('.stat-num');
  if(!nums.length) return;
  const run = (el) => {
    const target = +el.dataset.count || 0;
    const suffix = el.dataset.suffix || '';
    const dur = 1400;
    const t0 = performance.now();
    (function tick(now){
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if(p < 1) requestAnimationFrame(tick);
    })(t0);
  };
  if(!('IntersectionObserver' in window)){
    nums.forEach(run);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      io.unobserve(e.target);
      run(e.target);
    });
  }, {threshold:.4});
  nums.forEach(n => io.observe(n));
}

/* WhatsApp links */
function initWhatsapp(){
  const msg = 'Bonjour ATLASMEDICA, je souhaite des informations sur vos offres.';
  const href = 'https://wa.me/213770871850?text=' + encodeURIComponent(msg);
  ['waBtn', 'waInline', 'formWa'].forEach((id) => {
    const el = document.getElementById(id);
    if(el){ el.href = href; el.target = '_blank'; el.rel = 'noopener'; }
  });
}

/* Gallery lightbox */
function initLightbox(){
  const dlg = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  if(!dlg || !img) return;

  const shots = document.querySelectorAll('.shot[data-full]');

  shots.forEach(shot => {
    shot.addEventListener('click', () => {
      img.src = shot.dataset.full;
      img.alt = (shot.querySelector('img') || {}).alt || '';
      if(cap) cap.textContent = shot.dataset.caption || '';
      if(typeof dlg.showModal === 'function') dlg.showModal();
      else dlg.setAttribute('open', '');
    });
  });

  const close = () => {
    if(typeof dlg.close === 'function') dlg.close();
    else dlg.removeAttribute('open');
    img.src = '';
  };

  if(closeBtn) closeBtn.addEventListener('click', close);
  dlg.addEventListener('click', (e) => { if(e.target === dlg) close(); });
}

/* Contact form — FormSubmit (CORS ouvert, sans dependance a l'hebergeur).
   Le jour ou un script maison est disponible (PHP sur un .dz/.com, API),
   il suffit de remplacer FORM_ENDPOINT par son URL : le reste ne change pas. */
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/atlasmedica.group@gmail.com';

function initForm(){
  const form = document.getElementById('contactForm');
  const ok = document.getElementById('formOk');
  const err = document.getElementById('formErr');
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Champ piege rempli par les robots : on ignore la soumission.
    const honey = form.querySelector('[name="_honey"]');
    if(honey && honey.value) return;

    const btn = form.querySelector('button[type=submit]');
    const original = btn.textContent;
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;
    if(ok) ok.classList.remove('show');
    if(err) err.classList.remove('show');

    const payload = Object.assign(Object.fromEntries(new FormData(form).entries()), {
      _subject: 'Nouvelle demande - site AtlasMedica',
      _template: 'table',
      _captcha: 'false',
      _honey: ''
    });

    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 15000);
      const resp = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        signal: ctrl.signal
      });
      clearTimeout(timer);
      const result = await resp.json().catch(() => ({}));
      if(!resp.ok || String(result.success) === 'false'){
        throw new Error(result.message || 'Erreur serveur');
      }
      btn.textContent = '✓ Message envoyé !';
      if(ok) ok.classList.add('show');
      form.reset();
    } catch(error) {
      btn.textContent = '✗ Échec. Réessayez.';
      if(err) err.classList.add('show');
    }

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      if(ok) ok.classList.remove('show');
      if(err) err.classList.remove('show');
    }, 6000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav(); initReveal(); initCounters(); initWhatsapp(); initLightbox(); initForm();
});
