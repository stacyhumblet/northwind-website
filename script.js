// ============================================================
//  Northwind Consulting™ - script.js
// ============================================================
// Copyright © 2026 Northwind Consulting™. All rights reserved.
// Unauthorized copying, reverse engineering, or redistribution
// of this software is strictly prohibited.

// ---------- Footer year ----------
(function () {
  var y = new Date().getFullYear();
  document.querySelectorAll('#year').forEach(function (el) { el.textContent = y; });
})();

// ---------- Mobile nav toggle ----------
function toggleNav() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('open');
}

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// Close mobile nav when clicking outside
document.addEventListener('click', e => {
  const nav    = document.getElementById('navLinks');
  const toggle = document.querySelector('.nav-toggle');
  if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// ---------- Contact form ----------
function handleSubmit(e) {
  e.preventDefault();

  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn     = form.querySelector('button[type="submit"]');

  // Basic validation
  const name    = form.querySelector('#name').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled = true;

  const data = new FormData(form);
  const json = Object.fromEntries(data.entries());

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(json),
  })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        form.querySelectorAll('input:not([type=hidden]), textarea').forEach(el => el.value = '');
        success.classList.add('visible');
        setTimeout(() => success.classList.remove('visible'), 6000);
      } else {
        alert('Something went wrong - please try again.');
      }
      btn.textContent = 'Send Message';
      btn.disabled = false;
    })
    .catch(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      alert('Something went wrong - please try again.');
    });
}

// ---------- Scroll-in animation (optional enhancement) ----------
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.card, .pillar, .outcome-item, .philosophy-card, .tech-tag').forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    observer.observe(el);
  });
}
