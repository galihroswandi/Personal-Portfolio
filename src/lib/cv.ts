import { existsSync } from 'node:fs';
import type { Lang } from '@/i18n/ui';

/** Public path of the CV PDF for a language (files live in `public/cv/`). */
export function cvHref(lang: Lang): string {
  return `/cv/galih-roswandi-${lang}.pdf`;
}

/** Public path of the preview image shown before downloading (made by `pnpm build:cv`). */
export function cvPreviewHref(lang: Lang): string {
  return `/cv/galih-roswandi-${lang}-preview.webp`;
}

/** The CV's source file, relative to the project root. */
export function cvFile(lang: Lang): string {
  return `public${cvHref(lang)}`;
}

/** Download buttons are only rendered when the PDF exists, so they never link to a 404. */
export function hasCv(lang: Lang): boolean {
  return existsSync(cvFile(lang));
}
