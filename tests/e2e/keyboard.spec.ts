// Keyboard users can reach every control by Tab and always see where focus is.
import { test, expect } from '@playwright/test';

test.beforeEach(({}, info) => test.skip(!['chromium', 'firefox'].includes(info.project.name), 'desktop keyboard (WebKit skips links on Tab by default)'));

for (const path of ['/', '/work', '/about', '/expertise', '/contact', '/work/websites/mintage']) {
  test(`visible focus on every tab stop: ${path}`, async ({ page }) => {
    await page.goto(path);
    const missing: string[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        // Stop at the end of the page (or at Astro's dev-only toolbar, which isn't part of the site).
        if (!el || el === document.body || el.tagName === 'ASTRO-DEV-TOOLBAR') return null;
        // The visible indicator may be on the element or on a styled sibling (e.g. the chip behind a hidden radio).
        const target = el.matches('.chip-input') ? (el.nextElementSibling as HTMLElement) : el;
        const s = getComputedStyle(target);
        const visible = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none';
        const id = el.tagName + '|' + (el.getAttribute('href') ?? el.getAttribute('name') ?? '') + '|' + (el.textContent ?? '').trim().slice(0, 30);
        return { id, visible };
      });
      if (!info || seen.has(info.id)) break;
      seen.add(info.id);
      if (!info.visible) missing.push(info.id);
    }
    expect(seen.size, 'reached some controls').toBeGreaterThan(3);
    expect(missing).toEqual([]);
  });
}
