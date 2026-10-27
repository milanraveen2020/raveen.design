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
  phone: '+94 77 961 1819',
  // wa.me opens a WhatsApp chat with this message already typed.
  whatsapp: 'https://wa.me/94779611819?text=' + encodeURIComponent('Hi Raveen, I’d like to talk about a website project.'),
  headline: 'Web Designer & Developer · UI/UX Engineer',
  linkedin: 'https://lk.linkedin.com/in/raveen-nanayakkara-262933101',
  behance: 'https://www.behance.net/raveennanayakkara',
  facebook: 'https://www.facebook.com/raveen.design',
  fiverr: 'https://www.fiverr.com/pencil_veen',
  fiverrBootstrap: 'https://www.fiverr.com/pencil_veen/design-psd-to-bootstrap-conversion',
  fiverrNext: 'https://www.fiverr.com/pencil_veen/do-a-fast-seo-friendly-next-js-website-with-a-headless-cms',
};
export const SOCIALS = [
  { icon: 'linkedin', label: 'LinkedIn', href: PROFILE.linkedin },
  { icon: 'palette', label: 'Behance', href: PROFILE.behance },
  { icon: 'facebook', label: 'Facebook', href: PROFILE.facebook },
  { icon: 'briefcase-business', label: 'Fiverr', href: PROFILE.fiverr },
];

export const NAV = [
  { label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: 'About', href: '/about' },
  { label: 'Expertise', href: '/expertise' }, { label: 'Contact', href: '/contact' },
];

// Search titles (≤ 60 characters) and meta descriptions (≤ 155) for each main page.
export const TITLES: Record<string, string> = {
  '/': 'Raveen Nanayakkara — Freelance Web Designer & Developer',
  '/work': 'Web Design Portfolio & Case Studies | Raveen Nanayakkara',
  '/about': 'About Raveen Nanayakkara — Web Designer & UI/UX Engineer',
  '/expertise': 'Web Design, Development & SEO Services | Raveen Nanayakkara',
  '/contact': 'Contact Raveen Nanayakkara — Start Your Website Project',
};
export const DESCRIPTIONS: Record<string, string> = {
  '/': 'Web designer and developer with 10 years of UI/UX engineering. Fast Astro and Next.js websites, e-commerce, branding, hosting and SEO for businesses.',
  '/work': 'Websites I’ve designed and built for restaurants, healthcare, IT and service businesses, with case studies on user journeys, wireframes and design systems.',
  '/about': 'Ten years of UI/UX engineering at MillenniumIT ESP and Parkway Labs, now designing and building fast, modern websites for businesses as a freelancer.',
  '/expertise': 'UI/UX-led web design, Astro and Next.js development with Sanity or Strapi, Medusa.js e-commerce, logo and brand kits, SEO, analytics and social campaigns.',
  '/contact': 'Need a new website, online store or brand? Tell me about your business and project, and I’ll reply with next steps. Freelance web design and development.',
};

// FAQs, one set per page (each question appears on one page only, as Google expects for FAQ markup).
// Answers only state what the site already says elsewhere. Deliberately no prices, timelines or working hours.
// Home: who I am and what working with me is like.
export const FAQ_HOME = [
  { q: 'Who is Raveen Nanayakkara?',
    a: 'A freelance web designer and developer with ten years of experience as a UI/UX engineer at MillenniumIT ESP and Parkway Labs. I design and build fast, modern websites for businesses and look after everything around them, from branding to hosting and SEO.' },
  { q: 'Do you handle both the design and the development?',
    a: 'Yes. I design the website in Figma, build it, host it and launch it myself, so nothing gets lost between a designer and a separate developer. If you need a logo or brand kit first, I can do that too.' },
  { q: 'What makes your websites different?',
    a: 'They are UI/UX-led: every page is planned around how your visitors think, with clear structure and journeys that lead them to get in touch or buy. They are built with modern technology such as Astro and Next.js, so they load fast, and they launch with SEO and Google Analytics in place.' },
  { q: 'What kinds of businesses have you built websites for?',
    a: 'Restaurants, healthcare, enterprise IT, home services, a jewellery store, a private club, a school and a wedding invitation platform. You can see each project, with its user journey, wireframe and design system, on the Work page.' },
  { q: 'What do clients say about working with you?',
    a: 'I am rated 5.0 across 100 client reviews on Fiverr. Clients mention clear communication, attention to detail, and websites that work well on both desktop and mobile.' },
  { q: 'Do you work with clients worldwide?',
    a: 'Yes. I work remotely with clients wherever they are, including clients in the United States.' },
];

// Expertise: services and technology.
export const FAQ = [
  { q: 'What services do you offer?',
    a: 'UI/UX-led website design, fast websites built with a headless CMS, online stores with payment integration, logo and brand kits, SEO and analytics setup, social media campaigns, and hosting with ongoing care.' },
  { q: 'Which technologies do you build websites with?',
    a: 'Mostly Astro or Next.js, with Sanity or Strapi as the content system. Online stores run on Medusa.js or a custom shopping-cart CMS. I also build and update WordPress sites, and design everything in Figma first.' },
  { q: 'What is a headless CMS?',
    a: 'A content editor that is separate from the website’s design and code. You log in to a tool such as Sanity or Strapi to change text, images and pages, and the website updates without anyone touching code. It keeps the site fast and secure while staying easy to edit.' },
  { q: 'Why Astro or Next.js instead of WordPress?',
    a: 'Astro and Next.js produce pages that load very quickly and need far fewer plugins and updates to stay secure, which helps both visitors and search rankings. WordPress is still a good fit for some projects, and I build and maintain WordPress sites too.' },
  { q: 'Can I update the website content myself?',
    a: 'Yes. Sites built with a headless CMS such as Sanity or Strapi come with an editor where you can change text, images and pages yourself, without touching code.' },
  { q: 'Will my website work well on phones?',
    a: 'Yes. Every layout is planned to work from desktop down to mobile, since many visitors arrive on a phone.' },
  { q: 'Can you build an online store?',
    a: 'Yes. I build online stores on Medusa.js or a custom shopping-cart CMS, with product catalogues and the payment gateways your business needs, integrated and tested.' },
  { q: 'Can you help with my existing WordPress website?',
    a: 'Yes. I can update content and layouts, build custom templates, and look after the site after it is published.' },
  { q: 'I don’t have a logo or brand yet. Can you help?',
    a: 'Yes. I can design your logo and a brand kit first, so the website starts with a clear identity: colours, typography and how your brand should look across pages and social media.' },
  { q: 'Will my website be ready for Google?',
    a: 'Every site launches with the SEO essentials in place: a sitemap, page titles and descriptions, structured data, fast loading, and Google Analytics so you can see where visitors come from.' },
  { q: 'Do you host and look after websites after launch?',
    a: 'Yes. I can deploy and host your site and look after it afterwards, so you don’t have to deal with the technical side.' },
];

// Contact: how a project starts and runs.
export const FAQ_CONTACT = [
  { q: 'How do we get started?',
    a: 'Send a short message through the form on this page about your business and what you need. I’ll reply to talk through your goals and the next steps.' },
  { q: 'What should I include in my message?',
    a: 'A little about your business, the kind of project you have in mind, and what you want the website to achieve. If you have a current website or sites you like, add a link. It’s fine if you don’t have everything worked out yet.' },
  { q: 'Can I contact you on WhatsApp or by email instead?',
    a: 'Yes. You can message me on WhatsApp or email me directly using the details on this page.' },
  { q: 'How does a website project run?',
    a: 'In five steps: brand (a logo and brand kit, if you need one), design (wireframes and visual design in Figma), build (Astro or Next.js with a headless CMS), launch (hosting, SEO and Google Analytics), and grow (campaigns that bring leads to the site).' },
  { q: 'Do I need to know anything technical?',
    a: 'No. I take care of the design, development, hosting and setup, and explain anything you need to know in plain language.' },
];

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
  { start: '2019', end: '', role: 'UI/UX Engineering', org: 'MillenniumIT ESP', body: 'Grew from UI/UX Engineer to Senior Engineer and Associate Tech Lead on enterprise software products: user journeys, low- and high-fidelity wireframes, interface design, React UI components built from Figma, and the company’s corporate website. Working closely with development teams to keep design and build aligned.' },
  { start: '2017', end: '2019', role: 'UI Designer / Developer', org: 'Parkway Labs (Pvt) Ltd', body: 'Designed interfaces for web applications and websites, built WordPress and Bootstrap themes, created landing pages, and produced digital assets.' },
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
  { label: 'Web Design', title: 'UI/UX-Led Website Design', image: uiUxWebDesign, alt: 'Illustration of a website wireframe adapting across desktop, tablet, and phone',
    body: 'I design websites with the same UI/UX principles I have applied for ten years on enterprise and public-sector products: clear page structure, visual hierarchy, readable typography, and journeys that lead visitors to act. Every layout is planned to work from desktop to mobile.',
    tagLabel: 'Skills', tags: ['Web design', 'UX principles', 'Landing pages', 'Responsive layouts', 'Typography & hierarchy', 'Figma'] },
  { label: 'Modern Web Development', title: 'Fast Websites With a Headless CMS', image: headlessCms, alt: 'Illustration of CMS content flowing into a fast website deployed to the cloud',
    body: 'I build high-speed websites with Astro or Next.js and connect them to a headless CMS such as Sanity or Strapi, so clients can update content themselves. I also deploy and host the sites I build.',
    tagLabel: 'Skills', tags: ['Astro', 'Next.js', 'React JS', 'Sanity', 'Strapi', 'Hosting & deployment'] },
  { label: 'E-commerce', title: 'Online Stores & Payment Integration', image: onlineStores, alt: 'Illustration of an online store with a shopping cart, product pages, and card payment',
    body: 'For businesses that sell online, I build stores on Medusa.js or a custom shopping-cart CMS, and integrate the payment gateways they need.',
    tagLabel: 'Skills', tags: ['Medusa.js', 'Custom shopping-cart CMS', 'Payment gateway integration', 'Product catalogues'] },
  { label: 'Branding', title: 'Logo & Brand Kit Design', image: brandKit, alt: 'Illustration of a logo grid, colour swatches, and a brand guidelines book',
    body: 'When a client needs an identity before the website, I design the logo and a brand kit (colours, typography, and usage) so the site and everything around it look consistent.',
    tagLabel: 'Skills', tags: ['Logo design', 'Brand kit', 'Colour & typography', 'Adobe Illustrator', 'Adobe Photoshop'] },
  { label: 'Growth', title: 'SEO, Analytics & Social Campaigns', image: seoAnalytics, alt: 'Illustration of an analytics dashboard with growth charts and social media icons',
    body: 'A website should bring in business. I set up the SEO basics, such as sitemaps and metadata, connect Google Analytics, and run social media campaigns that send leads to the site.',
    tagLabel: 'Skills', tags: ['Sitemaps', 'On-page SEO', 'Google Analytics', 'Social media campaigns', 'Lead generation'] },
  { label: 'User Experience Design', title: 'UX Research & Experience Planning', image: uxResearch, alt: 'Illustration of a user at the centre of journeys, research, and site structure',
    body: 'I explore user needs and business requirements to help define more understandable digital experiences. My UX work includes user journeys, usability considerations, information structure, and wireframing.',
    tagLabel: 'Documented skills', tags: ['User research', 'Usability testing', 'User journeys', 'Wireframing', 'UX planning', 'Interaction design'] },
  { label: 'Interface Design', title: 'UI Design & Prototyping', image: uiPrototyping, alt: 'Illustration of linked screen wireframes forming a clickable prototype',
    body: 'I create interface concepts and detailed layouts that translate product requirements into usable screens. I work with both low- and high-fidelity wireframes and communicate interactive behavior through prototypes and design artifacts.',
    tagLabel: 'Documented skills', tags: ['Figma', 'Sketch', 'Visual design', 'Interaction design', 'Wireframing', 'Prototyping'] },
  { label: 'Frontend Implementation', title: 'Frontend UI Development', image: frontendUi, alt: 'Illustration of a design turning into code and responsive screens',
    body: 'I understand the development side of interface design and work to bridge the gap between design files and the browser. My professional experience includes transforming Figma designs into React components and developing responsive interfaces with HTML and CSS.',
    tagLabel: 'Documented skills', tags: ['HTML', 'CSS', 'JavaScript', 'React JS', 'Responsive web interfaces'] },
  { label: 'Website Development', title: 'WordPress & Website Builds', image: wordpressBuilds, alt: 'Illustration of a website being built from page blocks and settings',
    body: 'I work on responsive websites, custom WordPress layouts, and website content or implementation updates. My experience includes converting visual designs into functional templates and managing websites after they are published.',
    tagLabel: 'Documented skills', tags: ['WordPress', 'Bootstrap', 'Next.js', 'Advanced Custom Fields (ACF)', 'WPBakery', 'Custom template development', 'Website maintenance', 'Hosting-related support'] },
  { label: 'Delivery and Collaboration', title: 'Working With Product and Engineering Teams', image: teamwork, alt: 'Illustration of a team planning work together on a shared board',
    body: 'I collaborate with people from different disciplines to balance user expectations, business goals, deadlines, and implementation constraints. My work includes project coordination, scope awareness, and an Agile-oriented approach.',
    tagLabel: 'Documented skills', tags: ['Agile methodologies', 'Project management', 'Cross-functional collaboration', 'Design handoff'] },
];
export const SKILL_ROWS = [
  ['Web design', 'UI/UX', 'Branding', 'Landing pages', 'Figma', 'Responsive layouts'],
  ['Astro', 'Next.js', 'Sanity', 'Strapi', 'Medusa.js', 'Payment gateways'],
  ['SEO', 'Google Analytics', 'Social campaigns', 'Hosting', 'React JS', 'WordPress'],
];

export const INQUIRY = ['Website design & development', 'E-commerce store', 'Branding & logo', 'SEO & analytics', 'Social media campaigns', 'UI/UX engineering'];
