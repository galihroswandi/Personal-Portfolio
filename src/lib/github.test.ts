import { describe, expect, it } from 'vitest';
import { languageRows, peakRow, yearRows } from './github';

describe('languageRows', () => {
  it('keeps the top languages, most first, and folds the rest', () => {
    const rows = languageRows({ Go: 1, PHP: 10, JavaScript: 10, Vue: 2, CSS: 2 }, 3, 'Other');
    expect(rows.map((row) => [row.label, row.value])).toEqual([
      ['JavaScript', 10],
      ['PHP', 10],
      ['CSS', 2],
      ['Other', 3],
    ]);
    expect(rows.at(-1)?.other).toBe(true);
    expect(rows[0]?.ratio).toBe(1);
    expect(rows[2]?.ratio).toBe(0.2);
  });

  it('adds no "other" row when nothing is left over', () => {
    expect(languageRows({ TypeScript: 4 }, 6, 'Other')).toEqual([
      { label: 'TypeScript', value: 4, ratio: 1 },
    ]);
  });
});

describe('yearRows', () => {
  it('fills empty years with 0 up to the last year', () => {
    const rows = yearRows({ '2022': 9, '2023': 24, '2026': 5 }, 2026);
    expect(rows.map((row) => [row.label, row.value])).toEqual([
      ['2022', 9],
      ['2023', 24],
      ['2024', 0],
      ['2025', 0],
      ['2026', 5],
    ]);
    expect(rows[1]?.ratio).toBe(1);
  });

  it('returns nothing without data', () => {
    expect(yearRows({}, 2026)).toEqual([]);
  });
});

describe('peakRow', () => {
  it('picks the largest value, the earliest on a tie', () => {
    expect(peakRow(yearRows({ '2022': 9, '2023': 9 }, 2023))?.label).toBe('2022');
    expect(peakRow([])).toBeUndefined();
  });
});
