# Decisions

Short notes on choices that are not obvious from the code. Newest last.

## 001 · Own git repository inside the flowvest folder

The project was started in `flowvest/portofolio/`, which sits inside the flowvest repo. It has
its own repository (`git init` here) so its history, CI and deploys stay separate.
`portofolio/` is listed in flowvest's local `.git/info/exclude` (not committed). Moving the
folder anywhere else needs no changes.

## 002 · pnpm through corepack

`packageManager` pins pnpm; `corepack enable pnpm` provides the binary. Build scripts are allowed
only for `esbuild` and `simple-git-hooks` (`pnpm-workspace.yaml` → `allowBuilds`).

## 003 · TypeScript 6, not 7

TypeScript 7 is the latest release, but `@astrojs/check` (peer `^5 || ^6`) and
`typescript-eslint` (peer `<6.1`) do not support it yet. Pinned to `~6.0`. Upgrade when both do.

## 004 · No eslint-plugin-jsx-a11y

It does not support ESLint 10 yet. React was planned for two small islands (Clock, Scene3D; see 023 and 025),
and accessibility is checked at runtime with axe in Playwright, which covers the Astro markup
too.

## 005 · Fonts through Astro's Fonts API (Fontsource provider)

Instead of importing `@fontsource/*` CSS, `astro.config.mjs` → `fonts` downloads the Fontsource
files at build time and serves them from `/_astro/fonts/` (self-hosted, no third-party request at
runtime). It also generates size-adjusted fallback faces (less layout shift) and preload links via
`<Font preload>`. Only Fraunces 400 (normal + italic, the h1) and Jakarta 400 (body) are preloaded.

Consequence: the generated family names are hashed, exposed as `--font-fraunces`,
`--font-jakarta`, `--font-jetbrains`. The design tokens wrap them:
`--font-display: var(--font-fraunces, 'Fraunces', 'Iowan Old Style', Georgia, serif)`; the
fallback inside `var()` is exactly the stack from the design spec.

## 006 · `compressHTML: true`

Astro 7 defaults to `'jsx'` compression, which strips whitespace between inline elements (for
example between a word and an `<em>`). `true` keeps the previous, HTML-safe behaviour.

## 007 · Breakpoints are literal

CSS media queries cannot read custom properties. Two breakpoints are used everywhere and written
literally: `721px` (tablet and up; the design's mobile breakpoint is `max-width: 720px`) and
`1024px` (desktop grids and side-by-side hero).

## 008 · Root language redirect

`/` is a static page with an inline script: a stored manual choice wins, then
`navigator.language` (`id*` → `/id/`), and anything else goes to `/en/` because a visitor whose
browser is not Indonesian is more likely to read English. The links stay visible for no-JS
visitors and crawlers. The page is excluded from the sitemap and used as `x-default`.

## 009 · Theme

Superseded by 034 to 038: there are two themes with a toggle. `data-theme` on `<html>` is still the
single source of truth, but a head script sets it instead of the HTML.

## 010 · `astro preview --ignore-lock` in Playwright

Astro 7 starts `astro preview` in the background when it detects an AI coding agent. The flag
keeps it in the foreground so Playwright can manage it. It has no effect in CI.

## 011 · Section ids and the case-study route stay Indonesian in English

`#proyek`, `#tentang`, … and `/en/proyek/<slug>/` are the same in both languages. The spec fixes
them, and stable anchors mean a shared link keeps working after a language switch.

## 012 · Content entry ids keep the language folder

The project schema has a `slug` field, and Astro's glob loader uses a `slug` field as the entry
id, so `id/hmi-qt.mdx` and `en/hmi-qt.mdx` would collide. `generateId` keeps the path
(`id/hmi-qt`), and the language comes from the folder (`projectLang()`). The schema lives in
`src/lib/schemas.ts` so Vitest can test it without Astro's virtual modules.

## 013 · Component size tokens

Some design values are off the 4px scale (chip padding 7px 14px, button padding 14px, 11px
timeline dot, 420px radar, …). They are named in `tokens.css` under "Component sizes" so
components never contain raw numbers.

## 014 · Email address obfuscation is light

The visible address is assembled in the browser from `data-` attributes (`user [at] domain`
without JavaScript), as the spec asks. The spec also requires a real `mailto:` href for no-JS
visitors, and that href contains the full address, so this only stops the most naive scrapers.
A stronger option would be dropping the no-JS href.

## 015 · Navigation without JavaScript

Without JavaScript the menu button is hidden and the five links are always visible, wrapping
under the brand on small screens. (Updated by 024: the collapsed layout now keys off the `js`
class instead of being applied by the menu script.) The `ID | EN` switch sits in the
navbar from 1024px and in the status strip below that.

## 016 · Case-study cards are not one big link

Only "Baca studi kasus →" is a link (its `aria-label` includes the title). The card shows the
focus ring through `:focus-within`, so it still looks like a single target to keyboard users
without duplicate tab stops. The design-system README suggests the whole card as the target;
the build prompt overrides it.

## 017 · Scroll reveal uses IntersectionObserver, not `animation-timeline: view()`

`view()` is at about 88% (caniuse, October 2026: Chrome/Edge 115+, Safari 26+, Firefox only from
160). More important, it is scroll-linked: an element un-reveals when you scroll back up, and
"play once" is the rule. One shared observer (`src/scripts/reveal.ts`) sets `data-revealed`
once and stops watching; CSS transitions do the rest. Anything on screen at load is marked
straight away. Content is only hidden while `<html class="js">`, so no-JS visitors and a
missing observer (everything is revealed) still see the whole page.

## 018 · Reduced motion is the absence of the motion rules

Every keyframe use, transition and transform lives inside
`@media (prefers-reduced-motion: no-preference)` in `motion.css` (and the few component rules).
Reduced motion therefore gets the final, static frame without a separate override block:
no loops, no transforms, content at full opacity. The brief allowed a 120ms fade for reveals
under reduced motion; it is not used, and content simply appears.

## 019 · "Paused" freezes loops in place

The pause control sets `animation-play-state: paused` on `.motion-loop` elements instead of
removing the animations. The radar stops where it is rather than snapping back to 12 o'clock,
and sweep and pings stay in phase when resumed. Entrances still play when paused (they are
short and one-off). The OS setting always wins over the stored choice. Under reduced motion
the button is hidden, since nothing loops.

## 020 · Cross-document view transitions

`@view-transition { navigation: auto; }` with a 150ms cross-fade, inside the no-preference
media query. Support is about 89% (Chrome 126+, Safari 18.2+, Firefox partial from 144); other
browsers navigate normally. The sticky header has `view-transition-name: site-header` so it is
captured on its own and does not flicker with the page fade. No client-side router.

## 021 · Scroll progress line only where CSS can drive it

`animation-timeline: scroll(root block)` inside `@supports`. Where it is not supported the line
is not rendered; it is not emulated with a scroll listener. The timeline sits in a separate rule
because the CSS minifier (Lightning CSS) otherwise folds it into the `animation` shorthand as
`animation: … scroll(root)`, which browsers reject. A Playwright test guards this.

## 022 · Motion-only constants live in `motion.css`

The brief allowed only seven new tokens. Values used by a single effect (30ms word stagger, 25ms
chip stagger, 2.4s lamp pulse, 1s colon blink, 2px card lift, the tilt perspective, …) are
named custom properties at the top of `motion.css`, not literals in rules. Radar timing comes
from `src/lib/radar.ts` as inline custom properties, so the SVG and any future 3D renderer
share one source. The `radar-ping` keyframe stop (15% = 1.2s of 8s) cannot read a variable; a
unit test checks that it matches `pingKeyframeStop()`.

## 023 · The clock is a small script, not a React island

`[data-clock]` showed a static `--:--` and no clock island existed. A React island would ship
the React runtime for one line of text and break the 3 KB budget, so the StatusStrip script
ticks it on the full minute with the existing `formatClock` / `msUntilNextMinute`. The digits
are fixed-width (`tabular-nums` in a mono font), so ticking never shifts layout. The colon
blinks only once the clock is live, and to 0.6 opacity at the lowest (text contrast floor).

## 024 · Header layout settles before first paint

The menu collapse (124px → 68px) and the pause control (strip 45px → 55px on phones) used to be
applied by scripts after first paint, which moved the whole page. Lighthouse saw CLS up to 0.29
when a web font swapped in the same frame. Both are now CSS keyed off the `js` class set by the
inline head script; the scripts only add behaviour. If a script fails after `js` is set, the
toggle is visible but inert, the same trade-off as the reveal.

## 025 · 3D radar renderer deferred

The brief assumed an existing `Scene3D` island. It does not exist: `three` and
`@react-three/fiber` are installed but unused. Building it is new feature work (and React plus
Three on the page), so only the SVG renderer is animated. `src/lib/radar.ts` holds the shared
period, ping and blink timing and the blip data; a 3D scene would add its prism period (about
20s per revolution) and a `sweepAngleAt(elapsed)` helper there. To be seamless, the scene should read the phase from the
SVG sweep's running CSS animation (`getAnimations()[…].currentTime`), not start at 0°. The
tilt already works on the wrapper, so it would apply to a canvas too.

## 026 · Small drawing changes the motion needed

- Radar: the afterglow wedge was on the leading (clockwise) side of the sweep line; it now
  trails it. The radar SVG is inline in `RadarFallback.astro` (built from the blip data) and
  `src/assets/illustrations/radar.svg` is gone.
- Timeline: the vertical line is a `::before` instead of `border-left`, so it can draw in. A
  transparent border keeps the original geometry the dots are centred on.
- Project card: `overflow: hidden` moved from the card to its illustration, so the hover shadow
  (a `::after` whose opacity changes) can sit outside the card.
- Hero h1: words are inline-block spans. Chrome adds a space at an inline-block boundary in the
  accessible name, so trailing punctuation stays in the same span as the word before it, and
  the emphasised phrase becomes one `<em>` per word. A test checks the heading's name.

## 027 · Sitemap and robots.txt are endpoints, not `@astrojs/sitemap`

The integration runs after the build and only sees URLs. It cannot know which pages are
`noindex` (unreviewed copy, case studies with placeholders) or when their content changed, so
`filter` and `lastmod` would have to re-derive both from files in `astro.config.mjs`.
`src/pages/sitemap.xml.ts` and `robots.txt.ts` read the page registry (`src/lib/pages.ts`) that
the pages themselves use, so the sitemap, the `robots` meta and hreflang cannot disagree. One
dependency fewer. `check:seo` verifies the result against the built HTML.

## 028 · One URL form: https, no www, trailing slash

`site.url` is the only origin. Page URLs always end in `/` (`trailingSlash: 'always'`,
`build.format: 'directory'`), and Vercel redirects the slash-less form with a 308
(`vercel.json` → `trailingSlash: true`). `vercel.json` also sends `X-Robots-Tag: noindex,
nofollow` on every host except the canonical one (preview URLs, branch domains, an old domain
after a move). Vercel adds `noindex` to preview deployments itself, but not to custom domains on
preview branches. A Vitest test keeps the host in `vercel.json` equal to `site.url`.

## 029 · `/` stays indexable but is not in the sitemap

It is the hreflang `x-default` and a real language chooser (text in both languages, plain
links). For people with JavaScript it redirects to `/id/` or `/en/`, and Googlebot follows JS
redirects, so it will usually not be shown in results; Google documents this "auto-redirecting
home page" as an `x-default` use. Listing a redirecting URL in the sitemap would be noise.
Updates 008: the page now has its own title, description, canonical and Open Graph tags.

## 030 · Unready pages are `noindex` locally and block production

A page is indexable only when its language is reviewed (`reviewedLangs` in `ui.ts`), its entry
says `reviewed: true`, and (case studies) it has no placeholder text. Unready pages get
`noindex, follow` and stay out of the sitemap. Production builds (`VERCEL_ENV` or
`DEPLOY_ENV = production`) fail in `check:content` and `check:seo` until everything is ready,
so production never ships `noindex` outside the 404 page.

## 031 · Missing CV files and unset profiles are hidden, not linked

`check:seo` found the CV buttons pointing to `/cv/*.pdf` files that do not exist. The buttons
now render only when `public/cv/galih-roswandi-<lang>.pdf` exists, and social links only when
`site.social.*` is a real URL. `check:content` lists both as notes.

## 032 · Open Graph images and icons are drawn with opentype.js + sharp

Build-time endpoints (`src/pages/og/[...slug].png.ts`, `favicon.*`, `apple-touch-icon.png`,
`icons/[size].png`) turn text into SVG paths with opentype.js (3.6 MB unpacked, dev only) and
rasterize with sharp (already installed for Astro's image service). Satori (≈20 MB plus its
dependencies) and astro-og-canvas (canvaskit-wasm, ≈26 MB) do layout we do not need. Two
quirks: opentype.js 2.0 is CommonJS under Node (loaded with `createRequire`), and its
`Path.toPathData()` prints `NaN` for some coordinates, so `og.ts` serializes path commands
itself (a test guards it). Fonts are the bundled Fraunces 500 and JetBrains Mono 500 WOFF
files in `src/assets/fonts/` (SIL OFL, licenses alongside).

## 033 · One `theme-color`

The spec asked for one per color scheme. The page is always dark (`data-theme="dark"`, 009),
so a light-scheme value would paint a light browser bar above a dark page. There is a single
`theme-color` from `--surface`; add a `media` variant if a theme toggle lands.
Superseded by 034 (the toggle landed): two tags with `media` as the no-JS baseline, collapsed into
one by `theme.ts` once a theme is applied.

## 034 · Initial theme: saved choice, then the system setting

A visitor's saved choice wins; otherwise `prefers-color-scheme` decides; otherwise dark. The
strategy is one constant, `INITIAL_THEME_STRATEGY` in `src/lib/theme.ts`; set it to `'dark'` to
always start dark (a saved choice still wins). Trade-off: dark is the brand identity and the first
impression of a portfolio, but forcing it ignores a setting the visitor made on purpose and shows
a dark page to people who chose light for readability. The head script
(`ThemeScript.astro`, about 190 bytes) is generated by `themeInitScript()` from the same constants,
and a test runs it against `resolveInitialTheme` for every input.

## 035 · The toggle is an action button, not a switch

`ThemeToggle` is a `<button>` named after its action ("Switch to light theme"), with no
`aria-pressed` or `role="switch"`: the name changes with the state, so adding a state attribute
would announce it twice. The pause-motion control does the opposite (constant label plus
`aria-pressed`) because its label cannot describe an action in both states; both rely on exactly
one channel for state. The icon shows the theme you would switch to (sun while dark, moon while
light), matching the label. A polite `role="status"` region announces "Light theme on" after a
press. There is no "system" state in the UI: once pressed, the saved choice always wins.

## 036 · On phones the pause control shows only its icon

At 390px the status strip (status, clock, pause label, `ID | EN`) was already full, and the
44px toggle pushed `EN` off screen. Below 721px the pause button keeps its square icon, its
44px hit area and its accessible name, and hides the visible text. Alternative if the owner prefers
the text: let the strip wrap to two rows (the sticky header grows by about 44px).

## 037 · The no-JS light block repeats the light tokens

Without JavaScript `<html>` has no `data-theme`, so `@media (prefers-color-scheme: light)
{ :root:not([data-theme]) { … } }` applies the light tokens. CSS cannot share a rule between a
media query and an attribute selector, so the values are duplicated in `tokens.css`;
`src/lib/theme-tokens.test.ts` fails if the two blocks differ. The no-JS fallback follows the
system even when the strategy is `'dark'`.

## 038 · Light review: what changed, and what did not exist

- There is no Three.js scene in the repo: the radar is server-rendered SVG that reads CSS
  variables, so it re-themes by itself and no observer was needed. (`three` and
  `@react-three/fiber` are still in `package.json` but unused in `src/`.)
- No hard-coded colors existed outside `tokens.css` (build-time art reads the tokens through
  `src/lib/design.ts`). OG images and PNG icons stay dark; the SVG favicon inverts on a light browser
  UI.
- One token change: new `--radar-wedge-opacity`, dark 0.16 (unchanged), light 0.11. At 0.16 the
  amber wedge looked beige on white. All contrast pairs pass in both themes without edits
  (`src/lib/contrast.test.ts`).
- The color fade after a press uses `!important` in `motion.css` because scoped component rules are
  more specific; it is limited to the 250ms `theme-transition` class and to motion `full`.

## 039 · No portrait: About shows a monogram plate

The owner does not want a personal photo on the site. The About frame is a decorative nameplate
instead: the `GR` monogram (same treatment as the navbar mark, larger) on a dot grid, with a mono
caption like the hero radar frame. It is `aria-hidden` because the name is already in the heading
and the prose. The `photo` field, `Person.image` in JSON-LD and the "no photo" content check are
removed, so a photo is not a launch item. The plate is 3:2 on phones and 4:5 next to the text from
1024px, so it does not push the copy a full screen down on mobile.

## 040 · Three case studies; Flowvest gets a sketch of its own screen

The monitoring dashboard was the same work as the maritime command center, so it is folded into
that case study (its stack now lists the dashboard) and removed. The three are Flowvest, the
command center and the Qt HMI, with Flowvest first because it is the only one with full copy. The
section title moved from "operators" to "data interfaces that are easy to understand", which fits
all three.

Employer projects keep generic illustrations: no screenshots or real layouts of client systems.
Flowvest is the owner's own app, so `finance.svg` is a simplified sketch of its real dashboard
(sidebar, financial health banner, income/expense/difference cards with the dark third card, net
worth area chart, recent transactions). It uses only theme tokens and the existing `ill-bar`,
`ill-trace` and `ill-dot` reveal animations.

## 041 · Hero shows the work; phones get a shorter page

- The hero frame keeps its tilt, off-screen pause and radar loops, but now holds three stacked
  windows: the radar as "command center", an HMI panel and the Flowvest dashboard. The old frame
  said "abstract scene" and told visitors nothing about the work. `three`,
  `@react-three/fiber` and `@types/three` were unused and are removed (`@astrojs/react` stays
  for now, also unused).
- New generic illustrations for the employer projects: `maritime.svg` (sea chart, vessel tracks,
  status list) and `hmi.svg` (gauges, tank levels, trend, buttons). Still no real layouts.
- Phones (max 720px): project cards show only Result (Problem and My role stay on the case study
  page); the status strip scrolls away and only the navbar sticks (`--strip-height` is measured
  by the StatusStrip script, without JavaScript the whole header sticks as before; the theme and
  language controls are back at the top of the page); the breadcrumb puts the current page on its
  own line; footer links use a smaller gap so they fit one line. Home went from about 8,100px to
  about 7,500px at 390px.

## 042 · Public GitHub section from a snapshot, LinkedIn as a link only

- New section 05 "GitHub" (Services is now 06, Contact 07; not in the navbar). Stat tiles, a
  decorative commit graph, two bar charts (main language per repo, new repos per year) and four
  featured public repos with code and demo links.
- Data comes from `src/data/github.json`, written by `pnpm data:github` (public API, no token). The
  build never calls GitHub, so it stays offline-safe; rerun the script and commit to refresh. Only
  own, non-fork repos count. Flowvest and office work are private and say so in the sub-line.
- Charts are HTML lists, not images: every label and value is real text, bars are `aria-hidden`,
  each row has a hover title. One series each, so one color: accent for the data, neutral gray for
  the folded "other" row and for non-peak years. Value labels are direct, so no legend.
- LinkedIn blocks automated reads (HTTP 999), so nothing is taken from it; the profile URL is set
  in `site.social` and shows as a link (Contact, GitHub section, `sameAs`).

## 043 · CV: ATS-friendly layout and a preview before download

- The CV is one column of real text (no tables, icons or text boxes), with standard section names,
  plain "Month YYYY – Month YYYY" dates, contact as text, real bullets and a tagged PDF with a
  title. No letter-spacing or text-transform: some parsers split such text into letters.
  `pdftotext` is the quick check that the reading order is clean.
- "View CV" (hero, contact) opens a modal `<dialog>` with a WebP image of the page and the PDF
  download inside; without JavaScript the buttons are plain download links. The image comes from
  `pnpm build:cv` together with the PDFs (rerun it, then commit all four files). Its `alt`
  text points to the PDF for the full text; the scroll area is focusable and labelled for keyboard
  users. The global reset zeroes margins, so the dialog sets `margin: auto` to stay centred.
