import { motion, type MotionAsset } from '@/lib/motion';

export type World = {
  title: string;
  eyebrow: string;
  intro: string;
  image: string;
  items: {
    title: string;
    eyebrow: string;
    detail: string;
    href: string;
    image?: string;
    /** Animated cover. Overrides the name-based lookup in MotionCover. */
    animation?: MotionAsset;
  }[];
  videos?: { title: string; src: string; href: string }[];
};

export const worlds: Record<string, World> = {
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
    title: 'THE PORTFOLIO, IN HAND.',
    eyebrow: 'Shop / wear / read / drink',
    intro: 'Products built with an identity: fashion, founder media, premium water, and energy.',
    image: '/dorsey/book-office.png',
    items: [
      { title: 'Hakuna Matata', eyebrow: 'Book', detail: 'The mindset behind the machine.', href: 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey', image: '/dorsey/book-cover.png' },
      { title: 'STUSH', eyebrow: 'Fashion', detail: 'Original apparel and elevated streetwear.', href: 'https://stushusa.com', image: '/dorsey/current/stush-fashion.jpg' },
      { title: 'Pronto Energy', eyebrow: 'Beverages', detail: 'An active energy brand designed for movement.', href: 'https://prontoenergydrink.com', image: '/dorsey/current/pronto-energy.jpg' },
      { title: 'Infinity Water', eyebrow: 'Premium water', detail: 'An active premium-water brand at the intersection of hydration and hospitality.', href: 'https://watertoinfinity.com', image: '/dorsey/current/infinity-water.jpg' },
    ],
  },
  upcoming: {
    title: 'WHAT I’M BUILDING NEXT.',
    eyebrow: 'Upcoming / in development',
    intro: 'A selective view into concepts moving through design, partnerships, production, and market readiness.',
    image: '/dorsey/architect.webp',
    items: [
      { title: 'Hospitality Expansion', eyebrow: 'Casper Group / 12 brands', detail: 'A full licensing portfolio with original concepts built for new markets.', href: 'https://caspergroupworldwide.com' },
      { title: 'Water Infrastructure', eyebrow: 'Source to product', detail: 'Connected systems across Aquifer, Nativa, Everyday, and Tribal Water.', href: '/network' },
      { title: 'Product Releases', eyebrow: 'Commerce', detail: 'New fashion, beverage, publishing, and consumer drops.', href: '/store' },
      { title: 'Platform Expansion', eyebrow: 'Apps / Tech', detail: 'On Call and S.O.S. are active; Luxe on Demand and The Law are in development.', href: '/directory' },
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
    title: 'FOUNDER-LED. NETWORK-POWERED.',
    eyebrow: 'Team / specialists / operators',
    intro: 'The enterprise assembles the right specialists around each world while preserving one founder-led direction and one standard.',
    image: '/dorsey/profile.webp',
    items: [
      { title: 'Dr. Dorsey', eyebrow: 'Founder & CEO', detail: 'Enterprise vision, architecture, culture, and strategic direction.', href: '/forms/consultation' },
      { title: 'Hospitality Operations', eyebrow: 'Operators', detail: 'Venue, food, licensing, guest experience, and execution.', href: '/forms/hiring_inquiry' },
      { title: 'Creative & Culture', eyebrow: 'Identity', detail: 'Brand worlds, campaigns, programming, and storytelling.', href: '/forms/what_you_do' },
      { title: 'Technology & Product', eyebrow: 'Systems', detail: 'Platforms, consumer experiences, data, and enterprise tools.', href: '/forms/what_you_do' },
      { title: 'Water & Infrastructure', eyebrow: 'Long-term systems', detail: 'Sourcing, supply, distribution, products, and education.', href: '/network' },
      { title: 'Partnership Network', eyebrow: 'Growth', detail: 'Sponsors, vendors, specialists, properties, and collaborators.', href: '/forms/sponsor' },
    ],
  },
};
