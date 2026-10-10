import { expect, test } from '@playwright/test';
import { countAnimations, emulateReducedMotion, readCls, scrollThrough, trackCls } from './helpers';

/** Everything the reveal utility can hide. */
const REVEALABLE = '[data-reveal], [data-reveal] [class*="reveal-"]';

test.describe('motion preference', () => {
  test('pause control sets data-motion and persists across reloads', async ({ page }) => {
    await page.goto('/en/');
    const html = page.locator('html');
    const toggle = page.getByRole('button', { name: 'Pause motion' });
    await expect(html).toHaveAttribute('data-motion', 'full');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await toggle.click();
    await expect(html).toHaveAttribute('data-motion', 'paused');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect((await countAnimations(page)).runningInfinite).toBe(0);

    await page.reload();
    await expect(html).toHaveAttribute('data-motion', 'paused');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');

    await toggle.click();
    await page.reload();
    await expect(html).toHaveAttribute('data-motion', 'full');
  });

  test('reduced motion: no infinite animations, everything revealed', async ({ page }) => {
    await emulateReducedMotion(page);
    await page.goto('/id/');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
    await expect(page.locator('[data-motion-toggle]')).toBeHidden();
    expect((await countAnimations(page)).infinite).toBe(0);
    for (const element of await page.locator(REVEALABLE).all()) {
      await expect(element).toHaveCSS('opacity', '1');
    }
    await scrollThrough(page);
    expect((await countAnimations(page)).infinite).toBe(0);
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('all content is visible', async ({ page }) => {
    await page.goto('/id/');
    await expect(page.locator('html')).not.toHaveClass(/\bjs\b/);
    for (const element of await page.locator(REVEALABLE).all()) {
      await expect(element).toHaveCSS('opacity', '1');
    }
    await expect(page.locator('[data-motion-toggle]')).toBeHidden();
  });
});

test.describe('entrance and reveal', () => {
  test('every reveal plays once while scrolling', async ({ page }) => {
    await page.goto('/id/');
    await scrollThrough(page);
    await expect(page.locator('[data-reveal]:not([data-revealed])')).toHaveCount(0);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect(page.locator('[data-reveal]:not([data-revealed])')).toHaveCount(0);
    for (const element of await page.locator(REVEALABLE).all()) {
      await expect(element).toHaveCSS('opacity', '1');
    }
  });

  test('the split h1 is still one heading with the full sentence', async ({ page }) => {
    await page.goto('/en/');
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toHaveAccessibleName(
      'Fullstack developer building data interfaces that operators understand at a glance.',
    );
    await expect(heading).toMatchAriaSnapshot(
      '- heading "Fullstack developer building data interfaces that operators understand at a glance." [level=1]',
    );
  });

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1440, height: 900 },
  ]) {
    test(`CLS stays under 0.05 at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await trackCls(page);
      await page.goto('/id/', { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await scrollThrough(page);
      expect(await readCls(page)).toBeLessThan(0.05);
    });
  }
});
