# Raveen Nanayakkara — Portfolio (Astro)

Static Astro site converted from the React/Babel prototype in `source/`.
`source/` is kept untouched as the reference.

```
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Structure

| Path | What it is |
| --- | --- |
| `src/data/site.ts` | All copy, images, nav (was `source/site/data.jsx`) |
| `src/data/websites.ts` | Website case studies: journey, wireframe, design system, build notes |
| `public/images/websites/` | Desktop + mobile screenshots for each website (`<slug>.jpg`, `<slug>-mobile.jpg`) |
| `src/styles/tokens/` | Design-system tokens (copied from `source/_ds/.../tokens`) |
| `src/styles/global.css` | Token imports + site-level rules, `.reveal` / `.enter` motion helpers |
| `src/components/ds/` | Design-system components ported from `_ds_bundle.js` to `.astro` |
| `src/components/` | Site helpers: `Section`, `SectionHead`, `Reveal`, `PageHero`, `TimelineList`, `ExtLink` |
| `src/layouts/BaseLayout.astro` | `<head>`, header, footer variants, mail shortcut, scroll progress, reveal observer |
| `src/pages/` | `/`, `/about`, `/work`, `/work/websites/[slug]`, `/expertise`, `/contact`, `404` |

## Notes

- Hash routes (`#/work/...`) are now real routes (`/work/...`). Website case pages are generated from `WEBSITES` via `getStaticPaths`.
- Viewport-driven inline styles became CSS media queries at the design-system breakpoints (991 / 767 / 479px).
- Interactions are small vanilla scripts, so pages ship no framework JS: header blur, mobile menu, scroll reveal,
  About process stack, Expertise skill marquee, case-study lightbox, contact form.
- Icons are Lucide (`lucide-static@0.469.0`), inlined at build time by `Icon.astro`. Nothing is fetched at runtime.
- **Contact form** sends real email through `/api/contact` (see *Contact form (Resend)* below). The rules for each
  field live in `src/lib/contact.ts`, shared by the page and the API. It also works with JavaScript turned off.
- **Images**: expertise illustrations are in `src/images/expertise/` (named after each group title) and imported in `src/data/site.ts`; website screenshots are in `public/images/websites/`.
  The About portrait is `src/images/about-portrait.png`.
- Set `site` in `astro.config.mjs` to your production URL so canonical links are correct.

## Contact form (Resend)

The contact form posts to `/api/contact` (`src/pages/api/contact.ts`), a Vercel function that emails each enquiry via [Resend](https://resend.com). Every other page stays static.

1. Create a Resend API key and add it as `RESEND_API_KEY` in Vercel → Settings → Environment Variables (and in a local `.env`, see `.env.example`).
2. Enquiries go to `CONTACT_TO` (default `milanraveen@gmail.com`, the Resend account's email), with the visitor's address as Reply-To.
3. Until a domain is verified in Resend, the sender is `onboarding@resend.dev`, which only delivers to the email the Resend account was created with. After verifying a domain, set `CONTACT_FROM`, e.g. `Raveen.design <hello@yourdomain.com>`.

## Testing

Automated checks use [Playwright](https://playwright.dev) and [axe-core](https://github.com/dequelabs/axe-core). Tests start the dev server on port 4321, or reuse one that is already running.

```bash
npx playwright install     # once: downloads Chromium, Firefox and WebKit
npm test                   # full suite: every browser and device size
npm run test:chrome        # quicker: unit tests plus Chrome desktop and mobile
npm run check              # TypeScript and Astro type check
```

What's covered (`tests/`):

- `unit/`: contact form rules (validation, email-header safety, HTML escaping).
- `e2e/pages`: every page loads with one h1, SEO tags, no script errors, no broken images and no sideways scroll; all internal links and old-URL redirects work.
- `e2e/contact`, `e2e/contact-api`: the form's validation, chips, success and failure states, and no-JavaScript posting; the API's rejections (bad fields, other-site posts, honeypot). The API is never asked to send a real email.
- `e2e/navigation`, `e2e/lightbox`, `e2e/journeys`: menus, skip link, case study browsing, the image lightbox, and full visitor journeys.
- `e2e/responsive`, `e2e/keyboard`, `e2e/a11y`: widths from 320px to 1920px, visible keyboard focus, and WCAG 2.2 AA checks with axe.

Security headers for every response are added at build time by `integrations/security-headers.mjs`.
