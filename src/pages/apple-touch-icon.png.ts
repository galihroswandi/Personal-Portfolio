import type { APIRoute } from 'astro';
import { monogramSvg } from '@/lib/og';
import { svgToPng } from '@/lib/raster';

/** iOS rounds the corners itself, so the icon is a full square. */
export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await svgToPng(monogramSvg(180, 'square'))), {
    headers: { 'Content-Type': 'image/png' },
  });
