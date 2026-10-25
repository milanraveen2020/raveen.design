// All site copy lives here (from source/uploads/Raveen_Nanayakkara_Portfolio_Content_and_Structure.md).
// Expertise illustrations live in src/images/expertise/, named after each group's title.
import uiUxWebDesign from '../images/expertise/ui-ux-led-website-design.jpg';
import headlessCms from '../images/expertise/fast-websites-with-a-headless-cms.jpg';
import onlineStores from '../images/expertise/online-stores-and-payment-integration.jpg';
import brandKit from '../images/expertise/logo-and-brand-kit-design.jpg';
import seoAnalytics from '../images/expertise/seo-analytics-and-social-campaigns.jpg';
import uxResearch from '../images/expertise/ux-research-and-experience-planning.jpg';
import uiPrototyping from '../images/expertise/ui-design-and-prototyping.jpg';
import frontendUi from '../images/expertise/frontend-ui-development.jpg';
import wordpressBuilds from '../images/expertise/wordpress-and-website-builds.jpg';
import teamwork from '../images/expertise/working-with-product-and-engineering-teams.jpg';

export const PROFILE = {
  name: 'Raveen Nanayakkara', email: 'rmnanayakkara@yahoo.com',
  headline: 'Web Designer & Developer · UI/UX Engineer',
  linkedin: 'https://lk.linkedin.com/in/raveen-nanayakkara-262933101',
  behance: 'https://www.behance.net/raveennanayakkara',
  fiverr: 'https://www.fiverr.com/pencil_veen',
  fiverrBootstrap: 'https://www.fiverr.com/pencil_veen/design-psd-to-bootstrap-conversion',
  fiverrNext: 'https://www.fiverr.com/pencil_veen/do-a-fast-seo-friendly-next-js-website-with-a-headless-cms',
};
export const SOCIALS = [
  { icon: 'linkedin', label: 'LinkedIn', href: PROFILE.linkedin },
  { icon: 'palette', label: 'Behance', href: PROFILE.behance },
  { icon: 'briefcase-business', label: 'Fiverr', href: PROFILE.fiverr },
];

export const NAV = [
  { label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: 'About', href: '/about' },
  { label: 'Expertise', href: '/expertise' }, { label: 'Contact', href: '/contact' },
];

export const TITLES: Record<string, string> = {
  '/': 'Raveen Nanayakkara — Web Designer & Developer, UI/UX Engineer', '/about': 'About Raveen Nanayakkara',
  '/work': 'Websites & Projects — Raveen Nanayakkara', '/expertise': 'UX/UI Design & Web Development Expertise', '/contact': 'Contact Raveen Nanayakkara',
  '/work/web-projects': 'Website projects — Raveen Nanayakkara',
};

// What I offer clients (home grid). The first one is the lead service.
export const SERVICES = [
  { icon: 'panels-top-left', title: 'UI/UX-led website design',
    body: 'Ten years as a UI/UX engineer shape every page I design: clear structure, considered hierarchy, and journeys that guide visitors to get in touch or buy.' },
  { icon: 'zap', title: 'Fast websites with a headless CMS',
    body: 'High-speed sites built with Astro or Next.js, with content you can edit yourself in Sanity or Strapi.' },
  { icon: 'shopping-cart', title: 'E-commerce & payments',
    body: 'Online stores on Medusa.js or a custom shopping-cart CMS, with payment gateways integrated and tested.' },
  { icon: 'pen-tool', title: 'Branding & logo design',
    body: 'Not sure about your brand yet? I design your logo and a brand kit first, so the website starts with a clear identity.' },
  { icon: 'chart-line', title: 'SEO & analytics setup',
    body: 'Every site launches with the essentials in place: sitemaps, metadata, and Google Analytics, so you can see what is working.' },
  { icon: 'megaphone', title: 'Social media campaigns',
    body: 'Campaigns that bring the right people to your website and turn visits into leads.' },
  { icon: 'server', title: 'Hosting & ongoing care',
    body: 'I deploy, host, and look after your site, so you never have to worry about the technical side.' },
];

// Brand → Grow: how a website project runs end to end.
export const PROCESS = [
  { icon: 'pen-tool', title: 'Brand', body: 'A logo and brand kit, if you need one before the site.' },
  { icon: 'panels-top-left', title: 'Design', body: 'UI/UX-led wireframes and visual design in Figma.' },
  { icon: 'code-xml', title: 'Build', body: 'Astro or Next.js with Sanity, Strapi, or Medusa.js.' },
  { icon: 'rocket', title: 'Launch', body: 'Hosting, sitemaps, SEO basics, and Google Analytics.' },
  { icon: 'megaphone', title: 'Grow', body: 'Social media campaigns that bring leads to the site.' },
];

// Web design & development showcase (home band).
export const WEB_DESIGN = {
  label: 'Web design & development',
  title: 'Your website, handled from brand to launch.',
  lead: 'Web design and development is what I do every day. I bring ten years of UI/UX engineering to every site, build it with modern, fast technology, and take care of hosting, SEO, and analytics. You don’t need to worry about anything.',
  stack: ['Figma', 'Astro', 'Next.js', 'Sanity', 'Strapi', 'Medusa.js', 'WordPress', 'Payment gateways', 'Google Analytics', 'Illustrator'],
};

export const TIMELINE = [
  { start: '2019', end: '', role: 'Freelance Web Designer & Developer', org: 'Fiverr', body: 'Gather client requirements, design custom interfaces from scratch, and develop them into responsive websites, from design through to hosting setup. Rated 5.0 across 100 client reviews.' },
  { start: 'Jul 2026', end: '', role: 'Associate Tech Lead – UI/UX', org: 'MillenniumIT ESP', body: 'Lead UI/UX work across projects, guiding user journeys, wireframes, and interface design from requirements through to implementation, and working with development teams to keep design and build aligned.' },
  { start: 'Aug 2022', end: 'Jul 2026', role: 'Senior Engineer – UI/UX', org: 'MillenniumIT ESP', body: 'Led or coordinated assigned UI/UX deliverables against project requirements and deadlines; designed and refined user journeys; created low- and high-fidelity wireframes; implemented React UI components from Figma designs; and supported corporate WordPress website updates.' },
  { start: 'May 2019', end: 'Aug 2022', role: 'UI/UX Engineer', org: 'MillenniumIT ESP', body: 'Contributed to interface design, wireframing, user journeys, and the transition from designs into functional web interfaces. Collaborated with project stakeholders and development teams on business and client requirements.' },
  { start: 'May 2017', end: 'May 2019', role: 'UI Designer / Developer', org: 'Parkway Labs (Pvt) Ltd', body: 'Designed interfaces for web applications and websites, and designed and developed WordPress and Bootstrap themes. Also created landing pages in Figma or Sketch, supported hosting-related tasks, and produced digital assets in Photoshop and Illustrator.' },
];
export const EDUCATION = [
  { start: '2018', end: '2021', role: 'Bachelor of Computer Science', org: 'Canterbury Christ Church University, UK', body: 'Focused on building the technical foundation that supports my work across user interface engineering and web development.' },
];
// Client reviews, copied word for word from the public Fiverr profile (PROFILE.fiverr).
// Fiverr has no reviews API, so update these by hand. The first one is shown as the featured quote.
export const FIVERR_RATING = { score: '5.0', count: 100 };
export const REVIEWS = [
  { name: 'lucy_gebriel', country: 'United States', service: 'Website design & development',
    quote: 'Raveen completed exactly what I needed, covering the entire process from design to development, including the hosting setup. He was professional, responsive, and paid great attention to detail, ensuring everything was delivered on time and met my expectations perfectly. I’m very satisfied with the final result and would highly recommend his services.' },
  { name: 'carla_thompson', country: 'United States', service: 'Website design & development', repeat: true,
    quote: 'Raveen delivered exactly what I requested. This is my second time working with him, and once again the design and development were on point. Communication was smooth throughout the project, and the final result exceeded my expectations.' },
  { name: 'paola_smith5', country: 'United States', service: 'Website design & development',
    quote: 'Great experience working with Raveen. The website looks modern, professional, and works well on both desktop and mobile. Communication was clear, and the requested changes were completed quickly.' },
  { name: 'ginaexecutive78', country: 'United States', service: 'Website design & development',
    quote: 'Raveen is amazing!! Thought outside of the box for me as well! He is now my go too!!!!! Thanks Raveen!' },
];

export const RECOMMENDATIONS = [
  { person: 'Nadee Wicks', body: 'A public LinkedIn recommendation highlights Raveen’s work on the MillenniumIT ESP corporate website, along with reliability, collaboration, creative judgment, and user experience knowledge.' },
  { person: 'Sujeewa Ediriweera', body: 'A public LinkedIn recommendation highlights Raveen’s design foundations, artistic perspective, knowledge of frontend development, and ability to collaborate effectively with engineering teams.' },
];

export const SKILL_GROUPS = [
  { label: 'Web Design', title: 'UI/UX-Led Website Design', image: uiUxWebDesign.src, alt: 'Illustration of a website wireframe adapting across desktop, tablet, and phone',
    body: 'I design websites with the same UI/UX principles I have applied for ten years on enterprise and public-sector products: clear page structure, visual hierarchy, readable typography, and journeys that lead visitors to act. Every layout is planned to work from desktop to mobile.',
    tagLabel: 'Skills', tags: ['Web design', 'UX principles', 'Landing pages', 'Responsive layouts', 'Typography & hierarchy', 'Figma'] },
  { label: 'Modern Web Development', title: 'Fast Websites With a Headless CMS', image: headlessCms.src, alt: 'Illustration of CMS content flowing into a fast website deployed to the cloud',
    body: 'I build high-speed websites with Astro or Next.js and connect them to a headless CMS such as Sanity or Strapi, so clients can update content themselves. I also deploy and host the sites I build.',
    tagLabel: 'Skills', tags: ['Astro', 'Next.js', 'React JS', 'Sanity', 'Strapi', 'Hosting & deployment'] },
  { label: 'E-commerce', title: 'Online Stores & Payment Integration', image: onlineStores.src, alt: 'Illustration of an online store with a shopping cart, product pages, and card payment',
    body: 'For businesses that sell online, I build stores on Medusa.js or a custom shopping-cart CMS, and integrate the payment gateways they need.',
    tagLabel: 'Skills', tags: ['Medusa.js', 'Custom shopping-cart CMS', 'Payment gateway integration', 'Product catalogues'] },
  { label: 'Branding', title: 'Logo & Brand Kit Design', image: brandKit.src, alt: 'Illustration of a logo grid, colour swatches, and a brand guidelines book',
    body: 'When a client needs an identity before the website, I design the logo and a brand kit (colours, typography, and usage) so the site and everything around it look consistent.',
    tagLabel: 'Skills', tags: ['Logo design', 'Brand kit', 'Colour & typography', 'Adobe Illustrator', 'Adobe Photoshop'] },
  { label: 'Growth', title: 'SEO, Analytics & Social Campaigns', image: seoAnalytics.src, alt: 'Illustration of an analytics dashboard with growth charts and social media icons',
    body: 'A website should bring in business. I set up the SEO basics, such as sitemaps and metadata, connect Google Analytics, and run social media campaigns that send leads to the site.',
    tagLabel: 'Skills', tags: ['Sitemaps', 'On-page SEO', 'Google Analytics', 'Social media campaigns', 'Lead generation'] },
  { label: 'User Experience Design', title: 'UX Research & Experience Planning', image: uxResearch.src, alt: 'Illustration of a user at the centre of journeys, research, and site structure',
    body: 'I explore user needs and business requirements to help define more understandable digital experiences. My UX work includes user journeys, usability considerations, information structure, and wireframing.',
    tagLabel: 'Documented skills', tags: ['User research', 'Usability testing', 'User journeys', 'Wireframing', 'UX planning', 'Interaction design'] },
  { label: 'Interface Design', title: 'UI Design & Prototyping', image: uiPrototyping.src, alt: 'Illustration of linked screen wireframes forming a clickable prototype',
    body: 'I create interface concepts and detailed layouts that translate product requirements into usable screens. I work with both low- and high-fidelity wireframes and communicate interactive behavior through prototypes and design artifacts.',
    tagLabel: 'Documented skills', tags: ['Figma', 'Sketch', 'Visual design', 'Interaction design', 'Wireframing', 'Prototyping'] },
  { label: 'Frontend Implementation', title: 'Frontend UI Development', image: frontendUi.src, alt: 'Illustration of a design turning into code and responsive screens',
    body: 'I understand the development side of interface design and work to bridge the gap between design files and the browser. My professional experience includes transforming Figma designs into React components and developing responsive interfaces with HTML and CSS.',
    tagLabel: 'Documented skills', tags: ['HTML', 'CSS', 'JavaScript', 'React JS', 'Responsive web interfaces'] },
  { label: 'Website Development', title: 'WordPress & Website Builds', image: wordpressBuilds.src, alt: 'Illustration of a website being built from page blocks and settings',
    body: 'I work on responsive websites, custom WordPress layouts, and website content or implementation updates. My experience includes converting visual designs into functional templates and managing websites after they are published.',
    tagLabel: 'Documented skills', tags: ['WordPress', 'Bootstrap', 'Next.js', 'Advanced Custom Fields (ACF)', 'WPBakery', 'Custom template development', 'Website maintenance', 'Hosting-related support'] },
  { label: 'Delivery and Collaboration', title: 'Working With Product and Engineering Teams', image: teamwork.src, alt: 'Illustration of a team planning work together on a shared board',
    body: 'I collaborate with people from different disciplines to balance user expectations, business goals, deadlines, and implementation constraints. My work includes project coordination, scope awareness, and an Agile-oriented approach.',
    tagLabel: 'Documented skills', tags: ['Agile methodologies', 'Project management', 'Cross-functional collaboration', 'Design handoff'] },
];
export const SKILL_ROWS = [
  ['Web design', 'UI/UX', 'Branding', 'Landing pages', 'Figma', 'Responsive layouts'],
  ['Astro', 'Next.js', 'Sanity', 'Strapi', 'Medusa.js', 'Payment gateways'],
  ['SEO', 'Google Analytics', 'Social campaigns', 'Hosting', 'React JS', 'WordPress'],
];

export const INQUIRY = ['Website design & development', 'E-commerce store', 'Branding & logo', 'SEO & analytics', 'Social media campaigns', 'UI/UX engineering'];
