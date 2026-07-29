export type World = {
  title: string;
  eyebrow: string;
  intro: string;
  image: string;
  items: { title: string; eyebrow: string; detail: string; href: string; image?: string }[];
  videos?: { title: string; src: string; href: string }[];
};

export const worlds: Record<string, World> = {
  companies: {
    title: 'THE ENTERPRISE ARCHITECTURE.',
    eyebrow: 'Companies / departments / worlds',
    intro: 'The founder’s enterprise is not one generic portfolio. Every department has its own language, audience, economics, and atmosphere—connected through one operating architecture.',
    image: '/dorsey/enterprise.webp',
    items: [
      { title: 'Entertainment', eyebrow: 'Culture', detail: 'Music, nightlife, events, programming, media, and original cultural IP.', href: 'https://111atl.com' },
      { title: 'Apps / Tech', eyebrow: 'Platforms', detail: 'GOOD TIMES, On Call and S.O.S. are active; Luxe on Demand and The Law are in development; The Vote is in planning.', href: '/directory' },
      { title: 'Products / Shop', eyebrow: 'Commerce', detail: 'Fashion, books, wellness, art, water, and beverages.', href: '/store' },
      { title: 'Water Sourcing', eyebrow: 'Infrastructure', detail: 'Aquifer, source, supply, distribution, stewardship, and resilience.', href: '/network' },
      { title: 'Beverages', eyebrow: 'Consumer', detail: 'Infinity Water, Tribal Water, The Tribe Wine, and Pronto Energy.', href: '/network' },
      { title: 'Help 911', eyebrow: 'Response', detail: 'An active human-centered response network for the moments people need help.', href: 'https://www.help911.help' },
      { title: 'Philanthropy', eyebrow: 'Impact', detail: 'Sole Exchange, Playmakers Sports Association, Members Elite, youth, access, and education.', href: 'https://soleexchangeworldwide.com' },
      { title: 'Casper Group', eyebrow: 'Hospitality / 12 brands', detail: 'American Dragon, Peace Pizza, Taco Yaki, Pasta Bish, Angel Wings, and seven more concepts.', href: 'https://caspergroupworldwide.com' },
      { title: 'Umbrella Group', eyebrow: 'Services', detail: 'Property, mobility, cleaning, accounting, travel, wellness, people operations, and support.', href: 'https://theumbrella.group' },
    ],
  },
  links: {
    title: 'EVERY PUBLIC DOOR.',
    eyebrow: 'The Dr. Dorsey links',
    intro: 'A single command page for what is live, what to buy, where to apply, and how to reach the right part of the enterprise.',
    image: '/dorsey/rooftop.jpg',
    items: [
      { title: '111ATL', eyebrow: 'Live now', detail: 'Current Atlanta events, tables, birthdays, RSVP, and VIP access.', href: 'https://111atl.com' },
      { title: 'The Kollective', eyebrow: 'Enterprise', detail: 'Open the complete ecosystem and interactive Entity Universe.', href: 'https://thekollectivehospitality.com' },
      { title: 'Hakuna Matata', eyebrow: 'The book', detail: 'Buy the founder’s field manual for living now and building next.', href: 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey' },
      { title: 'Forms', eyebrow: 'Take action', detail: 'Strategy, speaking, sponsorship, media, hiring, vendors, and more.', href: '/forms' },
      { title: 'Directory', eyebrow: 'Companies', detail: 'Search the official managed enterprise registry.', href: '/directory' },
      { title: 'Instagram', eyebrow: 'Follow', detail: 'Current founder work, moments, and perspective.', href: 'https://instagram.com/dolodorsey' },
    ],
  },
  store: {
    title: 'THE STORES.',
    eyebrow: 'Shop the enterprise',
    intro: 'Distinct storefronts for fashion, culture, lifestyle, and original products.',
    image: '/dorsey/book-office.png',
    items: [
      { title: 'Bodega', eyebrow: 'Main product store', detail: 'The central commerce home for enterprise product releases.', href: 'https://bodegabodegabodega.com', image: '/brand-logos/bodega.png' },
      { title: 'STUSH', eyebrow: 'Fashion', detail: 'Original apparel and elevated streetwear.', href: 'https://stushusa.com', image: '/dorsey/current/stush-fashion.jpg' },
      { title: 'Make Atlanta Great Again', eyebrow: 'Atlanta culture', detail: 'Original Atlanta apparel and cultural products.', href: 'https://thaoldatlanta.com', image: '/brand-logos/make-atlanta-great-again.png' },
      { title: 'PULSE', eyebrow: 'Lifestyle', detail: 'Movement-led products built for an active life.', href: 'https://bodegabodegabodega.com', image: '/brand-logos/pulse.png' },
      { title: 'MYXX', eyebrow: 'Lifestyle', detail: 'A distinct product world inside the Bodega portfolio.', href: 'https://bodegabodegabodega.com', image: '/brand-logos/myxx.png' },
      { title: 'Hakuna Matata', eyebrow: 'Book', detail: 'The founder’s field manual for life, leadership, and building.', href: 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey', image: '/dorsey/book-cover.png' },
    ],
  },
  upcoming: {
    title: 'UPCOMING ACTIVATIONS.',
    eyebrow: 'Seasonal experiences',
    intro: 'The next large-format worlds currently moving through production.',
    image: '/dorsey/current/winter-wonderland.png',
    items: [
      { title: 'HugLife Haunted House', eyebrow: 'Fall activation', detail: 'An immersive seasonal HugLife experience now in development.', href: '/forms/inquiry', image: '/brand-logos/kollective.png' },
      { title: 'The Winter Wonderland', eyebrow: 'Winter activation', detail: 'A large-format winter environment built for gathering, spectacle, and return visits.', href: '/forms/inquiry', image: '/dorsey/current/winter-wonderland.png' },
    ],
  },
  network: {
    title: 'THE TRIBE. THE WATER FUTURE.',
    eyebrow: 'Source / infrastructure / beverages / education',
    intro: 'Seven distinct animated worlds connecting water sourcing, infrastructure, products, learning, leadership, and community.',
    image: '/dorsey/enterprise.webp',
    items: [
      { title: 'Aquifer', eyebrow: 'Source', detail: 'Water-source intelligence and supply systems.', href: 'https://aquifer-waterworks.vercel.app' },
      { title: 'Everyday Water', eyebrow: 'Portfolio', detail: 'The coordinating water-enterprise ecosystem.', href: 'https://everyday-water-group.vercel.app' },
      { title: 'Nativa', eyebrow: 'Infrastructure', detail: 'Waterworks designed around place and stewardship.', href: 'https://nativa-waterworks.vercel.app' },
      { title: 'Tribal Water', eyebrow: 'Consumer', detail: 'Water rooted in identity and belonging.', href: 'https://tribal-water.vercel.app' },
      { title: 'The University', eyebrow: 'Education', detail: 'Enterprise and workforce learning.', href: 'https://the-university.vercel.app' },
      { title: 'Trailblazer', eyebrow: 'Leadership', detail: 'Development, progress, and new paths forward.', href: '/forms/inquiry' },
      { title: 'The Tribe', eyebrow: 'Network', detail: 'The connecting identity across the ecosystem.', href: 'https://the-tribe-wine.vercel.app' },
    ],
    videos: [
      { title: 'Aquifer', src: '/dorsey/motion/aquifer.mp4', href: 'https://aquifer-waterworks.vercel.app' },
      { title: 'Everyday', src: '/dorsey/motion/everyday.mp4', href: 'https://everyday-water-group.vercel.app' },
      { title: 'Nativa', src: '/dorsey/motion/nativa.mp4', href: 'https://nativa-waterworks.vercel.app' },
      { title: 'Trailblazer', src: '/dorsey/motion/trailblazer.mp4', href: '/forms/inquiry' },
      { title: 'Tribal Water', src: '/dorsey/motion/tribal-water.mp4', href: 'https://tribal-water.vercel.app' },
      { title: 'The University', src: '/dorsey/motion/university.mp4', href: 'https://the-university.vercel.app' },
      { title: 'The Tribe', src: '/dorsey/motion/tribe.mp4', href: 'https://the-tribe-wine.vercel.app' },
    ],
  },
  team: {
    title: 'THE PEOPLE BEHIND THE WORK.',
    eyebrow: 'Leadership / operators / specialists',
    intro: 'A founder-led team and accountable operating network built around distinct companies.',
    image: '/dorsey/profile.webp',
    items: [
      { title: 'Dr. Dorsey', eyebrow: 'Founder & CEO', detail: 'Enterprise vision, architecture, culture, and strategic direction.', href: '/forms/consultation' },
      { title: 'Hospitality Leadership', eyebrow: 'Operations', detail: 'Venue, food, licensing, guest experience, and accountable execution.', href: '/forms/inquiry' },
      { title: 'Creative Leadership', eyebrow: 'Identity & culture', detail: 'Brand worlds, campaigns, programming, and storytelling.', href: '/forms/inquiry' },
      { title: 'Technology Leadership', eyebrow: 'Platforms & systems', detail: 'Consumer experiences, data, and enterprise tools.', href: '/forms/inquiry' },
      { title: 'Infrastructure Leadership', eyebrow: 'Water & institutions', detail: 'Sourcing, supply, distribution, education, and long-term systems.', href: '/network' },
    ],
  },
};
