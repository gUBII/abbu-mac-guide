# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Goal

A self-contained HTML instruction manual teaching a Windows-to-MacBook-M2 transition for a beginner audience (the user's father). Pages are designed to read beautifully on screen AND print cleanly to PDF. No build step — every file opens directly in a browser.

## Audience Profile

- **Real user:** Lifelong Windows user, never used macOS
- **Knows:** opening apps, downloading files, basic typing
- **Confused by:** where downloaded files actually live, ⌘ vs Ctrl, scroll direction, Mac terminology
- **Native language:** English with Bengali as mother tongue
- **Phone:** Android (Note 20 → Galaxy S26 Ultra) — NOT iPhone, so no Apple Continuity / AirDrop content
- **Eyesight:** older — body text is 19px, never smaller. Generous spacing. High contrast.

## Architecture

**Zero build.** Pure HTML + CSS + vanilla JS. Open any file in a browser, it works. Every page is self-contained but links to a small set of shared stylesheets and scripts.

```
dadtraining/
├── CLAUDE.md                     # This file
├── index.html                    # Hub: learning path with progress
├── styles/
│   ├── tokens.css                # OKLCH palette, type scale, spacing
│   ├── typography.css            # Font stacks (serif, sans, mono, Bengali)
│   ├── slides.css                # Slide layout, step numbers, placeholders
│   ├── components.css            # Bengali pill, recovery rail, quiz cards
│   └── print.css                 # PDF page breaks, A4 portrait
├── scripts/
│   ├── ui.js                     # Bengali toggle, font-size, progress
│   └── nav.js                    # Keyboard arrows, prev/next
├── reference/                    # Always-available cross-module docs
│   ├── rosetta.html              # Windows ↔ Mac translation table
│   ├── cheat-sheet.html          # One-page printable hotkey reference
│   ├── glossary.html             # All Mac terms + Bengali definitions
│   └── recovery.html             # "Panic button" page — what to do if X
├── module-1/
│   ├── index.html                # Module landing + checklist
│   ├── 01-welcome.html           # Mental model bridge (5 slides)
│   ├── 02-filesystem.html        # Finder geography (6 slides)
│   ├── 03-workflow.html          # WhatsApp → ATLAS → back (10 slides)
│   ├── 04-recovery.html          # Undo, lost file, safety (4 slides)
│   ├── 05-quiz.html              # Retrieval practice
│   └── assets/                   # Screenshots filled progressively
├── module-2-to-7/                # Planned, not built yet
└── video-scripts/
    └── module-1.md               # Per-slide ~30s narration
```

## Design Tokens (authoritative — change here, propagates everywhere)

All colors in OKLCH for perceptual uniformity. Defined in `styles/tokens.css`:

```css
--paper:        oklch(97% 0.012 85);   /* warm cream background */
--ink:          oklch(20% 0.012 280);  /* soft black text */
--ink-soft:     oklch(40% 0.015 280);  /* secondary text */
--saffron:      oklch(72% 0.16 65);    /* primary accent */
--saffron-deep: oklch(55% 0.18 50);    /* hover/active */
--teal-bn:      oklch(55% 0.08 200);   /* Bengali pill */
--red-stop:     oklch(50% 0.18 25);    /* recovery/danger only */
--green-go:     oklch(48% 0.12 145);   /* success / "you got it" */
--rule:         oklch(88% 0.005 85);   /* subtle borders */
```

Typography:
- **Display/headings:** Charter, Georgia, serif (editorial gravity)
- **Body:** -apple-system, Inter, system-ui (high readability)
- **Mono/keys:** SF Mono, JetBrains Mono (for ⌘+Space style shortcuts)
- **Bengali:** Noto Serif Bengali (loaded via Google Fonts)

Scale (large by design — older eyes):
- Body 19px / 1.6 line-height
- h1 56px / 1.05
- h2 36px / 1.15
- Step number 80px (architectural element, not inline)

Layout:
- Max content width 720px
- One concept per slide — no exceptions
- Generous vertical rhythm (32px between blocks)

## Slide Template (every slide MUST follow this structure)

```html
<section class="slide" id="slide-N">
  <div class="slide-header">
    <span class="slide-counter">N / TOTAL</span>
    <span class="slide-module">Module 1 · Part B</span>
  </div>

  <div class="slide-step">
    <span class="step-number">07</span>
    <h1 class="slide-title">The slide title — one clear idea</h1>
  </div>

  <p class="slide-outcome">By the end of this slide, you will know...</p>

  <div class="slide-body">
    <!-- Concept / Action / Recovery content -->
  </div>

  <!-- Optional Bengali annotation (only if criteria met — see policy below) -->
  <aside class="bn-pill" lang="bn">
    Bengali script reinforcing the critical step
  </aside>

  <!-- Image placeholder if needed -->
  <figure class="placeholder" data-needed id="M1-S07-IMG">
    <span>Screenshot needed: Finder window, Downloads selected</span>
  </figure>

  <nav class="slide-nav">
    <a href="?prev" rel="prev">← Previous</a>
    <a href="?next" rel="next">Next →</a>
  </nav>
</section>
```

## Bengali Annotation Policy (strict — do not over-add)

Add Bengali ONLY when one of these triggers fires:
1. **Windows habit will fail** (Ctrl→⌘, right-click, scroll direction)
2. **File goes somewhere unexpected** (Downloads location, Save vs Save As)
3. **Misclick destroys data** (Empty Trash, Delete vs Move to Trash)
4. **Privacy/safety warning** (don't paste passwords/IDs into LLMs)
5. **Recovery commands** (Force Quit, Undo)

Format: `<aside class="bn-pill" lang="bn">…</aside>` — small teal pill below the English instruction. Bengali REINFORCES, never REPLACES, English. Estimated count per module: 6–10 max.

## Placeholder Pattern (how to ask for screenshots)

Every image slot uses this exact structure:

```html
<figure class="placeholder" data-needed id="M{N}-S{NN}-IMG{X}">
  <span class="placeholder-label">
    Screenshot needed: [precise description]
  </span>
  <span class="placeholder-aspect">aspect: 16:10</span>
</figure>
```

After building any HTML file, list every `data-needed` placeholder and its description so the user can supply screenshots one by one. The user fills `assets/` and replaces `<figure class="placeholder">` with `<figure><img src="..."></figure>`.

## Print / PDF Strategy

- `styles/print.css` is media-scoped (`@media print`)
- A4 portrait, 20mm margins
- `page-break-after: always` on every `.slide`
- Bengali pills, step numbers, and recovery rails all survive
- Top-right "Print → PDF" button on every page (calls `window.print()`)
- One slide already teaches Print → Save as PDF on Mac (meta-lesson)

## Interactive Features (vanilla JS only)

| Feature | Source | Storage |
|---------|--------|---------|
| Bengali toggle | `scripts/ui.js` | `localStorage.bnVisible` |
| Font size A− / A+ | `scripts/ui.js` | `localStorage.fontScale` |
| Progress dots within module | `scripts/nav.js` | derived from DOM |
| Module completion tracking | `scripts/ui.js` | `localStorage.moduleProgress` |
| Keyboard nav (←/→/Space/Esc) | `scripts/nav.js` | n/a |

No framework. No bundler. ~150 lines total JS budget.

## Accessibility Floor (non-negotiable)

- Body text never below 19px
- Color contrast WCAG AA minimum (paper ↔ ink is ~13:1)
- Every interactive element keyboard-reachable
- `lang="bn"` on Bengali blocks for screen reader handoff
- All placeholders/images get descriptive `alt` or aria-label when filled
- Focus rings visible (saffron outline)
- `prefers-reduced-motion` respected — no decorative motion

## File Size Policy

Hard limit: **800 lines per file**. If a slide deck approaches that, split into a second HTML file. Per global rules.

## Anti-Template Discipline

This is NOT a default Tailwind landing page. NOT gray cards on white. The visual direction is **warm editorial instruction manual** — paper-cream background, deep saffron accents, serif headlines, monospace for shortcuts, generous whitespace. If something looks like a generic SaaS template, it's wrong for this project.

## Module Roadmap (current state)

| # | Title | Status |
|---|-------|--------|
| Reference | Rosetta / Cheat Sheet / Glossary / Recovery | **Build first** |
| 1 | Filesystem + WhatsApp ↔ ATLAS workflow | **Building now** |
| 2 | Universal Moves (copy/paste/save/find/undo/force-quit) | Planned |
| 3 | Documents pipeline (Word/Excel/PPT → Google Docs → PDF) | Planned |
| 4 | Email workflows (Gmail browser + Mail app) | Planned |
| 5 | Advanced LLM (multi-paste, sheets formatting) | Planned |
| 6 | Phone ↔ Mac (Android: WhatsApp Web, Drive, USB, Snapdrop) | Planned |
| 7 | Safety Net (Time Machine, passwords, phishing recognition) | Planned |

## Build Order Within a Module

1. Reference docs first (Module 1 slides link into them)
2. Module landing page (`module-N/index.html`)
3. Slide files in numeric order
4. Quiz/recap
5. Video script in `video-scripts/`
6. List outstanding placeholder IDs to user
7. Pause for user review before next module

## Hard Rules (do not violate)

- **Never use commit attribution trailers** — see global `~/.claude/CLAUDE.md`
- **Never animate layout properties** (width/height/margin) — only `transform`/`opacity`/`clip-path`
- **Never inline-style colors or sizes** — always reference design tokens
- **Never hardcode Bengali into a slide without verification** — user reviews before final
- **Never assume iPhone features work** — Dad uses Android only
- **Never over-add Bengali pills** — they lose meaning if everywhere
