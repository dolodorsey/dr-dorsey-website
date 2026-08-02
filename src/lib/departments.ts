import { motion, type MotionAsset } from '@/lib/motion';
import { pruneNames } from '@/lib/roster';

/**
 * The nine operating departments.
 *
 * This is the enterprise's own top-level map — the view that used to sit on
 * the Companies page and now leads both homepages. The Companies page carries
 * the full company roster underneath it.
 *
 * The first two entries render as the large featured pair; the rest render
 * four across.
 */
export type Department = {
  title: string;
  eyebrow: string;
  detail: string;
  /** A few representative companies. Kept short — the full list lives on /companies. */
  sample: string[];
  /** Where the department itself lives. */
  href: string;
  cta: string;
  animation?: MotionAsset;
};

const allDepartments: Department[] = [
  {
    title: 'Entertainment',
    eyebrow: 'Culture & IP',
    detail:
      'Nightlife, music, live programming, museums, and signature experiences engineered to become repeatable cultural rituals.',
    sample: ['Rose on Piedmont', 'GROWN-ISH', 'Taste of Art', 'HugLife', 'Iconic'],
    href: 'https://111atl.com',
    cta: 'Enter current culture',
    animation: motion.grownish,
  },
  {
    title: 'Apps / Tech',
    eyebrow: 'Platforms & Intelligence',
    detail:
      'Consumer platforms, service routing, civic tools, and enterprise systems that turn attention into utility.',
    sample: ['GOOD TIMES', 'On Call', 'S.O.S.', 'The Law', 'The Vote', 'Black Pages'],
    href: '/directory',
    cta: 'Explore technology',
    animation: motion.sos,
  },
  {
    title: 'Products / Shop',
    eyebrow: 'Commerce',
    detail: 'Fashion, publishing, collectibles, wellness, and direct-to-consumer product worlds.',
    sample: ['Hakuna Matata', 'Bodega', 'STUSH', 'PULSE', 'MYXX'],
    href: '/store',
    cta: 'Shop the portfolio',
    animation: motion.stush,
  },
  {
    title: 'Water Sourcing',
    eyebrow: 'Infrastructure',
    detail:
      'Long-horizon water intelligence spanning aquifers, sourcing, treatment, resilient supply, and regional stewardship.',
    sample: ['Everyday Water Group', 'Aquifer Waterworks', 'Nativa Waterworks'],
    href: '/network',
    cta: 'Enter the source network',
    animation: motion.aquifer,
  },
  {
    title: 'Beverages',
    eyebrow: 'Consumer Products',
    detail: 'Water, wine, and energy brands designed for culture, hospitality, retail, and everyday movement.',
    sample: ['Infinity Water', 'Pronto Energy', 'Tribal Water', 'The Tribe Wine'],
    href: '/store',
    cta: 'Explore beverages',
    animation: motion.infinityWater,
  },
  {
    title: 'Help 911',
    eyebrow: 'Response',
    detail:
      'Human-centered platforms routing urgent and everyday needs toward the right trusted service, professional, or resource.',
    sample: ['Help 911', 'S.O.S.', 'On Call', 'Umbrella Injury Network'],
    href: 'https://www.help911.help',
    cta: 'Open Help 911',
    animation: motion.help911,
  },
  {
    title: 'Philanthropy',
    eyebrow: 'Impact & Institutions',
    detail: 'Access, education, youth, membership, and community platforms built as durable pathways.',
    sample: ['Sole Exchange', 'Playmakers Sports Association', 'The University', 'Trailblazers'],
    href: 'https://soleexchangeworldwide.com',
    cta: 'Enter the impact network',
    animation: motion.soleExchange,
  },
  {
    title: 'Casper Group',
    eyebrow: 'Hospitality / 12 Brands',
    detail:
      'Original food and beverage identities designed for delivery, licensing, food halls, and multi-unit expansion.',
    sample: ['American Dragon', 'Peace Pizza', 'Taco Yaki', 'Pasta Bish', 'Angel Wings'],
    href: 'https://caspergroupworldwide.com',
    cta: 'Enter the Casper Group',
    animation: motion.casperGroup,
  },
  {
    title: 'Umbrella Group',
    eyebrow: 'Services',
    detail:
      'Property, mobility, cleaning, accounting, travel, wellness, people operations, and client support under one standard.',
    sample: ['Umbrella Auto Exchange', 'Umbrella Realty Group', 'The Mind Studio', 'Umbrella Accounting'],
    href: 'https://theumbrella.group',
    cta: 'Enter the service network',
    animation: motion.theLaw,
  },
];
/** Retired brands never appear in a department's sample chips. */
export const departments: Department[] = allDepartments.map((department) => ({
  ...department,
  sample: pruneNames(department.sample),
}));

