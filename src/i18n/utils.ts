import { defaultLang, languages, ui, type Lang, type UIKey } from './ui';

/** All supported languages, in display order. */
export const langs = Object.keys(languages) as Lang[];

/** Type guard: is `value` one of the supported language codes? */
export function isLang(value: string | undefined): value is Lang {
  return value !== undefined && value in languages;
}

/** Reads the language from the first path segment (`/en/...` → `en`), else the default. */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  return isLang(segment) ? segment : defaultLang;
}

/** Replaces `{name}` placeholders in a dictionary string. */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in values ? String(values[name]) : match,
  );
}

/** Returns a translate function bound to one language. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey, values?: Record<string, string | number>): string {
    const text = ui[lang][key];
    return values ? interpolate(text, values) : text;
  };
}

/** Builds a path inside a language: `localePath('en', 'proyek/x')` → `/en/proyek/x/`. */
export function localePath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}

/** The same page in another language: `/id/proyek/x/` + `en` → `/en/proyek/x/`. */
export function getAlternateUrl(pathname: string, targetLang: Lang): string {
  const segments = pathname.split('/').filter(Boolean);
  if (isLang(segments[0])) segments.shift();
  return localePath(targetLang, segments.join('/'));
}

export interface TextSegment {
  text: string;
  emphasis: boolean;
}

/** Splits `a *b* c` into plain and emphasised segments, so copy can mark an <em> phrase. */
export function splitEmphasis(text: string): TextSegment[] {
  return text
    .split('*')
    .map((part, index) => ({ text: part, emphasis: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
}
