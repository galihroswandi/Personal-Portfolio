import { describe, expect, it } from 'vitest';
import { REVEAL_MAX_STEPS, revealStyle, splitWords, staggerIndex } from './reveal';

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

describe('splitWords', () => {
  it('keeps the whitespace so the sentence is unchanged', () => {
    const parts = splitWords('Fullstack developer  yang ');
    expect(parts.map((part) => part.text).join('')).toBe('Fullstack developer  yang ');
    expect(parts.filter((part) => part.word).map((part) => part.text)).toEqual([
      'Fullstack',
      'developer',
      'yang',
    ]);
  });
});
