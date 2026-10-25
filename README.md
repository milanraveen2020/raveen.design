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
- **Contact form** validates and then *simulates* sending, like the prototype. To make it real, set the form's
  `action` to an endpoint (Formspree, Netlify Forms, your API) and add `data-endpoint="real"` in `src/pages/contact.astro`.
- **Images**: expertise illustrations are in `src/images/expertise/` (named after each group title) and imported in `src/data/site.ts`; website screenshots are in `public/images/websites/`.
  The About portrait is a placeholder frame.
- Set `site` in `astro.config.mjs` to your production URL so canonical links are correct.

## Contact form (Resend)

The contact form posts to `/api/contact` (`src/pages/api/contact.ts`), a Vercel function that emails each enquiry via [Resend](https://resend.com). Every other page stays static.

1. Create a Resend API key and add it as `RESEND_API_KEY` in Vercel → Settings → Environment Variables (and in a local `.env`, see `.env.example`).
2. Enquiries go to `CONTACT_TO` (default `rmnanayakkara@yahoo.com`), with the visitor's address as Reply-To.
3. Until a domain is verified in Resend, the sender is `onboarding@resend.dev`, which only delivers to the email the Resend account was created with. After verifying a domain, set `CONTACT_FROM`, e.g. `Raveen.design <hello@yourdomain.com>`.
