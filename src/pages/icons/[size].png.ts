/** Web-manifest icons, `/icons/192.png` and `/icons/512.png`. */
import type { APIRoute, GetStaticPaths } from 'astro';
import { MANIFEST_ICON_SIZES } from '@/lib/manifest';
import { monogramSvg } from '@/lib/og';
import { svgToPng } from '@/lib/raster';

export const getStaticPaths = (() =>
  MANIFEST_ICON_SIZES.map((size) => ({ params: { size: String(size) } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) =>
  new Response(new Uint8Array(await svgToPng(monogramSvg(Number(params.size), 'square'))), {
    headers: { 'Content-Type': 'image/png' },
  });
