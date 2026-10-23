/**
 * Real modification dates for the sitemap, Open Graph and JSON-LD: frontmatter first, then the
 * git history of the source files, then the build time. Never a hand-written constant.
 */
import { execFileSync } from 'node:child_process';

const buildTime = new Date();

/** Runs `git log` and returns the ISO dates it prints (newest first), or `[]` without git. */
function gitDates(args: readonly string[], paths: readonly string[]): string[] {
  try {
    const output = execFileSync('git', ['log', ...args, '--format=%cI', '--', ...paths], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    return output.split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

function toDate(iso: string | undefined): Date | undefined {
  if (!iso) return undefined;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

/**
 * Date of the last commit touching any of `paths`. In a shallow clone (Vercel) an older change
 * shows up as the oldest fetched commit: later than the truth, never earlier. Uncommitted
 * files fall back to the build time.
 */
export function lastModified(paths: readonly string[], explicit?: Date): Date {
  return explicit ?? toDate(gitDates(['-1'], paths)[0]) ?? buildTime;
}

/** Date of the commit that first added `path`, or the build time for a new file. */
export function firstPublished(path: string, explicit?: Date): Date {
  return explicit ?? toDate(gitDates(['--diff-filter=A', '--follow'], [path]).at(-1)) ?? buildTime;
}

/** `YYYY-MM-DD`, the precision used in the sitemap and structured data. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
