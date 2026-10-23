/** One Open Graph image per page and language, plus `/og/default.png` for the other pages. */
import type { APIRoute, GetStaticPaths } from 'astro';
import { ui } from '@/i18n/ui';
import { ogCardSvg, type OgCardText } from '@/lib/og';
import { getSitePages } from '@/lib/pages';
import { svgToPng } from '@/lib/raster';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import { site } from '@/config/site';

/** `/og/id/proyek/x.png` → `id/proyek/x`. */
const slugOf = (image: string) => image.replace(/^\/og\/|\.png$/g, '');

export const getStaticPaths = (async () => {
  const pages = await getSitePages();
  const defaultCard: OgCardText = {
    kicker: `${ui.id['og.homeKicker']} · ${ui.en['og.homeKicker']}`,
    heading: site.name,
  };
  return [
    { params: { slug: slugOf(DEFAULT_OG_IMAGE) }, props: { card: defaultCard } },
    ...pages.map((page) => ({
      params: { slug: slugOf(page.og.image) },
      props: { card: { kicker: page.og.kicker, heading: page.og.heading } },
    })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ card: OgCardText }> = async ({ props }) =>
  new Response(new Uint8Array(await svgToPng(ogCardSvg(props.card))), {
    headers: { 'Content-Type': 'image/png' },
  });
