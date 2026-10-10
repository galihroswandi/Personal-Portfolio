/**
 * `pnpm check:seo`: audits the built site in `dist/` (run after `astro build`). Production
 * builds are stricter: no noindex outside the 404 page and no placeholder text.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { deployEnv } from '../src/config/env';
import { site } from '../src/config/site';
import { auditSite } from './lib/seo-audit';

const DIST = 'dist';

const files = readdirSync(DIST, { recursive: true, encoding: 'utf8' }).map(
  (file) => `/${file.split('\\').join('/')}`,
);

/** `/id/index.html` → `/id/`, `/404.html` → `/404/`. */
const pagePath = (file: string) =>
  file.endsWith('/index.html') ? file.slice(0, -'index.html'.length) : file.replace(/\.html$/, '/');

const pages = new Map(
  files
    .filter((file) => file.endsWith('.html'))
    .map((file) => [pagePath(file), readFileSync(join(DIST, file), 'utf8')] as const),
);

const errors = auditSite(
  {
    pages,
    files: new Set(files),
    sitemap: readFileSync(join(DIST, 'sitemap.xml'), 'utf8'),
    robots: readFileSync(join(DIST, 'robots.txt'), 'utf8'),
  },
  { origin: site.url, production: deployEnv === 'production' },
);

for (const error of errors) process.stderr.write(`  ${error}\n`);
if (errors.length > 0) {
  process.stderr.write(`check:seo: ${errors.length} problem(s) in ${pages.size} pages.\n`);
  process.exit(1);
}
process.stdout.write(`check:seo: ${pages.size} pages OK (${deployEnv}).\n`);
