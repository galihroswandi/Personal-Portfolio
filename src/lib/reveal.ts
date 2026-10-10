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

export interface WordPiece {
  text: string;
  emphasis: boolean;
}

export type TitleToken = { space: true; text: string } | { space: false; pieces: WordPiece[] };

/**
 * Splits emphasised text (see `splitEmphasis`) into words and the whitespace between them, so
 * each word can be its own inline-block. A word is a run of non-space text and may cross the
 * emphasis boundary (`*a glance*.` → one word: `<em>glance</em>.`). Keeping trailing
 * punctuation inside the word's box matters: Chrome adds a space at an inline-block boundary
 * in the accessible name, which would read "glance ." instead of "glance.".
 */
export function splitTitleWords(segments: readonly WordPiece[]): TitleToken[] {
  const tokens: TitleToken[] = [];
  for (const segment of segments) {
    for (const part of segment.text.split(/(\s+)/)) {
      if (part.length === 0) continue;
      const last = tokens.at(-1);
      if (/^\s+$/.test(part)) tokens.push({ space: true, text: part });
      else if (last && !last.space) last.pieces.push({ text: part, emphasis: segment.emphasis });
      else tokens.push({ space: false, pieces: [{ text: part, emphasis: segment.emphasis }] });
    }
  }
  return tokens;
}
