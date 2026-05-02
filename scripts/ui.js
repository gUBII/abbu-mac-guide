/* ui.js — Bengali toggle, font size, module progress.
   No framework. Works on every page that includes a .toolbar. */

(function () {
  'use strict';

  const STORAGE = {
    bn: 'dt.bnVisible',
    font: 'dt.fontScale',
    progress: 'dt.moduleProgress',
  };

  const FONT_STEPS = [0.9, 1.0, 1.1, 1.25, 1.4];

  // ---------- Bengali toggle ----------
  function applyBengali(state) {
    document.body.dataset.bn = state ? 'visible' : 'hidden';
    const btn = document.querySelector('[data-action="toggle-bn"]');
    if (btn) {
      btn.setAttribute('aria-pressed', String(state));
      btn.textContent = state ? 'বাংলা ✓' : 'বাংলা';
    }
  }

  function initBengali() {
    const stored = localStorage.getItem(STORAGE.bn);
    const visible = stored === null ? true : stored === 'true';
    applyBengali(visible);

    const btn = document.querySelector('[data-action="toggle-bn"]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = document.body.dataset.bn !== 'visible';
      localStorage.setItem(STORAGE.bn, String(next));
      applyBengali(next);
    });
  }

  // ---------- Font size ----------
  function applyFont(scale) {
    document.documentElement.style.setProperty('--font-scale', String(scale));
    const label = document.querySelector('[data-role="font-label"]');
    if (label) label.textContent = `${Math.round(scale * 100)}%`;
  }

  function initFont() {
    const stored = parseFloat(localStorage.getItem(STORAGE.font) || '1');
    let current = FONT_STEPS.includes(stored) ? stored : 1;
    applyFont(current);

    document.querySelectorAll('[data-action="font-up"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = FONT_STEPS.indexOf(current);
        if (idx < FONT_STEPS.length - 1) {
          current = FONT_STEPS[idx + 1];
          localStorage.setItem(STORAGE.font, String(current));
          applyFont(current);
        }
      });
    });

    document.querySelectorAll('[data-action="font-down"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = FONT_STEPS.indexOf(current);
        if (idx > 0) {
          current = FONT_STEPS[idx - 1];
          localStorage.setItem(STORAGE.font, String(current));
          applyFont(current);
        }
      });
    });
  }

  // ---------- Print button ----------
  function initPrint() {
    document.querySelectorAll('[data-action="print"]').forEach((btn) => {
      btn.addEventListener('click', () => window.print());
    });
  }

  // ---------- Module progress (hub page) ----------
  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE.progress) || '{}');
    } catch {
      return {};
    }
  }

  function setProgress(p) {
    localStorage.setItem(STORAGE.progress, JSON.stringify(p));
  }

  function initProgress() {
    const progress = getProgress();
    document.querySelectorAll('.module-card[data-module]').forEach((card) => {
      const id = card.dataset.module;
      if (progress[id] === 'completed') {
        card.dataset.status = 'completed';
      }
    });

    // Allow current page to mark itself complete
    document.querySelectorAll('[data-action="mark-complete"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.module;
        if (!id) return;
        const p = getProgress();
        p[id] = 'completed';
        setProgress(p);
        btn.textContent = '✓ Completed';
        btn.disabled = true;
      });
    });
  }

  // ---------- Quiz reveal ----------
  function initQuizCards() {
    document.querySelectorAll('.quiz-card').forEach((card) => {
      const inputs = card.querySelectorAll('input[type="radio"]');
      const submit = card.querySelector('[data-action="check-answer"]');
      if (!submit) return;
      submit.addEventListener('click', () => {
        const selected = card.querySelector('input[type="radio"]:checked');
        if (!selected) return;
        card.dataset.revealed = 'true';
        const correct = card.dataset.correct;
        const reveal = card.querySelector('.quiz-reveal');
        if (!reveal) return;
        if (selected.value === correct) {
          reveal.textContent = '✓ Correct! ' + (reveal.dataset.right || '');
          reveal.style.background = 'var(--green-tint)';
          reveal.style.borderLeftColor = 'var(--green-go)';
        } else {
          reveal.textContent =
            '✕ Not quite. ' + (reveal.dataset.wrong || `The answer is "${correct}".`);
          reveal.style.background = 'var(--red-tint)';
          reveal.style.borderLeftColor = 'var(--red-stop)';
        }
      });
    });
  }

  // ---------- Boot ----------
  function boot() {
    initBengali();
    initFont();
    initPrint();
    initProgress();
    initQuizCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
