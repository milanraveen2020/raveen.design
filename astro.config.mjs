// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import securityHeaders from './integrations/security-headers.mjs';
import { updatedFor } from './src/data/updated';

// https://astro.build/config
export default defineConfig({
  // The production URL: canonical links, the sitemap, robots.txt and social cards are all built from it.
  // www is the primary domain on Vercel (raveen.design redirects to it). SITE_URL overrides it.
  site: process.env.SITE_URL || 'https://www.raveen.design',
  vite: {
    // CSS browser targets for lightningcss. Safari before 18 only understands -webkit-backdrop-filter;
    // without Safari 15–17 listed, the minifier drops that prefix and the header blur disappears there.
    build: { cssTarget: ['chrome107', 'edge107', 'firefox104', 'safari15', 'ios15'] },
  },
  // One URL per page: /work, never /work/ (Vercel 308-redirects the slash version), matching every internal link.
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !/\/404\/?$/.test(page),
      // <lastmod> from src/data/updated.ts, so search engines know which pages changed.
      serialize: (item) => {
        const lastmod = updatedFor(new URL(item.url).pathname.replace(/\/$/, '') || '/');
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
    // After the Vercel adapter has written its routing file: add security headers to every response.
    securityHeaders(),
  ],
  // Pages stay static; only /api/contact runs as a Vercel function (it opts out with `prerender = false`).
  adapter: vercel(),
  // Contact form email (Resend) and analytics. Set these in Vercel → Settings → Environment Variables, and in .env locally.
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Resend's test sender only delivers to the Resend account's own email (milanraveen@gmail.com) until a domain is verified.
      CONTACT_TO: envField.string({ context: 'server', access: 'secret', default: 'milanraveen@gmail.com' }),
      CONTACT_FROM: envField.string({ context: 'server', access: 'secret', default: 'Raveen.design <onboarding@resend.dev>' }),
      // Google Analytics 4 (G-XXXXXXXXXX) and search-engine verification tokens. Baked in at build time: redeploy after changing.
      PUBLIC_GA_MEASUREMENT_ID: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_BING_SITE_VERIFICATION: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
  // Old URLs that moved.
  redirects: {
    '/work/millenniumit-esp-website': '/work/websites/millenniumit-esp',
    '/work/web-projects': '/work',
    // Product case studies, removed in favour of the website case studies.
    '/work/national-fuel-pass': '/work',
    '/work/e-motoring': '/work',
    '/work/sq-sop-management': '/work',
    '/work/websites/tellit': '/work',
    '/work/websites/nbh': '/work',
  },
});
