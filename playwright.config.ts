import { defineConfig, devices } from '@playwright/test';

// Not 4321, so a running `pnpm dev` is never mistaken for the built site.
const PORT = 4329;

export default defineConfig({
  testDir: 'tests/e2e',
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Tests run against the built site, the same files the host serves. `--ignore-lock` keeps
  // `astro preview` in the foreground (Astro 7 backgrounds it when it detects an AI agent).
  webServer: {
    command: `pnpm preview --port ${PORT} --ignore-lock`,
    url: `http://localhost:${PORT}/id/`,
    reuseExistingServer: !process.env.CI,
  },
});
