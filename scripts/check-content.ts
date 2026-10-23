/**
 * `pnpm check:content`: is the content ready to publish? Fails a production build
 * (VERCEL_ENV or DEPLOY_ENV = production) on unreviewed copy or placeholders; elsewhere it only
 * lists what is left.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { deployEnv } from '../src/config/env';
import { site } from '../src/config/site';
import { reviewedLangs } from '../src/i18n/ui';
import { langs } from '../src/i18n/utils';
import { cvFile } from '../src/lib/cv';
import { auditContent } from './lib/content-audit';

const CONTENT_DIR = 'src/content';

const files = readdirSync(CONTENT_DIR, { recursive: true, encoding: 'utf8' })
  .filter((path) => path.endsWith('.mdx'))
  .sort()
  .map((path) => {
    const full = join(CONTENT_DIR, path);
    return { path: full, text: readFileSync(full, 'utf8') };
  });

const { blocking, notes } = auditContent({
  files,
  siteValues: { email: site.email, availableFrom: site.availableFrom },
  socialLinks: site.social,
  reviewedLangs,
  cvExists: Object.fromEntries(langs.map((lang) => [lang, existsSync(cvFile(lang))])),
});

const production = deployEnv === 'production';
const write = (line: string) => process.stdout.write(`${line}\n`);

for (const note of notes) write(`  note  ${note}`);
for (const item of blocking) write(`  ${production ? 'error' : 'todo '} ${item}`);

if (blocking.length === 0) {
  write('check:content: ready to publish.');
} else if (production) {
  write(`check:content: ${blocking.length} item(s) block a production build.`);
  process.exit(1);
} else {
  write(
    `check:content: ${blocking.length} item(s) to finish before production (${deployEnv} build continues).`,
  );
}
