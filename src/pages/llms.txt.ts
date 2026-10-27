// llms.txt (https://llmstxt.org): a plain-text summary of the site for AI assistants and answer engines,
// built from the same data as the pages so it never drifts from them. No prices or working hours.
import type { APIRoute } from 'astro';
import { PROFILE, SERVICES, FAQ_HOME, FAQ, FAQ_CONTACT, FIVERR_RATING, DESCRIPTIONS } from '../data/site';
import { WEBSITES } from '../data/websites';
import { ids } from '../data/schema';

export const GET: APIRoute = ({ site }) => {
  const url = ids(site!).abs;
  const faqs = [...FAQ_HOME, ...FAQ, ...FAQ_CONTACT].map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n');
  const body = `# Raveen.design

> ${PROFILE.name} is a freelance web designer and developer with ten years of UI/UX engineering experience (MillenniumIT ESP, Parkway Labs), who designs and builds fast, modern websites for businesses with Astro or Next.js and a headless CMS (Sanity, Strapi), builds online stores (Medusa.js), and handles branding, hosting, SEO, Google Analytics and social media campaigns. Raveen works remotely with clients worldwide and is rated ${FIVERR_RATING.score} across ${FIVERR_RATING.count} client reviews on Fiverr.

## Main pages

- [Home](${url('/')}): ${DESCRIPTIONS['/']}
- [Work](${url('/work')}): ${DESCRIPTIONS['/work']}
- [Expertise](${url('/expertise')}): ${DESCRIPTIONS['/expertise']}
- [About](${url('/about')}): ${DESCRIPTIONS['/about']}
- [Contact](${url('/contact')}): ${DESCRIPTIONS['/contact']}

## Services

${SERVICES.map((s) => `- ${s.title}: ${s.body}`).join('\n')}

## Case studies

${WEBSITES.map((w) => `- [${w.name}](${url('/work/websites/' + w.slug)})${w.prototype ? ' (prototype)' : ''}: ${w.summary}`).join('\n')}

## Contact

- Contact form: ${url('/contact')}
- Email: ${PROFILE.email}
- WhatsApp: ${PROFILE.phone}
- LinkedIn: ${PROFILE.linkedin}
- Behance: ${PROFILE.behance}
- Fiverr: ${PROFILE.fiverr}

## Frequently asked questions

${faqs}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
