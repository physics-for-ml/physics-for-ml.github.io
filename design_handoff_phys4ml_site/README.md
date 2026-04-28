# Handoff: Physics for ML — Seminar Site Redesign

## Overview

This is a redesign of the **Physics for Machine Learning** seminar site, hosted by the SPOT consortium (FZ Jülich / IAS-6). The site presents a bi-weekly seminar series: who is speaking, when, what's been covered, who's involved, and how to subscribe / propose a talk.

The chosen direction is **arXiv Monograph** — a paper-like, grid-heavy, two-column layout with a fixed sidebar TOC, a typographic content area set in Newsreader (serif) + IBM Plex (sans/mono), and a small accent color used sparingly. It deliberately reads more like a research artefact than a product landing page, which fits the audience.

## About the Design Files

The files in `design_reference/` are a **design reference created in HTML/React** — an interactive prototype showing the intended look, structure, and behavior. They are **not production code to copy directly**.

Your job is to **recreate this design in the target codebase's environment** (likely a static site / GitHub Pages setup — Jekyll, Hugo, Astro, plain HTML, Next.js, etc.), using its established patterns. If no environment is in place yet, pick whatever fits best for a small content-driven site that needs to be hosted on GitHub Pages — Astro and Hugo are both excellent choices; Jekyll works if you want zero build setup since GitHub Pages renders it natively.

The prototype uses inline React + Babel (loaded from CDN) purely so it runs as a single HTML file. **Do not ship that to production.** Use a real build pipeline.

## Fidelity

**High-fidelity.** Final colors, typography, spacing, interactions, and dark mode are all worked out. Recreate pixel-perfectly in the target stack.

## Files in `design_reference/`

- `index.html` — entry point, contains all global CSS (in `<style>`) and theme variables. Open this in a browser to see the prototype.
- `app.jsx` — main React app: routing (hash-based), Sidebar, TopBar, all four pages (Home, Archive, About, Contact), TalkCard, ThemeSwitch.
- `tweaks-panel.jsx` — a development-only floating settings panel used during design exploration. **Do not ship.** It documents which values were treated as design tokens (theme, accent, font size, density, content width, radius, serif family).
- `shared/data.jsx` — sample seminar data + the `PhysicsThumb` SVG generator used for talk-card thumbnails. Replace `SEMINAR` with real data from a CMS / markdown frontmatter / JSON.
- `shared/logo.svg` — the SPOT consortium logo.

## Pages / Routes

The prototype uses `#/home`, `#/archive`, `#/about`, `#/contact`. For a real site, use real URLs: `/`, `/archive`, `/about`, `/contact`.

### 1. Home (`/`)

Layout: 280px sidebar | content. Content padding `48px clamp(24px, 4vw, 72px) 96px` (the `48px` is multiplied by `--density`).

Top to bottom:

1. **TopBar** — breadcrumb on left (`/ physics-for-ml / home`), search input on right (240px wide, mono font, ⌘K hint). Bottom-bordered.
2. **Hero head** — small mono row: a black `SEMINAR SERIES` tag pill, then "● accepting proposals · SS26", then cadence ("Bi-weekly · Thursdays 10:00 CET").
3. **Title** — `clamp(48px, 6.5vw, 92px)` Newsreader 500, leading 0.98, tracking -0.025em, max-width 17ch. The word "physics" is italic + accent-colored.
4. **Abstract** — Newsreader, 20px, line-height 1.5, max-width 62ch, color `--ink-2`.
5. **Authors row** — mono 12px, `--ink-3`, with names bolded to `--ink`. Hosted by / Organised by / Forschungszentrum Jülich · IAS-6.
6. **Stats strip** — 4-column grid, top + bottom borders only (`--line`). Each stat: tiny mono uppercase label, big Newsreader number (34px, the headline number wrapped in `<em>` accent-colored), mono unit line.
   - Talks · `{past.length + 60}` · since 09/2023
   - Participating groups · `{groups.length}` · across 8 institutions
   - Subscribers · 420 · on mailing list
   - Next semester · SS26 · programme TBA
7. **§1.1 Next seminar** — section header (mono 11px uppercase, `--ink-3`, with the `§1.1` in accent color, bottom-bordered).
   - Card with `--card` bg + `--line` border. When no seminar is scheduled: heading "No upcoming seminar scheduled.", explanatory paragraph mentioning `phys4ml_seminar` (in `<code>`), two buttons — primary "Subscribe to notices" (filled, mono 12px) + ghost "Browse archive".
   - When a seminar IS scheduled: 2-column grid (info | CTA buttons) with date/title/speaker/location.
8. **§1.2 Recent seminars** — `talks` grid: `repeat(auto-fill, minmax(300px, 1fr))`, gap `20px * density`. Show the 6 most recent. Each `TalkCard`:
   - 5:3 thumbnail (SVG generative — see `PhysicsThumb`), card-on-card "ID · 001" pill top-left.
   - Body: meta row (date in `--ink`, motif name in `--ink-3`), serif title 19px/1.25, sans speaker line ("Name · Affiliation"), tag pills (first one accent-colored), assets row showing slides/video availability (●/○).
   - Hover: border darkens to `--ink`, lifts 1px.
9. Right-aligned ghost button: "View all N talks →" linking to /archive.
10. **§1.3 Events** — list rows: `180px | 1fr | auto` grid. Date column, then title (Newsreader 22px) + sans note, then location. Each row bottom-bordered with `--line`; first row has a heavier `--ink` top border.
11. **Footer** — top-bordered mono 11px line: "Physics for ML · SPOT · IAS-6 · FZ Jülich" / "Set in IBM Plex & Newsreader" / "arXiv-style layout".

### 2. Archive (`/archive`)

Same sidebar/topbar shell. Hero is "The *archive*." (italic+accent on "archive") with a one-line abstract.

- **Filter bar** — `1fr | auto | auto` grid in a `--card` bordered box: search input (mono, placeholder "search: 'DMFT', 'Zdeborová', 'diffusion'…"), tag select, sort select (newest / by speaker).
- Result count line ("showing N / total talks") in mono.
- Same talk grid as Home, all results.

### 3. About (`/about`)

- Hero: "About the *series*."
- `.prose` block: Newsreader 19px/1.6, max-width 68ch.
  - **§3.1 Scope** — paragraph + `.callout` (3px accent left border, italic, ink-2).
  - **§3.2 Format** — paragraph.
  - **§3.3 Consortium** — intro line, then a grid of 1-pixel-gap cards (`auto-fill, minmax(260px, 1fr)`) showing each group: name (sans 14px bold), affiliation (mono 11px, ink-3), and right-aligned 2-digit index.

### 4. Contact (`/contact`)

- Hero: "*Correspondence.*"
- 2×2 grid (1px gap on `--line` background, so the lines look like dividers): Organiser, Correspondence, Slides & recordings, Propose a talk. Each cell: tiny uppercase label, big serif content (24px), small sans paragraph below.
- **§4.1 Mailing lists** section header + intro paragraph + a horizontal email form (mono input + filled button "Subscribe to phys4ml_seminar").

## Sidebar (all pages)

Sticky 280px column, full viewport height, `--bg` background, right-bordered.

- **Brand block** — flex row: 56×44px logo (SVG, with `--logo-filter` inversion in dark mode), and a stack of: dim mono "SPOT CONSORTIUM" / serif "Physics *for* ML" / dim mono "vol. IV · bi-weekly · est. 2023". The theme toggle is absolutely positioned in the top-right corner of this row.
- **Theme toggle** — 26×26px round, transparent. Sun icon when dark, moon icon when light. Hover: `--line-soft` background, ink color. Single click flips theme.
- **Sections nav** — small "SECTIONS" label, then 4 links: §1 Home, §2 Archive, §3 About, §4 Contact. Each link is a 3-col grid: 32px hash (e.g. "§1") | label | optional trailing. Active link inverts (`--ink` bg, `--bg` text). Hover: `--line-soft` bg.
- **Elsewhere nav** — same style, links to Postorius mailing lists + Sciebo materials drive (open in new tab, with ↗ as the hash glyph).
- **Footer** — pushed to bottom (`margin-top: auto`). Tiny mono "Last updated" + ISO timestamp.

## Theme System (Light / Dark)

Defined as CSS custom properties on `:root` (light) and `html[data-theme="dark"]`. JS sets `document.documentElement.setAttribute("data-theme", "dark"|"light")`. Persist user choice to `localStorage` and respect `prefers-color-scheme` on first load.

### Light theme (default)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#f7f6f3` | page background (warm off-white) |
| `--card` | `#ffffff` | card / surface |
| `--ink` | `#0b0d0e` | primary text, strong UI |
| `--ink-2` | `#3c3f45` | secondary text (abstracts, body) |
| `--ink-3` | `#6b6f78` | tertiary text, mono labels |
| `--line` | `#d8d5cd` | borders |
| `--line-soft` | `#e8e5dd` | subtle dividers, hover bg |
| `--hl` | `#ffeeb0` | text selection |
| `--accent` | `#7a3fd3` | violet — italic words, active hashes, primary tag |
| `--accent-2` | `#0d6b5a` | green — "live" dot, asset-available indicators |

### Dark theme

| Token | Value |
|---|---|
| `--bg` | `#14161a` (warm near-black, slightly blue-leaning) |
| `--card` | `#1c1f24` |
| `--ink` | `#e8e4d8` (warm paper-white, NOT pure white) |
| `--ink-2` | `#b8b3a4` |
| `--ink-3` | `#7d7a72` |
| `--line` | `#2d3138` |
| `--line-soft` | `#23262c` |
| `--hl` | `#5a4500` |
| `--accent` | `#b794f4` (lifted violet for low-light contrast) |
| `--accent-2` | `#6fd5b8` |
| `--logo-filter` | `invert(0.92) hue-rotate(180deg) brightness(1) contrast(0.95) saturate(0.85)` |

The dark palette is intentionally warm (paper-like) — not a flat tech grey. Avoid pure black backgrounds and pure white text.

In dark mode, also override:
- `.tagpill.accent` — text color flips to `#1c1f24` (so it reads on the lighter accent).
- `.btn` — text color uses `var(--bg)` instead of pure white; on hover `#1c1f24`.

## Typography

Three font families, loaded from Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
```

| CSS var | Stack | Use |
|---|---|---|
| `--serif` | `"Newsreader", Georgia, serif` | Display titles, abstracts, talk titles, prose, callouts |
| `--sans` | `"IBM Plex Sans", -apple-system, BlinkMacSystemFont, sans-serif` | Body, speaker names, notes |
| `--mono` | `"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace` | Labels, meta, nav, code, dates, numbers, breadcrumbs |

Type rules:
- Italic + accent color is reserved for one or two emphasized words per heading (e.g. "Statistical *physics*"). Do not over-apply.
- Section labels are mono 11px uppercase, `letter-spacing: 0.18em`, with `§N.N` numbered prefix in accent.
- Body base font-size is 14px (var `--base-size`).
- Hero abstract sizing: `calc(var(--base-size) + 6px)`.
- Prose sizing: `calc(var(--base-size) + 5px)`.

## Spacing & Layout

- Outer max width: 1280px (var `--content-w`), centered.
- Content padding: `calc(48px * var(--density)) clamp(24px, 4vw, 72px) 96px`.
- Section spacing: large blocks use `calc(56px * var(--density))` top margin.
- Stat/talk grid gaps: `calc(20px * var(--density))`.
- Default `--density` = 1; the design tolerates 0.7–1.5.
- Border radius default is `0` — sharp corners are part of the aesthetic. The `--radius` token allows softening up to ~16px if needed for a sub-brand variant.

## Components

### TalkCard
```
┌────────────────────────────┐
│ ┌─ SVG thumbnail ────────┐ │
│ │ ARXIV · 001            │ │
│ │                        │ │
│ └────────────────────────┘ │
│  21 Mar 2026     glass     │
│  Replica method for…       │
│  Lenka Zdeborová · EPFL    │
│  [replica] mean-field DMFT │
│  ◆ slides   ▶ video        │
└────────────────────────────┘
```
- Card: `--card` bg, 1px `--line` border, no radius by default.
- Thumb: 5:3, bottom-bordered. ID pill is mono 10px on a `--card` background, top-left at 10px inset, 0.92 opacity.
- Body: 18px 20px 20px padding, gap 10px between rows, `flex: 1` so hover lift doesn't clip.
- Hover: border → `--ink`, `translateY(-1px)`.
- Tag pills: mono 10px, `--line-soft` bg + `--ink-2`. First tag uses `--accent` bg + white text.
- Asset glyphs: `◆ slides` and `▶ video` when available (color → `--accent-2`); `◇ —` / `▷ —` when not (color → `--ink-3`).

### Buttons
- `.btn` — mono 12px, `padding: 10px 16px`, `--ink` bg + `--bg` text, 1px `--ink` border, `--radius` corners.
- `.btn:hover` — bg + border → `--accent`, text white.
- `.btn.ghost` — transparent bg, `--ink` text. Hover inverts.

### Forms
- Inputs: mono 13px, `padding: 10px 14px`, `--bg` background, `--line` border. Focus: border → `--ink`. No outline.

### Section headers
```
§1.2 RECENT SEMINARS ─────────────────────────────────
```
- mono 11px uppercase, `--ink-3`, `letter-spacing: 0.18em`.
- `§N.N` prefix in `--accent`, 10px right margin.
- Bottom border `--line`, 10px padding-bottom.

## Interactions & Behavior

- **Routing**: prototype uses hashchange; production should use real routing.
- **Theme toggle**: persists in `localStorage('theme')`; on first load read `prefers-color-scheme`. Transition duration 0.2s on `background-color` and `color` for `body`.
- **Talk hover**: 0.15s transition on `border-color` + `transform`.
- **Filter (Archive)**: client-side filter on title/speaker/tags; live-update count.
- **Search input** (TopBar): not wired in the prototype — implement against the same dataset, fuzzy-match title/speaker/tags, show inline dropdown of results.
- **Mailing list form**: prototype just opens the Postorius URL in a new tab. In production, post to the actual list-management endpoint or keep redirecting — your call.
- **Live dot** in hero head (`.dot`) pulses 2s — `opacity: 1 → 0.3 → 1`.

## Responsive

- Breakpoint at 900px: sidebar collapses from 280px column to a stacked top section (border-bottom instead of right). Drop sticky behavior on mobile.
- Breakpoint at 720px: stats grid 4 → 2 columns; archive controls stack; event rows stack; contact grid 2 → 1 col.

## Data Shape

See `shared/data.jsx`. Key shape:

```ts
type Talk = {
  id: string;            // "arxiv-001" — first segment used as display ID
  date: string;          // "2026-03-21" ISO
  title: string;
  speaker: string;
  affil: string;         // institution
  motif: string;         // visual category for thumb generator
  tags: string[];        // first tag rendered with accent
  hasSlides: boolean;
  hasVideo: boolean;
};

type SEMINAR = {
  cadence: string;       // "Bi-weekly · Thursdays 10:00 CET"
  past: Talk[];
  events: { date: string; title: string; note: string; where: string }[];
  groups: { name: string; affil: string }[];
  contact: { organizer: string; institute: string; org: string; email: string };
};
```

In production, source this from markdown frontmatter, a JSON file, or a small CMS — whatever matches the GitHub Pages setup.

## Assets

- **Logo** (`shared/logo.svg`) — the SPOT consortium logo. Use the existing one from the repo if available; otherwise this is the source of truth.
- **Talk thumbnails** — generated procedurally by `PhysicsThumb` in `shared/data.jsx`. Each takes a `motif`, `palette`, and `seed`. They're decorative — feel free to keep the generator, replace with real images when curators upload them, or substitute a simpler abstract pattern. The palette passed in respects the live theme + accent.

## Tweakable Tokens (from the design panel)

The prototype exposes these as live tweaks; ship them as fixed values OR as user-facing settings, your call:

- `theme` — light | dark (ship as user setting)
- `accent` — color picker (ship fixed, default `#7a3fd3`)
- `serif` — Newsreader | EB Garamond | Source Serif 4 | Georgia (ship fixed: Newsreader)
- `baseSize` — 12–20px (ship fixed: 14)
- `density` — 0.7–1.5 (ship fixed: 1.0)
- `contentWidth` — 1024–1600px (ship fixed: 1280)
- `radius` — 0–16px (ship fixed: 0)

The `tweaks-panel.jsx` file in the bundle is the in-design editor and **should not be shipped**.

## Open questions for the developer

- **Where does seminar data live?** A `data/talks.json` file? Markdown files in `_seminars/`? An external API? Pick whatever the existing repo uses.
- **Search** in the TopBar isn't wired — confirm scope (just titles? full-text including abstracts?) before implementing.
- **Sciebo password** is mentioned in the Contact page — verify the current copy is still accurate.

## Browser support

Modern evergreen — uses CSS custom properties, `clamp()`, `aspect-ratio`, CSS grid, `gap`. No IE11.
