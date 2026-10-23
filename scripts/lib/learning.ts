/**
 * Reads the progress table that `scripts/progress.py` writes into the README of the learning repo
 * (between `<!-- PROGRESS:START -->` and `<!-- PROGRESS:END -->`). Pure, so it is tested.
 */

export interface TrackProgress {
  /** Folder of the track in the repo (`cpp`, `python`, `rust`); the stable key. */
  key: string;
  /** Whole percent, 0 to 100, only finished topics counted. */
  percent: number;
  done: number;
  doing: number;
  todo: number;
  total: number;
}

const BLOCK = /<!-- PROGRESS:START -->([\s\S]*?)<!-- PROGRESS:END -->/;
/** `[C++ & Qt](cpp/README.md)` → `cpp`. */
const TRACK_LINK = /\]\(([a-z0-9-]+)\/README\.md\)/i;

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, '')
    .split('|')
    .map((cell) => cell.trim());

/** One row per track, in table order. Throws when the block or a row is not what we expect. */
export function parseProgress(readme: string): TrackProgress[] {
  const block = BLOCK.exec(readme)?.[1];
  if (!block) throw new Error('README has no PROGRESS block');
  const tracks: TrackProgress[] = [];
  for (const line of block.split('\n').filter((row) => row.startsWith('|'))) {
    const [track = '', progress = '', done = '', doing = '', todo = '', total = ''] = cells(line);
    const key = TRACK_LINK.exec(track)?.[1];
    if (!key) continue; // header, separator and the "Semua" summary row
    const percent = /\*\*(\d+)%\*\*/.exec(progress)?.[1];
    const [doneN, doingN, todoN, totalN] = [done, doing, todo, total].map(Number) as [
      number,
      number,
      number,
      number,
    ];
    if (percent === undefined || [doneN, doingN, todoN, totalN].some(Number.isNaN)) {
      throw new Error(`Unreadable progress row: ${line}`);
    }
    tracks.push({
      key,
      percent: Number(percent),
      done: doneN,
      doing: doingN,
      todo: todoN,
      total: totalN,
    });
  }
  if (tracks.length === 0) throw new Error('PROGRESS block has no track rows');
  return tracks;
}
