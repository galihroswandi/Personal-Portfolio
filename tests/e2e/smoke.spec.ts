import { expect, test } from '@playwright/test';

const pages = [
  { path: '/id/', lang: 'id' },
  { path: '/en/', lang: 'en' },
] as const;

for (const { path, lang } of pages) {
  test.describe(`home (${lang})`, () => {
    test('renders with language and alternates', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/Galih Roswandi/);
      for (const hreflang of ['id', 'en', 'x-default']) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`)).toHaveCount(1);
      }
    });
  });
}

for (const { path, lang } of pages) {
  test.describe(`learning (${lang})`, () => {
    test('shows progress per track and links back home', async ({ page }) => {
      await page.goto(`${path}belajar/`);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('.track')).toHaveCount(3);
      await expect(page.locator('.track__percent').first()).toHaveText(/^\d+%$/);
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
    });

    test('is linked from the GitHub section', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator(`#github a[href="${path}belajar/"]`)).toBeVisible();
    });
  });
}
