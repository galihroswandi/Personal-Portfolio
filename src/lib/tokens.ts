/**
 * Reads color tokens out of `src/styles/tokens.css`, so values outside CSS (theme-color, the web
 * manifest, generated images) come from the same source as the page.
 */

export type Theme = 'dark' | 'light';

/** The custom properties declared in the block whose selector list contains `selector`. */
function blockTokens(css: string, selector: string): Record<string, string> {
  const tokens: Record<string, string> = {};
  for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const [, selectors = '', body = ''] = match;
    if (!selectors.split(',').some((part) => part.trim() === selector)) continue;
    for (const [, name, value] of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
      if (name && value) tokens[name] = value.trim();
    }
  }
  return tokens;
}

/** Color tokens per theme (`surface`, `ink`, `accent`, …). */
export function parseThemeTokens(css: string): Record<Theme, Record<string, string>> {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  return {
    dark: blockTokens(withoutComments, "[data-theme='dark']"),
    light: blockTokens(withoutComments, "[data-theme='light']"),
  };
}

/** One token, or an error naming it, so a renamed token fails the build instead of going blank. */
export function token(tokens: Record<string, string>, name: string): string {
  const value = tokens[name];
  if (!value) throw new Error(`Missing design token --${name}`);
  return value;
}
