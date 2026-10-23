import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const cases = [
  { path: '/id/', open: 'Lihat CV', title: 'Pratinjau CV', pdf: '/cv/galih-roswandi-id.pdf' },
  { path: '/en/', open: 'View CV', title: 'CV preview', pdf: '/cv/galih-roswandi-en.pdf' },
] as const;

for (const { path, open, title, pdf } of cases) {
  test.describe(`CV preview (${path})`, () => {
    test('opens from both buttons, shows the CV and offers the PDF', async ({ page }) => {
      await page.goto(path);
      const dialog = page.getByRole('dialog', { name: title });
      await expect(dialog).toBeHidden();

      for (const button of await page.getByRole('link', { name: open }).all()) {
        await button.click();
        await expect(dialog).toBeVisible();
        const image = dialog.getByRole('img');
        await expect(image).toHaveAttribute('src', pdf.replace('.pdf', '-preview.webp'));
        await expect
          .poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
          .toBeGreaterThan(0);
        await expect(dialog.getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
          'href',
          pdf,
        );
        await page.keyboard.press('Escape');
        await expect(dialog).toBeHidden();
      }
    });

    test('closes with the buttons and the backdrop, and returns focus', async ({ page }) => {
      await page.goto(path);
      const dialog = page.getByRole('dialog', { name: title });
      const opener = page.getByRole('link', { name: open }).first();
      await opener.click();
      await dialog
        .getByRole('button', { name: /Tutup|Close/ })
        .first()
        .click();
      await expect(dialog).toBeHidden();
      await expect(opener).toBeFocused();

      await opener.click();
      await page.mouse.click(5, 5);
      await expect(dialog).toBeHidden();
    });

    test('has no serious accessibility issues while open, in both themes', async ({ page }) => {
      for (const scheme of ['dark', 'light'] as const) {
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto(path);
        await page.getByRole('link', { name: open }).first().click();
        await expect(page.getByRole('dialog', { name: title })).toBeVisible();
        const results = await new AxeBuilder({ page }).analyze();
        const serious = results.violations.filter((v) =>
          ['serious', 'critical'].includes(v.impact ?? ''),
        );
        expect(serious, JSON.stringify(serious.map((v) => v.id))).toEqual([]);
      }
    });
  });
}

test('without JavaScript the CV buttons still download the PDF', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/id/');
  const links = page.getByRole('link', { name: 'Lihat CV' });
  await expect(links).toHaveCount(2);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('href', '/cv/galih-roswandi-id.pdf');
    await expect(link).toHaveAttribute('download', '');
  }
  await context.close();
});
