import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contrastRatio } from './contrast';
import { parseThemeTokens, token } from './tokens';

const themes = parseThemeTokens(readFileSync('src/styles/tokens.css', 'utf8'));

const TEXT = 4.5;
const UI = 3;

/** [foreground, background, minimum ratio] */
const pairs: [string, string, number][] = [
  ...['ink', 'ink-muted', 'ink-subtle'].flatMap((fg): [string, string, number][] =>
    ['surface', 'surface-raised', 'surface-sunken'].map((bg) => [fg, bg, TEXT]),
  ),
  ...['surface', 'surface-raised', 'accent-soft'].map((bg): [string, string, number] => [
    'accent-ink',
    bg,
    TEXT,
  ]),
  ['on-accent', 'accent', TEXT],
  ['success', 'success-soft', TEXT],
  ['danger', 'danger-soft', TEXT],
  ...['surface', 'surface-raised'].flatMap((bg): [string, string, number][] => [
    ['border-strong', bg, UI],
    ['focus-ring', bg, UI],
  ]),
  ['accent', 'surface', UI],
];

describe.each(['dark', 'light'] as const)('contrast, %s theme', (theme) => {
  it('every text pair is 4.5:1 and every UI pair 3:1', () => {
    const rows = pairs.map(([fg, bg, min]) => {
      const ratio = contrastRatio(token(themes[theme], fg), token(themes[theme], bg));
      return { fg, bg, min, ratio, ok: ratio >= min };
    });
    const failures = rows.filter((row) => !row.ok);
    const table = failures
      .map(
        (row) =>
          `${row.fg.padEnd(14)} on ${row.bg.padEnd(15)} ${row.ratio.toFixed(2)} (needs ${row.min})`,
      )
      .join('\n');
    expect(failures, `\n${theme} theme, failing pairs:\n${table}\n`).toEqual([]);
  });
});

describe('contrastRatio', () => {
  it('matches known values', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contrastRatio('#777777', '#777777')).toBe(1);
  });
});
