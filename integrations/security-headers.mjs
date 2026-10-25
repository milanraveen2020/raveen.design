// Adds security headers to every response on Vercel. The Vercel adapter writes .vercel/output/config.json
// (the Build Output API routing table) and has no option for site-wide headers, so this adds a first
// route that sets them and lets routing continue.
import { readFile, writeFile } from 'node:fs/promises';

export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  // Deliberately narrow: no framing, no <base> or plugin tricks, and forms may only post back to this site.
  // Scripts are not restricted because Astro inlines small page scripts.
  'Content-Security-Policy': "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
};

export default function securityHeaders() {
  return {
    name: 'security-headers',
    hooks: {
      'astro:build:done': async ({ logger }) => {
        const file = new URL('../.vercel/output/config.json', import.meta.url);
        let config;
        try { config = JSON.parse(await readFile(file, 'utf-8')); } catch { logger.warn('No Vercel config.json found; headers not added'); return; }
        config.routes = [{ src: '/(.*)', headers: SECURITY_HEADERS, continue: true }, ...config.routes.filter((r) => !(r.headers && r.headers['X-Content-Type-Options']))];
        await writeFile(file, JSON.stringify(config, null, 2));
        logger.info('Security headers added');
      },
    },
  };
}
