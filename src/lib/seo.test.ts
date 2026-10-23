import { describe, expect, it } from 'vitest';
import { ui } from '@/i18n/ui';
import { langs } from '@/i18n/utils';
import {
  absoluteUrl,
  buildAlternates,
  buildDescription,
  buildTitle,
  duplicates,
  lengthIssues,
  ogImagePath,
  robotsContent,
  serializeJsonLd,
  trimToLength,
} from './seo';

describe('titles', () => {
  it('brands page titles and uses the branded home title', () => {
    expect(buildTitle('Aplikasi desktop HMI dengan Qt', 'id')).toBe(
      'Aplikasi desktop HMI dengan Qt | Galih Roswandi',
    );
    expect(buildTitle(undefined, 'id')).toBe('Galih Roswandi, Fullstack Developer di Tasikmalaya');
    expect(buildTitle(undefined, 'en')).toBe(
      'Galih Roswandi, Fullstack Developer in Tasikmalaya, Indonesia',
    );
  });

  it('flags empty, short and long values', () => {
    expect(lengthIssues('title', '')).toEqual(['title is empty']);
    expect(lengthIssues('title', 'Short')[0]).toMatch(/min 30/);
    expect(lengthIssues('title', 'x'.repeat(66))[0]).toMatch(/max 65/);
    expect(lengthIssues('description', 'x'.repeat(161))[0]).toMatch(/max 160/);
  });

  it('home titles and descriptions are within bounds and unique per language', () => {
    for (const lang of langs) {
      expect(lengthIssues('title', buildTitle(undefined, lang))).toEqual([]);
      expect(lengthIssues('description', ui[lang]['meta.description'])).toEqual([]);
    }
    expect(duplicates(langs.map((lang) => ui[lang]['meta.description']))).toEqual([]);
  });

  it('finds duplicates', () => {
    expect(duplicates(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b']);
  });
});

describe('descriptions', () => {
  it('prefers the written description', () => {
    expect(buildDescription('  Written.  ', ['Fallback.'])).toBe('Written.');
  });

  it('joins fallback sentences until long enough, then trims at a word', () => {
    expect(buildDescription(undefined, ['x'.repeat(80), 'never used'])).toBe('x'.repeat(80));
    const joined = buildDescription(undefined, ['Short one.', 'Second sentence '.repeat(20)]);
    expect(joined.startsWith('Short one. Second')).toBe(true);
    expect(joined.length).toBeLessThanOrEqual(160);
    expect(joined.endsWith('…')).toBe(true);
  });

  it('trimToLength keeps short text and never exceeds the limit', () => {
    expect(trimToLength('a  b', 10)).toBe('a b');
    expect(trimToLength('one two three four', 12)).toBe('one two…');
  });
});

describe('urls and alternates', () => {
  it('builds absolute URLs on the canonical origin', () => {
    expect(absoluteUrl('/id/', 'https://example.dev')).toBe('https://example.dev/id/');
    expect(absoluteUrl('/id/')).toMatch(/^https:\/\/[^/]+\/id\/$/);
  });

  it('lists every language, itself included, plus x-default', () => {
    const alternates = buildAlternates({ id: '/id/proyek/x/', en: '/en/proyek/x/' });
    expect(alternates.map((alt) => alt.hreflang)).toEqual(['id', 'en', 'x-default']);
    expect(alternates.at(-1)?.href).toBe(absoluteUrl('/'));
  });

  it('maps pages to their Open Graph image', () => {
    expect(ogImagePath('/id/')).toBe('/og/id.png');
    expect(ogImagePath('/en/proyek/hmi-qt/')).toBe('/og/en/proyek/hmi-qt.png');
    expect(ogImagePath('/')).toBe('/og/default.png');
  });

  it('robots content', () => {
    expect(robotsContent(true)).toBe('index, follow, max-image-preview:large');
    expect(robotsContent(false)).toBe('noindex, follow');
  });
});

describe('serializeJsonLd', () => {
  it('cannot close the script element', () => {
    expect(serializeJsonLd({ name: '</script><b>' })).toBe('{"name":"\\u003c/script>\\u003cb>"}');
  });
});
