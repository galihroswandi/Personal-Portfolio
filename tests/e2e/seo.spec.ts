import { createServer, type Server } from 'node:http';
import { readFile } from 'node:fs/promises';
import type { AddressInfo } from 'node:net';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { resolveHeaders, type VercelConfig } from '../../scripts/lib/vercel-headers';
import { site } from '../../src/config/site';

const homes = [
  { path: '/id/', lang: 'id', locale: 'id_ID' },
  { path: '/en/', lang: 'en', locale: 'en_US' },
] as const;

/** Canonical URL → the same path on the local preview server. */
const local = (url: string) => new URL(url).pathname;

for (const { path, lang, locale } of homes) {
  test(`head tags on ${path}`, async ({ page }) => {
    await page.goto(path);
    const head = page.locator('head');
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(head.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${site.url}${path}`,
    );
    for (const [hreflang, target] of [
      ['id', '/id/'],
      ['en', '/en/'],
      ['x-default', '/'],
    ]) {
      await expect(head.locator(`link[rel="alternate"][hreflang="${hreflang}"]`)).toHaveAttribute(
        'href',
        `${site.url}${target}`,
      );
    }
    await expect(head.locator('meta[property="og:locale"]')).toHaveAttribute('content', locale);
    await expect(head.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );

    // The OG image exists and is 1200×630.
    const image = await head.locator('meta[property="og:image"]').getAttribute('content');
    const response = await page.request.get(local(image ?? ''));
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const png = await response.body();
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);

    // One JSON-LD graph with the profile page and the person.
    const jsonLd = await head.locator('script[type="application/ld+json"]').textContent();
    const types = (JSON.parse(jsonLd ?? '{}') as { '@graph': { '@type': string }[] })['@graph'].map(
      (node) => node['@type'],
    );
    expect(types).toEqual(['Person', 'WebSite', 'ProfilePage']);
  });
}

test('robots.txt and sitemap.xml agree', async ({ request }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${site.url}/sitemap.xml`);

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const locs = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1] ?? '');
  expect(locs.length).toBeGreaterThan(0);
  for (const loc of locs) {
    expect(loc.startsWith(`${site.url}/`)).toBe(true);
    const page = await request.get(local(loc));
    expect(page.status(), loc).toBe(200);
    expect(await page.text(), loc).not.toContain('noindex');
  }
});

/** Text of the first `<tag>` in raw HTML, tags stripped and whitespace collapsed. */
const textOf = (html: string, tag: string) =>
  (new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`).exec(html)?.[1] ?? '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

test('meaningful text is in the static HTML (no JavaScript needed)', async ({ request }) => {
  const html = await (await request.get('/id/')).text();
  expect(textOf(html, 'h1')).toContain('antarmuka data');
  for (const id of ['proyek', 'tentang', 'pengalaman', 'layanan', 'kontak']) {
    expect(html).toMatch(new RegExp(`<h2[^>]*id="${id}-title"`));
  }
  expect(html).toContain('Aplikasi desktop HMI dengan Qt');

  const caseStudy = await (await request.get('/id/proyek/hmi-qt/')).text();
  expect(textOf(caseStudy, 'h1')).toBe('Aplikasi desktop HMI dengan Qt');
  expect(caseStudy).toContain('Sistem terbaru membutuhkan antarmuka desktop untuk operator');
});

test('unknown URLs get a 404 page that is not indexed', async ({ page }) => {
  const response = await page.goto('/id/tidak-ada/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('a[href="/id/"]')).toHaveCount(1);
  await expect(page.locator('a[href="/en/"]')).toHaveCount(1);
});

test.describe('X-Robots-Tag on non-production hosts', () => {
  // Serves dist/ with the header rules from vercel.json, as Vercel would.
  let server: Server;
  let port = 0;

  test.beforeAll(async () => {
    const config = JSON.parse(await readFile('vercel.json', 'utf8')) as VercelConfig;
    server = createServer((req, res) => {
      const path = new URL(req.url ?? '/', 'http://localhost').pathname;
      const host = (req.headers['x-test-host'] as string | undefined) ?? '';
      for (const [key, value] of Object.entries(resolveHeaders(config, path, host))) {
        res.setHeader(key, value);
      }
      readFile(join('dist', path.endsWith('/') ? `${path}index.html` : path)).then(
        (body) => res.end(body),
        () => {
          res.statusCode = 404;
          res.end();
        },
      );
    });
    await new Promise<void>((resolve) => server.listen(0, resolve));
    port = (server.address() as AddressInfo).port;
  });

  test.afterAll(() => {
    server.close();
  });

  test('production host is indexable, a preview host is not', async ({ request }) => {
    const get = (host: string) =>
      request.get(`http://localhost:${port}/id/`, { headers: { 'x-test-host': host } });
    const production = await get(new URL(site.url).host);
    expect(production.headers()['x-robots-tag']).toBeUndefined();
    const preview = await get('portofolio-git-feature-galih.vercel.app');
    expect(preview.headers()['x-robots-tag']).toBe('noindex, nofollow');
  });
});
