import { expect, test } from '@playwright/test';
import { countAnimations, emulateReducedMotion, scrollThrough } from './helpers';

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
    for (const element of await page.locator('[data-reveal]').all()) {
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
    for (const element of await page.locator('[data-reveal], [data-reveal] *').all()) {
      await expect(element).toHaveCSS('opacity', '1');
    }
    await expect(page.locator('[data-motion-toggle]')).toBeHidden();
  });
});
