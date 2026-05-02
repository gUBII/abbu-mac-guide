/* nav.js — Keyboard navigation and progress dots within a slide deck. */

(function () {
  'use strict';

  function getNavLinks() {
    return {
      prev: document.querySelector('a[rel="prev"]'),
      next: document.querySelector('a[rel="next"]'),
    };
  }

  function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // Ignore when typing in form fields
      const tag = (e.target && e.target.tagName) || '';
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;

      const { prev, next } = getNavLinks();

      if ((e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') && next) {
        e.preventDefault();
        next.click();
      } else if ((e.key === 'ArrowLeft' || e.key === 'PageUp') && prev) {
        e.preventDefault();
        prev.click();
      } else if (e.key === 'Escape') {
        const home = document.querySelector('a[data-role="home"]');
        if (home) home.click();
      }
    });
  }

  function initProgressDots() {
    const container = document.querySelector('.progress[data-auto]');
    if (!container) return;

    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;

    const total = parseInt(container.dataset.total || String(slides.length), 10);
    const current = parseInt(container.dataset.current || '1', 10);

    container.innerHTML = '';
    for (let i = 1; i <= total; i++) {
      const dot = document.createElement('span');
      dot.className = 'progress-dot';
      dot.setAttribute('aria-label', `Slide ${i} of ${total}`);
      if (i === current) dot.dataset.active = 'true';
      else if (i < current) dot.dataset.completed = 'true';
      container.appendChild(dot);
    }
  }

  function boot() {
    initKeyboardNav();
    initProgressDots();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
