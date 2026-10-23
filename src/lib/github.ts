/** Shapes the GitHub snapshot (`src/data/github.json`) into chart rows. Pure, so it is tested. */

export interface ChartRow {
  label: string;
  value: number;
  /** Share of the largest row, 0 to 1, for the bar length. */
  ratio: number;
  /** The folded "other" row, drawn in a neutral color. */
  other?: boolean;
}

const withRatios = (rows: Omit<ChartRow, 'ratio'>[]): ChartRow[] => {
  const max = Math.max(1, ...rows.map((row) => row.value));
  return rows.map((row) => ({ ...row, ratio: row.value / max }));
};

/**
 * The `top` most used languages, most first (ties by name), and the rest folded into one row
 * labelled `otherLabel`. No "other" row when nothing is left over.
 */
export function languageRows(
  languages: Readonly<Record<string, number>>,
  top: number,
  otherLabel: string,
): ChartRow[] {
  const sorted = Object.entries(languages).sort(([a, x], [b, y]) => y - x || a.localeCompare(b));
  const rows: Omit<ChartRow, 'ratio'>[] = sorted
    .slice(0, top)
    .map(([label, value]) => ({ label, value }));
  const rest = sorted.slice(top).reduce((sum, [, value]) => sum + value, 0);
  if (rest > 0) rows.push({ label: otherLabel, value: rest, other: true });
  return withRatios(rows);
}

/** One row per year from the first year with data to `lastYear`, empty years as 0. */
export function yearRows(perYear: Readonly<Record<string, number>>, lastYear: number): ChartRow[] {
  const years = Object.keys(perYear).map(Number);
  if (years.length === 0) return [];
  const rows: Omit<ChartRow, 'ratio'>[] = [];
  for (let year = Math.min(...years); year <= lastYear; year++) {
    rows.push({ label: String(year), value: perYear[String(year)] ?? 0 });
  }
  return withRatios(rows);
}

/** The year with the most repositories (the earliest on a tie). */
export function peakRow(rows: readonly ChartRow[]): ChartRow | undefined {
  return rows.reduce<ChartRow | undefined>(
    (best, row) => (!best || row.value > best.value ? row : best),
    undefined,
  );
}
