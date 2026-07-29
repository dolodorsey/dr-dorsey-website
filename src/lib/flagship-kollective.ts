/**
 * FLAGSHIP V2 — The Kollective Hospitality Group
 *
 * Editorial copy + structured data for the rebuilt homepage sections.
 * Brand names, divisions, and city scope are drawn from the live
 * enterprise registry (`kollective_public_entities`) — nothing here is
 * invented. Where a market has no operating entity yet it is labelled
 * an expansion market rather than dressed up as a location.
 */

import { SB } from './enterprise';
import type { Chapter } from '@/components/flagship/Timeline';
import type { Branch } from '@/components/flagship/EcosystemMap';
import type { Spread } from '@/components/flagship/MagazineSpreads';
import type { Market } from '@/components/flagship/FootprintMap';
import type { Path } from '@/components/flagship/PathGrid';

export const EMBLEM = `${SB}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;

/* ---------------------------------------------------------------- */
/* Section 1 — The Kollective Philosophy                             */
/* ---------------------------------------------------------------- */

export const philosophy: Chapter[] = [
  {
    era: 'Origin',
    title: 'One room at a time.',
    body:
      'The enterprise started inside hospitality — the room, the night, the guest, the standard. Not a business plan first, a working understanding of why people come back. Everything built since answers to that same test.',
    marks: ['Atlanta', 'Hospitality', 'Nightlife', 'Programming'],
  },
  {
    era: 'Expansion',
    title: 'A method, not a lucky night.',
    body:
      'Once the room was repeatable, the method was the product: establish the belief, build the identity, install the operating model, connect the leverage. Applied to food, to product, to service, to technology — the same discipline, different market.',
    marks: ['Casper Group', 'Umbrella Group', 'Commerce', 'Platforms'],
  },
  {
    era: 'Portfolio',
    title: 'Independent brands. Shared command.',
    body:
      'Nine divisions now operate under one intelligence layer: strategy, technology, data, creative direction, partnerships, and market expansion. Each company keeps its own audience and identity. The enterprise supplies the leverage none of them could afford alone.',
    marks: ['9 divisions', 'Entertainment', 'Water', 'Response', 'Services'],
  },
  {
    era: 'Future',
    title: 'Infrastructure that outlives the trend.',
    body:
      'The long horizon is ownership and institutions — water sourcing, education, membership, and civic platforms. Culture opens the door. Infrastructure is what stays standing after the moment passes.',
    marks: ['The University', 'Water sourcing', 'Institutions', 'Multi-market'],
  },
];

/* ---------------------------------------------------------------- */
/* Section 2 — Enterprise ecosystem map                              */
/* ---------------------------------------------------------------- */

export const ecosystem: Branch[] = [
  {
    name: 'Hospitality',
    count: 'Rooms & nights',
    description:
      'Venues, weekly programming, and signature nights engineered to become repeatable cultural rituals rather than one-off events.',
    brands: ['Rose on Piedmont', 'GROWN-ISH', 'Taste of Art', 'Soul Sessions', 'HugLife'],
    href: '/events',
    cta: 'Enter current culture',
  },
  {
    name: 'Food & Beverage',
    count: '12 food brands',
    description:
      'The Casper Group builds original quick-service identities for delivery, licensing, and multi-unit expansion — alongside a beverage portfolio spanning water, energy, and wine.',
    brands: ['The Casper Group', 'Infinity Water', 'Pronto Energy', 'Tribal Water', 'The Tribe Wine'],
    href: 'https://caspergroupworldwide.com',
    cta: 'Enter the Casper Group',
  },
  {
    name: 'Technology',
    count: 'Platforms',
    description:
      'Consumer platforms, service routing, and enterprise systems that convert attention into utility — the operating layer underneath every brand.',
    brands: ['GOOD TIMES', 'On Call', 'S.O.S.', 'Luxe on Demand', 'Help 911'],
    href: '/directory',
    cta: 'Explore technology',
  },
  {
    name: 'Experiences',
    count: 'Culture & impact',
    description:
      'Festivals, membership, education, and community platforms built to create durable pathways rather than a single moment of attention.',
    brands: ['Sole Exchange', 'The University', 'The Tribe', 'Members Elite', 'Playmakers'],
    href: 'https://soleexchangeworldwide.com',
    cta: 'Enter the impact network',
  },
  {
    name: 'Services',
    count: 'The Umbrella Group',
    description:
      'Property, mobility, cleaning, accounting, travel, wellness, and people operations under one coordinated standard, where one request routes to the right specialist company.',
    brands: ['Umbrella Realty', 'Umbrella Auto Exchange', 'Umbrella Clean', 'The Mind Studio', 'Reset Therapy'],
    href: 'https://theumbrella.group',
    cta: 'Enter the service network',
  },
  {
    name: 'Commerce',
    count: 'Product worlds',
    description:
      'Fashion, publishing, and direct-to-consumer product identities with their own visual systems, audiences, and routes to market.',
    brands: ['STUSH', 'PULSE', 'Bodega', 'Hakuna Matata', 'Make Atlanta Great Again'],
    href: '/store',
    cta: 'Shop the portfolio',
  },
];

/* ---------------------------------------------------------------- */
/* Section 3 — Magazine portfolio                                    */
/* ---------------------------------------------------------------- */

export const portfolio: Spread[] = [
  {
    name: 'Rose on Piedmont',
    statement:
      'The room the enterprise learned in. A Piedmont address running weekly programming that turns a night out into a standing appointment.',
    category: 'Hospitality · Venue',
    location: 'Atlanta',
    status: 'Operating',
    image: `${SB}/social-dashboard/2026-07-17/dolodorsey/rose-bar-free-bottle.png`,
    fit: 'contain',
    href: '/go/rose-on-piedmont?source=flagship_portfolio',
    cta: 'Enter Rose',
  },
  {
    name: 'GROWN-ISH',
    statement:
      'Friday nights for people who outgrew the club but not the music. Programming built around a specific room, a specific crowd, and a specific hour.',
    category: 'Nightlife · Weekly',
    location: 'Atlanta',
    status: 'Active',
    image: `${SB}/grownish/03_event_flyers/GROWNISH_COMING_SOON.png`,
    fit: 'contain',
    href: '/go/grown-ish?source=flagship_portfolio',
    cta: 'Explore GROWN-ISH',
  },
  {
    name: 'The Casper Group',
    statement:
      'Twelve original food identities designed for delivery, food halls, licensing, and multi-unit expansion — a restaurant portfolio built like a brand house.',
    category: 'Food & Beverage · 12 brands',
    location: 'Atlanta · Licensing nationwide',
    status: 'Operating',
    image: `${SB}/casper_group/logos/logo-full.png`,
    fit: 'contain',
    href: 'https://caspergroupworldwide.com',
    cta: 'Explore Casper',
  },
  {
    name: 'Infinity Water',
    statement:
      'The consumer face of a much longer water thesis: sourcing, treatment, and resilient supply built to outlast the label on the bottle.',
    category: 'Beverage · Water',
    location: 'Atlanta',
    status: 'Active',
    image: `${SB}/infinity_water/generated/infinity_gold_splash_v2.png`,
    fit: 'contain',
    href: 'https://watertoinfinity.com',
    cta: 'Discover Infinity',
  },
  {
    name: 'STUSH',
    statement:
      'A fashion world with its own lineup, language, and release rhythm — commerce treated as culture rather than catalogue.',
    category: 'Commerce · Fashion',
    location: 'Atlanta',
    status: 'Active',
    image: `${SB}/stush/stush_lineup/063_the_stush_lineup.jpg`,
    href: 'https://stushusa.com',
    cta: 'Enter STUSH',
  },
  {
    name: 'Sole Exchange',
    statement:
      'Sneaker culture pointed at access. A community platform that converts what people already care about into a pathway for someone else.',
    category: 'Impact · Community',
    location: 'Atlanta',
    status: 'Active',
    image: `${SB}/email-newsletters/sole-exchange-flyer-v3-air-force-1.png`,
    fit: 'contain',
    href: 'https://soleexchangeworldwide.com',
    cta: 'Enter Sole Exchange',
  },
];

/* ---------------------------------------------------------------- */
/* Section 4 — Global footprint                                      */
/* Positions are equirectangular projections of real coordinates      */
/* onto a 100 x 60 field (lon -125..-65, lat 50..23).                */
/* ---------------------------------------------------------------- */

export const markets: Market[] = [
  {
    city: 'Atlanta',
    x: 67.7,
    y: 36.1,
    tier: 'home',
    tierLabel: 'Home market · Operating',
    note:
      'Where the enterprise operates every day: venues, weekly programming, food brands, commerce, community platforms, and the command layer behind all of it.',
    entries: [
      { name: 'Rose on Piedmont', kind: 'Venue', href: '/go/rose-on-piedmont' },
      { name: 'GROWN-ISH', kind: 'Weekly', href: '/go/grown-ish' },
      { name: 'The Casper Group', kind: 'Food', href: 'https://caspergroupworldwide.com' },
      { name: 'Sole Exchange', kind: 'Impact', href: 'https://soleexchangeworldwide.com' },
      { name: 'Make Atlanta Great Again', kind: 'Apparel' },
      { name: 'The Kollective ENT.', kind: 'Command' },
    ],
  },
  {
    city: 'Memphis',
    x: 58.3,
    y: 33.0,
    tier: 'active',
    tierLabel: 'Second market · Active',
    note:
      'The Tribe operates in Memphis as the first proof that the model travels — community and enterprise infrastructure outside the home market.',
    entries: [
      { name: 'The Tribe — Memphis', kind: 'Community' },
      { name: 'The Kollective ENT.', kind: 'Command' },
    ],
  },
  {
    city: 'Houston',
    x: 49.4,
    y: 45.0,
    tier: 'expansion',
    tierLabel: 'Expansion market',
    note:
      'Targeted for hospitality programming and Casper Group licensing. Partnership and operator conversations open now.',
    entries: [
      { name: 'Hospitality programming', kind: 'Planned' },
      { name: 'Casper Group licensing', kind: 'Planned' },
    ],
  },
  {
    city: 'Miami',
    x: 74.7,
    y: 53.9,
    tier: 'expansion',
    tierLabel: 'Expansion market',
    note:
      'Targeted for signature nights and beverage distribution. Partnership and operator conversations open now.',
    entries: [
      { name: 'Signature programming', kind: 'Planned' },
      { name: 'Beverage distribution', kind: 'Planned' },
    ],
  },
  {
    city: 'Las Vegas',
    x: 16.4,
    y: 30.7,
    tier: 'expansion',
    tierLabel: 'Expansion market',
    note:
      'Targeted for hospitality partnerships and large-format experiences. Partnership and operator conversations open now.',
    entries: [
      { name: 'Hospitality partnerships', kind: 'Planned' },
      { name: 'Large-format experiences', kind: 'Planned' },
    ],
  },
  {
    city: 'Los Angeles',
    x: 11.3,
    y: 35.4,
    tier: 'expansion',
    tierLabel: 'Expansion market',
    note:
      'Targeted for culture, media, and commerce activations. Partnership and operator conversations open now.',
    entries: [
      { name: 'Culture & media', kind: 'Planned' },
      { name: 'Commerce activations', kind: 'Planned' },
    ],
  },
  {
    city: 'New York',
    x: 85.0,
    y: 20.6,
    tier: 'expansion',
    tierLabel: 'Expansion market',
    note:
      'Targeted for programming and brand partnerships. Partnership and operator conversations open now.',
    entries: [
      { name: 'Programming', kind: 'Planned' },
      { name: 'Brand partnerships', kind: 'Planned' },
    ],
  },
  {
    city: 'Washington DC',
    x: 79.9,
    y: 24.6,
    tier: 'expansion',
    tierLabel: 'Expansion market',
    note:
      'Targeted for civic platforms, membership, and community programming. Partnership and operator conversations open now.',
    entries: [
      { name: 'Civic platforms', kind: 'Planned' },
      { name: 'Membership & community', kind: 'Planned' },
    ],
  },
];

/* ---------------------------------------------------------------- */
/* Section 5 — Build With The Kollective                             */
/* ---------------------------------------------------------------- */

const FORMS = 'https://doctordorsey.com/forms';

export const partnerPaths: Path[] = [
  {
    audience: 'Investors',
    line: 'Capital into operating businesses with existing revenue, existing rooms, and a repeatable expansion model.',
    href: `${FORMS}/inquiry?interest=investment`,
    cta: 'Open an investor conversation',
  },
  {
    audience: 'Brands',
    line: 'Sponsorship, activation, and co-branded programming inside rooms where the audience already shows up.',
    href: `${FORMS}/sponsor`,
    cta: 'Propose a partnership',
  },
  {
    audience: 'Artists',
    line: 'Performance, residency, and creative collaboration across nightlife, music, art, and live programming.',
    href: `${FORMS}/inquiry?interest=artist`,
    cta: 'Submit for programming',
  },
  {
    audience: 'Operators',
    line: 'Venue, franchise, and licensing operators who want a brand system and an operating model, not just a logo.',
    href: `${FORMS}/inquiry?interest=operator`,
    cta: 'Discuss an operating deal',
  },
  {
    audience: 'Partners',
    line: 'Vendors, agencies, suppliers, and service partners joining the enterprise supply chain.',
    href: `${FORMS}/vendor`,
    cta: 'Register as a partner',
  },
  {
    audience: 'Careers',
    line: 'Hospitality, creative, technology, and operations roles across the portfolio and the command layer.',
    href: '/kollective/careers',
    cta: 'See how to join',
  },
];

/* ---------------------------------------------------------------- */
/* Section 6 — Careers                                               */
/* ---------------------------------------------------------------- */

export const careerDepartments = [
  {
    name: 'Hospitality Operations',
    detail: 'Venue leadership, floor management, bar programs, guest experience, and weekly event execution.',
    roles: ['Venue management', 'Bar & beverage', 'Guest experience', 'Event operations'],
  },
  {
    name: 'Creative & Content',
    detail: 'Art direction, photography, video, editorial, and the visual systems that keep each brand distinct.',
    roles: ['Art direction', 'Photo & video', 'Copy & editorial', 'Social production'],
  },
  {
    name: 'Technology',
    detail: 'Platform engineering, data, and the internal systems that run the enterprise across every brand.',
    roles: ['Frontend engineering', 'Platform & data', 'Product', 'Automation'],
  },
  {
    name: 'Food & Beverage',
    detail: 'Kitchen leadership, menu development, licensing support, and multi-unit expansion for the Casper Group.',
    roles: ['Kitchen leadership', 'Menu development', 'Licensing support', 'Supply'],
  },
  {
    name: 'Growth & Partnerships',
    detail: 'Sponsorship, brand partnerships, sales, and the relationships that carry the portfolio into new markets.',
    roles: ['Partnerships', 'Sponsorship sales', 'Market expansion', 'Account management'],
  },
  {
    name: 'Enterprise Operations',
    detail: 'Finance, people operations, legal coordination, and the command layer shared across all nine divisions.',
    roles: ['Finance', 'People operations', 'Project management', 'Vendor coordination'],
  },
];
