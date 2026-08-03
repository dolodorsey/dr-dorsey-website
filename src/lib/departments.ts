import { motion, type MotionAsset } from '@/lib/motion';
import { pruneNames } from '@/lib/roster';

/**
 * The fourteen operating departments.
 *
 * This is the enterprise's own top-level map and it leads both homepages.
 * The Companies pages carry the full roster underneath it.
 *
 * The first two render as the large featured pair; the remaining twelve
 * render four across, which lands as exactly three clean rows.
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
  /**
   * Every animation that belongs to this department, drawn from its own
   * companies. The grid rotates through the pool so a returning viewer sees a
   * different face of the department each visit rather than the same still
   * frame forever.
   */
  animations: MotionAsset[];
};

const allDepartments: Department[] = [
  {
    title: 'Dorsey / Kollective',
    eyebrow: 'Founder & Enterprise',
    detail:
      'The founder platform and the enterprise command layer — the belief, the architecture, and the leverage every other department runs on.',
    sample: ['Dr. Dorsey', 'The Kollective ENT.', 'Hakuna Matata', 'The Fraternity', 'Iconic'],
    href: '/companies#dorsey-kollective',
    cta: 'Enter the enterprise',
    animations: [motion.kollectiveGlobal, motion.kollectiveNetwork, motion.hakunaMatata, motion.fraternity, motion.blackPages],
  },
  {
    title: 'Nightlife',
    eyebrow: 'Hospitality & Rooms',
    detail:
      'Bars, lounges and late rooms built as destinations — each with its own crowd, its own hours, and its own reason to be in that city.',
    sample: ['Opium ATL', 'Sea Salt ATL', 'Tulum ATL', 'Hungry AF', 'Goodfellas Pizza & Wings'],
    href: '/companies#nightlife',
    cta: 'Enter the rooms',
    animations: [motion.opium, motion.seaSalt, motion.seaSaltAlt, motion.tulum, motion.hungryAf, motion.goodfellas, motion.goodfellasAlt, motion.goodfellasAltTwo],
  },
  {
    title: 'Rose on Piedmont',
    eyebrow: 'The Flagship',
    detail:
      'The house venue. Weekly programming, private tables, birthdays and the room the rest of the calendar is built around.',
    sample: ['GROWN-ISH', 'Weekly Programming', 'Tables & VIP'],
    href: 'https://111atl.com/#events',
    cta: 'See what is on',
    animations: [motion.rose, motion.grownish, motion.grownishWeekly],
  },
  {
    title: 'Events / Activations',
    eyebrow: 'Cultural IP',
    detail:
      'Original event properties and seasonal activations engineered to repeat — owned formats rather than one-off nights.',
    sample: ['Taste of Art', 'Freedom Fest', 'Juneteenth Atlanta', 'Living Legends'],
    href: '/companies#events-activations',
    cta: 'Enter current culture',
    animations: [motion.tasteOfArt, motion.tasteOfArtPortrait, motion.grownish, motion.goodTimes],
  },
  {
    title: 'App(s)',
    eyebrow: 'Platforms & Intelligence',
    detail:
      'Consumer platforms, service routing and civic tools that turn attention into utility.',
    sample: ['GOOD TIMES', 'On Call', 'S.O.S.', 'The Law', 'The Vote'],
    href: '/directory',
    cta: 'Explore technology',
    animations: [motion.sos, motion.sosAlt, motion.theLaw, motion.theVote, motion.goodTimes, motion.goodTimesPortrait],
  },
  {
    title: 'Products / Clothing',
    eyebrow: 'Commerce',
    detail:
      'Fashion, publishing, collectibles and direct-to-consumer product worlds, each with its own identity.',
    sample: ['STUSH', 'Bodega', 'Hakuna Matata', 'PULSE', 'Make Atlanta Great Again'],
    href: '/store',
    cta: 'Shop the portfolio',
    animations: [motion.stush, motion.bodega, motion.hakunaMatata, motion.pulse, motion.maga, motion.magaCollage, motion.magaScene],
  },
  {
    title: 'Water Sourcing',
    eyebrow: 'Infrastructure',
    detail:
      'Long-horizon water intelligence spanning aquifers, sourcing, treatment, resilient supply and regional stewardship.',
    sample: ['Everyday Water Group', 'Aquifer Waterworks', 'Nativa Waterworks'],
    href: '/network',
    cta: 'Enter the source network',
    animations: [motion.aquifer, motion.everydayWater, motion.nativa],
  },
  {
    title: 'Beverages',
    eyebrow: 'Consumer Products',
    detail:
      'Water, wine and energy brands designed for culture, hospitality, retail and everyday movement.',
    sample: ['Infinity Water', 'Tribal Water', 'Pronto Energy', 'The Tribe Wine'],
    href: '/store',
    cta: 'Explore beverages',
    animations: [motion.infinityWater, motion.tribalWater, motion.pronto],
  },
  {
    title: 'Help 911',
    eyebrow: 'Response',
    detail:
      'Human-centered platforms routing urgent and everyday needs toward the right trusted service, professional or resource.',
    sample: ['Help 911', 'S.O.S.', 'On Call', 'Umbrella Injury Network'],
    href: 'https://www.help911.help',
    cta: 'Open Help 911',
    animations: [motion.help911, motion.sos],
  },
  {
    title: 'Sole Exchange / PSA',
    eyebrow: 'Impact & Youth',
    detail:
      'Sneaker impact, youth sport and community programs built as durable pathways rather than one-off drives.',
    sample: ["Sole Exchange", "Playmaker's Sports Association", 'Kid Fit ATL', "Let's Talk About It"],
    href: 'https://soleexchangeworldwide.com',
    cta: 'Enter the impact network',
    animations: [motion.soleExchange, motion.trailblazer],
  },
  {
    title: 'Casper Group',
    eyebrow: 'Food / 12 Brands',
    detail:
      'Original food and beverage identities designed for delivery, licensing, food halls and multi-unit expansion.',
    sample: ['American Dragon', 'Peace Pizza', 'Taco Yaki', 'Pasta Bish', 'Angel Wings'],
    href: 'https://caspergroupworldwide.com',
    cta: 'Enter the Casper Group',
    animations: [motion.casperGroup],
  },
  {
    title: 'Umbrella Group',
    eyebrow: 'Services',
    detail:
      'Property, mobility, cleaning, accounting, travel, wellness and people operations under one coordinated standard.',
    sample: ['Umbrella Auto Exchange', 'Umbrella Realty Group', 'The Mind Studio', 'Umbrella Accounting'],
    href: 'https://theumbrella.group',
    cta: 'Enter the service network',
    animations: [motion.theLaw, motion.blackPages],
  },
  {
    title: 'Nation / Tribe',
    eyebrow: 'Community & Ownership',
    detail:
      'The membership and community layer — belonging, ownership and the network that carries the enterprise between cities.',
    sample: ['The Sovereign Nation', 'The Tribe — Memphis', 'Tribal Water', 'The Tribe Wine'],
    href: '/network',
    cta: 'Enter the network',
    animations: [motion.tribe, motion.tribalWater, motion.kollectiveNetwork],
  },
  {
    title: 'The University',
    eyebrow: 'Trades & Workforce',
    detail:
      'Trades, workforce and ownership education — the pathway from learning a skill to running something of your own.',
    sample: ['The University', 'Trailblazers', "Member's Elite", 'Little Farmers of the Future'],
    href: 'https://the-university.vercel.app',
    cta: 'Explore programs',
    animations: [motion.university, motion.trailblazer, motion.medicine],
  },
];

/** Retired brands never appear in a department's sample chips. */
export const departments: Department[] = allDepartments.map((department) => ({
  ...department,
  sample: pruneNames(department.sample),
}));
