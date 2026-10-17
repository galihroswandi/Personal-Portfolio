/**
 * Placeholder detection. Seeded copy marks missing facts as `[isi …]`, `[email Anda]`,
 * `[TANGGAL]`; unset links are `#`. None of it may reach a production build.
 */

/** Bracketed text that is not a Markdown link (`[text](url)`) and not the email's `[at]`. */
const PLACEHOLDER = /\[(?!at\])[^\]\n]{1,80}\](?!\()/g;

/** Every placeholder in `text`, in order. */
export function findPlaceholders(text: string): string[] {
  return text.match(PLACEHOLDER) ?? [];
}

export function hasPlaceholder(text: string): boolean {
  return findPlaceholders(text).length > 0;
}

/** A link the owner has actually filled in (absolute http or https URL). */
export function isRealUrl(value: string): boolean {
  return /^https?:\/\/[^\s/]+\.[^\s]+$/.test(value);
}
