/** Design tokens for code that runs at build time (head tags, manifest, generated images). */
import { readFileSync } from 'node:fs';
import { parseThemeTokens, token } from '@/lib/tokens';

const tokens = parseThemeTokens(readFileSync('src/styles/tokens.css', 'utf8'));

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

/** Page background per theme, for the `theme-color` tags and the favicon. */
export const themeColors = {
  dark: { surface: token(dark, 'surface'), ink: token(dark, 'ink') },
  light: { surface: token(tokens.light, 'surface'), ink: token(tokens.light, 'ink') },
} as const;
