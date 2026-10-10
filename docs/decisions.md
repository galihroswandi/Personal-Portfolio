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

It does not support ESLint 10 yet. React is used only for two small islands (Clock, Scene3D),
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

Dark is the only required theme and there is no toggle, so `data-theme="dark"` is written into the
HTML (no script, no flash). The light tokens work by changing that attribute.

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

The menu button is rendered `hidden` and shown by the script. Without JavaScript the five links
are always visible, wrapping under the brand on small screens. The `ID | EN` switch sits in the
navbar from 1024px and in the status strip below that.

## 016 · Case-study cards are not one big link

Only "Baca studi kasus →" is a link (its `aria-label` includes the title). The card shows the
focus ring through `:focus-within`, so it still looks like a single target to keyboard users
without duplicate tab stops. The design-system README suggests the whole card as the target;
the build prompt overrides it.
