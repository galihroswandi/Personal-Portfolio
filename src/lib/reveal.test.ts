import { describe, expect, it } from 'vitest';
import { REVEAL_MAX_STEPS, revealStyle, splitTitleWords, staggerIndex } from './reveal';

describe('staggerIndex', () => {
  it('caps the step and never goes negative', () => {
    expect(staggerIndex(0)).toBe(0);
    expect(staggerIndex(3)).toBe(3);
    expect(staggerIndex(20)).toBe(REVEAL_MAX_STEPS);
    expect(staggerIndex(-1)).toBe(0);
    expect(staggerIndex(9, 12)).toBe(9);
  });

  it('writes the index as a custom property', () => {
    expect(revealStyle(2)).toBe('--i: 2');
    expect(revealStyle(40)).toBe(`--i: ${REVEAL_MAX_STEPS}`);
  });
});

describe('splitTitleWords', () => {
  const segments = [
    { text: 'Builds data  interfaces ', emphasis: false },
    { text: 'at a glance', emphasis: true },
    { text: '.', emphasis: false },
  ];

  it('keeps the sentence and its whitespace unchanged', () => {
    const text = splitTitleWords(segments)
      .map((token) => (token.space ? token.text : token.pieces.map((p) => p.text).join('')))
      .join('');
    expect(text).toBe('Builds data  interfaces at a glance.');
  });

  it('keeps punctuation in the same word as the emphasised text before it', () => {
    const words = splitTitleWords(segments).filter((token) => !token.space);
    expect(words).toHaveLength(6);
    expect(words.at(-1)).toEqual({
      space: false,
      pieces: [
        { text: 'glance', emphasis: true },
        { text: '.', emphasis: false },
      ],
    });
  });
});
