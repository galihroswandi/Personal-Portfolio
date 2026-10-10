# Galih Roswandi · portfolio

Bilingual (Indonesian + English) personal portfolio. Static Astro site, deployed to Vercel.

> Work in progress. Sections below are filled in as the phases land.

## Requirements

- Node 24 (`.nvmrc`), pnpm via corepack: `corepack enable pnpm`

## Setup

```sh
corepack enable pnpm
pnpm install
pnpm dev            # http://localhost:4321 → redirects to /id/ or /en/
```

## Scripts

| Script                 | What it does                                                |
| ---------------------- | ----------------------------------------------------------- |
| `pnpm dev`             | Dev server                                                  |
| `pnpm build`           | Static build into `dist/`                                   |
| `pnpm preview`         | Serve `dist/` locally                                       |
| `pnpm lint`            | ESLint + Prettier check                                     |
| `pnpm format`          | Prettier write + ESLint fix                                 |
| `pnpm typecheck`       | `astro check` (TypeScript + Astro templates)                |
| `pnpm test`            | Vitest unit tests                                           |
| `pnpm test:e2e`        | Playwright smoke tests against the built site               |
| `pnpm check`           | lint + typecheck + test + build (what CI runs)              |
| `pnpm check:content`   | Unreviewed copy and placeholders; fails production builds   |
| `pnpm check:seo`       | SEO audit of `dist/` (part of `pnpm build`)                 |
| `pnpm validate:schema` | Posts built pages to validator.schema.org (manual, network) |

`pnpm build` runs `check:content`, `astro build` and `check:seo`. With `VERCEL_ENV=production` (or
`DEPLOY_ENV=production`) both checks fail on anything not ready to publish.

## Structure

See `docs/decisions.md` for non-obvious choices.

## SEO

Canonical URLs, hreflang, sitemap, Open Graph images, structured data and the checks that guard
them: see [`docs/seo.md`](docs/seo.md). The owner's off-site checklist (domain, Search Console,
profiles) is [`docs/seo-checklist.md`](docs/seo-checklist.md), in Indonesian.

Lighthouse 12.6 (mobile, simulated throttling, headless Chromium 156) on 10 October 2026,
`dist/` served by a plain static server (no compression), 3 runs per URL:

| URL                  | Build  | Performance | Accessibility | Best Practices | SEO | LCP       | CLS |
| -------------------- | ------ | ----------- | ------------- | -------------- | --- | --------- | --- |
| `/id/`               | Before | 96–97       | 100           | 100            | 100 | 2.3–2.4 s | 0   |
| `/id/`               | After  | 97          | 100           | 100            | 100 | 2.3 s     | 0   |
| `/en/`               | Before | 96–97       | 100           | 100            | 100 | 2.3–2.4 s | 0   |
| `/en/`               | After  | 97          | 100           | 100            | 66¹ | 2.3 s     | 0   |
| `/id/proyek/hmi-qt/` | Before | 98–99       | 100           | 100            | 100 | 2.0–2.1 s | 0   |
| `/id/proyek/hmi-qt/` | After  | 98          | 100           | 100            | 66¹ | 2.1 s     | 0   |

¹ Only the "Page is blocked from indexing" audit fails. These pages are `noindex` by design until the English copy
is reviewed and the case studies have real content (decision 030). A production build cannot
contain them in that state, so production pages score SEO 100 like `/id/`.

The LCP here is higher than in the Performance table below because this server does not
compress. The page's own weight barely changed: home HTML 9.98 → 10.74 KB gzip (head tags,
JSON-LD, footer links). Initial JavaScript is the same 2.4 KB of inline scripts plus a 1.2 KB
deferred analytics loader. The analytics library (1.5 KB) loads when the browser is idle, and
only on Vercel.

## Motion

The feel is a calm operator console: a slow radar, a pulsing status lamp, text and cards that
settle into place. Everything is progressive enhancement. Without JavaScript, or with reduced
motion, the page is complete and static.

**Principles**

- Nothing delays or hides content, and no animation is needed to understand the page.
- Short and interruptible: 120–320ms with `--motion-ease`; "draw" effects up to 600ms.
- Only `transform` and `opacity` (plus `stroke-dashoffset` on SVG lines). Space is always
  reserved, so nothing shifts layout.
- Entrances and reveals play once per element per page view.
- Movement exists only inside `@media (prefers-reduced-motion: no-preference)`, so reduced
  motion gets the final frame. Loops can also be paused in the page.
- CSS first. JavaScript only for the reveal observer, the pointer tilt, the clock and the pause
  control (about 1.8 KB gzip in total, inlined by Astro).

**Where things live**

| File                        | What                                                                                     |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| `src/styles/tokens.css`     | `--motion-fast/base/slow/draw`, `--motion-ease`, `--motion-stagger`, `--reveal-distance` |
| `src/styles/motion.css`     | Every keyframe and motion utility, the global switches, motion-only constants            |
| `src/lib/motion.ts`         | Motion state (`full` / `paused` / `reduced`) and the stored pause choice                 |
| `src/lib/reveal.ts`         | Stagger index helpers and the hero h1 word splitter                                      |
| `src/lib/radar.ts`          | Radar geometry and timing (the single source for any renderer)                           |
| `src/lib/tilt.ts`           | Pointer tilt target, clamping and smoothing                                              |
| `src/scripts/reveal.ts`     | The one IntersectionObserver behind `data-reveal`                                        |
| `src/scripts/hero-radar.ts` | Pauses radar loops off-screen; runs the tilt loop                                        |

**Adding a revealed element**

```astro
---
import { revealStyle } from '@/lib/reveal';
---

<!-- Fades up once when it enters the viewport; siblings stagger by --motion-stagger. -->
{items.map((item, index) => (
  <li data-reveal style={revealStyle(index)}>
    …
  </li>
))}

<!-- Or keep the container still and animate its children. -->
<div data-reveal="group">
  <h3 class="reveal-item" style="--i: 1">
    …
  </h3>
</div>
```

Children utilities: `reveal-item` (fade up), `reveal-pop` (chip cascade), `reveal-draw-x` (a
rule drawing left to right), `reveal-rail` (a `::before` line drawing top to bottom),
`reveal-ring` (one ring pulse), `reveal-brackets` (panel corners snapping in). Content is only
hidden while `<html>` has the `js` class, which an inline script in `Base.astro` sets before
first paint. Add new keyframes and utilities to `motion.css`, never to components, and use the
tokens rather than raw durations or distances.

**Pause control**

"Jeda animasi" / "Pause motion" in the status strip is a toggle button (`aria-pressed`). It
stores `gr-motion=paused` in `localStorage` (`MOTION_STORAGE_KEY`). The inline head script
reads it before first paint and sets `<html data-motion="full|paused|reduced">`. When paused,
every `.motion-loop` element (radar sweep, blips, pings, lamp, clock colon) freezes and the
tilt is off; entrances still play. The OS setting wins: under reduced motion the state is
`reduced` and the button is hidden, because nothing loops.

## Performance

Measured locally against `pnpm build && pnpm preview`, `/id/`, with Lighthouse 12 (mobile,
simulated throttling) in headless Chromium 156.

| Run                    | Performance      | LCP (median) | CLS                     | TBT |
| ---------------------- | ---------------- | ------------ | ----------------------- | --- |
| Before motion (7 runs) | 96–99, median 99 | 1.82s        | 0 in 6 runs, 0.107 in 1 | 0ms |
| After motion (10 runs) | 99 in all        | 1.81s        | 0.000 in all            | 0ms |

The old intermittent shift came from the mobile menu collapsing after first paint; the header
now settles before paint (see decision 024).

- Layout shift while loading and scrolling the whole page (Playwright, Layout Instability
  API): 0.0003 at 390px, 0.0002 at 1440px.
- JavaScript on the home page: 664 B → 2,445 B gzip (+1.8 KB). No separate chunks.
- Frame time at 390px with a 4× CPU throttle (CDP), 5s samples: radar looping avg 16.7ms,
  p95 16.8ms; scrolling avg 16.6ms, p95 16.8ms; no frame over 50ms. Headless, so treat it as
  a smoke test, not a device measurement.
