import type { Lang } from '@/i18n/ui';

/** Public path of the CV PDF for a language (files live in `public/cv/`). */
export function cvHref(lang: Lang): string {
  return `/cv/galih-roswandi-${lang}.pdf`;
}
