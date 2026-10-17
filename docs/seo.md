# SEO

How the site is made findable and how it previews when shared, why it is built this way, and how to
keep it right when pages change. The owner's off-site tasks (domain, Search Console, profiles) are
in [`seo-checklist.md`](./seo-checklist.md), in Indonesian.

Nothing here guarantees rankings or rich results. The aim is to give search engines an accurate,
consistent and fast site, and then measure.

## What is where

| File                                  | What                                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------------------------ |
| `src/config/site.ts`                  | Canonical origin (`url`), profiles, location, `publishEmployer` flag                       |
| `src/config/env.ts`                   | Build environment (`production` / `preview` / `development`), analytics on/off             |
| `src/lib/pages.ts`                    | Page registry: title, description, alternates, dates, indexability, OG card, JSON-LD graph |
| `src/lib/seo.ts`, `seo-limits.ts`     | Pure helpers: titles, descriptions, length bounds, absolute URLs, hreflang sets            |
| `src/lib/jsonld.ts`                   | Typed Schema.org builders                                                                  |
| `src/lib/lastmod.ts`                  | Dates from frontmatter, then git, then build time                                          |
| `src/lib/og.ts`, `raster.ts`          | OG cards and monogram icons (opentype.js + sharp)                                          |
| `src/components/seo/SEO.astro`        | Every SEO tag in `<head>`                                                                  |
| `src/pages/sitemap.xml.ts`, `robots…` | Sitemap with hreflang alternates; robots.txt                                               |
| `src/pages/og/[...slug].png.ts`       | One 1200×630 image per page and language, plus `/og/default.png`                           |
| `src/pages/index.astro`, `404.astro`  | Language chooser (`x-default`) and the bilingual 404                                       |
| `scripts/check-content.ts`            | `pnpm check:content`: unreviewed copy and placeholders (fails production builds)           |
| `scripts/check-seo.ts`                | `pnpm check:seo`: audits `dist/` after every build                                         |
| `scripts/validate-schema.ts`          | `pnpm validate:schema`: posts built pages to validator.schema.org (manual, network)        |
| `vercel.json`                         | Trailing-slash redirect, `noindex` header on every non-canonical host                      |

## Decisions

Longer notes are in `decisions.md` (027–033).

- **One URL form.** `https://galihroswandi.vercel.app`, no `www`, every page path ends in `/`.
  Canonical, hreflang, sitemap, `og:url`, JSON-LD and robots.txt are all built from `site.url`.
  Vercel answers `/id` with a 308 to `/id/`.
- **Previews are never indexed.** `vercel.json` sends `X-Robots-Tag: noindex, nofollow` on every
  host except the canonical one. That covers preview URLs (Vercel also adds `noindex` there),
  branch domains, and the old domain after a move. Production HTML never contains `noindex`
  except on the 404 page; `check:seo` enforces it on production builds.
- **Indexable means ready.** A page is indexable when its language is reviewed
  (`reviewedLangs` in `ui.ts`), its content entry says `reviewed: true`, and (case studies) it has
  no placeholder text. Unready pages get `noindex, follow` and stay out of the sitemap. A
  production build fails until everything is ready, so this state only exists locally and in
  previews.
- **hreflang.** Language codes only (`id`, `en`): the content is not region-specific. Each page
  lists itself, its other language and `x-default` (`/`). The same set appears in the sitemap.
- **`/` is a real page.** Short intro in both languages and plain links. A small inline script
  redirects people to their stored or browser language. There is no IP or `Accept-Language`
  redirect and no zero-delay meta refresh. It is `x-default`, indexable, and not in the sitemap.
- **Titles.** `<Page> | Galih Roswandi`; the home pages carry the brand and role. Bounds are
  30–65 characters. Google has no fixed limit (it truncates by width), and the owner's English
  home title is 61. Descriptions are 70–160 characters, written by hand per language. Case studies
  may set `seoTitle` / `seoDescription`; otherwise `title` and `problem` (+ `myRole`) are used.
- **Open Graph.** Generated per page and language with the design tokens and bundled fonts.
  Case studies are `article` with published/modified times. No screenshots and no client or
  system names.
- **Structured data.** Home: `Person`, `WebSite`, `ProfilePage`. Case studies: `Person`,
  `WebSite`, `BreadcrumbList`, `Article`. Every graph is self-contained (each `@id` it references is
  defined in it). `sameAs` lists only real profile URLs. `worksFor` is off until
  `site.publishEmployer` is set. Never email, phone, street address, ratings or reviews.
- **Unset things are hidden, not broken.** Social links without a real URL and CV buttons
  without a PDF are not rendered (`check:content` lists them).
- **Analytics.** Vercel Web Analytics (cookieless), only on Vercel builds, loaded when the
  browser is idle. Events: `cv_download`, `email_click`, `case_study_click`, `app_signup_click`, `repo_click`, `profile_click`
  (label: `github` / `linkedin` / `instagram`), `lang_switch` (label: target language). Custom
  events need a Vercel plan that includes them.
- **Search engine verification.** Set `PUBLIC_GSC_VERIFICATION` and/or `PUBLIC_BING_VERIFICATION`
  in the Vercel project. The meta tags only render when set. A DNS domain property in Search
  Console needs neither.

## Dependencies added

| Package                    | Why                                                      | Size (unpacked) | Maintenance           |
| -------------------------- | -------------------------------------------------------- | --------------- | --------------------- |
| `opentype.js` 2.0.0        | Text → SVG paths for OG cards and icons (dev only)       | 3.6 MB, no deps | 2.0 released May 2026 |
| `sharp` 0.35.5             | SVG → PNG (already installed by Astro; now a direct dep) | 1 MB + libvips  | Active (Sept 2026)    |
| `node-html-parser` 9.0.4   | Parses `dist/` HTML in `check:seo` (dev only)            | 0.7 MB, 2 deps  | Active (Sept 2026)    |
| removed `@astrojs/sitemap` | Replaced by the registry-driven endpoint (decision 027)  | —               | —                     |

Considered for OG images: Satori (≈20 MB plus its dependencies; full CSS layout we do not need)
and astro-og-canvas (canvaskit-wasm, ≈26 MB). None of these ship to the browser.

## Adding or changing a page

**A case study**

1. Add `src/content/projects/id/<slug>.mdx` and `src/content/projects/en/<slug>.mdx` with the
   same `slug`. Frontmatter is validated by `src/lib/schemas.ts`.
2. Write real content in the body: context, problem, your role, solution, result, stack. Generic
   terms only: no client, ship or system names, no screenshots of real systems.
3. If `<title> | Galih Roswandi` would pass 65 characters, set `seoTitle`. If `problem` makes a
   poor snippet, set `seoDescription` (70–160 characters).
4. Optional `publishedDate` / `updatedDate` (`YYYY-MM-DD`); otherwise git dates are used.
5. Set `reviewed: true` once the text is final. Run `pnpm check`. The page appears in the
   sitemap, the OG image is generated, and home links to it when `featured: true`.

**Another kind of page**

1. Add it to the registry in `src/lib/pages.ts` (title, description, alternates, dates,
   indexability, OG card), and to `getSitePages()` so the sitemap and OG images include it.
2. Render it with `<Base meta={headMeta(page, jsonLd)}>`. Exactly one `<h1>`.
3. Link to it from at least one existing page (`check:seo` fails on orphans).

**Before deploying:** `pnpm check` (lint, types, unit tests, content check, build, SEO audit),
then `pnpm test:e2e`. For a production-like run: `DEPLOY_ENV=production pnpm build`.

## Validating

- `pnpm check:seo` runs after every build. It fails on missing or duplicate titles and
  descriptions, lengths out of bounds, wrong canonicals, missing or non-reciprocal hreflang,
  missing `x-default`, h1 count ≠ 1, images without `alt`, unnamed `role="img"`, invalid JSON-LD,
  broken internal links or missing files, absolute URLs off the canonical origin, sitemap/noindex
  mismatches, orphan pages and a bad robots.txt. On production builds it also fails on any
  `noindex` outside 404 and any leftover placeholder text.
- `pnpm validate:schema` sends every built page to the Schema.org validator. On 10 October 2026:
  0 errors and 0 warnings on all nine pages (after removing an Article `breadcrumb` property the
  validator flagged).
- Google Rich Results Test has no API. After deploying, test `https://…/id/` and one case study at
  <https://search.google.com/test/rich-results>, or paste the built HTML. Not run yet.
- Social previews: after deploying, check a URL in the LinkedIn Post Inspector and a Facebook /
  WhatsApp share (they cache; the Post Inspector refreshes LinkedIn's copy).

## Moving to a custom domain

1. Change `site.url` and the host in `vercel.json` (a test fails until both match).
2. In Vercel, add the new domain as production and redirect the old one with a permanent
   redirect (Project → Domains → redirect `galihroswandi.vercel.app` to the new domain, 308).
   The redirect keeps the path, so `/id/proyek/x/` lands on the same page.
3. In Search Console, add the new domain property and use the Change of Address tool (it needs
   the old property verified). Submit the new sitemap.

## Sources consulted (October 2026)

- Google Search Central: SEO starter guide; [title links](https://developers.google.com/search/docs/appearance/title-link);
  snippets; canonicalization; [localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
  (self-reference, reciprocity, absolute URLs, `x-default` for language selectors and
  auto-redirecting home pages, sitemap format); sitemaps; JavaScript SEO basics;
  [ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
  (`mainEntity` required, `dateCreated`/`dateModified` recommended);
  [Article](https://developers.google.com/search/docs/appearance/structured-data/article)
  (no required properties; author as Person with name and url);
  [Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).
- The Open Graph protocol (<https://ogp.me>): `og:locale:alternate`, `article:*` times.
- Vercel: [`vercel.json`](https://vercel.com/docs/project-configuration/vercel-json) (`headers`
  with `has`/`missing` host conditions, `trailingSlash` → 308) and
  [preview deployment indexing](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines)
  (automatic `noindex` on previews, not on custom domains of preview branches).
- Astro: configuration reference (`trailingSlash` should match `build.format`; for static
  output the host decides), i18n routing, endpoints, `astro:assets`.

## Roadmap (not built)

A short notes section on topics the owner knows first-hand, for example designing
operator-friendly data interfaces, or going from web to Qt. It is the most effective lever for
non-branded searches ("fullstack developer Tasikmalaya", "HMI developer"). It would be a new
content collection, registered in `pages.ts` with `Article` markup like the case studies. Only
start it when there is something real to say every month or two.
