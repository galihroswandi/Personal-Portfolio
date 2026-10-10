import type { APIRoute } from 'astro';
import { monogramSvg } from '@/lib/og';

export const GET: APIRoute = () =>
  new Response(monogramSvg(64, 'circle'), { headers: { 'Content-Type': 'image/svg+xml' } });
