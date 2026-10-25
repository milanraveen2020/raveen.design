// Header navigation, the mobile menu, skip link, and case study previous / next links.
import { test, expect } from '@playwright/test';

test('desktop nav links go to each page and mark the current one', async ({ page, isMobile }) => {
  test.skip(!!isMobile || (page.viewportSize()?.width ?? 0) < 992, 'desktop nav');
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main' });
  for (const [label, path] of [['Work', '/work'], ['About', '/about'], ['Expertise', '/expertise'], ['Contact', '/contact'], ['Home', '/']]) {
    await nav.getByRole('link', { name: label }).click();
    await expect(page).toHaveURL(new RegExp(path === '/' ? '/$' : path + '$'));
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: label })).toHaveAttribute('aria-current', 'page');
  }
});

test('mobile menu opens, closes, traps focus and navigates', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 992, 'mobile menu only');
  await page.goto('/');
  const open = page.getByRole('button', { name: 'Open menu' });
  const menu = page.getByRole('dialog', { name: 'Menu' });
  await open.click();
  await expect(menu).toBeVisible();
  await expect(open).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
  await page.getByRole('button', { name: 'Close menu' }).click();
  await expect(menu).toBeHidden();
  await expect(open).toHaveAttribute('aria-expanded', 'false');

  await open.click();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();

  await open.click();
  await menu.getByRole('link', { name: 'Work' }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden();
});

test('mobile menu link to the current page closes the menu and resets state', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 992, 'mobile menu only');
  await page.goto('/work');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('dialog', { name: 'Menu' }).getByRole('link', { name: 'Work' }).click();
  await page.waitForLoadState('load');
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
});

test('skip link moves to main content', async ({ page, isMobile, browserName }) => {
  test.skip(!!isMobile || browserName === 'webkit', 'Tab does not focus links in WebKit by default');
  await page.goto('/about');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await skip.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('case study previous / next links cycle through projects', async ({ page }) => {
  await page.goto('/work/websites/mintage');
  const next = page.getByRole('navigation', { name: 'More projects' }).getByRole('link', { name: /Next project/ });
  const href = await next.getAttribute('href');
  expect(href).toMatch(/^\/work\/websites\/[a-z-]+$/);
  await next.click();
  await expect(page).toHaveURL(new RegExp(href! + '$'));
});

test('work cards open their case study', async ({ page }) => {
  await page.goto('/work');
  await page.getByRole('link', { name: /View Case Study/ }).first().click();
  await expect(page).toHaveURL(/\/work\/websites\/[a-z-]+$/);
  await page.waitForLoadState('load');
  expect(await page.evaluate(() => document.querySelectorAll('h1').length)).toBe(1);
});
