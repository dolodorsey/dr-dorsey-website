export const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';

export const BOOK_URL = 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey';
export const BOOK_COVER = 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/cover-hero.png?v=1783903956';

export type DestinationType = 'website' | 'form' | 'app_store' | 'coming_soon';

export type BrandCard = {
  name: string;
  category: string;
  logo?: string;
  href: string;
  status: string;
  actionLabel?: string;
  destinationType?: DestinationType;
};

export const currentFocusBrands: BrandCard[] = [
  {
    name: 'Dr. Dorsey',
    category: 'Founder · Author · Strategist',
    logo: `${SB}/dr_dorsey/01_logos/DorseyNewW.png`,
    href: 'https://doctordorsey.com',
    status: 'Founder Platform',
    actionLabel: 'Enter',
    destinationType: 'website',
  },
  {
    name: 'The Kollective ENT.',
    category: 'Enterprise Command',
    logo: `${SB}/dr_dorsey/01_logos/KOLLECTIVEemblemW.png`,
    href: 'https://thekollectivehospitality.com',
    status: 'Enterprise',
    actionLabel: 'Explore',
    destinationType: 'website',
  },
  {
    name: 'The Sovereign Nation',
    category: 'Institution · Governance',
    href: 'https://the-nation-preview.vercel.app',
    status: 'Building',
    actionLabel: 'View Platform',
    destinationType: 'website',
  },
  {
    name: 'The Tribe — Memphis',
    category: 'Community · Enterprise',
    href: 'https://the-tribe-wine.vercel.app',
    status: 'Building',
    actionLabel: 'View Platform',
    destinationType: 'website',
  },
  {
    name: 'The University',
    category: 'Trades · Workforce · Ownership',
    href: 'https://the-university.vercel.app',
    status: 'Building',
    actionLabel: 'Explore Programs',
    destinationType: 'website',
  },
  {
    name: 'Everyday Water Group',
    category: 'Water Enterprise',
    href: 'https://everyday-water-group.vercel.app',
    status: 'Building',
    actionLabel: 'View Group',
    destinationType: 'website',
  },
  {
    name: 'Aquifer Waterworks',
    category: 'Water Source · Infrastructure',
    href: 'https://aquifer-waterworks.vercel.app',
    status: 'Building',
    actionLabel: 'Explore',
    destinationType: 'website',
  },
  {
    name: 'Nativa Waterworks',
    category: 'Water Source · Infrastructure',
    href: 'https://nativa-waterworks.vercel.app',
    status: 'Building',
    actionLabel: 'Explore',
    destinationType: 'website',
  },
  {
    name: 'Infinity Water',
    category: 'Luxury Water',
    href: 'https://infinity-water-website.vercel.app',
    status: 'Active Brand',
    actionLabel: 'Explore',
    destinationType: 'website',
  },
  {
    name: 'Tribal Water',
    category: 'Water Brand',
    href: 'https://tribal-water.vercel.app',
    status: 'Building',
    actionLabel: 'Explore',
    destinationType: 'website',
  },
  {
    name: 'Pronto Energy',
    category: 'Consumer Beverage',
    logo: `${SB}/pronto_energy/logos/pronto-logo.png`,
    href: 'https://pronto-energy-website.vercel.app',
    status: 'Active Brand',
    actionLabel: 'Explore',
    destinationType: 'website',
  },
  {
    name: 'Rose on Piedmont',
    category: 'Hospitality · Weekly Programming',
    href: 'https://111atl.com/#events',
    status: 'Operating',
    actionLabel: 'See This Week',
    destinationType: 'website',
  },
  {
    name: 'GROWN-ISH',
    category: 'Friday Nightlife · Rose on Piedmont',
    href: 'https://111atl.com/#events',
    status: 'Operating',
    actionLabel: 'Reserve Friday',
    destinationType: 'website',
  },
  {
    name: 'Sole Exchange',
    category: 'Community · Sneaker Impact',
    logo: `${SB}/email-newsletters/sole-exchange-logo.png`,
    href: 'https://111atl.com/#forms',
    status: 'Active Initiative',
    actionLabel: 'Support',
    destinationType: 'form',
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
    href: 'https://bodegabodegabodega.com',
    status: 'Active Platform',
    actionLabel: 'Shop',
    destinationType: 'website',
  },
  {
    name: 'STUSH',
    category: 'Fashion · Elevated Streetwear',
    href: 'https://stushusa.com',
    status: 'Active Brand',
    actionLabel: 'Shop',
    destinationType: 'website',
  },
  {
    name: 'PULSE',
    category: 'Athletic · Golf · Lifestyle',
    href: 'https://111atl.com/#forms',
    status: 'Building',
    actionLabel: 'Inquire',
    destinationType: 'form',
  },
  {
    name: 'Make Atlanta Great Again',
    category: 'Atlanta Culture · Apparel',
    href: 'https://thaoldatlanta.com',
    status: 'Active Brand',
    actionLabel: 'Explore',
    destinationType: 'website',
  },
  {
    name: 'GOOD TIMES',
    category: 'Lifestyle Technology · Concierge',
    logo: `${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png`,
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
    title: 'Founder & Enterprise',
    eyebrow: 'Command Layer',
    description: 'Founder platforms, enterprise leadership, culture, media and the shared strategy layer behind every independent brand.',
    brands: ['Dr. Dorsey', 'The Kollective ENT.', 'The Fraternity', "The Gentleman’s Club", 'HugLife', 'Make Atlanta Great Again', 'Iconic Music', 'PULSE', 'Grants & Sponsorships'],
    href: '/forms/inquiry',
    cta: 'Enterprise Inquiry',
  },
  {
    title: 'Hospitality & Nightlife',
    eyebrow: 'Operating & Portfolio Companies',
    description: 'Restaurants, lounges, nightlife concepts, venue operations and hospitality intellectual property at different operating and development stages.',
    brands: ['Rose on Piedmont — Operating', 'GROWN-ISH — Operating', 'Opium ATL / HTX', 'Sea Salt ATL', 'Tulum ATL / HTX', 'Hungry AF', 'Goodfellas Pizza & Wings', 'Happy Hour', 'Clicks'],
    href: 'https://111atl.com/#events',
    cta: 'Current Atlanta Access',
  },
  {
    title: 'The Casper Group',
    eyebrow: 'Quick-Serve Portfolio',
    description: 'Independent food brands designed for delivery, food halls, licensing and multi-location expansion.',
    brands: ['Angel Wings', 'Pasta Bish', 'Taco Yaki', 'Patty Daddy', 'Espresso Co.', 'Morning After', "Toss’d", 'Sweet Tooth', 'Mojo Juice', 'Mr. Oyster', 'Peace Pizza', 'American Dragon'],
    href: '/forms/group_pricing',
    cta: 'Food & Licensing Inquiry',
  },
  {
    title: 'Events & Cultural IP',
    eyebrow: 'Active Programming & Portfolio IP',
    description: 'Current weekly programming plus owned concepts that may be operating, seasonal, in development or positioned for relaunch.',
    brands: ['R&B Tuesdays — Active', 'W.C.W. — Active', 'Throwback Thursdays — Active', 'Taste of Art — Active', 'GROWN-ISH — Active', 'Sunset Saturdays — Active', 'The Kulture Market — Portfolio IP', 'REMIX — Portfolio IP', "Sunday’s Best — Portfolio IP", 'Diaspora ATL — Portfolio IP', 'Forever Futbol — Museum', 'Living Legends — Museum', 'Black Ball — Portfolio IP'],
    href: 'https://111atl.com/#events',
    cta: 'View Current Programming',
  },
  {
    title: 'Products & Commerce',
    eyebrow: 'Consumer Brands',
    description: 'Fashion, wellness, water, energy, art, books and direct-to-consumer platforms with separate brand identities and funnels.',
    brands: ['Hakuna Matata', 'Bodega', 'STUSH', 'PULSE', 'Make Atlanta Great Again', 'Infinity Water', 'Pronto Energy', 'Tribal Water', 'Stitch', 'The Puff Dept.', 'Canvas Club', 'MYXX', 'Ace Theory', 'Ritual', 'Dream'],
    href: '/shop',
    cta: 'Shop & Product Access',
  },
  {
    title: 'Technology & Apps',
    eyebrow: 'Platform Division',
    description: 'Consumer apps, service marketplaces, legal technology, civic tools and enterprise products. App-first products route users directly to their store listing when available.',
    brands: ['GOOD TIMES — Active Platform', 'On Call', 'S.O.S.', 'Luxe on Demand', 'The Law', 'The Vote', 'Mission 365', 'The Attorney Network', 'Black Pages — App', 'The Brand Studio'],
    href: '/forms/inquiry?division=technology',
    cta: 'Technology & App Inquiry',
  },
  {
    title: 'Services & Umbrella Group',
    eyebrow: 'Service Companies',
    description: 'High-trust service businesses spanning mobility, wellness, branding, property, therapy and client support.',
    brands: ['Help 911', 'The Mind Studio', 'Brand Studio', 'Reset Therapy', 'Umbrella Auto Exchange', 'Umbrella Realty Group', 'Umbrella Clean Services', "The People’s Department"],
    href: '/forms/inquiry?division=services',
    cta: 'Request Services',
  },
  {
    title: 'Institutions & Impact',
    eyebrow: 'Nation · Education · Youth · Community',
    description: 'Long-term infrastructure for governance, education, water, workforce, youth development, sports and measurable community impact.',
    brands: ['The Sovereign Nation', 'The Tribe — Memphis', 'The University', 'Everyday Water Group', 'Nativa Waterworks', 'Aquifer Waterworks', 'Trailblazers', 'Little Farmers of the Future', 'Sole Exchange', 'Kid Fit ATL', "Let’s Talk About It", "Playmaker’s Sports Association", "Member’s Elite"],
    href: '/forms/onboarding',
    cta: 'Join or Support',
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
