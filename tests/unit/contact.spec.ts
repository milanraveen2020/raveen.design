// Contact form rules (src/lib/contact.ts), shared by the browser and the API.
import { test, expect } from '@playwright/test';
import { clean, validate, headerSafe, escapeHtml, LIMITS } from '../../src/lib/contact';

const TYPES = ['Website design & development', 'E-commerce store'];
const ok = { name: 'Ana', email: 'ana@example.com', type: 'E-commerce store', summary: 'A new online shop for my brand.', url: '' };

test('a complete enquiry is valid', () => {
  expect(validate(ok, TYPES)).toEqual({});
});

test('missing fields are reported', () => {
  expect(Object.keys(validate(clean(() => ''), TYPES)).sort()).toEqual(['email', 'name', 'summary', 'type']);
});

test('whitespace-only fields count as empty', () => {
  const e = clean((k) => (k === 'name' ? '   ' : (ok as Record<string, string>)[k]));
  expect(validate(e, TYPES)).toEqual({ name: 'Please enter your name' });
});

test('project type must be one of the offered options', () => {
  expect(validate({ ...ok, type: 'Something else' }, TYPES)).toHaveProperty('type');
});

test('summary needs at least 10 characters', () => {
  expect(validate({ ...ok, summary: 'Too short' }, TYPES)).toHaveProperty('summary');
  expect(validate({ ...ok, summary: 'Long enough' }, TYPES)).toEqual({});
});

for (const email of ['plain', 'a@b', 'a b@c.com', 'a@@b.com', 'x>,evil@y.com', 'a@b.com,c@d.com', '"a"@b.com', 'a@b.com>']) {
  test(`rejects email ${JSON.stringify(email)}`, () => expect(validate({ ...ok, email }, TYPES)).toHaveProperty('email'));
}
for (const email of ['ana@example.com', 'first.last+tag@sub.example.co.uk']) {
  test(`accepts email ${email}`, () => expect(validate({ ...ok, email }, TYPES)).toEqual({}));
}

test('fields are trimmed and capped', () => {
  const e = clean((k) => (k === 'summary' ? '  ' + 'x'.repeat(9000) : ' Ana '));
  expect(e.name).toBe('Ana');
  expect(e.summary.length).toBe(LIMITS.summary);
});

test('names are made safe for email headers', () => {
  expect(headerSafe('Ana\r\nBcc: evil@x.com')).toBe('Ana Bcc evil@x.com');
  expect(headerSafe('Evil <a@b.com>, c@d.com')).toBe('Evil a@b.com c@d.com');
  expect(headerSafe('  ')).toBe('Website visitor');
});

test('HTML is escaped', () => {
  expect(escapeHtml('<img src=x onerror="alert(1)">')).toBe('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
});
