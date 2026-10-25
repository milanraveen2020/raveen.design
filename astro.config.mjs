// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Set this to your production URL so canonical links and sitemaps resolve correctly.
  site: 'https://raveen-nanayakkara.example',
  trailingSlash: 'ignore',
  // Old URLs that moved.
  redirects: {
    '/work/millenniumit-esp-website': '/work/websites/millenniumit-esp',
    // Product case studies, removed in favour of the website case studies.
    '/work/national-fuel-pass': '/work',
    '/work/e-motoring': '/work',
    '/work/sq-sop-management': '/work',
  },
});
