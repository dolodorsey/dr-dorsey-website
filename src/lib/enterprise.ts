export const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';

export const BOOK_URL = 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey';
export const BOOK_COVER = 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/cover-hero.png?v=1783903956';

export type BrandCard = {
  name: string;
  category: string;
  logo: string;
  href: string;
  status?: string;
};

export const operatingBrands: BrandCard[] = [
  { name: 'Opium', category: 'Hospitality · Nightlife', logo: '/brand/logo-opium.svg', href: '/forms/table_reservation', status: 'Operating' },
  { name: 'Sea Salt', category: 'Restaurant · Hospitality', logo: '/brand/logo-sea-salt.svg', href: '/forms/table_reservation', status: 'Operating' },
  { name: 'Tulum', category: 'Restaurant · Nightlife', logo: `${SB}/good-times-app/tulum_party/tulum_party_landscape.png`, href: '/forms/table_reservation', status: 'Operating' },
  { name: 'Hungry AF', category: 'Pasta · Wings · Hibachi', logo: '/brand/logo-hungry-af.svg', href: '/forms/group_pricing', status: 'Operating' },
  { name: 'Goodfellas', category: 'Pizza · Wings', logo: `${SB}/good-times-app/goodfellas/goodfellas_atlanta_landscape.png`, href: '/forms/group_pricing', status: 'Operating' },
  { name: 'The Casper Group', category: 'Quick-Serve Portfolio', logo: `${SB}/casper_group/logos/logo-full.png`, href: 'https://casper-group.vercel.app', status: 'Scaling' },
  { name: 'HugLife', category: 'Events · Culture', logo: `${SB}/huglife/logos/huglife-white.png`, href: 'https://huglife.vercel.app', status: 'Active' },
  { name: 'Infinity Water', category: 'Luxury Water', logo: `${SB}/good-times-app/infinity_water/infinity_water_landscape.png`, href: 'https://infinity-water-website.vercel.app', status: 'Active' },
  { name: 'Pronto Energy', category: 'Consumer Beverage', logo: `${SB}/pronto_energy/logos/pronto-logo.png`, href: 'https://pronto-energy-website.vercel.app', status: 'Active' },
  { name: 'Good Times', category: 'Lifestyle Technology', logo: `${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png`, href: 'https://good-times-app.vercel.app', status: 'Active' },
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
    title: 'Hospitality & Nightlife',
    eyebrow: 'Operating Companies',
    description: 'Restaurants, lounges, nightlife concepts, venue operations and scalable hospitality systems.',
    brands: ['Opium ATL / HTX', 'Sea Salt ATL', 'Tulum ATL / HTX', 'Hungry AF', 'Goodfellas Pizza & Wings', 'Happy Hour', 'Clicks', 'Rose Bar Programming'],
    href: '/forms/table_reservation',
    cta: 'Reserve / Book',
  },
  {
    title: 'The Casper Group',
    eyebrow: 'Quick-Serve Portfolio',
    description: 'Independent food brands designed for delivery, food halls, licensing and multi-location expansion.',
    brands: ['Angel Wings', 'Pasta Bish', 'Taco Yaki', 'Patty Daddy', 'Espresso Co.', 'Morning After', "Toss'd", 'Sweet Tooth', 'Mojo Juice', 'Mr. Oyster', 'Peace Pizza', 'American Dragon'],
    href: 'https://casper-group.vercel.app',
    cta: 'Explore Casper',
  },
  {
    title: 'Events & Cultural IP',
    eyebrow: 'Experiences',
    description: 'Owned event concepts, festivals, museum experiences and repeatable cultural properties.',
    brands: ['Taste of Art', 'The Kulture Market', 'REMIX', "Sunday's Best", 'Grown-ish', 'Diaspora ATL', 'Forever Futbol', 'Living Legends', 'Boil Gone Wild', 'Parking Lot Pimpin', 'Underground King', 'Soul Sessions', 'Pawchella', 'Black Ball'],
    href: '/forms/rsvp',
    cta: 'RSVP / Events',
  },
  {
    title: 'Products & Commerce',
    eyebrow: 'Consumer Brands',
    description: 'Fashion, wellness, water, energy, art and direct-to-consumer product ecosystems.',
    brands: ['Bodega Bodega Bodega', 'Stitch', 'The Puff Dept.', 'Canvas Club', 'MYXX', 'PULSE', 'Ace Theory', 'STUSH', 'Make Atlanta Great Again', 'Infinity Water', 'Pronto Energy', 'Tribal Water', 'Ritual', 'Dream'],
    href: '/shop',
    cta: 'Shop Products',
  },
  {
    title: 'Technology & Apps',
    eyebrow: 'Platform Division',
    description: 'Consumer apps, service marketplaces, legal technology, civic tools and enterprise automation.',
    brands: ['Good Times', 'On Call', 'S.O.S.', 'Luxe on Demand', 'The Law', 'The Vote', 'Mission 365', 'The Attorney Network', 'Black Pages', 'The Brand Studio'],
    href: '/forms/inquiry',
    cta: 'Technology Inquiry',
  },
  {
    title: 'Umbrella Group',
    eyebrow: 'Services',
    description: 'High-trust service businesses spanning mobility, wellness, branding, property and client support.',
    brands: ['Help 911', 'The Mind Studio', 'Brand Studio', 'Reset Therapy', 'Umbrella Auto Exchange', 'Umbrella Realty Group', 'Umbrella Clean Services', "The People's Department"],
    href: '/forms/inquiry',
    cta: 'Request Services',
  },
  {
    title: 'Nation, Education & Youth',
    eyebrow: 'Legacy Infrastructure',
    description: 'Long-term institutions for governance, education, workforce, youth development and sovereign enterprise.',
    brands: ['The Sovereign Nation', 'The Tribe', 'The University', 'Trailblazers', 'Little Farmers of the Future', 'Everyday Water Group', 'Nativa Waterworks', 'Aquifer Waterworks'],
    href: '/forms/onboarding',
    cta: 'Join / Inquire',
  },
  {
    title: 'Community & Nonprofit',
    eyebrow: 'Impact Division',
    description: 'Programs that turn culture, sports, mental wellness and economic access into measurable community impact.',
    brands: ['Kid Fit ATL', 'Sole Exchange', "Let's Talk About It", "Playmaker's Sports Association", "Member's Elite", 'Grants & Sponsorships'],
    href: '/forms/volunteer',
    cta: 'Support / Volunteer',
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
  { title: 'RSVP / Guest List', description: 'Events, launches, parties and public experiences.', href: '/forms/rsvp', group: 'Sales & Reservations', featured: true },
  { title: 'Table Reservation', description: 'Restaurant, lounge and nightlife table requests.', href: '/forms/table_reservation', group: 'Sales & Reservations' },
  { title: 'Group Pricing', description: 'Large parties, catering, group packages and private bookings.', href: '/forms/group_pricing', group: 'Sales & Reservations' },
  { title: 'Shop The Enterprise', description: 'Books, apparel, products and current releases.', href: '/shop', group: 'Sales & Reservations' },
  { title: 'Sponsor / Partner', description: 'Sponsorship, brand integration and strategic partnerships.', href: '/forms/sponsor', group: 'Partnerships', featured: true },
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
  { value: '57+', label: 'Brands & Ventures' },
  { value: '8', label: 'Active Markets' },
  { value: '20+', label: 'Operating Concepts' },
  { value: '198', label: 'AI Agents' },
];
