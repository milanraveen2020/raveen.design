// Whole visitor journeys, start to finish. The contact API is intercepted, so no real email is sent.
import { test, expect, type Page } from '@playwright/test';

const nav = async (page: Page, label: string) => {
  if ((page.viewportSize()?.width ?? 0) < 992) {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('dialog', { name: 'Menu' }).getByRole('link', { name: label }).click();
  } else {
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: label }).click();
  }
};

const sendEnquiry = async (page: Page) => {
  let sent: string | null = null;
  await page.route('**/api/contact', (r) => { sent = r.request().postData(); return r.fulfill({ json: { ok: true } }); });
  await page.getByLabel('Name').fill('Journey Tester');
  await page.getByLabel('Email').fill('journey@example.com');
  await page.locator('label.chip').filter({ hasText: 'Website design & development' }).click();
  await page.getByLabel('Project Summary').fill('I need a new website for my bakery with online orders.');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Thanks for reaching out.')).toBeVisible();
  expect(sent).toContain('Journey Tester');
};

test('prospect: home → work → case study → live site link → contact → enquiry sent', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Explore My Work' }).click();
  await expect(page).toHaveURL(/\/work$/);
  await page.getByRole('link', { name: /View Case Study/ }).nth(3).click();
  await expect(page).toHaveURL(/\/work\/websites\/lusterblue$/);
  const live = page.getByRole('link', { name: /Live site: LusterBlue/ });
  await expect(live).toHaveAttribute('href', 'https://lusterblue.lk/');
  await expect(live).toHaveAttribute('target', '_blank');
  await nav(page, 'Contact');
  await expect(page).toHaveURL(/\/contact$/);
  await sendEnquiry(page);
});

test('returning visitor: about → expertise FAQ → contact via FAQ link', async ({ page }) => {
  await page.goto('/about');
  await nav(page, 'Expertise');
  await expect(page).toHaveURL(/\/expertise$/);
  const q = page.locator('details.faq-item').filter({ hasText: 'Can I update the website content myself?' });
  await q.locator('summary').click();
  await expect(q.getByText('Sanity or Strapi')).toBeVisible();
  await page.locator('#faq').getByRole('link', { name: 'Get in touch' }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await sendEnquiry(page);
});

test('footer call to action leads to the contact page', async ({ page }) => {
  await page.goto('/work');
  await page.getByRole('link', { name: 'Get in Touch' }).last().click();
  await expect(page).toHaveURL(/\/contact$/);
});

test('case studies can be browsed one after another and back to all websites', async ({ page }) => {
  await page.goto('/work/websites/eternal-wedding-bells');
  const visited = new Set<string>();
  for (let i = 0; i < 3; i++) {
    visited.add(new URL(page.url()).pathname);
    await page.getByRole('navigation', { name: 'More projects' }).getByRole('link', { name: /Next project/ }).click();
    await page.waitForLoadState('load');
  }
  expect(visited.size).toBe(3);
  await page.getByRole('link', { name: 'All Websites' }).click();
  await expect(page).toHaveURL(/\/work#websites$/);
});

test('a broken link lands on a helpful 404 with a way home', async ({ page }) => {
  const res = await page.goto('/work/websites/does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.getByText('This page wandered off.')).toBeVisible();
  await page.getByRole('link', { name: 'Back to Home' }).click();
  await expect(page).toHaveURL(/\/$/);
});
