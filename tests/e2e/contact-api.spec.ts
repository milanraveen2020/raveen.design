// /api/contact on the real server. Only rejected or honeypot requests are sent, so no email ever goes out.
import { test, expect } from '@playwright/test';

test.beforeEach(({}, info) => test.skip(info.project.name !== 'chromium', 'API tests run once'));

const form = (fields: Record<string, string>) => fields;
const json = { Accept: 'application/json' };

test('empty post is rejected with field errors', async ({ request }) => {
  const r = await request.post('/api/contact', { form: form({}), headers: json });
  expect(r.status()).toBe(422);
  expect(Object.keys((await r.json()).errors).sort()).toEqual(['email', 'name', 'summary', 'type']);
});

test('unknown project type is rejected', async ({ request }) => {
  const r = await request.post('/api/contact', { headers: json, form: form({ name: 'QA', email: 'qa@example.com', type: '<script>alert(1)</script>', summary: 'Testing an unknown project type.' }) });
  expect(r.status()).toBe(422);
  expect((await r.json()).errors).toHaveProperty('type');
});

test('email header injection is rejected', async ({ request }) => {
  const r = await request.post('/api/contact', { headers: json, form: form({ name: 'QA', email: 'x>,evil@example.com', type: 'E-commerce store', summary: 'Trying to add a second reply-to.' }) });
  expect(r.status()).toBe(422);
});

test('posts from another site are refused', async ({ request }) => {
  const r = await request.post('/api/contact', { headers: { ...json, Origin: 'https://evil.example' }, form: form({ name: 'QA' }) });
  expect(r.status()).toBe(403);
});

test('honeypot submissions are accepted silently (and not emailed)', async ({ request }) => {
  const r = await request.post('/api/contact', { headers: json, form: form({ company: 'Spam Inc' }) });
  expect(r.status()).toBe(200);
  expect(await r.json()).toEqual({ ok: true });
});

test('a plain form post (no JavaScript) is redirected back to the contact page', async ({ request }) => {
  const r = await request.post('/api/contact', { form: form({}), maxRedirects: 0 });
  expect(r.status()).toBe(303);
  expect(r.headers()['location']).toBe('/contact?error=1#send-error');
});

test('GET is not allowed', async ({ request }) => {
  const r = await request.get('/api/contact');
  expect([404, 405]).toContain(r.status());
});
