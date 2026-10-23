/**
 * Titles, descriptions, URLs and alternates for the document head. Pure functions: everything
 * a page needs for SEO is computed here and rendered by `components/seo/SEO.astro`.
 */
import { site } from '@/config/site';
import { ui, type Lang } from '@/i18n/ui';
import { DESCRIPTION_MAX, DESCRIPTION_MIN, TITLE_MAX, TITLE_MIN } from '@/lib/seo-limits';

export { DESCRIPTION_MAX, DESCRIPTION_MIN, TITLE_MAX, TITLE_MIN };

/** `hreflang` values. The content is not region-specific, so language codes only. */
export const hreflangs: Record<Lang, string> = { id: 'id', en: 'en' };

/** Open Graph locales (`language_TERRITORY`). */
export const ogLocales: Record<Lang, string> = { id: 'id_ID', en: 'en_US' };

/** Absolute URL on the canonical origin: `absoluteUrl('/id/')` → `https://…/id/`. */
export function absoluteUrl(path: string, origin: string = site.url): string {
  return new URL(path, `${origin}/`).href;
}

/** `<Page> | Galih Roswandi`; the home page (no page title) uses its own branded title. */
export function buildTitle(pageTitle: string | undefined, lang: Lang): string {
  return pageTitle ? `${pageTitle} | ${site.name}` : ui[lang]['meta.title'];
}

/** Cuts `text` at a word boundary so the result, with `…`, is at most `max` characters. */
export function trimToLength(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:]+$/, '')}…`;
}

/**
 * A page description: the hand-written one when given, otherwise the fallback sentences joined
 * until the result is long enough to be a useful snippet, then trimmed to the maximum.
 */
export function buildDescription(written: string | undefined, fallback: readonly string[]): string {
  if (written) return written.trim();
  let text = '';
  for (const sentence of fallback) {
    text = text ? `${text} ${sentence.trim()}` : sentence.trim();
    if (text.length >= DESCRIPTION_MIN) break;
  }
  return trimToLength(text, DESCRIPTION_MAX);
}

/** Problems with a title or description; empty when it is fine. */
export function lengthIssues(kind: 'title' | 'description', value: string): string[] {
  const [min, max] = kind === 'title' ? [TITLE_MIN, TITLE_MAX] : [DESCRIPTION_MIN, DESCRIPTION_MAX];
  const length = value.trim().length;
  if (length === 0) return [`${kind} is empty`];
  if (length < min) return [`${kind} is ${length} characters (min ${min}): "${value}"`];
  if (length > max) return [`${kind} is ${length} characters (max ${max}): "${value}"`];
  return [];
}

/** Values that occur more than once. */
export function duplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const repeated = new Set<string>();
  for (const value of values) (seen.has(value) ? repeated : seen).add(value);
  return [...repeated];
}

export interface Alternate {
  hreflang: string;
  href: string;
}

/**
 * The full hreflang set for one page cluster: every language version (the page itself
 * included) plus `x-default`, the language chooser at `/`. Identical on every member.
 */
export function buildAlternates(paths: Partial<Record<Lang, string>>): Alternate[] {
  const entries = (Object.entries(paths) as [Lang, string][]).map(([lang, path]) => ({
    hreflang: hreflangs[lang],
    href: absoluteUrl(path),
  }));
  return [...entries, { hreflang: 'x-default', href: absoluteUrl('/') }];
}

/** `robots` meta content. Indexable pages allow large image previews. */
export function robotsContent(indexable: boolean): string {
  return indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow';
}

/** Path of the generated Open Graph image for a page: `/id/proyek/x/` → `/og/id/proyek/x.png`. */
export function ogImagePath(pagePath: string): string {
  const key = pagePath.replace(/^\/+|\/+$/g, '');
  return `/og/${key || 'default'}.png`;
}

/** The fallback image for pages without their own (language chooser, 404). */
export const DEFAULT_OG_IMAGE = ogImagePath('/');
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Everything the `<head>` needs for one page. */
export interface HeadMeta {
  lang: Lang;
  /** Path on the canonical origin, with a trailing slash. */
  path: string;
  title: string;
  description: string;
  indexable: boolean;
  /** Language versions for hreflang; omitted on pages outside a cluster (404). */
  alternates?: Partial<Record<Lang, string>>;
  /** False only for the 404 page, which has no URL of its own. */
  canonical?: boolean;
  og: {
    type: 'website' | 'article';
    image: string;
    imageAlt: string;
    published?: Date;
    modified?: Date;
  };
  /** JSON-LD graph, rendered as one script. */
  jsonLd?: object;
}

/** Serializes JSON-LD for an inline script; `<` is escaped so content can never close it. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
