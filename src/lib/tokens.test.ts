import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseThemeTokens, token } from './tokens';

describe('parseThemeTokens', () => {
  it('reads both themes from tokens.css', () => {
    const tokens = parseThemeTokens(readFileSync('src/styles/tokens.css', 'utf8'));
    expect(token(tokens.dark, 'surface')).toMatch(/^#[0-9a-f]{6}$/i);
    expect(token(tokens.dark, 'accent')).toMatch(/^#[0-9a-f]{6}$/i);
    expect(token(tokens.light, 'surface')).not.toBe(token(tokens.dark, 'surface'));
  });

  it('throws on a missing token', () => {
    expect(() => token({}, 'surface')).toThrow('--surface');
  });
});
