// schema.org structured data (JSON-LD). One connected graph: the site, the person and the business share
// stable @ids, so every page can point at them instead of repeating them.
// Deliberately no aggregateRating: Google ignores (and may penalise) ratings a business publishes about itself.
import { PROFILE, SERVICES, EDUCATION, FAQ } from './site';
import type { WebsiteCase } from './websites';

type Node = Record<string, unknown>;

export const ids = (site: URL) => {
  // Same form as the canonical links: no trailing slash, except the home page itself.
  const abs = (path: string) => { const u = new URL(path, site); return u.pathname === '/' ? u.href : u.href.replace(/\/$/, ''); };
  return {
    abs,
    website: abs('/') + '#website',
    person: abs('/') + '#person',
    business: abs('/') + '#business',
  };
};

/** Site-wide nodes, included on every page. */
export function baseGraph(site: URL): Node[] {
  const id = ids(site);
  const sameAs = [PROFILE.linkedin, PROFILE.behance, PROFILE.fiverr];
  return [
    {
      '@type': 'WebSite',
      '@id': id.website,
      url: id.abs('/'),
      name: 'Raveen.design',
      alternateName: 'Raveen Nanayakkara',
      description: 'Portfolio of Raveen Nanayakkara, web designer and developer.',
      inLanguage: 'en',
      publisher: { '@id': id.person },
    },
    {
      '@type': 'Person',
      '@id': id.person,
      name: PROFILE.name,
      url: id.abs('/about'),
      image: id.abs('/images/raveen-nanayakkara.jpg'),
      jobTitle: 'Web Designer & Developer',
      description: 'Web designer and developer with ten years of UI/UX engineering experience.',
      email: 'mailto:' + PROFILE.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Colombo', addressCountry: 'LK' },
      alumniOf: EDUCATION.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.org.replace(/, UK$/, '') })),
      knowsAbout: ['Web design', 'Web development', 'UI/UX design', 'Astro', 'Next.js', 'React', 'Sanity', 'Strapi', 'Medusa.js', 'E-commerce', 'Branding', 'Search engine optimization', 'Google Analytics', 'WordPress', 'Figma'],
      sameAs,
    },
    {
      '@type': 'ProfessionalService',
      '@id': id.business,
      name: 'Raveen.design',
      url: id.abs('/'),
      logo: id.abs('/apple-touch-icon.png'),
      image: id.abs('/og-hero.jpg'),
      description: 'Freelance web design and development: UI/UX-led websites, headless CMS builds, e-commerce, branding, hosting, SEO and social media campaigns.',
      founder: { '@id': id.person },
      email: PROFILE.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Colombo', addressCountry: 'LK' },
      areaServed: 'Worldwide',
      sameAs,
    },
  ];
}

export function breadcrumbs(site: URL, items: { name: string; path: string }[]): Node {
  const id = ids(site);
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: id.abs(it.path) })),
  };
}

/** A WebPage-type node for the current page, linked to the site and the person. */
export function page(site: URL, path: string, type: string, name: string, description: string, extra: Node = {}): Node {
  const id = ids(site);
  return { '@type': type, '@id': id.abs(path) + '#webpage', url: id.abs(path), name, description, isPartOf: { '@id': id.website }, about: { '@id': id.person }, inLanguage: 'en', ...extra };
}

export function servicesCatalog(site: URL): Node {
  const id = ids(site);
  return {
    '@type': 'OfferCatalog',
    '@id': id.abs('/expertise') + '#services',
    name: 'Web design and development services',
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.body, provider: { '@id': id.business } },
    })),
  };
}

export function caseStudy(site: URL, w: WebsiteCase, image: string): Node {
  const id = ids(site);
  const path = '/work/websites/' + w.slug;
  return {
    '@type': 'CreativeWork',
    '@id': id.abs(path) + '#casestudy',
    name: `${w.name} website`,
    headline: `${w.name} — website design case study`,
    description: w.summary,
    url: id.abs(path),
    image: id.abs(image),
    genre: w.category,
    creator: { '@id': id.person },
    author: { '@id': id.person },
    mainEntityOfPage: { '@id': id.abs(path) + '#webpage' },
    // Live sites link out to the real website; prototypes don't claim one.
    ...(w.prototype ? {} : { sameAs: w.url }),
    isPartOf: { '@id': id.website },
  };
}

export function caseList(site: URL, items: WebsiteCase[]): Node {
  const id = ids(site);
  return {
    '@type': 'ItemList',
    itemListElement: items.map((w, i) => ({ '@type': 'ListItem', position: i + 1, url: id.abs('/work/websites/' + w.slug), name: w.name })),
  };
}

export function faqPage(site: URL, path: string): Node {
  const id = ids(site);
  return {
    '@type': 'FAQPage',
    '@id': id.abs(path) + '#faq',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
