// Website case studies (/work and /work/websites/[slug]).
// Facts (pages, journeys, colours, fonts, tech) were taken from each live site in October 2026.
// Screenshots live in /public/images/websites/<slug>.jpg and <slug>-mobile.jpg, each with a .webp copy used on the page.
// To add real wireframes or design files later, put images in /public and list them in `extraImages`.

export interface Swatch { name: string; hex: string }
export interface WebsiteCase {
  slug: string; name: string; url: string; prototype?: boolean;
  /** Shown in the home page's featured websites. */
  featured?: boolean;
  tone: 'blush' | 'sand' | 'cream'; brand: string;
  category: string; summary: string;
  meta: { label: string; value: string }[];
  lead: string; challenge: string;
  audience: string[];
  journey: { title: string; body: string }[];
  wireframe: string[]; pages: string[];
  colors: Swatch[];
  fonts: { display: string; body: string; google?: string[] };
  button: { label: string; bg: string; fg: string; radius: string };
  principles: string[];
  build: string[];
  note?: string;
  /** Measurable outcomes (e.g. { value: '2.1×', label: 'more enquiries in the first three months' }).
   *  Shown as a "Results" chapter only when present, so only add real, verifiable numbers. */
  results?: { value: string; label: string }[];
  extraImages?: { src: string; alt: string; title: string }[];
  /** YYYY-MM-DD when this case study last changed; defaults to CASE_STUDIES_UPDATED in updated.ts. */
  updated?: string;
}

// On-page screenshots are WebP (about a third of the JPG weight). The JPG stays for og:image and schema,
// since some social crawlers still don't read WebP.
export const desktopShot = (slug: string) => '/images/websites/' + slug + '.webp';
export const mobileShot = (slug: string) => '/images/websites/' + slug + '-mobile.webp';
export const shareShot = (slug: string) => '/images/websites/' + slug + '.jpg';

export const WEBSITES: WebsiteCase[] = [
  {
    slug: 'eternal-wedding-bells', name: 'Eternal Wedding Bells', url: 'https://www.eternalweddingbells.com/', featured: true,
    tone: 'cream', brand: '#eceae5',
    category: 'Wedding platform · Product & web design · Next.js',
    summary: 'A free digital wedding invitation platform: couples personalise a template, share one link and collect RSVPs online, in 23 languages.',
    meta: [
      { label: 'Industry', value: 'Weddings & events' },
      { label: 'Type', value: 'Web product' },
      { label: 'Built with', value: 'Next.js' },
      { label: 'My role', value: 'UI/UX design & development' },
    ],
    lead: 'Eternal Wedding Bells lets couples create a digital wedding invitation in one evening: add their details, choose a template, publish, and collect RSVPs and wishes online. It had to feel as special as a printed card while being far easier to send.',
    challenge: 'Invitations are emotional and personal, but the people making them are not designers, and their guests range from tech-savvy friends to grandparents opening a link on WhatsApp. The product needed a creation flow anyone can finish quickly, and an invitation that opens beautifully on any phone.',
    audience: [
      'Couples who want a beautiful, free alternative to printed invitations',
      'Guests of every age opening the invitation on a phone, often from WhatsApp',
      'Families around the world, served in 23 languages including Sinhala and Tamil',
    ],
    journey: [
      { title: 'Add your details', body: 'Names, date, venue and story go into a short guided form.' },
      { title: 'Choose a template', body: 'Designs such as Lavender Watercolor, Sage Garden and Ivory & Gold.' },
      { title: 'Publish and share', body: 'One link for WhatsApp, or a personal link for each guest.' },
      { title: 'Collect replies', body: 'RSVPs arrive by email and guests can leave wishes for the couple.' },
    ],
    wireframe: ['Hero with live invitation preview', 'How it works: four steps', 'Template gallery', 'Everything a printed card can’t do', 'Free to build, free to share', 'From the blog', 'Common questions'],
    pages: ['How it works', 'Templates', 'Pricing', 'Questions', 'Sign in', 'Create invitation'],
    colors: [
      { name: 'Ink', hex: '#151515' }, { name: 'Paper', hex: '#f5f4f1' }, { name: 'Stone', hex: '#eceae5' },
      { name: 'Muted', hex: '#74736f' }, { name: 'Lime', hex: '#dfff3f' },
    ],
    fonts: { display: 'Geist', body: 'Geist', google: ['Geist'] },
    button: { label: 'Create your invitation', bg: '#dfff3f', fg: '#151515', radius: '9999px' },
    principles: [
      'A neutral paper-and-ink palette lets each couple’s chosen template be the colour on the page.',
      'One bright lime accent is kept for the main action, so “Create your invitation” is always obvious.',
      'A live phone preview in the hero shows the finished invitation before anyone signs up.',
    ],
    build: [
      'Built with Next.js for fast, search-friendly pages.',
      'Language picker with automatic detection and 23 languages.',
      'Guides and a blog aimed at searches like “digital wedding invitations” and “wedding website with RSVP”.',
      'Google Analytics to see how couples find and use the product.',
    ],
  },
  {
    slug: 'mintage', name: 'Mintage Restaurants', url: 'https://mintage.lk/', featured: true,
    tone: 'blush', brand: '#171714',
    category: 'Restaurant group · Website design & development · WordPress',
    summary: 'A website for a restaurant group with four locations in Sri Lanka, built around booking a table, ordering food and finding the right branch.',
    meta: [
      { label: 'Industry', value: 'Restaurants & hospitality' },
      { label: 'Location', value: 'Borella, Kotte, Galle & Marawila, Sri Lanka' },
      { label: 'Built with', value: 'WordPress' },
      { label: 'My role', value: 'Website design & development' },
    ],
    lead: 'Mintage serves bold Asian flavours at four restaurants in Borella, Kotte, Galle and Marawila. The website had to capture the atmosphere of an evening there and make the practical things (booking, menus, directions and ordering) quick for every branch.',
    challenge: 'Four locations means four menus, addresses and phone numbers. Most visitors arrive with one goal, to book, order or check a menu, and need to reach it for the right branch without digging.',
    audience: [
      'Diners planning a meal, a celebration or a night out',
      'Customers ordering through UberEats, PickMe or takeaway',
      'Groups and companies looking for private events',
    ],
    journey: [
      { title: 'Feel the atmosphere', body: 'A dark, cinematic hero sets the mood and offers two actions: reserve or explore menus.' },
      { title: 'Pick a branch', body: '“Visit us in” links go straight to Borella, Kotte, Galle or Marawila.' },
      { title: 'Check the menu', body: 'Each branch has its own menu page.' },
      { title: 'Book or order', body: 'Reserve a table, or order through UberEats, PickMe or takeaway.' },
    ],
    wireframe: ['Hero with Reserve and Menus actions', 'Order online: UberEats, PickMe, Takeaway', 'Our restaurants', 'Signature dishes', 'The kitchen story', 'Events and private dining', 'Food, music and evenings', 'Stories and updates (blog)', 'Final call to action'],
    pages: ['Our Story', 'Menus', 'Locations', 'Blogs', 'Contact', 'Reserve a Table'],
    colors: [
      { name: 'Charcoal', hex: '#171714' }, { name: 'Cream', hex: '#faf8f2' }, { name: 'Stone', hex: '#e7e4da' },
      { name: 'Terracotta', hex: '#b84c35' }, { name: 'Olive', hex: '#65705b' },
    ],
    fonts: { display: 'Cormorant Garamond', body: 'Manrope', google: ['Cormorant Garamond', 'Manrope'] },
    button: { label: 'Reserve a Table', bg: '#b84c35', fg: '#ffffff', radius: '6px' },
    principles: [
      'An elegant serif and a warm, dark palette set an evening-dining mood from the first screen.',
      'Terracotta is kept for booking actions, so “Reserve a Table” stands out on every page.',
      'On phones, a fixed bottom bar puts Reserve, Call, Menus and Directions one tap away.',
    ],
    build: [
      'WordPress, so the team can update menus, events and blog posts themselves.',
      'A separate menu page for each branch.',
      'Ordering links to UberEats and PickMe alongside takeaway.',
      'Search titles and descriptions that name all four locations, plus Google Analytics.',
    ],
  },
  {
    slug: 'dc-indoor-air-quality', name: 'DC Indoor Air Quality', url: 'https://dcindoorairqualitystl.com/', featured: true,
    tone: 'sand', brand: '#0a1714',
    category: 'Home services · Website design & development · WordPress',
    summary: 'A lead-generating website for an air duct and HVAC cleaning company in St. Louis, designed to build trust and turn visits into quote requests.',
    meta: [
      { label: 'Industry', value: 'Home services' },
      { label: 'Location', value: 'St. Louis, Missouri, USA' },
      { label: 'Built with', value: 'WordPress' },
      { label: 'My role', value: 'Website design & development' },
    ],
    lead: 'DC Indoor Air Quality Solutions cleans air ducts, dryer vents and HVAC systems for homes and businesses around St. Louis, and has been licensed and insured since 2010. The site needed to explain a service people rarely think about and make requesting a quote effortless.',
    challenge: 'Duct cleaning is an unfamiliar purchase, and homeowners are wary of inviting a stranger into their home. The design had to earn trust quickly and keep the phone number and quote request within reach at all times.',
    audience: [
      'Homeowners worried about dust, allergies or air quality',
      'Businesses maintaining their HVAC systems',
      'People comparing local providers before they call',
    ],
    journey: [
      { title: 'Understand the benefit', body: '“Cleaner air starts with a cleaner HVAC system” explains the value in one line.' },
      { title: 'See proof', body: 'Licensed & insured, serving St. Louis since 2010, residential and commercial.' },
      { title: 'Explore services', body: 'Duct, dryer vent and HVAC cleaning, each explained simply.' },
      { title: 'Know what happens', body: 'Four simple steps remove the uncertainty of booking.' },
      { title: 'Request a quote', body: 'Quote button and phone number stay in the header on every page.' },
    ],
    wireframe: ['Hero with quote and services actions', 'Trust points', 'Services overview', 'Full range of services', 'Built on trust, not promises', 'Four-step process', 'Call to action', 'Contact form'],
    pages: ['Home', 'About', 'Services', 'Blog', 'Contact', 'Request a Quote'],
    colors: [
      { name: 'Deep green', hex: '#0a1714' }, { name: 'Forest', hex: '#0d1f1a' }, { name: 'Teal', hex: '#1fb89a' },
      { name: 'Mint', hex: '#3fe0c5' }, { name: 'Linen', hex: '#faf8f3' }, { name: 'Sage grey', hex: '#6c7b76' },
    ],
    fonts: { display: 'Fraunces', body: 'Inter', google: ['Fraunces', 'Inter'] },
    button: { label: 'Request a Quote', bg: '#1fb89a', fg: '#04130f', radius: '100px' },
    principles: [
      'A deep green palette with drifting particles shows clean airflow without stock photos of dusty ducts.',
      'Fraunces italics add warmth to a technical service, while Inter keeps the details easy to read.',
      'The phone number and “Request a Quote” stay in the header, so the next step is always one tap away.',
    ],
    build: [
      'WordPress with a custom design, so the owner can post updates and blog articles.',
      'Search title aimed at “Air Duct & HVAC Cleaning St. Louis”.',
      'Contact form and click-to-call phone number for quote requests.',
      'Facebook and Instagram links to support social campaigns.',
    ],
  },
  {
    slug: 'lusterblue', name: 'LusterBlue', url: 'https://lusterblue.lk/',
    tone: 'sand', brand: '#2077b0',
    category: 'Jewellery · E-commerce website · WooCommerce',
    summary: 'An online store for 925 sterling silver gemstone jewellery made in Sri Lanka, with personalised pieces, astrology collections and islandwide delivery.',
    meta: [
      { label: 'Industry', value: 'Jewellery & gemstones' },
      { label: 'Location', value: 'Galle, Sri Lanka' },
      { label: 'Built with', value: 'WordPress, WooCommerce' },
      { label: 'My role', value: 'Website design & development' },
    ],
    lead: 'LusterBlue sells silver gemstone jewellery made in Sri Lanka: rings, necklaces, earrings, bracelets and watches, along with personalised name pieces and astrology collections. The store had to feel as polished as the jewellery while making it easy to browse, choose and buy online.',
    challenge: 'Jewellery is a considered purchase, and buying it online means trusting a store you can’t walk into. The site needed to answer questions about authenticity, delivery and sizing up front, and organise a large catalogue so shoppers can find the right piece quickly on a phone.',
    audience: [
      'Shoppers across Sri Lanka buying silver gemstone jewellery online, often on a phone',
      'Gift buyers looking for personalised name and birthstone pieces',
      'Customers choosing Navaratna or Zodiac (Lagna) jewellery for astrological reasons',
    ],
    journey: [
      { title: 'Browse by category', body: 'Earrings, rings, bracelets, necklaces, personalised pieces and watches sit right under the hero.' },
      { title: 'Compare pieces', body: 'Quick view, wishlist and compare help shoppers narrow down without losing their place.' },
      { title: 'Choose with confidence', body: 'Product pages with a ring size guide, and guides such as birthstones by month.' },
      { title: 'Check out', body: 'A WooCommerce cart and checkout, with free islandwide delivery.' },
      { title: 'Get help', body: 'WhatsApp is one tap away on mobile for questions before or after buying.' },
    ],
    wireframe: ['Header with search, wishlist and cart', 'Trust bar: delivery, authentic gemstones, made in Sri Lanka, happy customers', 'Hero with Explore Collections', 'Shop by category', 'Featured collections product grid', '925 sterling silver gemstone jewellery introduction', 'Blog highlights', 'About us', 'Help and contact', 'Footer with shop, discover and support links'],
    pages: ['Women', 'Men', 'Watches', 'Astrology', 'About Us', 'Contact Us'],
    colors: [
      { name: 'Luster blue', hex: '#2077b0' }, { name: 'Midnight', hex: '#0b0f1a' }, { name: 'Sky', hex: '#c7d4f5' },
      { name: 'Ink', hex: '#242424' }, { name: 'Stone', hex: '#767676' },
    ],
    fonts: { display: 'Marcellus', body: 'Montserrat', google: ['Marcellus', 'Montserrat'] },
    button: { label: 'EXPLORE COLLECTIONS', bg: '#2077b0', fg: '#ffffff', radius: '0px' },
    principles: [
      'Marcellus, an elegant serif, gives headings a premium jewellery feel, with Montserrat keeping prices and product details easy to read.',
      'One sapphire blue is kept for calls to action, echoing the brand name and the blue diamond in the logo.',
      'A trust bar under the header answers the big worries (delivery, authenticity and origin) before anyone starts browsing.',
      'On mobile, a fixed bottom bar keeps Shop, Cart, My account and WhatsApp within thumb’s reach.',
    ],
    build: [
      'WordPress and WooCommerce on the WoodMart theme, with wishlist, product compare and quick view.',
      'Astrology collections (Navaratna and Zodiac jewellery) and personalised name jewellery as their own categories.',
      'Buying guides such as a ring size guide and birthstones by month, plus a blog about Sri Lankan gems.',
      'Yoast SEO, Google Site Kit, LiteSpeed caching and Cloudflare for search visibility and speed.',
    ],
  },
  {
    slug: 'clarimed-rcm', name: 'ClariMed RCM', url: 'https://www.clarimedrcm.com/',
    tone: 'cream', brand: '#0275c9',
    category: 'Healthcare · Website design & development · Next.js',
    summary: 'A clear, confident website for a healthcare revenue cycle management company that helps medical and dental practices get paid faster.',
    meta: [
      { label: 'Industry', value: 'Healthcare services (B2B)' },
      { label: 'Location', value: 'United States' },
      { label: 'Built with', value: 'Next.js' },
      { label: 'My role', value: 'Website design & development' },
    ],
    lead: 'ClariMed RCM runs billing operations for medical and dental practices: medical billing, claims management, denial management and revenue cycle optimisation. The website had to make a complex, jargon-heavy service feel clear and trustworthy to practice owners.',
    challenge: 'Revenue cycle management is full of jargon, and the buyers are busy clinicians and practice managers. The site needed to lead with outcomes, explain the service simply, and also attract billing specialists to join the team.',
    audience: [
      'Practice owners and managers, from solo providers to multi-location groups',
      'Healthcare organisations comparing billing partners',
      'Billing specialists looking for a new role',
    ],
    journey: [
      { title: 'See the promise', body: '“Clarity for your revenue cycle” states the benefit in five words.' },
      { title: 'Check the results', body: 'A results section answers “will this pay off?” early.' },
      { title: 'Explore solutions', body: 'Medical billing, claims, denials and RCM optimisation.' },
      { title: 'Understand the process', body: '“A process built for predictable revenue” shows how onboarding works.' },
      { title: 'Talk to the team', body: 'A blue Contact Us button sits in the header and closes the page.' },
    ],
    wireframe: ['Hero with services and Learn more actions', 'Results you can measure', 'End-to-end revenue cycle support', 'Process', 'Careers', 'News and insights', 'Contact call to action'],
    pages: ['Home', 'About Us', 'Solutions', 'News', 'Careers', 'Contact Us'],
    colors: [
      { name: 'Ink', hex: '#111111' }, { name: 'Graphite', hex: '#5d5d5d' }, { name: 'Silver', hex: '#9e9e9e' },
      { name: 'Mist', hex: '#f5f5f5' }, { name: 'Clarity blue', hex: '#0275c9' },
    ],
    fonts: { display: 'Space Grotesk', body: 'Inter', google: ['Space Grotesk', 'Inter'] },
    button: { label: 'Contact Us', bg: '#0275c9', fg: '#ffffff', radius: '999px' },
    principles: [
      'A mostly monochrome layout with a single “clarity blue” mirrors the brand promise: less noise, clearer numbers.',
      'Large Space Grotesk headlines give a technical service a modern, confident voice.',
      'Monospaced labels list the services like an index, so scanning visitors find their need fast.',
    ],
    build: [
      'Built with Next.js for speed and search visibility.',
      'A news section for ongoing content and search traffic.',
      'Dedicated privacy and information security policy pages, which matter to healthcare buyers.',
      'Careers section to support hiring.',
    ],
  },
  {
    slug: 'millenniumit-esp', name: 'MillenniumIT ESP', url: 'https://www.mitesp.com/',
    tone: 'sand', brand: '#000104',
    category: 'Enterprise IT · Corporate website · WordPress',
    summary: 'Design and development of the corporate website for one of Sri Lanka’s largest IT companies, delivered on a tight timeline.',
    meta: [
      { label: 'Industry', value: 'Enterprise technology' },
      { label: 'Location', value: 'Sri Lanka' },
      { label: 'Built with', value: 'WordPress' },
      { label: 'My role', value: 'Website design & development; ongoing management' },
    ],
    lead: 'MillenniumIT ESP is one of the largest IT companies in Sri Lanka. I designed and developed their corporate website within a challenging timeline, following their brand guidelines for colours and typography, and later managed and updated the site.',
    challenge: 'An enterprise solutions provider covers many portfolios and industries. The site needed to organise them clearly for very different visitors, from banking and government decision-makers to partners and job seekers, while staying true to the corporate brand.',
    audience: [
      'Enterprise decision-makers in banking, government, telecom, manufacturing and retail',
      'Partners and existing customers',
      'Candidates exploring careers',
    ],
    journey: [
      { title: 'Grasp the positioning', body: '“Your Complete Enterprise Solutions Provider” sets the scope.' },
      { title: 'Find your solution', body: 'Portfolio menu: infrastructure, managed services, cyber security, cloud and more.' },
      { title: 'Find your industry', body: 'Banking & finance, government, commercial, telecom and media.' },
      { title: 'See credibility', body: 'Key numbers, latest news and customer logos.' },
      { title: 'Talk to us', body: 'A signature orange-red “Talk To Us” button.' },
    ],
    wireframe: ['Hero with Talk To Us action', 'Introduction and call to action', 'Solutions by industry', 'Key numbers', 'Latest news', 'Our customers', 'Contact'],
    pages: ['Portfolio', 'Company', 'Partners', 'Customers', 'Resources', 'Contact Us'],
    colors: [
      { name: 'Black', hex: '#000104' }, { name: 'Charcoal', hex: '#141414' }, { name: 'MIT orange-red', hex: '#ef4123' },
      { name: 'Slate', hex: '#58595b' }, { name: 'Silver', hex: '#d1d3d4' },
    ],
    fonts: { display: 'Inter', body: 'Inter', google: ['Inter'] },
    button: { label: 'Talk To Us', bg: '#ef4123', fg: '#ffffff', radius: '0px' },
    principles: [
      'The brand guidelines set the palette and type; the design work was applying them consistently across many page types.',
      'Dark, high-contrast heroes keep the orange-red for calls to action.',
      'Large menus group the portfolio by solution and by industry, so visitors quickly find their own path.',
    ],
    build: [
      'WordPress, so marketing teams can publish news and update pages.',
      'Delivered within a challenging timeline.',
      'Ongoing management and content updates after launch.',
    ],
    note: 'A public LinkedIn recommendation from Nadee Wicks highlights Raveen’s contribution to this website project and the speed and quality of the delivery.',
  },
  {
    slug: 'vespa', name: 'V.E.S.P.A.', url: 'https://vespa.nu/',
    tone: 'blush', brand: '#e0212a',
    category: 'Restaurant · Website & online ordering · WooCommerce',
    summary: 'Website and online ordering for an Italian restaurant in Lund and Malmö, Sweden: table booking, takeaway, catering and an Italian supermarket.',
    meta: [
      { label: 'Industry', value: 'Restaurants' },
      { label: 'Location', value: 'Lund & Malmö, Sweden' },
      { label: 'Built with', value: 'WordPress, WooCommerce' },
      { label: 'My role', value: 'Website design & development' },
    ],
    lead: 'V.E.S.P.A. serves Italian food “like at nonna’s” in Lund and at Davidshall in Malmö, along with catering, tastings and an Italian supermarket. The site brings it all together and lets guests book a table or order takeaway from the right restaurant.',
    challenge: 'Two restaurants each have their own menu, phone, booking and takeaway, plus catering, tastings and a shop. Without careful structure, the menu becomes a maze.',
    audience: [
      'Local diners in Lund and Malmö',
      'Takeaway and online order customers',
      'Companies ordering catering',
    ],
    journey: [
      { title: 'Pick your restaurant', body: 'Lund and Davidshall sit side by side on the home page, each with its own phone number.' },
      { title: 'Menu & info', body: 'Each location has its menu, opening hours and details.' },
      { title: 'Book or order', body: 'Book a table or order takeaway, tied to the chosen location.' },
      { title: 'Discover more', body: 'Catering, grappa and beer tastings, and the Italian supermarket.' },
      { title: 'Order online', body: 'The online shop handles orders such as seasonal Christmas bags.' },
    ],
    wireframe: ['Header with online ordering', 'Two-location hero with phone numbers and actions', 'Partner logos', 'Catering', 'Newsletter sign-up', 'Italian Supermarket', 'Opening hours per location', 'Our story'],
    pages: ['Beställ online (order)', 'Lund', 'Davidshall', 'Kontakta oss (contact)'],
    colors: [
      { name: 'Vespa red', hex: '#e0212a' }, { name: 'Deep red', hex: '#d1121b' }, { name: 'Charcoal', hex: '#323232' },
      { name: 'Warm white', hex: '#fcf6f1' }, { name: 'Black', hex: '#000000' },
    ],
    fonts: { display: 'Mocha Mattari', body: 'Kiro' },
    button: { label: 'Meny & info', bg: '#e0212a', fg: '#ffffff', radius: '0px' },
    principles: [
      'The home page splits into Lund and Davidshall straight away, so every action is tied to the right restaurant.',
      'Red ribbon-style buttons echo Italian signage and stand out over food photography.',
      'Hand-drawn display type and the retro Vespa illustration give the brand its playful character.',
    ],
    build: [
      'WordPress with WooCommerce for online orders.',
      'Page caching (WP Rocket) for fast loading.',
      'Cookie consent, Google Analytics and an accessibility statement.',
    ],
  },
  {
    slug: 'quantumgrid', name: 'QuantumGrid', url: 'https://auantumv2.vercel.app/', prototype: true,
    tone: 'sand', brand: '#0a0b0f',
    category: 'Enterprise IT · Website prototype · Astro',
    summary: 'A website prototype for a managed IT services provider, built with Astro for speed and organised around services, solutions and industries.',
    meta: [
      { label: 'Industry', value: 'Managed IT services' },
      { label: 'Status', value: 'Prototype' },
      { label: 'Built with', value: 'Astro, hosted on Vercel' },
      { label: 'My role', value: 'Website design & development' },
    ],
    lead: 'QuantumGrid puts managed services at the centre of IT operations, backed by expertise in enterprise networks, cybersecurity and cloud platforms. This prototype explores how the company can present a wide offering clearly to enterprise buyers.',
    challenge: 'Managed services, security, infrastructure and cloud across seven industries is a lot to take in. The prototype tests a structure that lets IT leaders find their service and their sector quickly.',
    audience: [
      'IT leaders in banking, insurance and financial services',
      'Manufacturing, telecom, retail and healthcare organisations',
      'Government and public-sector teams',
    ],
    journey: [
      { title: 'Grasp the promise', body: '“Designing secure, resilient enterprise technology environments.”' },
      { title: 'Recognise the problem', body: '“Your systems need attention long after they go live.”' },
      { title: 'Explore services', body: 'Managed services, security and infrastructure.' },
      { title: 'Find your industry', body: 'Banking, insurance, manufacturing, telecom, retail, healthcare and government.' },
      { title: 'Get in touch', body: '“Tell us where your team needs support.”' },
    ],
    wireframe: ['Hero over a night-time earth', 'The problem', 'Engineers who stay involved', 'Technology that works together', 'Managed services', 'Solutions', 'Industries', 'Contact call to action'],
    pages: ['Company', 'Solutions', 'Industries', 'Careers', 'Contact'],
    colors: [
      { name: 'Space black', hex: '#0a0b0f' }, { name: 'Carbon', hex: '#14151a' }, { name: 'Night navy', hex: '#0d1424' },
      { name: 'Deep blue', hex: '#152850' }, { name: 'Cloud', hex: '#f5f7fa' }, { name: 'Steel', hex: '#a7a9b0' },
    ],
    fonts: { display: 'Lato', body: 'Lato', google: ['Lato'] },
    button: { label: 'Contact', bg: '#152850', fg: '#f5f7fa', radius: '999px' },
    principles: [
      'A night-time earth and dark palette suggest always-on, global infrastructure.',
      'Light-weight Lato headlines keep a heavy topic calm and readable.',
      'Separate industry pages let buyers see their own sector reflected.',
    ],
    build: [
      'Built with Astro for fast, static pages.',
      'Deployed on Vercel for review.',
    ],
  },
  {
    slug: 'raveen-country-club', name: 'Raveen Country Club', url: 'https://raveencountryclub.vercel.app/', prototype: true,
    tone: 'cream', brand: '#17321f',
    category: 'Private club · Website prototype · Next.js',
    summary: 'A concept website for a private country club in Louisiana (golf, tennis, dining, events and membership), designed to turn interest into membership enquiries.',
    meta: [
      { label: 'Industry', value: 'Hospitality & leisure' },
      { label: 'Status', value: 'Prototype' },
      { label: 'Built with', value: 'Next.js, hosted on Vercel' },
      { label: 'My role', value: 'Website design & development' },
    ],
    lead: 'This prototype presents a private country club with championship golf, tennis, dining, guest houses and family events. The goal was to sell a lifestyle rather than a list of facilities, and to lead prospective members toward membership.',
    challenge: 'A club website serves two groups: members checking events and logging in, and prospects deciding whether to join. Both need to find their path quickly without getting in each other’s way.',
    audience: [
      'Prospective members and their families',
      'Existing members checking events or logging in',
      'Guests booking stays or dining',
    ],
    journey: [
      { title: 'Feel the place', body: '“Where Championship Golf Meets Southern Hospitality.”' },
      { title: 'Explore amenities', body: 'Golf, tennis, family activities and dining, each with its own section.' },
      { title: 'See the community', body: 'Real estate, events and reasons to gather.' },
      { title: 'Explore membership', body: 'A golden “Explore Membership” button closes each part of the story.' },
      { title: 'Members log in', body: 'Member login and contact live in the top bar, out of the prospect’s way.' },
    ],
    wireframe: ['Announcement bar', 'Hero with membership actions', 'A place to play, connect and belong', 'Club lifestyle overview', 'Golf', 'Tennis', 'Family', 'Dining', 'Community and real estate', 'Events', 'Membership call to action'],
    pages: ['Membership', 'Golf', 'Tennis', 'Dining', 'Guest Houses', 'Real Estate', 'About Us', 'Careers'],
    colors: [
      { name: 'Club green', hex: '#17321f' }, { name: 'Ivory', hex: '#f3f1e8' }, { name: 'Gold', hex: '#f5d31e' },
      { name: 'Moss', hex: '#485044' }, { name: 'Linen', hex: '#e7e8de' },
    ],
    fonts: { display: 'Manrope', body: 'Inter', google: ['Manrope', 'Inter'] },
    button: { label: 'Explore Membership', bg: '#f5d31e', fg: '#171b14', radius: '8px' },
    principles: [
      'Deep club green and golden yellow reference the course and the trophy.',
      'Every section of the story ends with a clear route toward membership.',
      'Member login sits in the top bar, so existing members’ tasks stay out of the prospect’s path.',
    ],
    build: [
      'Built with Next.js.',
      'Deployed on Vercel for review.',
    ],
  },
  {
    slug: 'highbrow-college', name: 'Highbrow College', url: 'https://raveen.gallestar.biz/highbrow/', prototype: true,
    tone: 'blush', brand: '#ffd978',
    category: 'Education · Landing page prototype · React',
    summary: 'A landing page prototype for a private Montessori and English-medium school in Keselwatte, Sri Lanka, built to guide parents toward admissions.',
    meta: [
      { label: 'Industry', value: 'Education' },
      { label: 'Status', value: 'Prototype' },
      { label: 'Built with', value: 'React, custom design system' },
      { label: 'My role', value: 'Landing page design & development' },
    ],
    lead: 'Highbrow College has grown since 2012 into a school of more than 700 students across Highbrow Montessori and the Upper School. This landing page prototype tells that story warmly and clearly, and leads parents to admissions.',
    challenge: 'Parents comparing schools want to know what their child’s day will look like, from first steps in Montessori to O and A Level preparation. The page had to cover two schools, the curriculum, school life and practical support without becoming a wall of text.',
    audience: [
      'Parents choosing a Montessori or primary school nearby',
      'Families of current students checking news and events',
      'Teachers and staff looking at vacancies',
    ],
    journey: [
      { title: 'First impression', body: 'A warm welcome with the school’s story and Admissions and Contact us side by side.' },
      { title: 'Two schools, one campus', body: 'Highbrow Montessori and Highbrow College, each explained in a few lines.' },
      { title: 'Beyond the syllabus', body: 'Elocution, IT, religion, arts, sports and clubs as quick-to-scan cards.' },
      { title: 'School life', body: 'News and events such as the Annual Concert, Sports Meet and Prize Giving.' },
      { title: 'Come and see', body: 'Practical support for families, then a final invitation to apply.' },
    ],
    wireframe: ['Header with crest, navigation and login', 'Hero with Admissions and Contact us', 'Our vision', 'A year worth remembering', 'Two schools, one campus', 'Values: a multi-ethnic, multi-cultural school', 'More than the syllabus', 'News and events', 'Practical support for families', 'Come and see: admissions call to action', 'Footer with contact details'],
    pages: ['About us', 'Curriculum', 'Contact us', 'Admissions', 'News'],
    colors: [
      { name: 'Canvas', hex: '#fff9f2' }, { name: 'Ink', hex: '#211c18' }, { name: 'Sun', hex: '#ffd978' },
      { name: 'Sky', hex: '#bbdcf5' }, { name: 'Mint', hex: '#c8f0d1' }, { name: 'Coral', hex: '#f58b61' },
    ],
    fonts: { display: 'Crimson Pro', body: 'Almarai', google: ['Crimson Pro', 'Almarai'] },
    button: { label: 'Admissions', bg: '#211c18', fg: '#fff9f2', radius: '999px' },
    principles: [
      'A light Crimson Pro serif gives the school a calm, established voice, paired with friendly Almarai for body text.',
      'Soft pastels (sun, sky, mint and coral) bring in the playfulness of a school for young children, on a warm canvas.',
      'Admissions is the one dark pill button, repeated at the start and end of the page.',
      'Short sections and scannable cards keep a lot of information easy for busy parents.',
    ],
    build: [
      'Built in React on a small custom design system: colour, type, spacing and component tokens.',
      'Lucide icons and Google Fonts.',
      'Hosted as a static prototype for review.',
    ],
  },
];
