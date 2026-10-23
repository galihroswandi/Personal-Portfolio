/**
 * `pnpm validate:schema`: sends every built page's HTML to the Schema.org validator
 * (validator.schema.org, run by Google) and prints errors and warnings. Needs network and a
 * build; not part of `pnpm check`. Google's Rich Results Test has no API: paste the HTML at
 * https://search.google.com/test/rich-results (or test the live URL) by hand.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const ENDPOINT = 'https://validator.schema.org/validate';

interface ValidatorResult {
  totalNumErrors: number;
  totalNumWarnings: number;
}

const pages = readdirSync(DIST, { recursive: true, encoding: 'utf8' })
  .filter((file) => file.endsWith('index.html'))
  .sort();

let failed = false;
for (const page of pages) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    body: new URLSearchParams({ html: readFileSync(join(DIST, page), 'utf8') }),
  });
  // The response starts with an anti-JSON-hijacking prefix.
  const text = (await response.text()).replace(/^\)\]\}'\s*/, '');
  const result = JSON.parse(text) as ValidatorResult;
  const problems = result.totalNumErrors + result.totalNumWarnings;
  if (problems > 0) failed = true;
  process.stdout.write(
    `${problems > 0 ? '✗' : '✓'} /${page.replace(/index\.html$/, '')}  errors ${result.totalNumErrors}, warnings ${result.totalNumWarnings}\n`,
  );
}
process.exit(failed ? 1 : 0);
