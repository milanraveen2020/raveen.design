// QA regression suite. Run with `npm test` (starts the Astro dev server if it isn't already running).
// Browser projects cover Chrome (Chromium), Firefox and Safari (WebKit) on desktop and mobile sizes.
// Edge uses the same Chromium engine as Chrome, so the Chromium projects stand in for it.
import { defineConfig, devices } from '@playwright/test';

const PORT = 4321;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // The dev server compiles pages on first request; more workers than this cause timeouts, not real failures.
  workers: 4,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: { baseURL: `http://localhost:${PORT}`, trace: 'retain-on-failure' },
  webServer: {
    command: `npm run dev -- --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    // Pure logic tests (no browser).
    { name: 'unit', testMatch: /unit\/.*\.spec\.ts/ },
    { name: 'chromium', testMatch: /e2e\/.*\.spec\.ts/, use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'chromium-mobile', testMatch: /e2e\/.*\.spec\.ts/, use: { ...devices['Pixel 7'] } },
    { name: 'firefox', testMatch: /e2e\/.*\.spec\.ts/, use: { ...devices['Desktop Firefox'], viewport: { width: 1440, height: 900 } } },
    { name: 'webkit', testMatch: /e2e\/.*\.spec\.ts/, use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 900 } } },
    { name: 'webkit-mobile', testMatch: /e2e\/.*\.spec\.ts/, use: { ...devices['iPhone 14'] } },
    { name: 'webkit-tablet', testMatch: /e2e\/.*\.spec\.ts/, use: { ...devices['iPad (gen 7)'] } },
  ],
});
