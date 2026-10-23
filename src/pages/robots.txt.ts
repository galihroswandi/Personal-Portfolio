import type { APIRoute } from 'astro';
import { absoluteUrl } from '@/lib/seo';
import { buildRobots } from '@/lib/sitemap';

export const GET: APIRoute = () =>
  new Response(buildRobots(absoluteUrl('/sitemap.xml')), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
