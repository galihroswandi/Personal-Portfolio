import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { site } from '../../src/config/site';
import { namedHosts, resolveHeaders, type VercelConfig } from './vercel-headers';

const config = JSON.parse(readFileSync('vercel.json', 'utf8')) as VercelConfig;
const productionHost = new URL(site.url).host;

describe('vercel.json', () => {
  it('names only the canonical host (keep it in sync with site.url)', () => {
    expect(namedHosts(config)).toEqual([productionHost]);
  });

  it('enforces the trailing-slash policy', () => {
    expect(config.trailingSlash).toBe(true);
  });

  it('lets production be indexed', () => {
    expect(resolveHeaders(config, '/id/', productionHost)['x-robots-tag']).toBeUndefined();
  });

  it('sends noindex on every other host (previews, branch domains)', () => {
    for (const host of ['portofolio-git-feat-x-galih.vercel.app', 'example.com']) {
      expect(resolveHeaders(config, '/id/', host)['x-robots-tag']).toBe('noindex, nofollow');
      expect(resolveHeaders(config, '/sitemap.xml', host)['x-robots-tag']).toBe(
        'noindex, nofollow',
      );
    }
  });
});
