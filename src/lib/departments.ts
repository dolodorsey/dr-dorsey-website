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
    eyebrow: 'Nightlife · Events · Cultural IP',
    detail: 'Recurring nightlife concepts, signature event series, cultural activations, tournaments and major destination events.',
    sample: [
      'Winter Wonderland', 'Taste of Art', 'Golf Tournament', 'Ball Series', 'Greek Ball',
      'Monster’s Ball', 'Snow Ball', 'Champagne Ball', 'Black Ball', 'Rose Ball', 'BRAVO',
    ],
    href: '/events',
    cta: 'Open nightlife and events',
    animations: [motion.tasteOfArt, motion.freedomFest, motion.projectX],
  },
  {
    title: 'Staples',
    eyebrow: 'Flagship Brands',
    detail: 'The high-visibility operating brands that serve as permanent anchors of the enterprise.',
    sample: ['Goodfellas Pizza & Wings', 'Hungry AF', 'Opium ATL', 'Sea Salt ATL', 'Tulum ATL', 'Rose on Piedmont', 'Help 911'],
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
    title: 'Production',
    eyebrow: 'Production · Sound · Print · Manufacturing',
    detail: 'Enterprise production capabilities spanning live event technology, sound, commercial print and product manufacturing.',
    sample: ['Frequency Productions', 'Synergy Sounds', 'Just Print', 'Mister Manufacturing'],
    href: '/companies#production',
    cta: 'Explore production',
    animations: [],
  },
  {
    title: 'Our Apps',
    eyebrow: 'Platforms & Intelligence',
    detail: 'Consumer platforms and service-routing products that turn attention into utility.',
    sample: ['GOOD TIMES', 'S.O.S.', 'On Call', 'Luxe on Demand', 'The Law', 'The Vote', 'Black Pages', 'Mission 365'],
    href: '/directory?division=technology-apps',
    cta: 'Explore our apps',
    animations: [motion.goodTimes, motion.sos, motion.onCall, motion.blackPages],
  },
  {
    title: 'The Inner Circle',
    eyebrow: 'Membership · Development · Legacy',
    detail: 'The private relationship, community, education, agriculture, youth and leadership layer of the enterprise.',
    sample: [
      'The Fraternity', "The Gentleman's Club", 'The Tribe', 'The University', 'Living Legacy Farms',
      'Trailblazers', 'Little Farmers of the Future', "Member's Elite",
    ],
    href: '/companies#the-inner-circle',
    cta: 'Enter the inner circle',
    animations: [motion.innerCircle, motion.fraternity, motion.gentlemansClub, motion.tribe, motion.university, motion.littleFarmers],
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
    sample: [
      'Umbrella Auto Exchange', 'Umbrella Realty Group', 'The Mind Studio',
      'Automation Office', 'Umbrella Travel', 'Reset Therapy',
    ],
    href: 'https://umbrellagroupworldwide.com',
    cta: 'Enter Umbrella Group',
    animations: [motion.umbrellaGroup, motion.umbrellaMind, motion.umbrellaAutomation, motion.resetTherapy],
  },
];

export const departments: Department[] = allDepartments.map((department) => ({
  ...department,
  sample: pruneNames(department.sample),
}));