export const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';

export const BOOK_URL = 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey';
export const BOOK_COVER = 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/cover-hero.png?v=1783903956';

export type DestinationType = 'website' | 'form' | 'app_store' | 'coming_soon';

export type BrandCard = {
  name: string;
  category: string;
  logo?: string;
  heroUrl?: string;
  href: string;
  status: string;
  actionLabel?: string;
  destinationType?: DestinationType;
};

export const currentFocusBrands: BrandCard[] = [
  {
    name: 'Dr. Dorsey',
    category: 'Founder · Author · Strategist',
    logo: '/brand-logos/dr-dorsey.png',
    href: 'https://doctordorsey.com',
    status: 'Founder Platform',
    actionLabel: 'Enter',
    destinationType: 'website',
  },
  {
    name: 'The Kollective ENT.',
    category: 'Enterprise Command',
    logo: '/brand-logos/kollective.png',
    href: '/kollective',
    status: 'Enterprise',
    actionLabel: 'Explore',
    destinationType: 'website',
  },
  {
    name: 'The Tribe — Memphis',
    category: 'Community · Enterprise',
    logo: '/brand-logos/trailblazers.png',
    href: 'https://the-tribe-wine.vercel.app',
    status: 'Building',
    actionLabel: 'View Platform',
    destinationType: 'website',
  },
  {
    name: 'The University',
    category: 'Trades · Workforce · Ownership',
    logo: '/brand-logos/the-university.png',
    href: 'https://the-university.vercel.app',
    status: 'Building',
    actionLabel: 'Explore Programs',
    destinationType: 'website',
  },
  {
    name: 'Everyday Water Group',
    category: 'Water Enterprise',
    logo: '/brand-logos/everyday-water-group.png',
    href: 'https://everyday-water-group.vercel.app',
    status: 'Building',
    actionLabel: 'View Group',
    destinationType: 'website',
  },
  {
    name: 'Aquifer Waterworks',
    category: 'Water Source · Infrastructure',
    logo: '/brand-logos/aquifer.png',
    href: 'https://aquifer-waterworks.vercel.app',
    status: 'Building',
    actionLabel: 'Explore',
    destinationType: 'website',
  },
  {
    name: 'Nativa Waterworks',
    category: 'Water Source · Infrastructure',
    logo: '/brand-logos/nativa-waterworks.png',
    href: 'https://nativa-waterworks.vercel.app',
    status: 'Building',
    actionLabel: 'Explore',
    destinationType: 'website',
  },
  {
    name: 'Infinity Water',
    category: 'Luxury Water',
    logo: '/brand-logos/infinity-water.png',
    href: 'https://watertoinfinity.com',
    status: 'Active Brand',
    actionLabel: 'Explore',
    destinationType: 'website',
  },
  {
    name: 'Tribal Water',
    category: 'Water Brand',
    logo: '/brand-logos/tribal-water.png',
    href: 'https://tribal-water.vercel.app',
    status: 'Building',
    actionLabel: 'Explore',
    destinationType: 'website',
  },
  {
    name: 'Pronto Energy',
    category: 'Consumer Beverage',
    logo: '/brand-logos/pronto-energy.png',
    href: 'https://prontoenergydrink.com',
    status: 'Active Brand',
    actionLabel: 'Explore',
    destinationType: 'website',
  },
  {
    name: 'Rose on Piedmont',
    category: 'Hospitality · Weekly Programming',
    logo: '/brand-logos/rose-on-piedmont.png',
    href: 'https://111atl.com/company.html?brand=rose-on-piedmont',
    status: 'Operating',
    actionLabel: 'See This Week',
    destinationType: 'website',
  },
  {
    name: 'GROWN-ISH',
    category: 'Friday Nightlife · Rose on Piedmont',
    logo: '/brand-logos/grown-ish.png',
    href: 'https://111atl.com/company.html?brand=grown-ish',
    status: 'Operating',
    actionLabel: 'Reserve Friday',
    destinationType: 'website',
  },
  {
    name: 'Sole Exchange',
    category: 'Community · Sneaker Impact',
    logo: '/brand-logos/sole-exchange.png',
    href: 'https://soleexchangeworldwide.com',
    status: 'Active Initiative',
    actionLabel: 'Support',
    destinationType: 'website',
  },
  {
    name: 'Hakuna Matata',
    category: 'Book · Founder Philosophy',
    href: BOOK_URL,
    status: 'Available Now',
    actionLabel: 'Buy the Book',
    destinationType: 'website',
  },
  {
    name: 'Bodega',
    category: 'Commerce · Lifestyle Products',
    logo: '/brand-logos/bodega.png',
    href: 'https://bodegabodegabodega.com',
    status: 'Active Platform',
    actionLabel: 'Shop',
    destinationType: 'website',
  },
  {
    name: 'STUSH',
    category: 'Fashion · Elevated Streetwear',
    logo: '/brand-logos/stush.png',
    href: 'https://stushusa.com',
    status: 'Active Brand',
    actionLabel: 'Shop',
    destinationType: 'website',
  },
  {
    name: 'PULSE',
    category: 'Athletic · Golf · Lifestyle',
    logo: '/brand-logos/pulse.png',
    href: 'https://yourpulsehq.com',
    status: 'Building',
    actionLabel: 'Inquire',
    destinationType: 'website',
  },
  {
    name: 'Make Atlanta Great Again',
    category: 'Atlanta Culture · Apparel',
    logo: '/brand-logos/make-atlanta-great-again.png',
    href: 'https://thaoldatlanta.com',
    status: 'Active Brand',
    actionLabel: 'Explore',
    destinationType: 'website',
  },
  {
    name: 'GOOD TIMES',
    category: 'Lifestyle Technology · Concierge',
    logo: '/brand-logos/good-times.png',
    href: 'https://thegoodtimesworldwide.com',
    status: 'Active Platform',
    actionLabel: 'Open',
    destinationType: 'website',
  },
];

export type Division = {
  title: string;
  eyebrow: string;
  description: string;
  brands: string[];
  href: string;
  cta: string;
};

export const divisions: Division[] = [
  {
    title: 'Entertainment',
    eyebrow: 'Culture & IP',
    description: 'Nightlife, music, live programming, museums, and signature experiences engineered to become repeatable cultural rituals.',
    brands: ['Rose on Piedmont — Operating', 'GROWN-ISH — Active', 'Taste of Art — Active', 'HugLife', 'Iconic', 'GOOD TIMES', 'Forever Futbol', 'Soul Sessions'],
    href: '/events',
    cta: 'Enter Current Culture',
  },
  {
    title: 'Apps / Tech',
    eyebrow: 'Platforms & Intelligence',
    description: 'Consumer platforms, service routing, civic tools, and enterprise systems that turn attention into utility.',
    brands: ['GOOD TIMES — Active', 'On Call — Active', 'S.O.S. — Active', 'Luxe on Demand — Development', 'The Law — Development', 'The Vote — Planning', 'Mission 365', 'Black Pages'],
    href: '/directory',
    cta: 'Explore Technology',
  },
  {
    title: 'Products / Shop',
    eyebrow: 'Commerce',
    description: 'Fashion, publishing, collectibles, wellness, and direct-to-consumer product worlds with distinct identities.',
    brands: ['Hakuna Matata', 'Bodega', 'STUSH', 'PULSE', 'Make Atlanta Great Again', 'MYXX', 'Ace Theory', 'MATCH', 'Scented Flowers'],
    href: '/store',
    cta: 'Shop the Portfolio',
  },
  {
    title: 'Water Sourcing',
    eyebrow: 'Infrastructure',
    description: 'Long-horizon water intelligence spanning aquifers, sourcing, treatment, resilient supply, and regional stewardship.',
    brands: ['Everyday Water Group', 'Aquifer Waterworks', 'Nativa Waterworks'],
    href: '/network',
    cta: 'Enter the Source Network',
  },
  {
    title: 'Beverages',
    eyebrow: 'Consumer Products',
    description: 'Water, wine, and energy brands designed for culture, hospitality, retail, and everyday movement.',
    brands: ['Infinity Water — Active', 'Pronto Energy — Active', 'Tribal Water — Active', 'The Tribe Wine — Building'],
    href: '/store',
    cta: 'Explore Beverages',
  },
  {
    title: 'Help 911',
    eyebrow: 'Response',
    description: 'Human-centered platforms routing urgent and everyday needs toward the right trusted service, professional, or resource.',
    brands: ['Help 911 — Active', 'S.O.S. — Active', 'On Call — Active', 'Umbrella Injury Network'],
    href: 'https://www.help911.help',
    cta: 'Open Help 911',
  },
  {
    title: 'Philanthropy',
    eyebrow: 'Impact & Institutions',
    description: 'Access, education, youth, membership, and community platforms designed to build durable pathways.',
    brands: ['Sole Exchange — Active', 'Playmakers Sports Association', 'Members Elite', 'The University — Building', 'Little Farmers of the Future', 'Trailblazers'],
    href: 'https://soleexchangeworldwide.com',
    cta: 'Enter the Impact Network',
  },
  {
    title: 'Casper Group',
    eyebrow: 'Hospitality / 12 Brands',
    description: 'Original food and beverage identities designed for delivery, licensing, food halls, and multi-unit expansion.',
    brands: ['American Dragon', 'Peace Pizza', 'Taco Yaki', 'Pasta Bish', 'Patty Daddy', 'Angel Wings', 'Mr. Oyster', 'Sweet Tooth', "Toss’d", 'Mojo Juice', 'Morning After', 'Espresso Co.'],
    href: 'https://caspergroupworldwide.com',
    cta: 'Enter the Casper Group',
  },
  {
    title: 'Umbrella Group',
    eyebrow: 'Services',
    description: 'Property, mobility, cleaning, accounting, travel, wellness, people operations, and client support under one coordinated standard.',
    brands: ['Umbrella Auto Exchange', 'Umbrella Realty Group', 'Umbrella Clean Services', 'Umbrella Injury Network', "The People’s Department", 'Umbrella Accounting', 'Umbrella Travel', 'The Mind Studio', 'Reset Therapy'],
    href: 'https://theumbrella.group',
    cta: 'Enter the Service Network',
  },
];

export type AccessLink = {
  title: string;
  description: string;
  href: string;
  group: 'Sales & Reservations' | 'Partnerships' | 'Talent & Team' | 'Book & Media' | 'Private & Legal';
  featured?: boolean;
};

export const accessLinks: AccessLink[] = [
  { title: 'Rose Weekly Schedule', description: 'Current Rose on Piedmont programming, RSVPs, birthdays and VIP access.', href: 'https://111atl.com/#events', group: 'Sales & Reservations', featured: true },
  { title: 'Table Reservation', description: 'Restaurant, lounge and nightlife table requests.', href: 'https://111atl.com/#forms', group: 'Sales & Reservations' },
  { title: 'Group Pricing', description: 'Large parties, catering, group packages and private bookings.', href: '/forms/group_pricing', group: 'Sales & Reservations' },
  { title: 'Shop The Enterprise', description: 'Books, apparel, products and current releases.', href: '/shop', group: 'Sales & Reservations' },
  { title: 'Sponsor / Partner', description: 'Sponsorship, brand integration and strategic partnerships.', href: '/forms/sponsor', group: 'Partnerships', featured: true },
  { title: 'Enterprise App Early Access', description: 'Join the first user group for the unified Kollective enterprise app.', href: '/forms/inquiry?interest=enterprise_app', group: 'Partnerships', featured: true },
  { title: 'Vendor Application', description: 'Food, retail, services and event vendor opportunities.', href: '/forms/vendor', group: 'Partnerships' },
  { title: 'Enterprise Inquiry', description: 'Investment, expansion, licensing, real estate and new business.', href: '/forms/inquiry', group: 'Partnerships' },
  { title: 'What Do You Do?', description: 'Introduce your company, capabilities and potential fit.', href: '/forms/what_you_do', group: 'Partnerships' },
  { title: 'Careers / Hiring', description: 'Apply for operating, creative and management opportunities.', href: '/forms/hiring_inquiry', group: 'Talent & Team', featured: true },
  { title: 'Volunteer', description: 'Community programs, events and mission-based initiatives.', href: '/forms/volunteer', group: 'Talent & Team' },
  { title: 'Internship', description: 'Hands-on pathways into hospitality, events, media and technology.', href: '/forms/intern', group: 'Talent & Team' },
  { title: 'Artist / Creative', description: 'Painters, visual artists, performers and music talent.', href: '/forms/artist_painter', group: 'Talent & Team' },
  { title: 'Buy Hakuna Matata', description: 'Order Dr. Dorsey’s book directly.', href: BOOK_URL, group: 'Book & Media', featured: true },
  { title: 'Bulk Book Orders', description: 'Organizations, teams, schools and corporate orders.', href: '/forms/bulk_orders', group: 'Book & Media' },
  { title: 'Speaking Request', description: 'Keynotes, panels, classes, interviews and appearances.', href: '/forms/speaking', group: 'Book & Media' },
  { title: 'Media / Press', description: 'Interviews, features, press access and production requests.', href: '/forms/media', group: 'Book & Media' },
  { title: 'Book Strategy Session', description: 'Private consultation with Dr. Dorsey.', href: '/forms/consultation', group: 'Private & Legal', featured: true },
  { title: 'Request NDA', description: 'Start protected conversations before private information is shared.', href: '/forms/nda', group: 'Private & Legal' },
  { title: 'Onboarding', description: 'Approved partner, team and enterprise onboarding.', href: '/forms/onboarding', group: 'Private & Legal' },
  { title: 'General Contact', description: 'Route your request to the correct division.', href: '/forms/inquiry', group: 'Private & Legal' },
];

export const stats = [
  { value: '20', label: 'Current Focus Entities' },
  { value: '8', label: 'Enterprise Divisions' },
  { value: '3', label: 'Public Access Hubs' },
  { value: 'NEXT', label: 'Unified Member App' },
];

export type AppDestination = {
  slug: string;
  name: string;
  destinationType: DestinationType;
  webUrl?: string;
  iosUrl?: string;
  androidUrl?: string;
  fallbackUrl: string;
  status: 'active' | 'prelaunch' | 'coming_soon';
};

export const appDestinations: AppDestination[] = [
  {
    slug: 'black-pages',
    name: 'Black Pages',
    destinationType: 'app_store',
    fallbackUrl: '/forms/inquiry?brand=black-pages&interest=app_access',
    status: 'prelaunch',
  },
  {
    slug: 'good-times',
    name: 'GOOD TIMES',
    destinationType: 'website',
    webUrl: 'https://thegoodtimesworldwide.com',
    fallbackUrl: 'https://thegoodtimesworldwide.com',
    status: 'active',
  },
];
