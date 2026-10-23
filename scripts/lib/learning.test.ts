import { describe, expect, it } from 'vitest';
import { parseProgress } from './learning';

const readme = `# Learning

<!-- PROGRESS:START -->
| Track | Progress | Selesai | Berjalan | Belum | Total |
|---|---|--:|--:|--:|--:|
| [C++ & Qt](cpp/README.md) | \`████████████░░░░░░░░\` **58%** | 30 | 1 | 21 | 52 |
| [Python](python/README.md) | \`░░░░░░░░░░░░░░░░░░░░\` **0%** | 0 | 0 | 42 | 42 |
| **Semua** | \`█████░░░░░░░░░░░░░░░\` **23%** | 30 | | | 131 |

_note_
<!-- PROGRESS:END -->
`;

describe('parseProgress', () => {
  it('reads one entry per track and skips header and summary rows', () => {
    expect(parseProgress(readme)).toEqual([
      { key: 'cpp', percent: 58, done: 30, doing: 1, todo: 21, total: 52 },
      { key: 'python', percent: 0, done: 0, doing: 0, todo: 42, total: 42 },
    ]);
  });

  it('fails loudly without the block', () => {
    expect(() => parseProgress('# nothing')).toThrow(/PROGRESS block/);
  });

  it('fails loudly on an unreadable row', () => {
    const broken = readme.replace('**58%**', 'lots');
    expect(() => parseProgress(broken)).toThrow(/Unreadable/);
  });
});
