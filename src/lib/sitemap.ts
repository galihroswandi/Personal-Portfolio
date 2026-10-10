/** XML sitemap with hreflang alternates, and robots.txt. Pure string builders. */
import type { Alternate } from '@/lib/seo';

export interface SitemapEntry {
  /** Absolute URL. */
  loc: string;
  /** `YYYY-MM-DD`. */
  lastmod: string;
  /** The page's full hreflang set (itself included), identical for every member. */
  alternates: readonly Alternate[];
}

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function buildSitemap(entries: readonly SitemapEntry[]): string {
  const urls = entries.map((entry) => {
    const links = entry.alternates.map(
      (alt) =>
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}"/>`,
    );
    return [
      '  <url>',
      `    <loc>${escapeXml(entry.loc)}</loc>`,
      `    <lastmod>${entry.lastmod}</lastmod>`,
      ...links,
      '  </url>',
    ].join('\n');
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

/** Everything may be crawled; the sitemap URL comes from the canonical origin. */
export function buildRobots(sitemapUrl: string): string {
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapUrl}`, ''].join('\n');
}
