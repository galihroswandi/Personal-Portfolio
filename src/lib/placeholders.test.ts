import { describe, expect, it } from 'vitest';
import { findPlaceholders, hasPlaceholder, isRealUrl } from './placeholders';

describe('findPlaceholders', () => {
  it('finds the seeded markers', () => {
    expect(findPlaceholders('Hasil: [isi hasil nyata] dan [TANGGAL].')).toEqual([
      '[isi hasil nyata]',
      '[TANGGAL]',
    ]);
    expect(hasPlaceholder('[email Anda]')).toBe(true);
  });

  it('ignores Markdown links and the obfuscated email', () => {
    expect(findPlaceholders('See [the docs](https://example.com).')).toEqual([]);
    expect(findPlaceholders('galih [at] example.com')).toEqual([]);
    expect(hasPlaceholder('Plain text.')).toBe(false);
  });
});

describe('isRealUrl', () => {
  it('accepts absolute http(s) URLs only', () => {
    expect(isRealUrl('https://github.com/galihroswandi')).toBe(true);
    expect(isRealUrl('#')).toBe(false);
    expect(isRealUrl('')).toBe(false);
    expect(isRealUrl('[url]')).toBe(false);
    expect(isRealUrl('https://localhost')).toBe(false);
  });
});
