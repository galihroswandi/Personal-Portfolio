/**
 * Content readiness: unreviewed translations and leftover placeholders. In a production build
 * every finding is an error; elsewhere they are reported as warnings.
 */
import { findPlaceholders, isRealUrl } from '../../src/lib/placeholders';

export interface ContentFile {
  /** Repo-relative path. */
  path: string;
  text: string;
}

export interface ContentInputs {
  files: readonly ContentFile[];
  /** Site config values that are shown on the page. */
  siteValues: Record<string, string>;
  socialLinks: Record<string, string>;
  reviewedLangs: Record<string, boolean>;
  /** Whether each language's CV PDF exists (otherwise the download buttons are hidden). */
  cvExists: Record<string, boolean>;
}

/** `reviewed: false` in an MDX file's frontmatter. */
function isUnreviewed(text: string): boolean {
  const frontmatter = /^---\n([\s\S]*?)\n---/.exec(text)?.[1] ?? '';
  return /^reviewed:\s*false\s*$/m.test(frontmatter);
}

/** Placeholders outside YAML comments (`# TODO(review): …`) and YAML lists (`stack: [a, b]`). */
function placeholdersIn(text: string): string[] {
  const withoutComments = text
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('#') && !/^\w+:\s*\[.*\]\s*$/.test(line))
    .join('\n');
  return findPlaceholders(withoutComments);
}

export interface ContentFindings {
  /** Must be fixed before production. */
  blocking: string[];
  /** Fine to ship, worth knowing. */
  notes: string[];
}

export function auditContent(inputs: ContentInputs): ContentFindings {
  const blocking: string[] = [];
  const notes: string[] = [];

  for (const [lang, reviewed] of Object.entries(inputs.reviewedLangs)) {
    if (!reviewed)
      blocking.push(`src/i18n/ui.ts: "${lang}" strings are not reviewed (reviewedLangs)`);
  }
  for (const file of inputs.files) {
    if (isUnreviewed(file.text)) blocking.push(`${file.path}: reviewed: false`);
    const found = placeholdersIn(file.text);
    if (found.length > 0)
      blocking.push(`${file.path}: placeholders ${[...new Set(found)].join(', ')}`);
  }
  for (const [key, value] of Object.entries(inputs.siteValues)) {
    if (findPlaceholders(value).length > 0)
      blocking.push(`src/config/site.ts: ${key} is "${value}"`);
  }
  for (const [lang, exists] of Object.entries(inputs.cvExists)) {
    if (!exists) notes.push(`public/cv: no ${lang} CV; download buttons hidden`);
  }
  for (const [name, url] of Object.entries(inputs.socialLinks)) {
    if (!isRealUrl(url)) notes.push(`src/config/site.ts: social.${name} not set; link hidden`);
  }
  return { blocking, notes };
}
