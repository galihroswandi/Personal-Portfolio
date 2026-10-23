/**
 * `pnpm data:learning`: snapshots the progress table of the public learning repo into
 * `src/data/learning.json`. The build reads the snapshot, never the network. Run it again to
 * refresh, then commit the file.
 */
import { writeFileSync } from 'node:fs';
import { learningRepo, learningTracks } from '../src/config/learning';
import { parseProgress } from './lib/learning';

const url = `https://raw.githubusercontent.com/${learningRepo.owner}/${learningRepo.name}/main/README.md`;
const response = await fetch(url, { headers: { 'User-Agent': 'portfolio-snapshot' } });
if (!response.ok) throw new Error(`${url}: ${response.status}`);

const tracks = parseProgress(await response.text());
for (const { key } of learningTracks) {
  if (!tracks.some((track) => track.key === key)) {
    throw new Error(`Track "${key}" (src/config/learning.ts) is not in the README progress table`);
  }
}

const snapshot = { fetchedAt: new Date().toISOString().slice(0, 10), tracks };
writeFileSync('src/data/learning.json', `${JSON.stringify(snapshot, null, 2)}\n`);
process.stdout.write(
  `data:learning: ${tracks.map((track) => `${track.key} ${track.percent}%`).join(', ')}.\n`,
);
