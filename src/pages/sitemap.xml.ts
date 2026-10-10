/** Sitemap of every indexable page, with hreflang alternates and real lastmod dates. */
import type { APIRoute } from 'astro';
import { isoDate } from '@/lib/lastmod';
import { getSitePages } from '@/lib/pages';
import { absoluteUrl, buildAlternates } from '@/lib/seo';
import { buildSitemap } from '@/lib/sitemap';

export const GET: APIRoute = async () => {
  const pages = (await getSitePages()).filter((page) => page.indexable);
  const xml = buildSitemap(
    pages.map((page) => ({
      loc: absoluteUrl(page.path),
      lastmod: isoDate(page.modified),
      alternates: buildAlternates(page.alternates),
    })),
  );
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
