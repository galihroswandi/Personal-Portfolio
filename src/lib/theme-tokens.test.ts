import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseNoJsLightTokens, parseThemeTokens } from './tokens';

const css = readFileSync('src/styles/tokens.css', 'utf8');

describe('light tokens without JavaScript', () => {
  const light = parseThemeTokens(css).light;
  const fallback = parseNoJsLightTokens(css);

  it('the prefers-color-scheme block exists and has tokens', () => {
    expect(Object.keys(fallback).length).toBeGreaterThan(10);
  });

  it('repeats every [data-theme="light"] token with the same value', () => {
    expect(fallback).toEqual(light);
  });
});
