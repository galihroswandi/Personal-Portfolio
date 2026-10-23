/**
 * Theme: `dark` (the console look) or `light`, mirrored on `<html data-theme>`. All colors come
 * from tokens (src/styles/tokens.css), so components never branch on the theme.
 * The pure helpers take their inputs as arguments so they can be tested without a browser.
 */

export const THEMES = ['dark', 'light'] as const;
export type Theme = (typeof THEMES)[number];

/** localStorage key that remembers the toggle. Also read by the inline script (ThemeScript). */
export const THEME_STORAGE_KEY = 'gr-theme';

/**
 * Which theme a visitor without a saved choice starts in.
 * - `system`: follow `prefers-color-scheme` (default; respects the visitor's settings).
 * - `dark`: always start dark, the brand look (change this one value; see decision 034).
 */
export type InitialThemeStrategy = 'system' | 'dark';
export const INITIAL_THEME_STRATEGY: InitialThemeStrategy = 'system';

/** How long the press-only color transition class stays on `<html>` (motion.css). */
export const THEME_TRANSITION_MS = 250;

const LIGHT_QUERY = '(prefers-color-scheme: light)';

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

/** A stored value if it is a known theme; anything else (including garbage) is ignored. */
export function parseTheme(value: unknown): Theme | null {
  return THEMES.find((theme) => theme === value) ?? null;
}

/** The saved choice wins over the system setting; with no usable choice the strategy decides. */
export function resolveInitialTheme(
  stored: unknown,
  systemPrefersLight: boolean,
  strategy: InitialThemeStrategy = INITIAL_THEME_STRATEGY,
): Theme {
  const saved = parseTheme(stored);
  if (saved) return saved;
  return strategy === 'system' && systemPrefersLight ? 'light' : 'dark';
}

export function otherTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark';
}

/** Reads the saved choice. Blocked or missing storage counts as "no choice". */
export function readStoredTheme(storage: StorageLike | null): Theme | null {
  try {
    return parseTheme(storage?.getItem(THEME_STORAGE_KEY));
  } catch {
    return null;
  }
}

/** Saves the choice. Returns false when storage is blocked (the choice then lasts a page). */
export function writeStoredTheme(storage: StorageLike | null, theme: Theme): boolean {
  try {
    if (!storage) return false;
    storage.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
}

function getStorage(): StorageLike | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

const systemPrefersLight = () => window.matchMedia(LIGHT_QUERY).matches;

export function getStoredTheme(): Theme | null {
  return readStoredTheme(getStorage());
}

/** The theme on screen: what the head script (or a later change) wrote on `<html>`. */
export function getTheme(): Theme {
  return (
    parseTheme(document.documentElement.dataset.theme) ??
    resolveInitialTheme(getStoredTheme(), systemPrefersLight())
  );
}

/**
 * Keeps one `theme-color` tag that matches the page. The server renders one tag per color scheme
 * (the baseline without JavaScript); once a theme is applied, the first tag is made unconditional
 * and the others are removed, so the browser bar follows the toggle and not the OS.
 */
function syncThemeColor(): void {
  const [first, ...rest] = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');
  if (!first) return;
  for (const extra of rest) extra.remove();
  first.removeAttribute('media');
  first.content = getComputedStyle(document.documentElement).getPropertyValue('--surface').trim();
}

/**
 * Source of the blocking head script (ThemeScript.astro): sets `<html data-theme>` before first
 * paint. Built from the same constants as the functions above and kept tiny (a test checks the
 * size and that it agrees with resolveInitialTheme). Wrapped in a block so its `let` does not
 * collide with the top-level declarations of other inline scripts.
 */
export function themeInitScript(
  storageKey: string = THEME_STORAGE_KEY,
  strategy: InitialThemeStrategy = INITIAL_THEME_STRATEGY,
): string {
  const system =
    strategy === 'system' ? `matchMedia("${LIGHT_QUERY.replace(/ /g, '')}").matches?"light":` : '';
  return (
    `{let s;try{s=localStorage.getItem(${JSON.stringify(storageKey)})}catch{}` +
    `document.documentElement.dataset.theme=s=="light"||s=="dark"?s:${system}"dark"}`
  );
}

/** Writes the theme on `<html>` (does not save it). */
export function applyTheme(theme: Theme): Theme {
  document.documentElement.dataset.theme = theme;
  syncThemeColor();
  return theme;
}

/**
 * Switches to the other theme and saves the choice. The `theme-transition` class (motion.css)
 * fades the colors for a moment, only here: never on load, and the CSS skips it unless motion
 * is 'full'.
 */
export function toggleTheme(): Theme {
  const root = document.documentElement;
  root.classList.add('theme-transition');
  window.setTimeout(() => root.classList.remove('theme-transition'), THEME_TRANSITION_MS);
  const theme = applyTheme(otherTheme(getTheme()));
  writeStoredTheme(getStorage(), theme);
  return theme;
}

/**
 * Follows changes made elsewhere: another tab (`storage` event) and, until the visitor has made
 * a choice, the OS setting.
 */
export function syncThemeAcrossSources(): void {
  window.addEventListener('storage', (event) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    applyTheme(resolveInitialTheme(event.newValue, systemPrefersLight()));
  });
  window.matchMedia(LIGHT_QUERY).addEventListener('change', (event) => {
    if (getStoredTheme()) return;
    applyTheme(resolveInitialTheme(null, event.matches));
  });
  syncThemeColor();
}
