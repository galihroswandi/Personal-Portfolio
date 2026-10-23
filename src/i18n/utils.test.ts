import { describe, expect, it } from 'vitest';
import {
  getAlternateUrl,
  getLangFromUrl,
  interpolate,
  isLang,
  localePath,
  splitEmphasis,
  useTranslations,
} from './utils';

describe('getLangFromUrl', () => {
  it('reads the first path segment', () => {
    expect(getLangFromUrl(new URL('https://x.test/en/proyek/a/'))).toBe('en');
    expect(getLangFromUrl(new URL('https://x.test/id/'))).toBe('id');
  });

  it('falls back to the default language', () => {
    expect(getLangFromUrl(new URL('https://x.test/'))).toBe('id');
    expect(getLangFromUrl(new URL('https://x.test/fr/'))).toBe('id');
  });
});

describe('getAlternateUrl', () => {
  it('keeps the rest of the path', () => {
    expect(getAlternateUrl('/id/proyek/hmi-qt/', 'en')).toBe('/en/proyek/hmi-qt/');
    expect(getAlternateUrl('/en/', 'id')).toBe('/id/');
  });

  it('handles paths without a language or trailing slash', () => {
    expect(getAlternateUrl('/', 'en')).toBe('/en/');
    expect(getAlternateUrl('/id/proyek/a', 'en')).toBe('/en/proyek/a/');
  });
});

describe('localePath', () => {
  it('normalises slashes', () => {
    expect(localePath('en')).toBe('/en/');
    expect(localePath('id', '/proyek/a/')).toBe('/id/proyek/a/');
  });
});

describe('isLang', () => {
  it('accepts only supported codes', () => {
    expect(isLang('id')).toBe(true);
    expect(isLang('de')).toBe(false);
    expect(isLang(undefined)).toBe(false);
  });
});

describe('useTranslations', () => {
  it('returns the string for the language and fills placeholders', () => {
    expect(useTranslations('id')('nav.projects')).toBe('Proyek');
    expect(useTranslations('en')('nav.projects')).toBe('Projects');
    expect(useTranslations('id')('footer.copyright', { year: 2026 })).toBe('© 2026 Galih Roswandi');
  });
});

describe('interpolate', () => {
  it('leaves unknown placeholders untouched', () => {
    expect(interpolate('{a} {b}', { a: 1 })).toBe('1 {b}');
  });
});

describe('splitEmphasis', () => {
  it('marks text between asterisks', () => {
    expect(splitEmphasis('yang *langsung dipahami* operatornya.')).toEqual([
      { text: 'yang ', emphasis: false },
      { text: 'langsung dipahami', emphasis: true },
      { text: ' operatornya.', emphasis: false },
    ]);
  });

  it('drops empty segments', () => {
    expect(splitEmphasis('a *b*')).toEqual([
      { text: 'a ', emphasis: false },
      { text: 'b', emphasis: true },
    ]);
  });
});
