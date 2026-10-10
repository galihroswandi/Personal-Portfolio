import type { APIRoute } from 'astro';
import { monogramSvg } from '@/lib/og';
import { pngsToIco, svgToPng } from '@/lib/raster';

export const GET: APIRoute = async () => {
  const images = await Promise.all(
    [16, 32].map(async (size) => ({ size, png: await svgToPng(monogramSvg(size, 'circle')) })),
  );
  return new Response(new Uint8Array(pngsToIco(images)), {
    headers: { 'Content-Type': 'image/x-icon' },
  });
};
