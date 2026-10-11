import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { emulateReducedMotion, readCls, scrollThrough, trackCls } from './helpers';

const THEME_KEY = 'gr-theme';
const TOGGLE = '[data-theme-toggle]:visible';
/** Saves a theme choice before the page loads, as if the visitor had pressed the toggle. */
async function storeTheme(page: Page, theme: 'light' | 'dark'): Promise<void> {
  await page.addInitScript(({ key, value }) => localStorage.setItem(key, value), {
    key: THEME_KEY,
    value: theme,
  });
}
const themeOf = (page: Page) => page.locator('html').getAttribute('data-theme');

test.describe('initial theme', () => {
  for (const scheme of ['light', 'dark'] as const) {
    test(`follows the ${scheme} system setting, set before first paint`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      // Records when <html data-theme> first appears, to compare with the first paint.
      await page.addInitScript(() => {
        const store = window as unknown as { __themeAt?: number };
        new MutationObserver(() => {
          store.__themeAt ??= performance.now();
        }).observe(document, { attributes: true, subtree: true, attributeFilter: ['data-theme'] });
      });
      await page.goto('/en/');
      await expect(page.locator('html')).toHaveAttribute('data-theme', scheme);
      await page.waitForFunction(() => performance.getEntriesByName('first-paint').length > 0);
      const { themeAt, paintAt } = await page.evaluate(() => ({
        themeAt: (window as unknown as { __themeAt?: number }).__themeAt,
        paintAt: performance.getEntriesByName('first-paint')[0]?.startTime,
      }));
      expect(themeAt).toBeDefined();
      expect(themeAt).toBeLessThan(paintAt ?? 0);
      const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      expect(background).toBe(scheme === 'light' ? 'rgb(245, 247, 250)' : 'rgb(14, 19, 24)');
      await expect(page.locator('html')).toHaveCSS('color-scheme', scheme);
    });
  }

  test('a stored choice beats the system setting', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.addInitScript((key) => localStorage.setItem(key, 'dark'), THEME_KEY);
    await page.goto('/id/');
    expect(await themeOf(page)).toBe('dark');
  });

  test('an invalid stored value is ignored', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.addInitScript((key) => localStorage.setItem(key, 'blue'), THEME_KEY);
    await page.goto('/id/');
    expect(await themeOf(page)).toBe('light');
  });

  test('without JavaScript the page follows the system setting', async ({ browser }) => {
    for (const scheme of ['light', 'dark'] as const) {
      const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: scheme });
      const page = await context.newPage();
      await page.goto('/id/');
      await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.+/);
      await expect(page.locator('body')).toHaveCSS(
        'background-color',
        scheme === 'light' ? 'rgb(245, 247, 250)' : 'rgb(14, 19, 24)',
      );
      await expect(page.locator('html')).toHaveCSS('color-scheme', scheme);
      await expect(page.locator('[data-theme-toggle]').first()).toBeHidden();
      await context.close();
    }
  });
});

test.describe('toggle', () => {
  test('switches, persists across reload and across /id <-> /en', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/en/');
    const toggle = page.locator(TOGGLE);
    await expect(toggle).toHaveAttribute('aria-label', 'Switch to light theme');
    await expect(toggle).not.toHaveAttribute('aria-pressed', /.*/);

    await toggle.click();
    expect(await themeOf(page)).toBe('light');
    await expect(toggle).toHaveAttribute('aria-label', 'Switch to dark theme');
    await expect(page.getByRole('status')).toHaveText('Light theme on');
    expect(await page.evaluate((key) => localStorage.getItem(key), THEME_KEY)).toBe('light');
    await expect(page.locator('meta[name="theme-color"]')).toHaveCount(1);
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#f5f7fa');

    await page.reload();
    expect(await themeOf(page)).toBe('light');

    await page.locator('[data-lang-choice="id"]:visible').click();
    await expect(page).toHaveURL(/\/id\/$/);
    expect(await themeOf(page)).toBe('light');
    await expect(page.locator(TOGGLE)).toHaveAttribute('aria-label', 'Ganti ke tema gelap');

    await page.locator(TOGGLE).click();
    expect(await themeOf(page)).toBe('dark');
    await expect(page.getByRole('status')).toHaveText('Tema gelap aktif');
  });

  test('is keyboard operable and keeps focus', async ({ page }) => {
    await page.goto('/en/');
    const toggle = page.locator(TOGGLE);
    await toggle.focus();
    const before = await themeOf(page);
    await page.keyboard.press('Enter');
    expect(await themeOf(page)).not.toBe(before);
    await expect(toggle).toBeFocused();
    await page.keyboard.press('Space');
    expect(await themeOf(page)).toBe(before);
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveCSS('outline-style', 'solid');
  });

  test('another tab changes the theme (storage event)', async ({ context }) => {
    const first = await context.newPage();
    await first.goto('/en/');
    const second = await context.newPage();
    await second.goto('/en/');
    await second.locator(TOGGLE).click();
    const expected = await themeOf(second);
    await expect.poll(() => themeOf(first)).toBe(expected);
  });

  test('follows the OS setting until a choice is made', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/en/');
    await page.emulateMedia({ colorScheme: 'light' });
    await expect.poll(() => themeOf(page)).toBe('light');
    await page.locator(TOGGLE).click();
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForTimeout(100);
    expect(await themeOf(page)).toBe('dark'); // the click chose dark; the OS agrees anyway
    await page.locator(TOGGLE).click();
    await page.emulateMedia({ colorScheme: 'light' });
    await page.waitForTimeout(100);
    expect(await themeOf(page)).toBe('light'); // chosen light
    await page.locator(TOGGLE).click(); // choose dark explicitly
    await page.emulateMedia({ colorScheme: 'light' });
    await page.waitForTimeout(100);
    expect(await themeOf(page)).toBe('dark');
  });

  test('colors fade only after a press, and never with reduced motion', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('html')).not.toHaveClass(/theme-transition/);
    await page.locator(TOGGLE).click();
    await expect(page.locator('html')).toHaveClass(/theme-transition/);
    await expect(page.locator('body')).toHaveCSS('transition-duration', '0.2s');
    await expect(page.locator('html')).not.toHaveClass(/theme-transition/);

    await emulateReducedMotion(page);
    await page.reload();
    await page.locator(TOGGLE).click();
    await expect(page.locator('body')).toHaveCSS('transition-duration', '0s');
  });

  test('is paused-aware: no color fade while motion is paused', async ({ page }) => {
    await page.goto('/en/');
    await page.getByRole('button', { name: 'Pause motion' }).click();
    await page.locator(TOGGLE).click();
    await expect(page.locator('body')).toHaveCSS('transition-duration', '0s');
  });

  test('CLS stays under 0.05 when the stored theme differs from the system', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.addInitScript((key) => localStorage.setItem(key, 'light'), THEME_KEY);
    await trackCls(page);
    await page.goto('/id/');
    await scrollThrough(page);
    expect(await readCls(page)).toBeLessThan(0.05);
  });
});

test.describe('reachability', () => {
  test('mobile: the toggle sits in the status strip, no menu needed', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/id/');
    const toggle = page.locator('.strip__theme');
    await expect(toggle).toBeVisible();
    await expect(page.locator('.nav__theme')).toBeHidden();
    const box = await toggle.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
    expect(box && box.x + box.width <= 390).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      390,
    );
  });

  test('desktop: the toggle sits in the navbar next to ID | EN', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/id/');
    await expect(page.locator('.nav__theme')).toBeVisible();
    await expect(page.locator('.strip__theme')).toBeHidden();
  });
});

test.describe('accessibility in both themes', () => {
  for (const theme of ['light', 'dark'] as const) {
    for (const path of ['/id/', '/en/', '/en/proyek/hmi-qt/']) {
      test(`axe: no serious or critical issues, ${theme}, ${path}`, async ({ page }) => {
        await storeTheme(page, theme);
        await page.goto(path);
        expect(await themeOf(page)).toBe(theme);
        await scrollThrough(page);
        await page.waitForTimeout(1500);
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        const blocking = results.violations.filter(
          (violation) => violation.impact === 'serious' || violation.impact === 'critical',
        );
        expect(blocking.map((violation) => `${violation.id}: ${violation.help}`)).toEqual([]);
      });
    }
  }
});

test.describe('forced colors', () => {
  test('the toggle and focus stay visible', async ({ page }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto('/en/');
    const toggle = page.locator(TOGGLE);
    await toggle.focus();
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveCSS('outline-style', 'solid');
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', /light|dark/);
  });
});

test.describe('review screenshots (docs/design)', () => {
  for (const theme of ['light', 'dark'] as const) {
    for (const width of [1440, 390] as const) {
      test(`home ${theme} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
        await emulateReducedMotion(page);
        await storeTheme(page, theme);
        await page.goto('/en/');
        await scrollThrough(page);
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.waitForTimeout(300);
        await page.screenshot({ path: `docs/design/home-${theme}-${width}.png`, fullPage: true });
      });
    }
  }
});
