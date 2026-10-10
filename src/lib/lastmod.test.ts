import { describe, expect, it } from 'vitest';
import { firstPublished, isoDate, lastModified } from './lastmod';

describe('lastmod', () => {
  it('prefers an explicit date', () => {
    const date = new Date('2026-01-02T00:00:00Z');
    expect(lastModified(['package.json'], date)).toBe(date);
    expect(firstPublished('package.json', date)).toBe(date);
  });

  it('reads committed files from git, never in the future', () => {
    const modified = lastModified(['package.json']);
    expect(modified.getTime()).toBeLessThanOrEqual(Date.now());
    expect(firstPublished('package.json').getTime()).toBeLessThanOrEqual(modified.getTime());
  });

  it('falls back to the build time for unknown files', () => {
    expect(lastModified(['does/not/exist.txt']).getTime()).toBeLessThanOrEqual(Date.now());
  });

  it('formats a calendar date', () => {
    expect(isoDate(new Date('2026-10-10T15:00:00Z'))).toBe('2026-10-10');
  });
});
