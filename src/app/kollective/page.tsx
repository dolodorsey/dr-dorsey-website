'use client';

import type { CSSProperties } from 'react';
import styles from './kollective.module.css';
import { accessLinks, currentFocusBrands, divisions, SB } from '@/lib/enterprise';
import { useEnterpriseRegistry } from '@/lib/use-enterprise-registry';

const EMBLEM = `${SB}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;
const LOGOS = [
  { name: 'Dr. Dorsey', src: `${SB}/dr_dorsey/01_logos/DorseyNewW.png`, href: 'https://doctordorsey.com' },
  { name: 'The Kollective', src: EMBLEM, href: '#focus' },
  { name: 'The Casper Group', src: `${SB}/casper_group/logos/logo-full.png`, href: 'https://111atl.com/company.html?brand=casper-group' },
  { name: 'GOOD TIMES', src: `${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png`, href: 'https://thegoodtimesworldwide.com' },
  { name: 'Sole Exchange', src: `${SB}/email-newsletters/sole-exchange-logo.png`, href: 'https://111atl.com/company.html?brand=sole-exchange' },
  { name: 'Pronto Energy', src: `${SB}/pronto_energy/logos/pronto-logo.png`, href: 'https://pronto-energy-website.vercel.app' },
  { name: 'Help 911', src: `${SB}/umbrella_injury/00-brand-assets/logos/hurt-911-logo-black.png`, href: 'https://superherosonstandby.com' },
  { name: 'Iconic', src: `${SB}/dr_dorsey/00-brand-assets/logos/iconic-logo-gold.png`, href: 'https://111atl.com/company.html?brand=scented-flowers' },
];

const VISUALS: Record<string, { src: string; fit?: 'contain' | 'cover' }> = {
  'Dr. Dorsey': { src: `${SB}/dr_dorsey/website/penthouse-skyline.jpg` },
  'The Kollective ENT.': { src: `${SB}/dr_dorsey/website/luxury-venue.jpg` },
  'The Sovereign Nation': { src: '/brand/kollective-hero.svg', fit: 'contain' },
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
  `${SB}/dr_dorsey/website/penthouse-skyline.jpg`,
  `${SB}/social-dashboard/2026-07-17/dolodorsey/rose-bar-rose-interior-video.mp4`,
  `${SB}/casper_group/logos/logo-full.png`,
  `${SB}/taste_of_art/03_event_flyers/TASTE_ROSE_BAR_0717_v4.png`,
  `${SB}/stush/stush_lineup/063_the_stush_lineup.jpg`,
  `${SB}/good_times/atl-nightlife-elevated.png`,
  `${SB}/good-times-app/umbrella_group/umbrella_group_landscape.png`,
  `${SB}/dr_dorsey/website/garden-district.jpg`,
];

export default function KollectivePage() {
  const { brands } = useEnterpriseRegistry(currentFocusBrands);
  const featuredAccess = accessLinks.filter((item) => item.featured).slice(0, 6);

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a className={styles.navBrand} href="#top"><img src={EMBLEM} alt="The Kollective" /></a>
        <div className={styles.navLinks}><a href="#focus">Current</a><a href="#enterprise">Enterprise</a><a href="#about">About</a><a href="#access">Access</a></div>
        <a className={styles.navCta} href="/forms/inquiry?interest=enterprise_app">App Access</a>
      </nav>

      <section className={styles.hero} id="top" aria-label="The Kollective visual introduction">
        <img src="/brand/kollective-hero.svg" alt="The Kollective enterprise world" />
        <a className={styles.scrollCue} href="#intro"><span /></a>
      </section>

      <section className={styles.intro} id="intro">
        <p className={styles.kicker}>One enterprise. Independent brands.</p>
        <h1>Built to move culture.<br />Structured to scale.</h1>
        <p>The Kollective is a multi-city enterprise spanning hospitality, food, experiences, products, services, technology, education, institutions, and community impact. Every company keeps its own identity. The enterprise creates shared leverage.</p>
        <div className={styles.introActions}><a href="#focus">Explore Current Focus</a><a href="#enterprise">View Full Enterprise</a></div>
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

      <section className={styles.enterprise} id="enterprise">
        <header className={styles.sectionHead}><div><p className={styles.kicker}>The full portfolio</p><h2>Eight worlds.<br />One ecosystem.</h2></div><p>Open a division to see its companies at a readable scale. Portfolio concepts are not misrepresented as operating companies.</p></header>
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
        <div className={styles.accessGrid}>{featuredAccess.map((item) => <a href={item.href} key={item.title}><b>{item.title}</b><span>{item.description}</span><i>↗</i></a>)}</div>
        <div className={styles.accessButtons}><a href="/access">Open All Access</a><a href="https://111atl.com">111ATL</a><a href="/forms/inquiry?interest=enterprise_app">Unified App Early Access</a></div>
      </section>

      <footer className={styles.footer}><img src={EMBLEM} alt="The Kollective" /><p>Independent brands. Shared enterprise leverage. Direct action.</p><div><a href="https://doctordorsey.com">Dr. Dorsey</a><a href="https://111atl.com">111ATL</a><a href="/access">Access</a></div></footer>
    </main>
  );
}
