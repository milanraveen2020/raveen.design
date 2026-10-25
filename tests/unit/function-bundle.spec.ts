// The built Vercel function must start on its own. Inside the project, Node can quietly fall back to the
// project's node_modules, hiding files the function bundle is missing; on Vercel that becomes a 500.
// This copies the function out of the project and calls it. Run `npm run build` first (skipped otherwise).
import { test, expect } from '@playwright/test';
import { cpSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const FUNC = '.vercel/output/functions/_render.func';

test('built contact function boots in isolation', async () => {
  test.skip(!existsSync(FUNC), 'no build output: run `npm run build` first');
  const dir = mkdtempSync(join(tmpdir(), 'func-'));
  try {
    cpSync(FUNC, dir, { recursive: true });
    const { default: app } = await import(pathToFileURL(join(dir, '.vercel/output/server/entry.mjs')).href);
    const res: Response = await app.fetch(new Request('https://example.com/api/contact', {
      method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' }, body: '',
    }));
    expect(res.status).toBe(422);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
