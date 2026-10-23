import { describe, expect, it } from 'vitest';
import { buildRobots, buildSitemap } from './sitemap';

describe('buildSitemap', () => {
  const alternates = [
    { hreflang: 'id', href: 'https://example.dev/id/' },
    { hreflang: 'en', href: 'https://example.dev/en/' },
    { hreflang: 'x-default', href: 'https://example.dev/' },
  ];

  it('lists each URL with lastmod and its full alternate set', () => {
    const xml = buildSitemap([
      { loc: 'https://example.dev/id/', lastmod: '2026-10-10', alternates },
      { loc: 'https://example.dev/en/', lastmod: '2026-10-09', alternates },
    ]);
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    expect(xml.match(/<url>/g)).toHaveLength(2);
    expect(xml.match(/hreflang="x-default"/g)).toHaveLength(2);
    expect(xml).toContain('<lastmod>2026-10-09</lastmod>');
  });

  it('escapes XML', () => {
    expect(buildSitemap([{ loc: 'https://e.dev/?a&b', lastmod: 'x', alternates: [] }])).toContain(
      '?a&amp;b',
    );
  });
});

describe('buildRobots', () => {
  it('allows everything and points to the sitemap', () => {
    expect(buildRobots('https://example.dev/sitemap.xml')).toBe(
      'User-agent: *\nAllow: /\n\nSitemap: https://example.dev/sitemap.xml\n',
    );
  });
});
