'use client';

import { useEffect, useState } from 'react';
import styles from './home.module.css';
import { BOOK_URL, currentFocusBrands, SB } from '@/lib/enterprise';
import { useEnterpriseRegistry } from '@/lib/use-enterprise-registry';

const HERO_VIDEO = `${SB}/dr_dorsey/website/hero-video.mp4`;
const HERO_POSTER = `${SB}/dr_dorsey/website/hero-bg.jpg`;
const DORSEY_LOGO = '/brand/dorsey-logo.png';
const EMBLEM = `${SB}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;

const VISUALS: Record<string, string> = {
  'Dr. Dorsey': `${SB}/dr_dorsey/website/penthouse-skyline.jpg`,
  'The Kollective ENT.': `${SB}/dr_dorsey/website/luxury-venue.jpg`,
  'The Sovereign Nation': '/brand/kollective-hero.svg',
  'The Tribe — Memphis': `${SB}/dr_dorsey/website/garden-district.jpg`,
  'The University': `${SB}/pulse_university/website/WEBSITE_HERO_DRIVE_EVERY_MOMENT.png`,
  'Everyday Water Group': `${SB}/infinity_water/generated/infinity_gold_splash_v2.png`,
  'Aquifer Waterworks': `${SB}/infinity_water/website/blue.jpg`,
  'Nativa Waterworks': `${SB}/infinity_water/website/life3.jpg`,
  'Infinity Water': `${SB}/infinity_water/generated/infinity_gold_splash_v2.png`,
  'Tribal Water': `${SB}/good-times-app/infinity_water/infinity_water_landscape.png`,
  'Pronto Energy': `${SB}/pronto_energy/generated/pronto_gym_hero_v2.png`,
  'Rose on Piedmont': `${SB}/social-dashboard/2026-07-17/dolodorsey/rose-bar-free-bottle.png`,
  'GROWN-ISH': `${SB}/grownish/03_event_flyers/GROWNISH_COMING_SOON.png`,
  'Sole Exchange': `${SB}/email-newsletters/sole-exchange-flyer-v3-air-force-1.png`,
  'Hakuna Matata': `${SB}/bodega/hakuna-matata/promo-05-gold-columns.png`,
  'Bodega': `${SB}/bodega/hakuna-matata/promo-02-graffiti-red.png`,
  'STUSH': `${SB}/stush/stush_lineup/063_the_stush_lineup.jpg`,
  'PULSE': `${SB}/pulse/pulse_landing_v1/021_pulse_3d_logo_stage.jpg`,
  'Make Atlanta Great Again': `${SB}/maga/generated/maga_hero.png`,
  'GOOD TIMES': `${SB}/good_times/atl-nightlife-elevated.png`,
};

const ICONS = [
  `${SB}/dr_dorsey/01_logos/DorseyNewW.png`,
  EMBLEM,
  `${SB}/casper_group/logos/logo-full.png`,
  `${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png`,
  `${SB}/email-newsletters/sole-exchange-logo.png`,
  `${SB}/pronto_energy/logos/pronto-logo.png`,
  `${SB}/umbrella_injury/00-brand-assets/logos/hurt-911-logo-black.png`,
  `${SB}/dr_dorsey/00-brand-assets/logos/iconic-logo-gold.png`,
];

export default function HomePage() {
  const [menu, setMenu] = useState(false);
  const { brands } = useEnterpriseRegistry(currentFocusBrands);
  useEffect(() => { document.body.style.overflow = menu ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [menu]);

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a href="#top"><img src={DORSEY_LOGO} alt="Dr. Dorsey" /></a>
        <div className={styles.navLinks}><a href="#story">Story</a><a href="#focus">Companies</a><a href="#book">Book</a><a href="#access">Access</a></div>
        <button className={styles.menuButton} onClick={() => setMenu(!menu)} aria-label="Open menu"><span /><span /></button>
      </nav>
      <div className={`${styles.mobileMenu} ${menu ? styles.open : ''}`}><a href="#story" onClick={() => setMenu(false)}>Story</a><a href="#focus" onClick={() => setMenu(false)}>Companies</a><a href="#book" onClick={() => setMenu(false)}>Hakuna Matata</a><a href="/kollective">The Kollective</a><a href="/access">All Access</a></div>

      <section className={styles.hero} id="top" aria-label="Dr. Dorsey visual introduction">
        <video autoPlay muted loop playsInline preload="metadata" poster={HERO_POSTER}><source src={HERO_VIDEO} type="video/mp4" /></video>
        <div className={styles.heroVignette} />
        <a href="#story" className={styles.scrollCue}><span /></a>
      </section>

      <section className={styles.story} id="story">
        <div className={styles.storyHead}><p className={styles.kicker}>Founder · Lifestyle Specialist · Enterprise Builder</p><h1>I build the system<br />behind the brands.</h1></div>
        <div className={styles.storyGrid}>
          <div className={styles.storyCopy}><p>Dr. Dorsey operates at the intersection of hospitality, culture, brand development, entertainment, products, technology, and community impact. The work is not one company. It is a repeatable ecosystem designed to turn ideas into independent, scalable brands.</p><p>Years of live operating experience—from nightlife and events to media, consulting, product development, and technology—shape an execution-first approach: create the identity, build the funnel, install the operating system, and expand.</p><div><a href="/forms/consultation">Book Strategy</a><a href="/forms/speaking">Speaking & Appearances</a></div></div>
          <div className={styles.storyMedia}><img src={`${SB}/dr_dorsey/website/rooftop-lounge.jpg`} alt="Dr. Dorsey enterprise lifestyle environment" /></div>
        </div>
      </section>

      <section className={styles.iconMarquee} aria-label="Enterprise brand icons"><div>{[...ICONS, ...ICONS].map((icon, i) => <span key={i}><img src={icon} alt="" /></span>)}</div></section>

      <section className={styles.focus} id="focus">
        <header className={styles.sectionHead}><div><p className={styles.kicker}>Current enterprise focus</p><h2>The companies being built now.</h2></div><p>Full visuals, readable names, and direct destinations. Every company remains a separate brand.</p></header>
        <div className={styles.focusGrid}>{brands.map((brand, index) => <a href={brand.href} className={styles.card} key={brand.name}><div className={styles.cardMedia}><img src={VISUALS[brand.name] || `${SB}/dr_dorsey/website/atl-street.jpg`} alt={`${brand.name} visual`} />{brand.logo && <img className={styles.cardLogo} src={brand.logo} alt={`${brand.name} logo`} />}<b>{String(index + 1).padStart(2, '0')}</b></div><div className={styles.cardCopy}><small>{brand.status}</small><h3>{brand.name}</h3><p>{brand.category}</p><span>Open ↗</span></div></a>)}</div>
      </section>

      <section className={styles.builder}>
        <div className={styles.builderMedia}><img src={`${SB}/dr_dorsey/website/luxury-venue.jpg`} alt="Executive enterprise environment" /></div>
        <div className={styles.builderCopy}><p className={styles.kicker}>The operating philosophy</p><h2>Build culture.<br />Install systems.<br />Own the outcome.</h2><div className={styles.builderRows}><div><b>Brand architecture</b><span>Each company receives its own identity, audience, offer, funnel, and operating model.</span></div><div><b>Experience design</b><span>Every touchpoint should feel intentional, premium, useful, and memorable.</span></div><div><b>Automation and data</b><span>Shared technology turns scattered activity into an enterprise system.</span></div><div><b>Expansion</b><span>The goal is repeatable market entry, not one-off success.</span></div></div></div>
      </section>

      <section className={styles.book} id="book">
        <div className={styles.bookVisual}><img src={`${SB}/bodega/hakuna-matata/promo-06-office-navy-suit.png`} alt="Hakuna Matata by Dr. Dorsey" /></div>
        <div className={styles.bookCopy}><p className={styles.kicker}>Hakuna Matata</p><h2>The mindset behind the machine.</h2><p>A founder's philosophy on pressure, ambition, living fully, and building something that lasts.</p><div><a href={BOOK_URL}>Buy the Book</a><a href="/forms/bulk_orders">Bulk Orders</a><a href="/forms/book_club">Book Clubs</a></div></div>
      </section>

      <section className={styles.access} id="access"><p className={styles.kicker}>Choose the next move</p><h2>Buy. Book. Partner. Apply. Build.</h2><div className={styles.accessGrid}><a href="/forms/consultation"><b>Strategy</b><span>Private consultation</span></a><a href="/forms/speaking"><b>Speaking</b><span>Keynotes and appearances</span></a><a href={BOOK_URL}><b>Book</b><span>Order Hakuna Matata</span></a><a href="/kollective"><b>Enterprise</b><span>Explore The Kollective</span></a><a href="https://111atl.com"><b>Atlanta</b><span>Events and public access</span></a><a href="/access"><b>All Access</b><span>Every form and link</span></a></div></section>

      <footer className={styles.footer}><img src={DORSEY_LOGO} alt="Dr. Dorsey" /><p>Founder & CEO · The Kollective</p><div><a href="/kollective">The Kollective</a><a href="https://111atl.com">111ATL</a><a href="https://instagram.com/dolodorsey">Instagram</a></div></footer>
    </main>
  );
}
