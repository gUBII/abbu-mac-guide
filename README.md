# Abbu's Mac Guide

A zero-dependency, self-contained HTML instruction manual for Windows-to-MacBook transitions. Built for beginners — specifically for someone who knows Windows but has never touched macOS.

**Open any `.html` file in a browser. No install. No build step. Works offline.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML](https://img.shields.io/badge/built%20with-HTML%20%2F%20CSS%20%2F%20Vanilla%20JS-orange)
![No dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)

---

## What's inside

| Section | Contents |
|---------|----------|
| **Module 1** | Filesystem orientation + full WhatsApp → ATLAS (ChatGPT) → Email/WhatsApp workflow |
| **Rosetta Stone** | Every Windows term mapped to its Mac equivalent |
| **Cheat Sheet** | One-page printable shortcut reference |
| **Glossary** | Plain-English definitions for every Mac word |
| **Recovery Card** | "Something went wrong" panic page with step-by-step fixes |

Modules 2–7 are planned (documents pipeline, email workflows, phone-to-Mac sync, LLM use, safety net).

---

## Features

- **Bengali annotations** — critical steps annotated in Bangladeshi Bangla, toggle-able per session
- **Font size controls** — A− / A+ buttons, persisted in localStorage
- **Keyboard navigation** — ← / → arrow keys move between slides
- **Quiz** — retrieval-practice questions at the end of each module
- **Print to PDF** — one-click, A4 portrait, page-breaks per slide
- **Module progress tracking** — completion state persisted in localStorage
- **No framework, no bundler** — three small vanilla JS files (~150 lines total)

---

## Structure

```
dadtraining/
├── index.html              # Hub: learning path
├── styles/                 # Design system (OKLCH tokens, typography, slides, print)
├── scripts/                # ui.js (Bengali toggle, font, progress) + nav.js (keyboard)
├── reference/              # Rosetta, Cheat Sheet, Glossary, Recovery Card
├── module-1/               # 25 slides + quiz
│   └── assets/             # Screenshots (filled progressively)
└── video-scripts/          # Per-slide narration scripts
```

---

## Design

Warm editorial style — paper-cream background, saffron accent, Charter serif headings, large body text (19px+). Intentionally avoids default Tailwind/shadcn aesthetics.

Color system uses OKLCH for perceptual uniformity. All tokens in `styles/tokens.css`.

---

## Usage

Clone and open:

```bash
git clone https://github.com/gUBII/abbu-mac-guide.git
cd abbu-mac-guide
open index.html
```

Or just download the ZIP and open `index.html`.

---

## Personalising

1. Replace the name **Swapon** / **Abbu** with your own family member's name (grep for `Swapon`)
2. Swap out screenshot placeholders in `module-1/assets/` with real screenshots
3. Adjust Bengali pills or swap language in `styles/components.css` (`.bn-pill`)
4. Extend with new modules following the slide template in `CLAUDE.md`

---

## Screenshots pending

Module 1 has 17 placeholder slots for real screenshots (`data-needed` attribute). See `module-1/assets/README.md` for the full list and descriptions.

---

## License

MIT — see [LICENSE](LICENSE).
