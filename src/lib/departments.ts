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
    title: 'Nightlife / Events / Activations',
    eyebrow: 'Hospitality & Cultural IP',
    detail: 'Venues, recurring nightlife concepts, public activations and major destination events.',
    sample: ['Opium ATL', 'Revel', 'GROWN-ISH', 'Project X', 'Freedom Fest', 'Taste of Art'],
    href: '/events',
    cta: 'Open nightlife and events',
    animations: [motion.opium, motion.revel, motion.tasteOfArt, motion.freedomFest],
  },
  {
    title: 'Staples',
    eyebrow: 'Flagship Brands',
    detail: 'The high-visibility operating brands that serve as permanent anchors of the enterprise.',
    sample: ['Rose on Piedmont', 'Help 911'],
    href: '/companies#staples',
    cta: 'Explore the staples',
    animations: [motion.rose, motion.help911],
  },
  {
    title: 'Dorsey / Kollective',
    eyebrow: 'Founder & Enterprise',
    detail: 'The founder platform, publishing, personal brand and enterprise command layer behind the full portfolio.',
    sample: ['Dr. Dorsey', 'The Kollective ENT.', 'Hakuna Matata'],
    href: '/companies#dorsey-kollective',
    cta: 'Enter the enterprise',
    animations: [motion.drDorsey, motion.hakunaMatata],
  },
  {
    title: 'Inner Circle',
    eyebrow: 'Platforms & Intelligence',
    detail: 'The private platform and application network that turns attention, membership and access into utility.',
    sample: ['GOOD TIMES', 'S.O.S.', 'On Call', 'Luxe on Demand', 'The Law', 'The Vote', 'Black Pages'],
    href: '/directory?division=technology-apps',
    cta: 'Enter the inner circle',
    animations: [motion.innerCircle, motion.blackPages, motion.goodTimes, motion.sos],
  },
  {
    title: 'Products / Clothing',
    eyebrow: 'Commerce',
    detail: 'Fashion and consumer product worlds with direct routes to purchase.',
    sample: ['STUSH', 'Bodega', 'PULSE', 'Make Atlanta Great Again'],
    href: '/store',
    cta: 'Shop the portfolio',
    animations: [motion.stush, motion.bodega, motion.pulse, motion.maga],
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
    title: 'Change the World',
    eyebrow: 'Impact & Community',
    detail: 'Sneaker recovery, youth development, mental-health conversations and community pathways built to last.',
    sample: ['Sole Exchange', "Playmaker's Sports Association", "Let's Talk About It"],
    href: 'https://soleexchangeworldwide.com',
    cta: 'Enter the impact network',
    animations: [motion.soleExchange, motion.psa, motion.letsTalk],
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
    detail: 'A separate coordinated network for property, mobility, finance, wellness, travel and business services.',
    sample: ['Umbrella Auto Exchange', 'Umbrella Realty Group', 'The Mind Studio', 'Brand Studio', "The People's Department", 'Automation Office', 'Umbrella Travel', 'Reset Therapy'],
    href: 'https://umbrellagroupworldwide.com',
    cta: 'Enter Umbrella Group',
    animations: [motion.umbrellaGroup, motion.umbrellaMind, motion.umbrellaPeople, motion.umbrellaAutomation, motion.resetTherapy],
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
