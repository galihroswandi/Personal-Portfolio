import { describe, expect, it } from 'vitest';
import { auditSite, type BuiltSite } from './seo-audit';

const origin = 'https://example.dev';
const titles = {
  '/id/': 'Galih Roswandi, Fullstack Developer di Tasikmalaya',
  '/en/': 'Galih Roswandi, Fullstack Developer in Tasikmalaya',
  '/': 'Galih Roswandi · Portofolio / Portfolio language',
};
const descriptions = {
  '/id/':
    'Fullstack developer di Tasikmalaya yang membangun antarmuka data untuk operator sehari-hari.',
  '/en/':
    'Fullstack developer in Tasikmalaya building data interfaces that operators use every day.',
  '/': 'Portofolio Galih Roswandi. Portfolio of Galih Roswandi, fullstack developer in Indonesia.',
};
const alternates = `
  <link rel="alternate" hreflang="id" href="${origin}/id/">
  <link rel="alternate" hreflang="en" href="${origin}/en/">
  <link rel="alternate" hreflang="x-default" href="${origin}/">`;

function page(path: keyof typeof titles, lang: string, body: string, head = ''): string {
  return `<!doctype html><html lang="${lang}"><head>
  <title>${titles[path]}</title>
  <meta name="description" content="${descriptions[path]}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${origin}${path}">${alternates}
  <meta property="og:image" content="${origin}/og/a.png">${head}
  </head><body>${body}</body></html>`;
}

const notFound = `<!doctype html><html lang="id"><head>
  <title>Halaman tidak ditemukan · Page not found | Galih</title>
  <meta name="description" content="Halaman tidak ditemukan di portofolio ini. Page not found on this portfolio, sorry.">
  <meta name="robots" content="noindex, follow">
  </head><body><h1>404</h1><a href="/id/">Beranda</a></body></html>`;

const sitemapFor = (paths: string[]) =>
  `<urlset>${paths
    .map(
      (path) =>
        `<url><loc>${origin}${path}</loc><lastmod>2026-10-10</lastmod>
        <xhtml:link rel="alternate" hreflang="id" href="${origin}/id/"/>
        <xhtml:link rel="alternate" hreflang="en" href="${origin}/en/"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="${origin}/"/></url>`,
    )
    .join('')}</urlset>`;

function site(
  overrides: Partial<Record<string, string>> = {},
  sitemap = sitemapFor(['/id/', '/en/']),
): BuiltSite {
  const pages = new Map<string, string>([
    ['/', page('/', 'id', '<h1>Galih</h1><a href="/id/">ID</a><a href="/en/">EN</a>')],
    ['/id/', page('/id/', 'id', '<h1>Halo</h1><a href="/en/">EN</a><img src="/a.png" alt="">')],
    ['/en/', page('/en/', 'en', '<h1>Hello</h1><a href="/id/#proyek">ID</a>')],
    ['/404/', notFound],
  ]);
  for (const [path, html] of Object.entries(overrides)) if (html) pages.set(path, html);
  return {
    pages,
    files: new Set([
      '/index.html',
      '/id/index.html',
      '/en/index.html',
      '/404.html',
      '/og/a.png',
      '/a.png',
    ]),
    sitemap,
    robots: `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
  };
}

const audit = (built: BuiltSite, production = false) => auditSite(built, { origin, production });

describe('auditSite', () => {
  it('passes a consistent site', () => {
    expect(audit(site())).toEqual([]);
  });

  it('catches missing h1, broken links, missing alt and unnamed role=img', () => {
    const errors = audit(
      site({
        '/en/': page(
          '/en/',
          'en',
          '<a href="/id/">ID</a><a href="/nope/">x</a><img src="/a.png"><div role="img"></div>',
        ),
      }),
    );
    expect(errors).toEqual(
      expect.arrayContaining([
        '/en/: 0 <h1> elements (expected 1)',
        '/en/: broken link /nope/',
        '/en/: <img src="/a.png"> has no alt',
        '/en/: role="img" element has no accessible name',
      ]),
    );
  });

  it('catches wrong canonical, foreign absolute URLs and non-reciprocal hreflang', () => {
    const bad = page('/en/', 'en', '<h1>x</h1>')
      .replace(`href="${origin}/en/">`, 'href="https://other.dev/en/">')
      .replace(`<link rel="alternate" hreflang="id" href="${origin}/id/">`, '');
    const errors = audit(site({ '/en/': bad }));
    expect(errors.some((error) => error.includes('canonical must be exactly'))).toBe(true);
    expect(errors.some((error) => error.includes('is not on https://example.dev'))).toBe(true);
    expect(errors.some((error) => error.includes('not reciprocal'))).toBe(true);
  });

  it('keeps the sitemap and noindex in sync', () => {
    const noindexEn = page('/en/', 'en', '<h1>x</h1>').replace('index, follow', 'noindex, follow');
    expect(audit(site({ '/en/': noindexEn }))).toContain(`sitemap: ${origin}/en/ is noindex`);
    expect(audit(site({}, sitemapFor(['/id/'])))).toContain(
      'sitemap: indexable page /en/ is missing',
    );
  });

  it('flags duplicate titles and out-of-range lengths', () => {
    const duplicate = page('/en/', 'en', '<h1>x</h1>').replace(titles['/en/'], titles['/id/']);
    expect(audit(site({ '/en/': duplicate }))).toContain('/en/: title duplicates /id/');
    const short = page('/en/', 'en', '<h1>x</h1>').replace(titles['/en/'], 'Hi');
    expect(audit(site({ '/en/': short })).some((e) => e.startsWith('/en/: title is 2'))).toBe(true);
  });

  it('is stricter in production: no noindex, no placeholders', () => {
    const placeholder = page('/en/', 'en', '<h1>x</h1><p>[isi hasil]</p>');
    expect(audit(site({ '/en/': placeholder }), true)).toContain(
      '/en/: placeholder text [isi hasil]',
    );
    expect(audit(site(), true)).toEqual([]);
  });

  it('rejects invalid JSON-LD and a robots.txt that blocks everything', () => {
    const invalid = page(
      '/en/',
      'en',
      '<h1>x</h1>',
      '<script type="application/ld+json">{nope</script>',
    );
    expect(audit(site({ '/en/': invalid }))).toContain('/en/: invalid JSON-LD');
    const blocked = { ...site(), robots: 'User-agent: *\nDisallow: /\n' };
    expect(audit(blocked)).toEqual(
      expect.arrayContaining([
        'robots.txt: missing or wrong Sitemap line',
        'robots.txt: disallows the whole site',
      ]),
    );
  });

  it('finds orphan pages', () => {
    const lonely = page('/en/', 'en', '<h1>x</h1>');
    const built = site({}, sitemapFor(['/id/']));
    const pages = new Map(built.pages);
    pages.set('/id/', page('/id/', 'id', '<h1>x</h1>').replace(alternates, ''));
    pages.set('/', page('/', 'id', '<h1>x</h1>').replace(alternates, ''));
    pages.set('/en/', lonely.replace(alternates, ''));
    const errors = audit({ ...built, pages });
    expect(errors).toContain('/en/: orphan page (nothing links to it)');
  });
});
