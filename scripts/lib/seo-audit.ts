/**
 * Static SEO audit of a built site. Pure: it receives the HTML of every page plus the sitemap
 * and robots.txt, and returns a list of problems. `scripts/check-seo.ts` feeds it `dist/`.
 */
import { parse, type HTMLElement } from 'node-html-parser';
import { findPlaceholders } from '../../src/lib/placeholders';
import { DESCRIPTION_MAX, DESCRIPTION_MIN, TITLE_MAX, TITLE_MIN } from '../../src/lib/seo-limits';

export interface BuiltSite {
  /** Page path (`/id/`, `/404/`) → HTML. */
  pages: ReadonlyMap<string, string>;
  /** Every file in the output, as URL paths (`/og/id.png`, `/id/index.html`). */
  files: ReadonlySet<string>;
  sitemap: string;
  robots: string;
}

export interface AuditOptions {
  /** Canonical origin, no trailing slash. */
  origin: string;
  /** Production builds may not contain noindex (except 404) or placeholders. */
  production: boolean;
  /** The language chooser: hreflang x-default, indexable, deliberately not in the sitemap. */
  xDefaultPath?: string;
  notFoundPath?: string;
}

interface PageInfo {
  path: string;
  root: HTMLElement;
  lang: string;
  indexable: boolean;
  /** hreflang → absolute URL. */
  alternates: Map<string, string>;
}

const attr = (element: HTMLElement | null, name: string) =>
  element?.getAttribute(name) ?? undefined;

/** The page path an internal URL points to, or undefined for other origins. */
function internalPath(href: string, origin: string, fromPath: string): string | undefined {
  if (/^(mailto:|tel:|javascript:|data:)/.test(href)) return undefined;
  const url = new URL(href, `${origin}${fromPath}`);
  if (url.origin !== origin) return undefined;
  return url.pathname;
}

/** Does a URL path resolve to a file in the output (as a static host would serve it)? */
function resolves(path: string, files: ReadonlySet<string>): boolean {
  const decoded = decodeURIComponent(path);
  return (
    files.has(decoded) ||
    (decoded.endsWith('/') && files.has(`${decoded}index.html`)) ||
    files.has(`${decoded}.html`)
  );
}

function sameSet(a: Map<string, string>, b: Map<string, string>): boolean {
  return a.size === b.size && [...a].every(([key, value]) => b.get(key) === value);
}

/** Visible text: scripts, styles and templates removed. */
function visibleText(root: HTMLElement): string {
  const body = root.querySelector('body');
  if (!body) return '';
  const clone = parse(body.toString());
  for (const element of clone.querySelectorAll('script, style, template')) element.remove();
  return clone.text;
}

export function auditSite(site: BuiltSite, options: AuditOptions): string[] {
  const { origin, production } = options;
  const xDefaultPath = options.xDefaultPath ?? '/';
  const notFoundPath = options.notFoundPath ?? '/404/';
  const errors: string[] = [];
  const fail = (path: string, message: string) => errors.push(`${path}: ${message}`);
  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();
  const infos = new Map<string, PageInfo>();
  const linkedPaths = new Set<string>();

  for (const [path, html] of site.pages) {
    const root = parse(html);
    const isNotFound = path === notFoundPath;
    const lang = attr(root.querySelector('html'), 'lang') ?? '';
    if (!lang) fail(path, '<html> has no lang');

    // Title and description.
    const titleElements = root.querySelectorAll('title');
    const title = titleElements[0]?.text.trim() ?? '';
    if (titleElements.length !== 1) fail(path, `${titleElements.length} <title> elements`);
    if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
      fail(path, `title is ${title.length} characters (${TITLE_MIN}–${TITLE_MAX}): "${title}"`);
    }
    const description = attr(root.querySelector('meta[name="description"]'), 'content') ?? '';
    if (description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX) {
      fail(
        path,
        `description is ${description.length} characters (${DESCRIPTION_MIN}–${DESCRIPTION_MAX})`,
      );
    }
    if (!isNotFound) {
      const otherTitle = titles.get(title);
      if (otherTitle) fail(path, `title duplicates ${otherTitle}`);
      titles.set(title, path);
      const otherDescription = descriptions.get(description);
      if (otherDescription) fail(path, `description duplicates ${otherDescription}`);
      descriptions.set(description, path);
    }

    // Indexing.
    const robots = attr(root.querySelector('meta[name="robots"]'), 'content') ?? '';
    const indexable = !/noindex/i.test(robots);
    if (isNotFound && indexable) fail(path, '404 page must be noindex');
    if (production && !indexable && !isNotFound) fail(path, 'noindex in a production build');

    // Canonical.
    const canonicals = root.querySelectorAll('link[rel="canonical"]');
    const expected = `${origin}${path}`;
    if (isNotFound) {
      if (canonicals.length > 0) fail(path, '404 page must not have a canonical');
    } else if (canonicals.length !== 1 || attr(canonicals[0] ?? null, 'href') !== expected) {
      fail(path, `canonical must be exactly ${expected}`);
    }

    // hreflang.
    const alternates = new Map<string, string>();
    for (const link of root.querySelectorAll('link[rel="alternate"][hreflang]')) {
      const hreflang = attr(link, 'hreflang') ?? '';
      const href = attr(link, 'href') ?? '';
      if (alternates.has(hreflang)) fail(path, `hreflang "${hreflang}" listed twice`);
      alternates.set(hreflang, href);
    }
    if (!isNotFound) {
      const selfKey = path === xDefaultPath ? 'x-default' : (lang.split('-')[0] ?? '');
      if (alternates.get(selfKey) !== expected) {
        fail(path, `hreflang set does not list the page itself as "${selfKey}"`);
      }
      if (!alternates.has('x-default')) fail(path, 'missing hreflang x-default');
    }

    // Headings and images.
    const h1Count = root.querySelectorAll('h1').length;
    if (h1Count !== 1) fail(path, `${h1Count} <h1> elements (expected 1)`);
    for (const image of root.querySelectorAll('img')) {
      if (image.getAttribute('alt') === undefined) {
        fail(path, `<img src="${attr(image, 'src')}"> has no alt`);
      }
    }

    // Structured data.
    for (const script of root.querySelectorAll('script[type="application/ld+json"]')) {
      try {
        JSON.parse(script.textContent);
      } catch {
        fail(path, 'invalid JSON-LD');
      }
    }

    // Absolute URLs that must be on the canonical origin.
    const ownUrls = [
      ...root
        .querySelectorAll('link[rel="canonical"], link[rel="alternate"]')
        .map((l) => attr(l, 'href')),
      ...root
        .querySelectorAll(
          'meta[property="og:url"], meta[property="og:image"], meta[name="twitter:image"]',
        )
        .map((m) => attr(m, 'content')),
    ];
    for (const url of ownUrls) {
      if (url && !url.startsWith(`${origin}/`)) fail(path, `${url} is not on ${origin}`);
    }

    // Internal links and referenced files.
    for (const anchor of root.querySelectorAll('a[href]')) {
      const target = internalPath(attr(anchor, 'href') ?? '', origin, path);
      if (target === undefined) continue;
      if (!resolves(target, site.files)) fail(path, `broken link ${attr(anchor, 'href')}`);
      if (target !== path) linkedPaths.add(target);
    }
    for (const element of root.querySelectorAll(
      'link[rel="icon"], link[rel="apple-touch-icon"], link[rel="manifest"], meta[property="og:image"]',
    )) {
      const href = attr(element, 'href') ?? attr(element, 'content') ?? '';
      const target = internalPath(href, origin, path);
      if (target !== undefined && !resolves(target, site.files)) fail(path, `missing file ${href}`);
    }
    for (const [, href] of alternates) {
      const target = internalPath(href, origin, path);
      if (target !== undefined && target !== path) linkedPaths.add(target);
    }

    if (production) {
      const placeholders = findPlaceholders(visibleText(root));
      if (placeholders.length > 0) fail(path, `placeholder text ${placeholders.join(', ')}`);
    }

    infos.set(path, { path, root, lang, indexable, alternates });
  }

  // Reciprocal hreflang: every member of a set must carry the identical set.
  for (const info of infos.values()) {
    for (const [hreflang, href] of info.alternates) {
      if (hreflang === 'x-default') continue;
      const target = internalPath(href, origin, info.path);
      const other = target === undefined ? undefined : infos.get(target);
      if (!other) {
        fail(info.path, `hreflang "${hreflang}" points to a missing page ${href}`);
      } else if (!sameSet(info.alternates, other.alternates)) {
        fail(info.path, `hreflang set differs from ${other.path} (not reciprocal)`);
      }
    }
  }

  // Sitemap ↔ indexable pages.
  const sitemapRoot = parse(site.sitemap);
  const inSitemap = new Set<string>();
  for (const url of sitemapRoot.querySelectorAll('url')) {
    const loc = url.querySelector('loc')?.text.trim() ?? '';
    if (!loc.startsWith(`${origin}/`)) {
      errors.push(`sitemap: ${loc} is not on ${origin}`);
      continue;
    }
    const path = new URL(loc).pathname;
    inSitemap.add(path);
    const info = infos.get(path);
    if (!info) errors.push(`sitemap: ${loc} is not a built page`);
    else if (!info.indexable) errors.push(`sitemap: ${loc} is noindex`);
    else {
      const sitemapAlternates = new Map(
        url
          .querySelectorAll('xhtml\\:link')
          .map((link) => [attr(link, 'hreflang') ?? '', attr(link, 'href') ?? ''] as const),
      );
      if (!sameSet(sitemapAlternates, info.alternates)) {
        errors.push(`sitemap: alternates of ${loc} differ from the page's hreflang`);
      }
    }
    if (!url.querySelector('lastmod')) errors.push(`sitemap: ${loc} has no lastmod`);
  }
  for (const info of infos.values()) {
    if (info.indexable && info.path !== xDefaultPath && info.path !== notFoundPath) {
      if (!inSitemap.has(info.path)) errors.push(`sitemap: indexable page ${info.path} is missing`);
    }
  }

  // Orphans: every page must be reachable by a link, an hreflang, or the sitemap.
  for (const path of infos.keys()) {
    if (path === notFoundPath) continue;
    if (!linkedPaths.has(path) && !inSitemap.has(path))
      fail(path, 'orphan page (nothing links to it)');
  }

  // robots.txt
  if (!site.robots.includes(`Sitemap: ${origin}/sitemap.xml`)) {
    errors.push('robots.txt: missing or wrong Sitemap line');
  }
  if (/^Disallow:\s*\/\s*$/m.test(site.robots)) errors.push('robots.txt: disallows the whole site');

  return errors;
}
