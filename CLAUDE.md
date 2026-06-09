# CLAUDE.md — Giulia Bedini · Portfolio (Astro)

Context and conventions for Claude Code working on this repository. Read this before
making changes. The goal is to **rebuild the existing static HTML portfolio as a clean,
fast Astro site** while preserving its visual identity, content, and interactions.

---

## 1. Project overview

- **Owner:** Giulia Bedini — UX & UI product designer, based in Lyon, France.
- **Purpose:** Personal portfolio to apply for an **alternance** (apprenticeship). It must
  feel calm, editorial, and senior — the site itself is a work sample.
- **Languages:** Trilingual — **English, French, Italian** (`en`, `fr`, `it`).
- **Content:** A home page (hero → About → Selected work → Contact) plus **three case
  studies**: `move-score`, `kinap`, `dimagin`. Each case study embeds the real,
  interactive prototype of the project.
- **Design direction:** "Editorial Atelier" — paper background, serif display type
  (Fraunces), mono labels (Space Mono), generous whitespace, terracotta accent, slow
  scroll reveals, masked text reveals, a custom dot cursor, alternating (zigzag) project
  layout.

### Source of truth
The existing self-contained static files are the **visual and behavioural reference**.
Match them. Do not redesign without being asked.
- `reference/giulia-bedini-portfolio.html` — home page
- `reference/move-score-case-study.html`, `reference/kinap-case-study.html`,
  `reference/dimagin-case-study.html` — case studies
- `reference/*-screens/` — the standalone prototype HTML embedded inside the case studies

> Place the old static files under `reference/` (read-only) and port from them. When in
> doubt about spacing, type, colour, or copy, open the reference file rather than guessing.

---

## 2. Tech stack & principles

- **Astro v6**, static output (SSG — no adapter needed). No React/Vue/Svelte unless a
  concrete need appears; prefer `.astro` components + small vanilla `<script>` islands.
- **No CSS framework.** Hand-written CSS with custom properties (design tokens). One
  `global.css`. Component-scoped styles via `<style>` in `.astro` files.
- **Minimal JavaScript.** Interactions are progressive enhancements; the page must be
  fully readable and navigable with JS disabled.
- **Performance:** ship near-zero JS, optimise images with `astro:assets`, lazy-load the
  prototype iframes, self-host or preconnect fonts.
- **Accessibility:** semantic HTML, visible focus states, `aria-current` on the active nav
  item, real `alt` text, sufficient contrast, and **respect `prefers-reduced-motion`**
  (disable reveals / parallax / custom cursor when set).
- **Aesthetics:** avoid the generic "AI website" look. Keep the editorial restraint of the
  reference.

---

## 3. Commands

```bash
npm install            # install deps
npm run dev            # local dev server (http://localhost:4321)
npm run build          # production build → ./dist
npm run preview        # preview the built site locally
npm run astro -- check # type-check .astro files (run before commits)
```

---

## 4. Proposed structure

```
.
├── CLAUDE.md
├── astro.config.mjs
├── reference/                      # the original static HTML (do not ship; port from it)
├── public/
│   ├── prototypes/                 # self-contained prototype HTML, embedded via <iframe src>
│   │   ├── move-score/
│   │   ├── kinap/
│   │   └── dimagin/
│   └── favicon / og images
└── src/
    ├── assets/                     # images optimised through astro:assets (thumbnails, hero)
    ├── styles/global.css           # design tokens + base styles
    ├── i18n/
    │   ├── ui.ts                   # translation dictionary (all UI strings)
    │   └── utils.ts                # getLang(), t(), localized URL helpers
    ├── data/
    │   └── projects.ts             # project metadata + case-study copy (typed)
    ├── layouts/
    │   ├── BaseLayout.astro        # <head>, fonts, global.css, Nav, Footer, Cursor
    │   └── CaseStudyLayout.astro   # shared case-study chrome
    ├── components/
    │   ├── Nav.astro               # logo, section links (scroll-spy), LangSwitcher
    │   ├── LangSwitcher.astro
    │   ├── Hero.astro
    │   ├── About.astro
    │   ├── WorkList.astro          # the 3 projects, zigzag
    │   ├── ProjectCard.astro       # image frame (clickable) + meta + "View case study"
    │   ├── PrototypeEmbed.astro     # phone-mock OR browser-frame wrapper around an iframe
    │   ├── DesignedMoments.astro
    │   ├── NextProject.astro
    │   ├── Footer.astro
    │   └── Reveal.astro            # optional wrapper for scroll-reveal elements
    └── pages/
        ├── index.astro             # EN home (default locale, no prefix)
        ├── work/[slug].astro       # EN case studies
        ├── fr/index.astro, fr/work/[slug].astro
        └── it/index.astro, it/work/[slug].astro
```

Case-study pages should be generated from `projects.ts` via `getStaticPaths()` rather than
hand-written per project.

---

## 5. Routing & i18n

Use Astro's **built-in i18n routing**. Default locale served at the root; others prefixed.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://giulia-bedini.example',          // update to the real domain
  i18n: {
    locales: ['en', 'fr', 'it'],
    defaultLocale: 'en',                            // EN at /, FR at /fr/, IT at /it/
    routing: { prefixDefaultLocale: false },
  },
});
```

- All UI copy lives in `src/i18n/ui.ts` as a dictionary keyed by stable IDs. **Reuse the
  exact keys already present in the reference files** (e.g. `nav_work`, `nav_about`,
  `nav_contact`, `hero_label`, `hero_l1`, `hero_l2`, `hero_intro`, `about_title`,
  `about_big`, `meta_*`, `contact_title`, `contact_cta`, case-study keys `s_overview`,
  `overview_lead`, `mo1_t`, `next_label`, etc.). The reference `I18N` object is the
  complete source for EN/FR/IT strings — copy it verbatim.
- Provide a `t(lang, key)` helper and a `getRelativeLocaleUrl`-based helper for the
  language switcher so it links to the **same page in the other locale**.
- The current hero headline (replaces the old "Selected work"):
  - EN `UX & UI design for your digital products.`
  - FR `Conception d’expériences digitales.`
  - IT `Design di esperienze digitali.`
  - Rendered as two display lines: roman first line, *italic* second line, ending with a
    terracotta accent dot.

> A simpler client-side toggle (one set of pages, swap `innerHTML` from a dictionary) is
> acceptable if routing proves heavy — but per-locale routes give clean URLs, correct
> `<html lang>`, and `hreflang`. Prefer routing unless told otherwise.

---

## 6. Design tokens

Put these in `:root` in `global.css`. They are taken directly from the reference.

```css
:root {
  --paper:  #f4f1ea;   /* page background */
  --ink:    #1a1813;   /* primary text */
  --muted:  #6b6354;   /* secondary text */
  --line:   #d8d2c4;   /* hairlines / borders */
  --num:    #cfc7b6;   /* large index numerals */
  --vert:   #b3aa97;   /* faint vertical captions / inactive */
  --accent: #b8593a;   /* terracotta — dots, emphasis */
  --ease:   cubic-bezier(.22, 1, .36, 1);
}
```

**Typography**
- Display / headings: **Fraunces** (serif). Light-ish weight (~330) with true *italics*.
- Body: **Archivo** (weights 300/400/500/600).
- Labels, meta, captions, numbers: **Space Mono** (400/700), uppercase, wide letter-spacing.
- Hero `h1`: `font-size: clamp(38px, 6.6vw, 98px); line-height:.9; letter-spacing:-.03em;`
- Load via `@fontsource` packages (preferred for self-hosting) or Google Fonts with
  `preconnect`. Subset to the locales' glyphs.

**Layout cues**
- Max content width ~1180px, side padding `clamp(20px, 5vw, 72px)`.
- Section headers: mono index `(01)` + Fraunces title + a thin `--line` rule.
- Projects alternate sides (zigzag); large faint serif-italic numbers `01/02/03`.
- Generous vertical rhythm between sections (`clamp(70px, 11vw, 140px)`).

---

## 7. Content model

`src/data/projects.ts` — one entry per project, ordered, typed:

```ts
export interface Project {
  slug: 'move-score' | 'kinap' | 'dimagin';
  number: '01' | '02' | '03';
  name: string;                       // localized via i18n keys where needed
  role: string; scope: string; platform: string; year: string;
  tags: string[];
  thumbMain: ImageMetadata;           // big card image (from src/assets)
  thumbSub: ImageMetadata;            // small overlapping image
  prototype: { type: 'phone' | 'browser'; src: string; url?: string }[];
}
```

The three projects (keep this order — it drives the nav, the work list, and the
"Next project" loop):

1. **move score** (`01`) — eco-mobility / movement-tracking **mobile app** that turns daily
   low-carbon trips into a journey on a map with milestones. Prototype: interactive
   landing → animated dashboard (Maison → Berlin → Rome…), confetti milestones. Shown in a
   **phone mock**. Role: Product Design · Year 2025 · tags: UX research, UI, Design system,
   Motion.
2. **kinap** (`02`) — platform matching **healthcare professionals** with replacement
   opportunities (availability calendar, Discover, Messages, Profile). **Mobile + web**:
   shown as phone mocks (mobile screens) plus a **browser frame** (web screens). Role:
   UX / UI Design · Year 2025 · tags: UX & UI, Mobile, Branding.
3. **dimagin** (`03`) — brand + **multi-page website** for a creative agency, "soft tech /
   glass" direction (glassmorphism, animated aurora gradients). Shown in a **browser
   frame**. Role: Brand · UX & UI · Year 2026 · tags: UX & UI, Web app, Design system.

Case-study sections (per project): `Overview (01)`, `The challenge (02)`, `Try it (03)`
with the live prototype, `Designed moments (04)`, `Outcome (05)`, then `Next project`.
Copy is placeholder-quality in the reference — **flag it as editable** and keep Giulia's
real wording when she provides it.

---

## 8. Prototype embeds

- The prototypes are **fully self-contained HTML** (inline CSS/JS). Keep them in
  `public/prototypes/<slug>/` and embed with `<iframe src="/prototypes/…" loading="lazy"
  title="…">` inside `PrototypeEmbed.astro`. (The reference uses `srcdoc`; switching to
  `src` files is cleaner in Astro and keeps the page HTML small.)
- `PrototypeEmbed.astro` provides two chromes:
  - **phone**: device mock with a notch + side button; iframe ≈ 360×760.
  - **browser**: window with 3 dots + a fake URL bar (e.g. `kinap.app/discover`).
- Prototypes are currently **in French**. Do not auto-translate them; treat translation as
  a separate, opt-in task.
- Sandbox the iframes (`sandbox="allow-scripts"` at minimum; add `allow-same-origin` only
  if a prototype needs it) and give each a meaningful `title`.

---

## 9. Images

- Source images live in `src/assets/`; render through `astro:assets` `<Image>` (or
  `getImage`) for responsive, optimised output. Use `format="avif"`/`"webp"` with sensible
  `widths`/`sizes`.
- Card thumbnails are **real screenshots** of the prototypes (the move-score big card is a
  composite of two phone shots side by side). The hero image is a workspace/wireframes
  photo. Provide descriptive `alt` text.
- Do **not** inline images as base64 in Astro (that was only to keep the standalone file
  portable). Let Astro emit optimised files.

---

## 10. Interactions (progressive, reduced-motion-aware)

Each is a tiny vanilla `<script>` island; all are no-ops under `prefers-reduced-motion:
reduce` and on coarse pointers where appropriate.

- **Reveal on scroll:** `IntersectionObserver` adds `.in` to `.reveal` / `.mask` elements
  (fade/translate, and masked text slides up). Content is visible by default if JS is off.
- **Masked hero reveal:** hero title lines animate up from a clipped container on load.
- **Custom dot cursor:** small dot follows the pointer; grows over links. `cursor:none`
  **only** on fine pointers and only when motion is allowed; always keep a usable fallback.
- **Image parallax:** subtle translateY on `.heroimg` / project `.main` images on scroll.
- **Nav scroll-spy:** bold + underline the nav link whose section (`#about`, `#work`,
  `#contact`) is in view; also set `aria-current`. This is a required UX detail — it helps
  visitors track where they are.

> The reference contains a `pageshow`/bfcache **reload hack** added only because Giulia was
> opening files via `file://` in Safari. On a real Astro deployment this is unnecessary —
> **omit it** unless a real bug reappears.

---

## 11. Navigation map (must stay intact)

- Home order matches scroll order: **À propos / About → Projets / Work → Contact**.
- Each project on the home page is clickable in two ways → its case study: the **image
  frame** (with a hover ↗ affordance) and the **"View case study"** link.
- "Next project" loop: **move score → kinap → dimagin → move score**.
- Case studies link back to the home work section ("Back to work" / "All work").
- Localized links must stay within the active locale.

---

## 12. Contact details (use these exactly)

- LinkedIn: `https://www.linkedin.com/in/giulia-bedini-816b90340` (open in new tab, `rel="noopener"`)
- Email: `bedinigiulia01@gmail.com` (footer link + "Get in touch" CTA → `mailto:`)
- Phone: `+33 6 25 28 64 44` → `tel:+33625286444`
- Location: Lyon, France · Status: open to an alternance (2026)
- Footer order: `© 2026 Giulia Bedini` · LinkedIn · email · phone · "Designed in France".
  (Dribbble and Behance were intentionally removed — do not re-add.)

---

## 13. Deployment

- Static build → `./dist`. Host on **Netlify / Vercel / Cloudflare Pages** (drag-and-drop
  the `dist` folder, or connect the Git repo for auto-deploys).
- Root URL must serve the home page (Astro emits `index.html` automatically).
- Add `sitemap` (`@astrojs/sitemap`) and per-locale `hreflang`. Set the real `site` URL in
  `astro.config.mjs`.

---

## 14. Conventions & guardrails

- **Ask before** changing copy tone, the design language, the project order, or the link
  loop. These are deliberate.
- Keep PRs/commits focused; run `npm run astro -- check` and `npm run build` before
  finishing.
- Prefer editing `projects.ts` / `ui.ts` over hard-coding strings in components.
- Keep components small and named for their role.
- Do not introduce tracking, ads, or heavy dependencies.
- When unsure how something should look or read, **open the matching `reference/` file**.
```
