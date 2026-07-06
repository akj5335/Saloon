// Custom JS extracted from beauty-atelier-salon (2).html

// nav shrink
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });
}

// mobile menu
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
const menuClose = document.getElementById('menu-close');

if (menuBtn && menu && menuClose) {
  menuBtn.addEventListener('click', () => { menu.classList.remove('hidden'); menu.classList.add('flex'); });
  const closeMenu = () => { menu.classList.add('hidden'); menu.classList.remove('flex'); };
  menuClose.addEventListener('click', closeMenu);
  menu.querySelectorAll('.menu-link').forEach(a => a.addEventListener('click', closeMenu));
}

// scroll reveal
const revealEls = Array.from(document.querySelectorAll('.reveal, .reveal-l, .reveal-r'));
if (revealEls.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => io.observe(el));
}

// animated counters
const counterEls = Array.from(document.querySelectorAll('[data-count]'));
if (counterEls.length) {
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      counterIO.unobserve(e.target);
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0');
      const dur = 1600;
      const start = performance.now();

      const tick = now => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (p < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });

  counterEls.forEach(el => counterIO.observe(el));
}

// open / closed status based on local time (opens 9:30 AM, assume closes 8 PM)
(function () {
  const el = document.getElementById('open-status');
  if (!el) return;

  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  if (mins >= 570 && mins < 1200) {
    el.textContent = 'Open now \u00b7 closes 8:00 PM';
  } else if (mins < 570) {
    el.textContent = 'Opens today at 9:30 AM';
  } else {
    el.textContent = 'Closed \u00b7 opens tomorrow at 9:30 AM';
  }
})();

// booking form (prototype behaviour)
const submitBtn = document.getElementById('bk-submit');
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const name = document.getElementById('bk-name')?.value.trim();
    const phone = document.getElementById('bk-phone')?.value.trim();
    const success = document.getElementById('bk-success');

    if (!name || !phone) {
      [['bk-name', name], ['bk-phone', phone]].forEach(([id, val]) => {
        if (!val) {
          const input = document.getElementById(id);
          if (!input) return;
          input.classList.add('ring-2', 'ring-red-300', 'border-red-300');
          setTimeout(() => input.classList.remove('ring-2', 'ring-red-300', 'border-red-300'), 1800);
        }
      });
      return;
    }

    if (success) {
      success.classList.remove('hidden');
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

// default booking date = today
document.addEventListener('DOMContentLoaded', () => {
  const dateEl = document.getElementById('bk-date');
  if (dateEl) dateEl.valueAsDate = new Date();
});

