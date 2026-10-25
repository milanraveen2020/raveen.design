// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // The production URL: canonical links, the sitemap, robots.txt and social cards are all built from it.
  // When a custom domain is added, set SITE_URL in Vercel (e.g. https://raveen.design) or change the default here.
  site: process.env.SITE_URL || 'https://raveendesign.vercel.app',
  // One URL per page: /work, never /work/ (Vercel 308-redirects the slash version), matching every internal link.
  trailingSlash: 'never',
  integrations: [
    sitemap({ filter: (page) => !/\/404\/?$/.test(page) }),
  ],
  // Pages stay static; only /api/contact runs as a Vercel function (it opts out with `prerender = false`).
  adapter: vercel(),
  // Contact form email (Resend). Set these in Vercel → Settings → Environment Variables, and in .env locally.
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Resend's test sender only delivers to the Resend account's own email (milanraveen@gmail.com) until a domain is verified.
      CONTACT_TO: envField.string({ context: 'server', access: 'secret', default: 'milanraveen@gmail.com' }),
      CONTACT_FROM: envField.string({ context: 'server', access: 'secret', default: 'Raveen.design <onboarding@resend.dev>' }),
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
