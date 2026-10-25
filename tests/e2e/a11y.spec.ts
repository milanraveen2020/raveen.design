// Automated WCAG 2.2 A/AA checks (axe-core) on every page, plus the open menu, the lightbox and the form's error state.
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PAGES } from '../routes';

// Reduced motion from the first paint, so axe reads settled colours rather than mid-fade ones.
test.use({ reducedMotion: 'reduce' });

test.beforeEach(({}, info) => test.skip(!['chromium', 'chromium-mobile', 'webkit'].includes(info.project.name), 'a11y scan runs on three projects'));

const scan = async (page: Page) => {
  // Show scroll-revealed content so axe checks it at full opacity (as a reader sees it once scrolled).
  await page.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-in')));
  const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).exclude('astro-dev-toolbar')
    // Case studies reproduce each client's own button exactly (their colours, not ours), so it's a specimen, not UI.
    .exclude('.btn-sample').analyze();
  return r.violations.map((v) => `${v.impact} ${v.id}: ${v.help} → ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
};

for (const path of PAGES) {
  test(`axe ${path}`, async ({ page }) => {
    await page.goto(path);
    expect(await scan(page)).toEqual([]);
  });
}

test('axe: open mobile menu', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 992, 'mobile only');
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  expect(await scan(page)).toEqual([]);
});

test('axe: lightbox', async ({ page }) => {
  await page.goto('/work/websites/mintage');
  await page.getByRole('button', { name: /Enlarge image: .*desktop/ }).click();
  expect(await scan(page)).toEqual([]);
});

test('axe: contact form with errors', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Send message' }).click();
  expect(await scan(page)).toEqual([]);
});
