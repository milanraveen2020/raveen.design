// Contact form rules, shared by the browser (instant feedback) and the API (the real check).
// No imports, so it runs anywhere, including the unit tests.

export const LIMITS = { name: 120, email: 200, type: 120, summary: 5000, url: 500 } as const;
export type Field = keyof typeof LIMITS;
export type Enquiry = Record<Field, string>;

// One @, a dot in the domain, and none of the characters that would let an address break out of an email header.
const EMAIL = /^[^@\s<>,;:"()[\]\\]+@[^@\s<>,;:"()[\]\\]+\.[^@\s<>,;:"()[\]\\]+$/;

/** Trim and cap every field. */
export function clean(get: (k: Field) => unknown): Enquiry {
  const out = {} as Enquiry;
  for (const k of Object.keys(LIMITS) as Field[]) out[k] = String(get(k) ?? '').trim().slice(0, LIMITS[k]);
  return out;
}

/** Field errors, keyed by field name. Empty when the enquiry is valid. */
export function validate(e: Enquiry, types?: readonly string[]): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (!e.name) errors.name = 'Please enter your name';
  if (!EMAIL.test(e.email)) errors.email = 'Please enter a valid email address';
  if (!e.type || (types && !types.includes(e.type))) errors.type = 'Please choose a project type';
  if (e.summary.length < 10) errors.summary = 'Please add a short project summary';
  return errors;
}

/** A display name that is safe inside an email header: one line, no address or list syntax. */
export const headerSafe = (s: string) => s.replace(/[\r\n"<>,;:\\]/g, ' ').replace(/\s+/g, ' ').trim() || 'Website visitor';

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
