/**
 * Build-time helpers for entrance and reveal effects. Components write the index as an inline
 * `--i` custom property; src/styles/motion.css turns it into a delay (`--i` × a stagger token).
 */

/** Card and tile siblings stagger at most this many steps, so the last one is never late. */
export const REVEAL_MAX_STEPS = 6;

/** Stack chips cascade faster and further (a tier has up to about a dozen chips). */
export const CHIP_MAX_STEPS = 12;

/** Hero h1 words: the stagger stops growing after this many words (keeps the h1 under 500ms). */
export const WORD_MAX_STEPS = 7;

/** Clamps a sibling index to `0..max`. */
export function staggerIndex(index: number, max: number = REVEAL_MAX_STEPS): number {
  return Math.min(Math.max(0, Math.floor(index)), max);
}

/** Inline style for a staggered element. */
export function revealStyle(index: number, max: number = REVEAL_MAX_STEPS): string {
  return `--i: ${staggerIndex(index, max)}`;
}

/**
 * Splits text into words and the whitespace between them. Whitespace stays plain text, so the
 * sentence keeps its spaces and reads as one sentence.
 */
export function splitWords(text: string): { word: boolean; text: string }[] {
  return text
    .split(/(\s+)/)
    .filter((part) => part.length > 0)
    .map((part) => ({ word: !/^\s+$/.test(part), text: part }));
}
