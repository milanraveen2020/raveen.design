// Every page loads cleanly: one h1, SEO basics, no script errors, every image loads, no sideways scrolling.
import { test, expect } from '@playwright/test';
import { PAGES } from '../routes';

for (const path of PAGES) {
  test(`page ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

    const res = await page.goto(path, { waitUntil: 'load' });
    expect(res?.status()).toBe(200);
    // querySelectorAll skips shadow DOM, so the Astro dev toolbar's own headings aren't counted.
    expect(await page.evaluate(() => document.querySelectorAll('h1').length), 'h1 count').toBe(1);
    await expect(page).toHaveTitle(/\S/);
    expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy();

    // Load every lazy image, then check none are broken.
    await page.evaluate(async () => {
      document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; });
      await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
    });
    const broken = await page.evaluate(() => [...document.images].filter((i) => i.getAttribute('src') && !i.naturalWidth).map((i) => i.currentSrc || i.src));
    expect(broken, 'broken images').toEqual([]);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, 'horizontal overflow in px').toBeLessThanOrEqual(0);

    expect(errors, 'console / page errors').toEqual([]);
  });
}

test('404 page is served with noindex', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

test('internal links all resolve', async ({ page, request, browserName }, info) => {
  test.skip(browserName !== 'chromium' || info.project.name !== 'chromium', 'link crawl runs once');
  const hrefs = new Set<string>();
  for (const path of PAGES) {
    await page.goto(path);
    for (const h of await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!))) hrefs.add(h.split('#')[0] || '/');
  }
  const bad: string[] = [];
  for (const h of hrefs) {
    const r = await request.get(h, { maxRedirects: 0 });
    if (r.status() !== 200) bad.push(`${h} → ${r.status()}`);
  }
  expect(bad).toEqual([]);
});

test('old URLs redirect to /work', async ({ request }) => {
  for (const old of ['/work/web-projects', '/work/national-fuel-pass', '/work/websites/tellit', '/work/websites/nbh']) {
    const r = await request.get(old, { maxRedirects: 0 });
    expect([301, 308], old).toContain(r.status());
    expect(r.headers()['location']).toMatch(/\/work$/);
  }
});
