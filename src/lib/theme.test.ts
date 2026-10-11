import { describe, expect, it } from 'vitest';
import {
  THEME_STORAGE_KEY,
  otherTheme,
  parseTheme,
  readStoredTheme,
  resolveInitialTheme,
  themeInitScript,
  writeStoredTheme,
} from './theme';

const throwing = {
  getItem: () => {
    throw new Error('blocked');
  },
  setItem: () => {
    throw new Error('blocked');
  },
};

describe('resolveInitialTheme', () => {
  it('a stored choice wins over the system setting', () => {
    expect(resolveInitialTheme('dark', true)).toBe('dark');
    expect(resolveInitialTheme('light', false)).toBe('light');
  });

  it('falls back to the system setting', () => {
    expect(resolveInitialTheme(null, true)).toBe('light');
    expect(resolveInitialTheme(null, false)).toBe('dark');
  });

  it('ignores an invalid stored value', () => {
    expect(resolveInitialTheme('blue', true)).toBe('light');
    expect(resolveInitialTheme('', false)).toBe('dark');
    expect(resolveInitialTheme(42, false)).toBe('dark');
  });

  it('the dark strategy ignores the system setting but not a stored choice', () => {
    expect(resolveInitialTheme(null, true, 'dark')).toBe('dark');
    expect(resolveInitialTheme('light', true, 'dark')).toBe('light');
  });
});

describe('parseTheme and otherTheme', () => {
  it('accepts only known themes', () => {
    expect(parseTheme('light')).toBe('light');
    expect(parseTheme('dark')).toBe('dark');
    expect(parseTheme('system')).toBeNull();
    expect(parseTheme(undefined)).toBeNull();
  });

  it('flips', () => {
    expect(otherTheme('dark')).toBe('light');
    expect(otherTheme('light')).toBe('dark');
  });
});

describe('storage', () => {
  it('round-trips a choice', () => {
    const map = new Map<string, string>();
    const storage = {
      getItem: (key: string) => map.get(key) ?? null,
      setItem: (key: string, value: string) => void map.set(key, value),
    };
    expect(writeStoredTheme(storage, 'light')).toBe(true);
    expect(map.get(THEME_STORAGE_KEY)).toBe('light');
    expect(readStoredTheme(storage)).toBe('light');
  });

  it('is safe when localStorage throws or is missing', () => {
    expect(readStoredTheme(throwing)).toBeNull();
    expect(writeStoredTheme(throwing, 'dark')).toBe(false);
    expect(readStoredTheme(null)).toBeNull();
    expect(writeStoredTheme(null, 'dark')).toBe(false);
  });
});

describe('themeInitScript', () => {
  function run(
    stored: string | 'throw' | null,
    systemLight: boolean,
    strategy?: 'system' | 'dark',
  ) {
    const document = { documentElement: { dataset: {} as Record<string, string> } };
    const localStorage = {
      getItem: () => {
        if (stored === 'throw') throw new Error('blocked');
        return stored;
      },
    };
    const matchMedia = (query: string) => {
      expect(query).toBe('(prefers-color-scheme:light)');
      return { matches: systemLight };
    };
    new Function(
      'document',
      'localStorage',
      'matchMedia',
      themeInitScript(THEME_STORAGE_KEY, strategy),
    )(document, localStorage, matchMedia);
    return document.documentElement.dataset.theme;
  }

  it('is under 400 bytes', () => {
    expect(new TextEncoder().encode(themeInitScript()).length).toBeLessThan(400);
  });

  it('agrees with resolveInitialTheme', () => {
    for (const stored of ['light', 'dark', 'blue', '', null] as const) {
      for (const systemLight of [true, false]) {
        for (const strategy of ['system', 'dark'] as const) {
          expect(run(stored, systemLight, strategy), `${stored} ${systemLight} ${strategy}`).toBe(
            resolveInitialTheme(stored, systemLight, strategy),
          );
        }
      }
    }
  });

  it('survives blocked storage', () => {
    expect(run('throw', true)).toBe('light');
    expect(run('throw', false)).toBe('dark');
  });
});
