'use client';

import MotionCover from './MotionCover';
import styles from './SalesFocusDirectory.module.css';
import { motion, type MotionAsset } from '@/lib/motion';

type FocusCard = {
  key: string;
  name: string;
  eyebrow: string;
  category: string;
  description: string;
  href: string;
  animation?: MotionAsset;
  image?: string;
  sequence?: string[];
  contain?: boolean;
};

type FocusSection = {
  key: string;
  title: string;
  description: string;
  cards: FocusCard[];
};

const ICONIC_HOME_ANIMATION =
  'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-homescreen-animation-v2.webp?v=1789373241';
const ICONIC_CONCERT_ANIMATION =
  'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-concert-animation-v2.webp?v=1789373250';
const BODEGA_FENYX =
  'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/bodega-fenyx-card.webp?v=1790286517';
const BODEGA_KOLLECTIVE =
  'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/bodega-kollective-card.webp?v=1790286532';
const MISTER_ART =
  'https://woqlhjodiedyqfvzweoe.supabase.co/storage/v1/object/public/website-graphics/mister-graphics/chatgpt-image-aug-10-2026-03_21_06-am-10-.png';

const featured: FocusCard[] = [
  {
    key: 'dr-dorsey',
    name: 'DR. DORSEY',
    eyebrow: 'FOUNDER PLATFORM',
    category: 'Founder · Author · Strategist',
    description: 'The founder platform for Dr. Dolo Dorsey — strategy, culture, media, books and enterprise access.',
    href: 'https://doctordorsey.com',
    animation: motion.drAni,
  },
  {
    key: 'the-kollective',
    name: 'THE KOLLECTIVE',
    eyebrow: 'ENTERPRISE',
    category: 'Hospitality · Brands · Experiences · Technology',
    description: 'The enterprise hub coordinating independent brands, operating companies and scalable consumer platforms.',
    href: 'https://thekollectivehospitality.com',
    animation: motion.kollectiveGlobal,
  },
];

const sections: FocusSection[] = [
  {
    key: 'entertainment',
    title: 'Entertainment / Music',
    description: 'Live entertainment and music properties currently in active sales, audience and partnership motion.',
    cards: [
      {
        key: 'iconic',
        name: 'ICONIC',
        eyebrow: 'LIVE ENTERTAINMENT',
        category: 'Concerts · Events · Experiences',
        description: 'Headline concerts, tours, premium experiences and cultural moments built for scale.',
        href: 'https://iconic-website-ten.vercel.app',
        image: ICONIC_HOME_ANIMATION,
      },
      {
        key: 'iconic-music',
        name: 'ICONIC MUSIC',
        eyebrow: 'MUSIC COMPANY',
        category: 'Artists · Releases · Placements',
        description: 'Music development, releases, production, placements and culture-led opportunities.',
        href: 'https://iconic-website-ten.vercel.app/music',
        image: ICONIC_CONCERT_ANIMATION,
      },
    ],
  },
  {
    key: 'beverages',
    title: 'BEVCO + Beverages',
    description: 'The beverage house and the active consumer brands currently being sold, placed, sampled and expanded.',
    cards: [
      {
        key: 'bevco-intl',
        name: 'BEVCO INTL.',
        eyebrow: 'BEVERAGE HOUSE',
        category: 'Portfolio · Distribution · Partnerships',
        description: 'The parent beverage company coordinating a portfolio of distinct consumer beverage brands.',
        href: 'https://bevco-intl.vercel.app',
        animation: {
          src: 'https://bevco-intl.vercel.app/api/media/drive/1VcWAandN2P0jUT40b_tQD8usMyiBNS8O',
          poster: 'https://bevco-intl.vercel.app/api/media/drive/1K6DJAqRA2JzedDrnInNf_bfydFsKoTl3',
          orientation: 'landscape',
        },
      },
      {
        key: 'infinity-water',
        name: 'INFINITY WATER',
        eyebrow: 'BEVCO BRAND',
        category: 'Premium Water',
        description: 'Premium water built for hospitality, culture, retail, events and everyday movement.',
        href: 'https://watertoinfinity.com',
        animation: {
          src: 'https://watertoinfinity.com/hero.mp4',
          poster: 'https://watertoinfinity.com/lineup-full.png',
          orientation: 'landscape',
        },
      },
      {
        key: 'pronto-energy',
        name: 'PRONTO ENERGY',
        eyebrow: 'BEVCO BRAND',
        category: 'Energy Drink',
        description: 'Energy built for culture, nightlife, hospitality, retail and everyday momentum.',
        href: 'https://pronto-energy-website.vercel.app',
        animation: motion.pronto,
      },
      {
        key: 'ora',
        name: 'ORA',
        eyebrow: 'BEVCO BRAND',
        category: 'Sparkling Water',
        description: 'A premium sparkling-water world built around flavor, hospitality and modern lifestyle.',
        href: 'https://ora-sparkling-water.vercel.app',
        animation: {
          src: 'https://ora-sparkling-water.vercel.app/api/media/drive/1SMA4OGRJ_Op7nWwEyq-eGzqiu9GWYvTv',
          poster: 'https://ora-sparkling-water.vercel.app/api/media/drive/1QLDcxqTFg-MUflQjTlhetHiatkSyz8Kz',
          orientation: 'landscape',
        },
      },
      {
        key: 'otini',
        name: 'OTINI',
        eyebrow: 'BEVCO BRAND',
        category: 'Espresso Martini',
        description: 'Premium ready-to-serve espresso martini built for adult hospitality and nightlife.',
        href: 'https://otini.vercel.app',
        animation: {
          src: 'https://otini.vercel.app/api/media/drive/1fyyc6e3Q-Bu7mci4i6H6aV6KE-D0g2AM',
          poster: 'https://otini.vercel.app/api/media/drive/1Hdw2rUGRXdYuaDUsQqG8F107kJkipkyx',
          orientation: 'landscape',
        },
      },
      {
        key: 'tempo',
        name: 'TEMPO',
        eyebrow: 'BEVCO BRAND',
        category: 'Electrolytes',
        description: 'Electrolyte beverage positioned for active culture, hospitality and daily hydration.',
        href: 'https://tempo-five-lilac.vercel.app',
        sequence: [
          'https://tempo-five-lilac.vercel.app/api/media/drive/10oszRJ3qylLdUUkTHQfF31Fj4SC2QLl0',
          'https://tempo-five-lilac.vercel.app/api/media/drive/1DSXLoieG7htx6L5bBNk-LvuFy1luEusV',
          'https://tempo-five-lilac.vercel.app/api/media/drive/1l1TOWyKkbM0Vv-uVjt0YrH-RcC2rW5eH',
        ],
      },
      {
        key: 'casa-cantina',
        name: 'CASA CANTINA',
        eyebrow: 'BEVCO BRAND',
        category: 'Margarita',
        description: 'Ready-to-serve margarita expressions built for hospitality, nightlife and social occasions.',
        href: 'https://casa-cantina.vercel.app',
        animation: {
          src: 'https://casa-cantina.vercel.app/api/media/drive/16eQhYrPrQw-wNcUNuL9zuofGPbN1zCmT',
          poster: 'https://casa-cantina.vercel.app/api/media/drive/1IrGIMDJ7KSS1PZBwnv5rKXsBS1gwGlG5',
          orientation: 'landscape',
        },
      },
      {
        key: 'island-water',
        name: 'ISLAND WATER',
        eyebrow: 'BEVCO BRAND',
        category: 'Coconut Water',
        description: 'Coconut-water brand designed for culture, hospitality, retail and warm-weather lifestyle.',
        href: 'https://island-water.vercel.app',
        animation: {
          src: 'https://island-water.vercel.app/brand-media/island-water-opening.mp4',
          poster: 'https://island-water.vercel.app/api/island-media/1_8qIGDn_nV6sAukk9oR_wwlwX9eG8wcl',
          orientation: 'landscape',
        },
      },
      {
        key: 'double-zero',
        name: '00 : DOUBLE ZERO',
        eyebrow: 'BEVCO BRAND',
        category: 'Zero-Proof Mocktail',
        description: 'A zero-proof cocktail brand for social occasions, hospitality and modern nightlife.',
        href: 'https://double-zero-three.vercel.app',
        animation: {
          src: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3D3tpcPT3kXsjbP3gZR8PWLh4a1/4c1fb69c-58c3-4b82-8c89-735bcf8f7678.mp4',
          poster: 'https://double-zero-three.vercel.app/api/media/drive/18D8CAPdfK3RG4T7VcfjIi-qKb7Xe-3ks',
          orientation: 'landscape',
        },
      },
      {
        key: 'noir',
        name: 'NOIR',
        eyebrow: 'BEVCO BRAND',
        category: 'Espresso Liqueur',
        description: 'Espresso liqueur built for cocktails, nightlife, hospitality and premium adult occasions.',
        href: 'https://noir-espresso-liqueur.vercel.app',
        animation: {
          src: 'https://noir-espresso-liqueur.vercel.app/api/media/drive/1EqXFKcm8N8AF0elhqSIisAnAHEnXHWkw',
          poster: 'https://noir-espresso-liqueur.vercel.app/api/media/drive/177m2nMpk0oNcWAZBSkMz4EgbJ24Vec6N',
          orientation: 'landscape',
        },
      },
      {
        key: 'prive',
        name: 'PRIVÈ VODKA',
        eyebrow: 'BEVCO BRAND',
        category: 'Vodka',
        description: 'Premium vodka positioned for nightlife, hospitality, events and culture-forward occasions.',
        href: 'https://prive-vodka.vercel.app',
        animation: {
          src: 'https://prive-vodka.vercel.app/api/media/drive/1ffGLgmTdupvwwpmx5kHdnPLZm2VqRMh_',
          poster: 'https://prive-vodka.vercel.app/api/media/drive/1eLpijKeMqQx60Omq8vNtqE2GZlsfz-YG',
          orientation: 'landscape',
        },
      },
      {
        key: 'xxx-vodka',
        name: 'XXX VODKA',
        eyebrow: 'BEVCO BRAND',
        category: 'Vodka',
        description: 'A bold vodka expression designed for nightlife, events and high-energy cultural moments.',
        href: 'https://xxx-vodka.vercel.app',
        animation: {
          src: 'https://xxx-vodka.vercel.app/api/media/drive/1__6aK5vLaVxGJk7_wPpqVOfTvKDXqrxv',
          poster: 'https://xxx-vodka.vercel.app/api/media/drive/1lmWi2OLW2YCexdx6nLat7CZTNTNb6K3I',
          orientation: 'landscape',
        },
      },
    ],
  },
  {
    key: 'products',
    title: 'Products / Clothing',
    description: 'Consumer products, apparel, manufacturing and merch properties currently built to convert demand into sales.',
    cards: [
      {
        key: 'bodega',
        name: 'BODEGA',
        eyebrow: 'COMMERCE HUB',
        category: 'Brands · Merch · Drops',
        description: 'The front door to independent fashion, merch and culture brands across the enterprise.',
        href: 'https://bodegabodegabodega.com',
        animation: motion.bodega,
      },
      {
        key: 'stush',
        name: 'STUSH',
        eyebrow: 'ACTIVE BRAND',
        category: 'Elevated Streetwear',
        description: 'Everyday essentials and elevated streetwear with a distinct independent brand world.',
        href: 'https://stushusa.com',
        animation: motion.stush,
      },
      {
        key: 'fenyx',
        name: 'FĚNYX',
        eyebrow: 'ACTIVE BRAND',
        category: 'Fashion · Performance · Lifestyle',
        description: 'Performance-led fashion and lifestyle built around motion, resilience and identity.',
        href: 'https://fenyx-gules.vercel.app',
        animation: {
          src: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3D3tpcPT3kXsjbP3gZR8PWLh4a1/654b6456-6df9-4789-84d8-b58f92347694.mp4',
          poster: BODEGA_FENYX,
          orientation: 'landscape',
        },
      },
      {
        key: 'mister-manufacturing',
        name: 'MISTER MANUFACTURING',
        eyebrow: 'PRODUCT EXECUTION',
        category: 'Manufacturing · Production · Merch',
        description: 'Manufacturing and production execution for apparel, merchandise and physical product programs.',
        href: 'https://mister-manufacturing.vercel.app',
        image: MISTER_ART,
      },
      {
        key: 'kollective-merch',
        name: 'KOLLECTIVE MERCH',
        eyebrow: 'KOLLECTIVE',
        category: 'Official Enterprise Merchandise',
        description: 'The uniform for the people building the enterprise — official Kollective merchandise.',
        href: 'https://bodegabodegabodega.com/kollective',
        animation: {
          src: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3D3tpcPT3kXsjbP3gZR8PWLh4a1/8c5631ef-d9d3-4dd7-86a0-e8a19380e83b.mp4',
          poster: BODEGA_KOLLECTIVE,
          orientation: 'landscape',
        },
      },
    ],
  },
  {
    key: 'apps',
    title: 'Apps / Technology',
    description: 'Consumer platforms currently being built, sold, activated and grown as independent digital products.',
    cards: [
      {
        key: 'good-times',
        name: 'GOOD TIMES',
        eyebrow: 'ACTIVE PLATFORM',
        category: 'Atlanta Lifestyle Discovery',
        description: 'Atlanta-first discovery for restaurants, nightlife, entertainment and things to do.',
        href: 'https://thegoodtimesworldwide.com',
        animation: motion.goodTimes,
      },
      {
        key: 'sos',
        name: 'S.O.S.',
        eyebrow: 'ACTIVE PLATFORM',
        category: 'Roadside Assistance',
        description: 'A service platform connecting drivers to fast, trusted roadside help.',
        href: 'https://sos-app-website.vercel.app',
        animation: motion.sos,
      },
      {
        key: 'mission-365',
        name: 'MISSION 365',
        eyebrow: 'PLATFORM',
        category: 'Mission · Productivity',
        description: 'A mission-driven productivity platform designed around consistent daily execution.',
        href: 'https://mission-365.vercel.app',
        animation: motion.mission365,
      },
    ],
  },
  {
    key: 'casper',
    title: 'Casper Group',
    description: 'Food concepts positioned for launch, licensing, delivery, retail environments and multi-unit growth.',
    cards: [
      {
        key: 'casper-group',
        name: 'THE CASPER GROUP',
        eyebrow: 'FOOD HOUSE',
        category: 'Multi-Brand Food Portfolio',
        description: 'The food-company platform housing scalable, individually branded restaurant concepts.',
        href: 'https://caspergroupworldwide.com',
        animation: motion.casperGroup,
      },
      {
        key: 'angel-wings',
        name: 'ANGEL WINGS',
        eyebrow: 'CASPER GROUP',
        category: 'Chicken Wings',
        description: 'A chicken-wing concept in active launch and promotional development under the Casper Group.',
        href: 'https://caspergroupworldwide.com',
        animation: {
          src: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3D3tpcPT3kXsjbP3gZR8PWLh4a1/3c245643-c518-4cfa-9336-37988247ee19.mp4',
          poster: 'https://woqlhjodiedyqfvzweoe.supabase.co/storage/v1/object/public/animations/gif/angel-wings.gif',
          orientation: 'landscape',
        },
      },
    ],
  },
  {
    key: 'impact',
    title: 'Impact',
    description: 'Mission-led work with a direct community, partner or contribution path.',
    cards: [
      {
        key: 'sole-exchange',
        name: 'SOLE EXCHANGE',
        eyebrow: 'ACTIVE INITIATIVE',
        category: 'Sneaker Impact · Community',
        description: 'Collecting, restoring and redistributing footwear through a measurable community-impact system.',
        href: 'https://soleexchangeworldwide.com',
        animation: motion.soleExchange,
      },
    ],
  },
];

function FocusCardView({ card, featuredCard = false }: { card: FocusCard; featuredCard?: boolean }) {
  const kinetic = !card.animation && !card.sequence?.length && Boolean(card.image);
  return (
    <a
      className={`${styles.card} ${featuredCard ? styles.featuredCard : ''}`}
      href={card.href}
      aria-label={`Open ${card.name}`}
    >
      <span className={`${styles.media} ${kinetic ? styles.kinetic : ''}`}>
        {card.sequence?.length ? (
          <span className={styles.sequence} aria-label={card.name}>
            {card.sequence.map((src, index) => (
              <img
                src={src}
                alt={index === 0 ? card.name : ''}
                aria-hidden={index === 0 ? undefined : true}
                loading="lazy"
                key={src}
                style={{
                  animationDelay: `${-(index * (12 / card.sequence!.length))}s`,
                }}
              />
            ))}
          </span>
        ) : (
          <MotionCover
            animation={card.animation}
            image={card.image}
            alt={card.name}
            veil
            containStill={card.contain}
          />
        )}
      </span>
      <span className={styles.copy}>
        <small>{card.eyebrow}</small>
        <strong>{card.name}</strong>
        <em>{card.category}</em>
        <p>{card.description}</p>
        <b>OPEN <span>↗</span></b>
      </span>
    </a>
  );
}

export default function SalesFocusDirectory() {
  return (
    <div className={styles.directory}>
      <section className={styles.featured} aria-labelledby="sales-focus-title">
        <header className={styles.featuredHead}>
          <span>CURRENT SALES FOCUS</span>
          <h2 id="sales-focus-title">THE FRONT DOOR TO WHAT WE’RE SELLING NOW.</h2>
          <p>Independent companies. Independent identities. One clean directory into the active sales focus.</p>
        </header>
        <div className={styles.featuredGrid}>
          {featured.map((card) => <FocusCardView card={card} featuredCard key={card.key} />)}
        </div>
      </section>

      <nav className={styles.jump} aria-label="Sales focus categories">
        {sections.map((section) => <a href={`#focus-${section.key}`} key={section.key}>{section.title}</a>)}
      </nav>

      {sections.map((section) => (
        <section className={styles.section} id={`focus-${section.key}`} key={section.key}>
          <header className={styles.sectionHead}>
            <div>
              <span>SALES FOCUS</span>
              <h2>{section.title}</h2>
            </div>
            <p>{section.description}</p>
          </header>
          <div className={styles.grid}>
            {section.cards.map((card) => <FocusCardView card={card} key={card.key} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
