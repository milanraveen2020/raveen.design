// Contact form: browser validation, project-type chips, and the success / failure states.
// The API call is intercepted, so these tests never send a real email.
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => { await page.goto('/contact'); });

// The radios are visually hidden; people click the chip (its label).
const chip = (page: import('@playwright/test').Page, name: string) => page.locator('label.chip').filter({ hasText: name });

const fill = async (page: import('@playwright/test').Page) => {
  await page.getByLabel('Name').fill('QA Tester');
  await page.getByLabel('Email').fill('qa@example.com');
  await chip(page, 'E-commerce store').click();
  await page.getByLabel('Project Summary').fill('Testing the contact form end to end.');
};

test('empty submit shows field errors, not the send-failure banner', async ({ page }) => {
  let posted = false;
  await page.route('**/api/contact', (r) => { posted = true; return r.fulfill({ json: { ok: true } }); });
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Please enter your name')).toBeVisible();
  await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  await expect(page.getByText('Please choose a project type')).toBeVisible();
  await expect(page.getByText('Please add a short project summary')).toBeVisible();
  await expect(page.getByLabel('Name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('[data-form-error]')).toBeHidden();
  await expect(page.getByLabel('Name')).toBeFocused();
  expect(posted).toBe(false);
});

test('invalid email is rejected', async ({ page }) => {
  await fill(page);
  await page.getByLabel('Email').fill('not-an-email');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  await expect(page.getByLabel('Email')).toBeFocused();
});

test('project type chips behave as a single-choice radio group', async ({ page }) => {
  await chip(page, 'E-commerce store').click();
  await expect(page.getByRole('radio', { name: 'E-commerce store' })).toBeChecked();
  await chip(page, 'SEO & analytics').click();
  await expect(page.getByRole('radio', { name: 'SEO & analytics' })).toBeChecked();
  await expect(page.getByRole('radio', { name: 'E-commerce store' })).not.toBeChecked();
});

test('project type chips support arrow keys', async ({ page, isMobile }) => {
  test.skip(!!isMobile, 'keyboard test');
  // Safari doesn't focus a radio on click, so focus it the way a keyboard user would arrive.
  await chip(page, 'Website design & development').click();
  await page.getByRole('radio', { name: 'Website design & development' }).focus();
  await page.keyboard.press('ArrowRight');
  const second = page.getByRole('radio', { name: 'E-commerce store' });
  await expect(second).toBeFocused();
  await expect(second).toBeChecked();
});

test('choosing a type clears the type error', async ({ page }) => {
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Please choose a project type')).toBeVisible();
  await chip(page, 'SEO & analytics').click();
  await expect(page.getByText('Please choose a project type')).toBeHidden();
});

test('successful send shows the thank-you message', async ({ page }) => {
  let body = '';
  await page.route('**/api/contact', (r) => { body = r.request().postData() ?? ''; return r.fulfill({ json: { ok: true } }); });
  await fill(page);
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Thanks for reaching out.')).toBeVisible();
  await expect(page.locator('[data-contact-form]')).toBeHidden();
  expect(body).toContain('QA Tester');
  expect(body).toContain('E-commerce store');
});

test('server failure shows the error banner and re-enables the button', async ({ page }) => {
  await page.route('**/api/contact', (r) => r.fulfill({ status: 502, json: { ok: false, error: 'Could not send email' } }));
  await fill(page);
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.locator('[data-form-error]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send message' })).toBeEnabled();
});

test('server field errors are shown next to the fields', async ({ page }) => {
  await page.route('**/api/contact', (r) => r.fulfill({ status: 422, json: { ok: false, errors: { email: 'Please enter a valid email address' } } }));
  await fill(page);
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Please enter a valid email address')).toBeVisible();
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('an incomplete form comes back with the error message showing', async ({ page }, info) => {
    test.skip(info.project.name !== 'chromium', 'runs once');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page).toHaveURL(/\/contact\?error=1#send-error$/);
    await expect(page.locator('#send-error')).toBeVisible();
  });
});
