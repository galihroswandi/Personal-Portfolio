/**
 * `pnpm data:github`: snapshots the owner's public GitHub data into `src/data/github.json`.
 * The build reads the snapshot, never the API, so it stays offline-safe and rate-limit free.
 * Only own (non-fork) public repositories count. Run it again to refresh, then commit the file.
 */
import { writeFileSync } from 'node:fs';
import { githubUser } from '../src/config/github';

interface ApiRepo {
  name: string;
  fork: boolean;
  language: string | null;
  created_at: string;
  pushed_at: string;
  stargazers_count: number;
  homepage: string | null;
  html_url: string;
}

const api = async <T>(path: string): Promise<T> => {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-snapshot' },
  });
  if (!response.ok) throw new Error(`GitHub ${path}: ${response.status}`);
  return (await response.json()) as T;
};

const user = await api<{ created_at: string; html_url: string }>(`/users/${githubUser}`);
const repos = (await api<ApiRepo[]>(`/users/${githubUser}/repos?per_page=100`)).filter(
  (repo) => !repo.fork,
);

const languages: Record<string, number> = {};
const reposPerYear: Record<string, number> = {};
for (const repo of repos) {
  if (repo.language) languages[repo.language] = (languages[repo.language] ?? 0) + 1;
  const year = repo.created_at.slice(0, 4);
  reposPerYear[year] = (reposPerYear[year] ?? 0) + 1;
}

const snapshot = {
  fetchedAt: new Date().toISOString().slice(0, 10),
  profileUrl: user.html_url,
  memberSince: user.created_at.slice(0, 10),
  publicRepos: repos.length,
  languages,
  reposPerYear,
  repos: Object.fromEntries(
    repos.map((repo) => [
      repo.name,
      {
        url: repo.html_url,
        homepage: repo.homepage || null,
        language: repo.language,
        stars: repo.stargazers_count,
        createdAt: repo.created_at.slice(0, 10),
      },
    ]),
  ),
};

writeFileSync('src/data/github.json', `${JSON.stringify(snapshot, null, 2)}\n`);
process.stdout.write(
  `data:github: ${repos.length} public repos, ${Object.keys(languages).length} languages.\n`,
);
