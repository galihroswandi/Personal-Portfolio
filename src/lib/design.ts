/** Design tokens for code that runs at build time (head tags, manifest, generated images). */
import { readFileSync } from 'node:fs';
import { parseThemeTokens, token } from '@/lib/tokens';

const tokens = parseThemeTokens(readFileSync('src/styles/tokens.css', 'utf8'));

/** Dark is the only rendered theme (`data-theme="dark"`, decision 009). */
const dark = tokens.dark;

export const colors = {
  surface: token(dark, 'surface'),
  surfaceRaised: token(dark, 'surface-raised'),
  ink: token(dark, 'ink'),
  inkMuted: token(dark, 'ink-muted'),
  hairline: token(dark, 'hairline'),
  accent: token(dark, 'accent'),
  accentInk: token(dark, 'accent-ink'),
} as const;
