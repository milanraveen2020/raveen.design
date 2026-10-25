// No page scrolls sideways or hides its navigation at common screen widths, from small phones to large desktops.
import { test, expect } from '@playwright/test';
import { PAGES } from '../routes';

const WIDTHS = [320, 375, 414, 768, 1024, 1280, 1920];

test.beforeEach(({}, info) => test.skip(info.project.name !== 'chromium', 'width sweep runs once'));

for (const path of PAGES) {
  test(`no horizontal overflow on ${path}`, async ({ page }) => {
    const bad: string[] = [];
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const r = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const over = document.documentElement.scrollWidth - vw;
        // Name the widest offender to make failures easy to fix.
        let worst = '';
        if (over > 0) for (const el of document.querySelectorAll<HTMLElement>('body *')) {
          const b = el.getBoundingClientRect();
          if (b.right > vw + 1 && getComputedStyle(el).position !== 'fixed') { worst = el.tagName.toLowerCase() + '.' + [...el.classList].join('.'); break; }
        }
        return { over, worst };
      });
      if (r.over > 0) bad.push(`${width}px: +${r.over}px (${r.worst})`);
    }
    expect(bad).toEqual([]);
  });
}

test('navigation is reachable at every width', async ({ page }) => {
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const desktop = page.getByRole('navigation', { name: 'Main' });
    const button = page.getByRole('button', { name: 'Open menu' });
    if (width >= 992) await expect(desktop, `${width}px`).toBeVisible();
    else await expect(button, `${width}px`).toBeVisible();
  }
});

// WCAG 2.2 AA (2.5.8) asks for 24×24px; most controls here meet the stricter 44px guideline too.
test('tap targets in the header and form meet the WCAG 2.2 AA minimum (24px)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/contact');
  const small = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>('header a, header button, label.chip, form button')]
      .filter((el) => el.offsetParent)
      .map((el) => ({ el: el.textContent?.trim() || el.getAttribute('aria-label'), w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height }))
      .filter((x) => x.h < 24 || x.w < 24),
  );
  expect(small).toEqual([]);
});
