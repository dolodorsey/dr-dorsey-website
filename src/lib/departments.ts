import { motion, type MotionAsset } from '@/lib/motion';
import { pruneNames } from '@/lib/roster';

export type Department = {
  title: string;
  eyebrow: string;
  detail: string;
  sample: string[];
  href: string;
  cta: string;
  animations: MotionAsset[];
};

const allDepartments: Department[] = [
  {
    title: 'Dorsey / Kollective',
    eyebrow: 'Founder & Enterprise',
    detail: 'The founder platform and enterprise command layer behind the full portfolio.',
    sample: ['Dr. Dorsey', 'The Kollective ENT.', 'Hakuna Matata', 'Black Pages'],
    href: '/companies#dorsey-kollective',
    cta: 'Enter the enterprise',
    animations: [motion.drDorsey],
  },
  {
    title: 'Nightlife',
    eyebrow: 'Hospitality & Rooms',
    detail: 'Bars, lounges and late rooms built as distinct destinations.',
    sample: ['Opium ATL', 'Revel', 'Sea Salt ATL', 'Tulum ATL'],
    href: '/events#nightlife',
    cta: 'Enter nightlife',
    animations: [motion.opium, motion.revel],
  },
  {
    title: 'Rose on Piedmont',
    eyebrow: 'The Flagship',
    detail: 'Weekly programming, private tables, birthdays and direct venue access.',
    sample: ['GROWN-ISH', 'Weekly Programming', 'Tables & VIP'],
    href: '/app/forms/rsvp?venue=Rose%20on%20Piedmont',
    cta: 'Open Rose access',
    animations: [motion.rose],
  },
  {
    title: 'Events / Activations',
    eyebrow: 'Cultural IP',
    detail: 'The public event and nightlife properties currently active across the enterprise.',
    sample: ['Rose on Piedmont', 'GROWN-ISH', 'Taste of Art', 'Freedom Fest'],
    href: '/events',
    cta: 'Open events and nightlife',
    animations: [motion.tasteOfArt, motion.freedomFest],
  },
  {
    title: 'App(s)',
    eyebrow: 'Platforms & Intelligence',
    detail: 'Consumer platforms and service-routing products that turn attention into utility.',
    sample: ['GOOD TIMES', 'S.O.S.', 'On Call', 'Luxe on Demand', 'The Law', 'The Vote'],
    href: '/directory?division=technology-apps',
    cta: 'Explore applications',
    animations: [motion.goodTimes, motion.sos, motion.theLaw, motion.theVote],
  },
  {
    title: 'Products / Clothing',
    eyebrow: 'Commerce',
    detail: 'Fashion, publishing and consumer product worlds with direct routes to purchase.',
    sample: ['STUSH', 'Bodega', 'PULSE', 'Hakuna Matata', 'Make Atlanta Great Again'],
    href: '/store',
    cta: 'Shop the portfolio',
    animations: [motion.stush, motion.bodega, motion.pulse, motion.hakunaMatata, motion.maga],
  },
  {
    title: 'Water Sourcing',
    eyebrow: 'Infrastructure',
    detail: 'Aquifer, sourcing, treatment and resilient regional water supply.',
    sample: ['Everyday Water Group', 'Aquifer Waterworks', 'Nativa Waterworks'],
    href: '/network#water-sourcing',
    cta: 'Enter the source network',
    animations: [motion.aquifer, motion.everydayWater, motion.nativa],
  },
  {
    title: 'Beverages',
    eyebrow: 'Consumer Products',
    detail: 'Water and energy brands designed for hospitality, culture and retail.',
    sample: ['Infinity Water', 'Tribal Water', 'Pronto Energy', 'The Tribe Wine'],
    href: '/store',
    cta: 'Explore beverages',
    animations: [motion.infinityWater, motion.tribalWater, motion.pronto],
  },
  {
    title: 'Help 911',
    eyebrow: 'Response',
    detail: 'Trusted service and support routing for urgent and everyday needs.',
    sample: ['Help 911', 'S.O.S.', 'On Call', 'Umbrella Injury Network'],
    href: 'https://www.help911.help',
    cta: 'Open Help 911',
    animations: [motion.help911, motion.sos],
  },
  {
    title: 'Sole Exchange / PSA',
    eyebrow: 'Impact & Youth',
    detail: 'Sneaker impact, youth sport and community pathways built to last.',
    sample: ['Sole Exchange', "Playmaker's Sports Association", "Let's Talk About It"],
    href: 'https://soleexchangeworldwide.com',
    cta: 'Enter the impact network',
    animations: [motion.soleExchange],
  },
  {
    title: 'Casper Group',
    eyebrow: 'Food Portfolio',
    detail: 'A distinct multi-brand food house built for delivery, licensing and expansion.',
    sample: ['American Dragon', 'Peace Pizza', 'Taco Yaki', 'Pasta Bish', 'Angel Wings'],
    href: 'https://caspergroupworldwide.com',
    cta: 'Enter Casper Group',
    animations: [motion.casperGroup],
  },
  {
    title: 'Umbrella Group',
    eyebrow: 'Service Portfolio',
    detail: 'A separate coordinated network for property, mobility, finance, wellness and business services.',
    sample: ['Umbrella Auto Exchange', 'Umbrella Realty Group', 'The Mind Studio', 'Brand Studio'],
    href: 'https://umbrellagroupworldwide.com',
    cta: 'Enter Umbrella Group',
    animations: [motion.umbrellaGroup],
  },
  {
    title: 'The Inner Circle',
    eyebrow: 'Membership & Development',
    detail: 'The private relationship, community, youth and leadership layer of the enterprise.',
    sample: ['The Fraternity', "The Gentleman's Club", 'The Tribe', 'Trailblazers', 'Little Farmers of the Future', "Member's Elite"],
    href: '/companies#the-inner-circle',
    cta: 'Enter the inner circle',
    animations: [motion.fraternity],
  },
  {
    title: 'The University',
    eyebrow: 'Trades & Workforce',
    detail: 'Trades, workforce and ownership education from skill-building through enterprise ownership.',
    sample: ['The University', 'Programs', 'Workforce', 'Ownership'],
    href: 'https://the-university.vercel.app',
    cta: 'Explore programs',
    animations: [motion.university],
  },
];

export const departments: Department[] = allDepartments.map((department) => ({
  ...department,
  sample: pruneNames(department.sample),
}));
