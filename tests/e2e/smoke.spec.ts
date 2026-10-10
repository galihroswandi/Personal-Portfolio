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
      for (const hreflang of ['id-ID', 'en-US', 'x-default']) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`)).toHaveCount(1);
      }
    });
  });
}
