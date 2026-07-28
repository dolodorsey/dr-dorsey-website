'use client';

import type { CSSProperties } from 'react';
import styles from './kollective.module.css';
import upgradeStyles from './kollective-upgrade.module.css';
import { accessLinks, currentFocusBrands, divisions, SB } from '@/lib/enterprise';
import { useEnterpriseRegistry } from '@/lib/use-enterprise-registry';

const EMBLEM = `${SB}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;
const HERO_VIDEO = '/brand/kollective-hero.mp4';
const HERO_POSTER = '/brand/kollective-hero-poster.png';
const BOOK_COVER = 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/cover-hero.png?v=1783903956';
const BOOK_URL = 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey';
const LOGOS = [
  { name: 'Dr. Dorsey', src: `${SB}/dr_dorsey/01_logos/DorseyNewW.png`, href: 'https://doctordorsey.com' },
  { name: 'The Kollective', src: EMBLEM, href: '#focus' },
  { name: 'The Casper Group', src: `${SB}/casper_group/logos/logo-full.png`, href: 'https://caspergroupworldwide.com' },
  { name: 'GOOD TIMES', src: `${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png`, href: 'https://thegoodtimesworldwide.com' },
  { name: 'Sole Exchange', src: `${SB}/email-newsletters/sole-exchange-logo.png`, href: 'https://soleexchangeworldwide.com' },
  { name: 'Pronto Energy', src: `${SB}/pronto_energy/logos/pronto-logo.png`, href: 'https://prontoenergydrink.com' },
  { name: 'Help 911', src: `${SB}/umbrella_injury/00-brand-assets/logos/hurt-911-logo-black.png`, href: 'https://www.help911.help' },
  { name: 'Iconic', src: `${SB}/dr_dorsey/00-brand-assets/logos/iconic-logo-gold.png`, href: 'https://111atl.com/company.html?brand=scented-flowers' },
];

const VISUALS: Record<string, { src: string; fit?: 'contain' | 'cover' }> = {
  'Dr. Dorsey': { src: `${SB}/dr_dorsey/website/penthouse-skyline.jpg` },
  'The Kollective ENT.': { src: `${SB}/dr_dorsey/website/luxury-venue.jpg` },
  'The Tribe — Memphis': { src: `${SB}/dr_dorsey/website/garden-district.jpg` },
  'The University': { src: `${SB}/pulse_university/website/WEBSITE_HERO_DRIVE_EVERY_MOMENT.png` },
  'Everyday Water Group': { src: `${SB}/infinity_water/generated/infinity_gold_splash_v2.png`, fit: 'contain' },
  'Aquifer Waterworks': { src: `${SB}/infinity_water/website/blue.jpg`, fit: 'contain' },
  'Nativa Waterworks': { src: `${SB}/infinity_water/website/life3.jpg` },
  'Infinity Water': { src: `${SB}/infinity_water/generated/infinity_gold_splash_v2.png`, fit: 'contain' },
  'Tribal Water': { src: `${SB}/good-times-app/infinity_water/infinity_water_landscape.png`, fit: 'contain' },
  'Pronto Energy': { src: `${SB}/pronto_energy/generated/pronto_gym_hero_v2.png` },
  'Rose on Piedmont': { src: `${SB}/social-dashboard/2026-07-17/dolodorsey/rose-bar-free-bottle.png`, fit: 'contain' },
  'GROWN-ISH': { src: `${SB}/grownish/03_event_flyers/GROWNISH_COMING_SOON.png`, fit: 'contain' },
  'Sole Exchange': { src: `${SB}/email-newsletters/sole-exchange-flyer-v3-air-force-1.png`, fit: 'contain' },
  'Hakuna Matata': { src: `${SB}/bodega/hakuna-matata/promo-05-gold-columns.png` },
  'Bodega': { src: `${SB}/bodega/hakuna-matata/promo-02-graffiti-red.png` },
  'STUSH': { src: `${SB}/stush/stush_lineup/063_the_stush_lineup.jpg` },
  'PULSE': { src: `${SB}/pulse/pulse_landing_v1/021_pulse_3d_logo_stage.jpg` },
  'Make Atlanta Great Again': { src: `${SB}/maga/generated/maga_hero.png` },
  'GOOD TIMES': { src: `${SB}/good_times/atl-nightlife-elevated.png` },
};

const FEATURED_DIVISION_VISUALS = [
  `${SB}/social-dashboard/2026-07-17/dolodorsey/rose-bar-rose-interior-video.mp4`,
  `${SB}/good_times/atl-nightlife-elevated.png`,
  `${SB}/stush/stush_lineup/063_the_stush_lineup.jpg`,
  `${SB}/infinity_water/website/blue.jpg`,
  `${SB}/infinity_water/generated/infinity_gold_splash_v2.png`,
  `${SB}/umbrella_injury/00-brand-assets/logos/hurt-911-logo-black.png`,
  `${SB}/dr_dorsey/website/garden-district.jpg`,
  `${SB}/casper_group/logos/logo-full.png`,
  `${SB}/good-times-app/umbrella_group/umbrella_group_landscape.png`,
];

export default function KollectivePage() {
  const { brands } = useEnterpriseRegistry(currentFocusBrands);
  const featuredAccess = accessLinks.filter((item) => item.featured).slice(0, 6);

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a className={styles.navBrand} href="#top"><img src={EMBLEM} alt="The Kollective" /></a>
        <div className={styles.navLinks}><a href="/entities">Entities</a><a href="/companies">Companies</a><a href="/events">Current</a><a href="/network">Network</a><a href="/links">Links</a></div>
        <a className={styles.navCta} href="/access">Open Access</a>
      </nav>

      <section className={styles.hero} id="top" aria-label="The Kollective visual introduction">
        <video className={upgradeStyles.heroVideo} autoPlay muted loop playsInline preload="metadata" poster={HERO_POSTER} aria-label="The Kollective global enterprise animation">
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <a className={styles.scrollCue} href="#intro"><span /></a>
      </section>

      <section className={upgradeStyles.actionBar} aria-label="Fast enterprise actions">
        <a href="https://doctordorsey.com/forms/rsvp"><strong>RSVP</strong><span>Events and guest lists</span></a>
        <a href="https://doctordorsey.com/forms/table_reservation"><strong>Reserve</strong><span>Dining and nightlife</span></a>
        <a href={BOOK_URL}><strong>Buy</strong><span>Hakuna Matata</span></a>
        <a href="https://doctordorsey.com/forms/sponsor"><strong>Partner</strong><span>Sponsors and enterprise deals</span></a>
        <a href="https://doctordorsey.com/forms/hiring_inquiry"><strong>Join</strong><span>Careers and opportunities</span></a>
        <a href="/access"><strong>All Access</strong><span>Every form and link</span></a>
      </section>

      <section className={styles.intro} id="intro">
        <p className={styles.kicker}>One enterprise. Independent brands.</p>
        <h1>Built to move culture.<br />Structured to scale.</h1>
        <p>The Kollective is a multi-city enterprise spanning hospitality, food, experiences, products, services, technology, education, institutions, and community impact. Every company keeps its own identity. The enterprise creates shared leverage.</p>
        <div className={styles.introActions}><a href="/kollective/about">Understand The Kollective</a><a href="/kollective/portfolio">Explore the Portfolio</a></div>
      </section>

      <section className={styles.logoWorld} aria-label="Kollective brand icons">
        <div className={styles.logoCore}><img src={EMBLEM} alt="The Kollective emblem" /></div>
        {LOGOS.map((logo, index) => (
          <a key={logo.name} href={logo.href} className={styles.logoOrb} style={{ '--i': index } as CSSProperties} aria-label={logo.name}>
            <img src={logo.src} alt={logo.name} />
          </a>
        ))}
      </section>

      <section className={styles.focus} id="focus">
        <header className={styles.sectionHead}><div><p className={styles.kicker}>Current enterprise command</p><h2>Large enough to see.<br />Clear enough to act.</h2></div><p>Each card uses a full visual, a readable company name, and one direct destination. No tiny entity labels. No fake links.</p></header>
        <div className={styles.focusGrid}>
          {brands.map((brand, index) => {
            const visual = VISUALS[brand.name] || { src: `${SB}/dr_dorsey/website/rooftop-lounge.jpg` };
            return (
              <a className={styles.focusCard} href={brand.href} key={brand.name}>
                <div className={`${styles.focusMedia} ${visual.fit === 'contain' ? styles.contain : ''}`}>
                  <img src={visual.src} alt={`${brand.name} visual`} />
                  {brand.logo && <img className={styles.focusLogo} src={brand.logo} alt={`${brand.name} logo`} />}
                  <span className={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className={styles.focusMeta}><small>{brand.status}</small><h3>{brand.name}</h3><p>{brand.category}</p><b>Open ↗</b></div>
              </a>
            );
          })}
        </div>
      </section>

      <section className={styles.about} id="about">
        <div className={styles.aboutVisual}><img src={`${SB}/dr_dorsey/website/luxury-venue.jpg`} alt="The Kollective executive environment" /></div>
        <div className={styles.aboutCopy}><p className={styles.kicker}>How the enterprise works</p><h2>Separate brands.<br />One command layer.</h2><p>The public sees distinct companies. Behind them is shared enterprise intelligence: strategy, technology, data, creative direction, partnerships, legal coordination, operating systems, and market expansion.</p><div className={styles.aboutRows}><div><b>The Casper Group</b><span>A portfolio of distinct quick-service food brands built for licensing and multi-location expansion.</span></div><div><b>The Fraternity</b><span>A selective cultural organization built around influence, economic empowerment, learning, global reach, and legacy.</span></div><div><b>The Umbrella Group</b><span>A coordinated service network where one request routes to the correct specialized company.</span></div></div></div>
      </section>

      <section className={upgradeStyles.bookPromo} id="book">
        <div className={upgradeStyles.bookVisual}>
          <div className={upgradeStyles.bookGlow} />
          <img src={BOOK_COVER} alt="Hakuna Matata by Dr. Dorsey" />
        </div>
        <div className={upgradeStyles.bookCopy}>
          <span>The Founder’s Field Manual</span>
          <h2>Hakuna Matata.<br />The mindset behind the machine.</h2>
          <p>A direct look at the philosophy, pressure, ambition, and discipline behind Dr. Dorsey’s approach to life, leadership, and enterprise building.</p>
          <div className={upgradeStyles.bookPrice}>Available now · $44.44</div>
          <div className={upgradeStyles.bookActions}>
            <a className={upgradeStyles.goldButton} href={BOOK_URL}>Buy the Book</a>
            <a className={upgradeStyles.lineButton} href="https://doctordorsey.com/forms/bulk_orders">Bulk Orders</a>
            <a className={upgradeStyles.lineButton} href="https://doctordorsey.com/forms/speaking">Book Dr. Dorsey</a>
          </div>
        </div>
      </section>

      <section className={styles.enterprise} id="enterprise">
        <header className={styles.sectionHead}><div><p className={styles.kicker}>The full portfolio</p><h2>Nine worlds.<br />One ecosystem.</h2></div><p>Entertainment, apps, products, water, beverages, response, philanthropy, hospitality, and services—each with its own mandate and atmosphere.</p></header>
        <div className={styles.divisionStack}>
          {divisions.map((division, index) => (
            <details className={styles.division} key={division.title} open={index === 0}>
              <summary>
                <div className={styles.divisionVisual}>
                  {FEATURED_DIVISION_VISUALS[index]?.endsWith('.mp4') ? <video autoPlay muted loop playsInline src={FEATURED_DIVISION_VISUALS[index]} /> : <img src={FEATURED_DIVISION_VISUALS[index]} alt="" />}
                </div>
                <span>{String(index + 1).padStart(2, '0')}</span><h3>{division.title}</h3><b>＋</b>
              </summary>
              <div className={styles.divisionBody}><p>{division.description}</p><div>{division.brands.map((brand) => <span key={brand}>{brand}</span>)}</div><a href={division.href}>{division.cta} ↗</a></div>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.access} id="access">
        <div><p className={styles.kicker}>Direct access</p><h2>Every discovery ends in a move.</h2><p>Buy, reserve, apply, partner, download, request service, or start a protected conversation.</p></div>
        <div className={styles.accessGrid}>{featuredAccess.map((item) => {
          const href = item.href.startsWith('/forms')
            ? `https://doctordorsey.com${item.href}`
            : item.href === '/shop' ? '/store' : item.href;
          return <a href={href} key={item.title}><b>{item.title}</b><span>{item.description}</span><i>↗</i></a>;
        })}</div>
        <div className={styles.accessButtons}><a href="/access">Open All Access</a><a href="https://111atl.com">111ATL</a><a href="https://doctordorsey.com/forms/inquiry?interest=enterprise_app">Unified App Early Access</a></div>
      </section>

      <footer className={styles.footer}><img src={EMBLEM} alt="The Kollective" /><p>Independent brands. Shared enterprise leverage. Direct action.</p><div><a href={BOOK_URL}>Buy the Book</a><a href="https://doctordorsey.com">Dr. Dorsey</a><a href="https://111atl.com">111ATL</a><a href="/access">Access</a></div></footer>
    </main>
  );
}
