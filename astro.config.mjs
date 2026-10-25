// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Set this to your production URL so canonical links and sitemaps resolve correctly.
  site: 'https://raveen-nanayakkara.example',
  trailingSlash: 'ignore',
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
    // Product case studies, removed in favour of the website case studies.
    '/work/national-fuel-pass': '/work',
    '/work/e-motoring': '/work',
    '/work/sq-sop-management': '/work',
  },
});
