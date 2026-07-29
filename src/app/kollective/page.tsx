'use client';

import styles from './kollective.module.css';
import upgradeStyles from './kollective-upgrade.module.css';
import { accessLinks, divisions, SB } from '@/lib/enterprise';
import Timeline from '@/components/flagship/Timeline';
import EcosystemMap from '@/components/flagship/EcosystemMap';
import MagazineSpreads from '@/components/flagship/MagazineSpreads';
import FootprintMap from '@/components/flagship/FootprintMap';
import PathGrid from '@/components/flagship/PathGrid';
import KHGImage from '@/components/flagship/KHGImage';
import {
  EMBLEM,
  philosophy,
  ecosystem,
  portfolio,
  markets,
  partnerPaths,
} from '@/lib/flagship-kollective';

const KOLLECTIVE_GRAPHICS =
  'https://sccmgpssfwhgxefbdwbc.supabase.co/storage/v1/object/public/brand-graphics/kollective';
const HERO_VIDEO = `${KOLLECTIVE_GRAPHICS}/kollective-ani.mp4`;
const HERO_POSTER = `${KOLLECTIVE_GRAPHICS}/kollective-home.png`;
const BOOK_COVER = 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/cover-hero.png?v=1783903956';
const BOOK_URL = 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey';

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
  const featuredAccess = accessLinks.filter((item) => item.featured).slice(0, 6);

  return (
    <main id="main-content" className={styles.page}>
      <nav className={styles.nav}>
        <a className={styles.navBrand} href="#top">
          { }
          <img src={EMBLEM} alt="The Kollective" />
        </a>
        <div className={styles.navLinks}>
          <a href="#philosophy">Philosophy</a>
          <a href="#portfolio">Portfolio</a>
          <a href="/kollective/locations">Locations</a>
          <a href="/kollective/entities">Entities</a>
          <a href="/kollective/careers">Careers</a>
        </div>
        <a className={styles.navCta} href="#build">Build with us</a>
      </nav>

      <section className={upgradeStyles.cleanHero} id="top" aria-label="The Kollective enterprise introduction">
        <video autoPlay muted loop playsInline preload="metadata" poster={HERO_POSTER} aria-hidden="true">
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <h1 className={upgradeStyles.srOnly}>The Kollective — independent brands with shared enterprise leverage</h1>
        <a href="#intro" aria-label="Continue to The Kollective introduction" />
      </section>

      <section className={upgradeStyles.actionBar} aria-label="Fast enterprise actions">
        <a href="https://doctordorsey.com/forms/rsvp"><strong>RSVP</strong><span>Events and guest lists</span></a>
        <a href="https://doctordorsey.com/forms/table_reservation"><strong>Reserve</strong><span>Dining and nightlife</span></a>
        <a href={BOOK_URL}><strong>Buy</strong><span>Hakuna Matata</span></a>
        <a href="https://doctordorsey.com/forms/sponsor"><strong>Partner</strong><span>Sponsors and enterprise deals</span></a>
        <a href="/kollective/careers"><strong>Join</strong><span>Careers and opportunities</span></a>
        <a href="/access"><strong>All Access</strong><span>Every form and link</span></a>
      </section>

      <section className={`${styles.intro} ${upgradeStyles.familyIntro}`} id="intro">
        <p className={styles.kicker}>One enterprise. Independent brands.</p>
        <h1>Built to move culture.<br />Structured to scale.</h1>
        <p>
          The Kollective is a multi-city enterprise spanning hospitality, food, experiences,
          products, services, technology, education, institutions, and community impact.
          Every company keeps its own identity. The enterprise creates shared leverage.
        </p>
        <div className={styles.introActions}>
          <a href="#philosophy">Understand The Kollective</a>
          <a href="#portfolio">Explore the Portfolio</a>
        </div>
      </section>

      <Timeline
        id="philosophy"
        kicker="The Kollective Philosophy"
        title={<>Origin. Expansion.<br />Portfolio. <em>Future.</em></>}
        standfirst="Four movements, in order. Each one only became possible because the one before it was made repeatable."
        chapters={philosophy}
      />

      <EcosystemMap
        id="ecosystem"
        kicker="The enterprise map"
        title={<>One centre.<br /><em>Six worlds.</em></>}
        standfirst="Independent brands connected by a single intelligence layer. Select a branch to see what sits inside it."
        emblem={EMBLEM}
        branches={ecosystem}
      />

      <MagazineSpreads
        id="portfolio"
        kicker="Enter the active worlds"
        title={<>Experience it.<br /><em>Shop it. Join it.</em></>}
        standfirst="Eight active doors across hospitality, events, fashion, products, publishing, food, and water—followed by the complete entity universe."
        spreads={portfolio}
      />

      <section className={styles.about} id="about">
        <div className={styles.aboutVisual}>
          <img
            src={`${KOLLECTIVE_GRAPHICS}/boardroom.png`}
            alt="The Kollective executive environment"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className={styles.aboutCopy}>
          <p className={styles.kicker}>How the enterprise works</p>
          <h2>Separate brands.<br />One command layer.</h2>
          <p>
            The public sees distinct companies. Behind them is shared enterprise intelligence:
            strategy, technology, data, creative direction, partnerships, legal coordination,
            operating systems, and market expansion.
          </p>
          <div className={styles.aboutRows}>
            <div><b>The Casper Group</b><span>A portfolio of distinct quick-service food brands built for licensing and multi-location expansion.</span></div>
            <div><b>The Fraternity</b><span>A selective cultural organization built around influence, economic empowerment, learning, global reach, and legacy.</span></div>
            <div><b>The Umbrella Group</b><span>A coordinated service network where one request routes to the correct specialized company.</span></div>
          </div>
        </div>
      </section>

      <section className={upgradeStyles.familyInterlude} aria-label="The Kollective global family">
        <div>
          <p>Part of something larger</p>
          <h2>ONE FAMILY.<br /><em>MANY WORLDS.</em></h2>
          <a href="/kollective/entities">Explore every entity ↗</a>
        </div>
      </section>

      <FootprintMap
        id="footprint"
        kicker="The Kollective global footprint"
        title={<>Built in Atlanta.<br /><em>Moving outward.</em></>}
        standfirst="One home market, one active second market, and six expansion markets with partnership conversations open. Select a city."
        markets={markets}
      />

      <section className={upgradeStyles.bookPromo} id="book">
        <div className={upgradeStyles.bookVisual}>
          <div className={upgradeStyles.bookGlow} />
          <KHGImage
            src={BOOK_COVER}
            alt="Hakuna Matata by Dr. Dorsey"
            width={720}
            height={960}
            fit="contain"
            sizes="(max-width: 900px) 70vw, 32vw"
          />
        </div>
        <div className={upgradeStyles.bookCopy}>
          <span>The Founder’s Field Manual</span>
          <h2>Hakuna Matata.<br />The mindset behind the machine.</h2>
          <p>
            A direct look at the philosophy, pressure, ambition, and discipline behind
            Dr. Dorsey’s approach to life, leadership, and enterprise building.
          </p>
          <div className={upgradeStyles.bookPrice}>Available now · $44.44</div>
          <div className={upgradeStyles.bookActions}>
            <a className={upgradeStyles.goldButton} href={BOOK_URL}>Buy the Book</a>
            <a className={upgradeStyles.lineButton} href="https://doctordorsey.com/forms/bulk_orders">Bulk Orders</a>
            <a className={upgradeStyles.lineButton} href="https://doctordorsey.com/forms/speaking">Book Dr. Dorsey</a>
          </div>
        </div>
      </section>

      <section className={styles.enterprise} id="enterprise">
        <header className={styles.sectionHead}>
          <div>
            <p className={styles.kicker}>The full portfolio</p>
            <h2>Nine worlds.<br />One ecosystem.</h2>
          </div>
          <p>Entertainment, apps, products, water, beverages, response, philanthropy, hospitality, and services—each with its own mandate and atmosphere.</p>
        </header>
        <div className={styles.divisionStack}>
          {divisions.map((division, index) => (
            <details className={styles.division} key={division.title} open={index === 0}>
              <summary>
                <div className={styles.divisionVisual}>
                  {FEATURED_DIVISION_VISUALS[index]?.endsWith('.mp4') ? (
                    <video autoPlay muted loop playsInline src={FEATURED_DIVISION_VISUALS[index]} />
                  ) : (
                    <img src={FEATURED_DIVISION_VISUALS[index]} alt="" loading="lazy" decoding="async" />
                  )}
                </div>
                <span>{String(index + 1).padStart(2, '0')}</span><h3>{division.title}</h3><b>＋</b>
              </summary>
              <div className={styles.divisionBody}>
                <p>{division.description}</p>
                <div>{division.brands.map((brand) => <span key={brand}>{brand}</span>)}</div>
                <a href={division.href}>{division.cta} ↗</a>
              </div>
            </details>
          ))}
        </div>
      </section>

      <PathGrid
        id="build"
        kicker="Build with The Kollective"
        title={<>Six doors.<br /><em>One enterprise.</em></>}
        standfirst="Every relationship the enterprise takes on has its own route. Choose the one that matches how you want to work with us."
        paths={partnerPaths}
      />

      <section className={styles.access} id="access">
        <div>
          <p className={styles.kicker}>Direct access</p>
          <h2>Every discovery ends in a move.</h2>
          <p>Buy, reserve, apply, partner, download, request service, or start a protected conversation.</p>
        </div>
        <div className={styles.accessGrid}>
          {featuredAccess.map((item) => {
            const href = item.href.startsWith('/forms')
              ? `https://doctordorsey.com${item.href}`
              : item.href === '/shop' ? '/store' : item.href;
            return <a href={href} key={item.title}><b>{item.title}</b><span>{item.description}</span><i>↗</i></a>;
          })}
        </div>
        <div className={styles.accessButtons}>
          <a href="/access">Open All Access</a>
          <a href="https://111atl.com">111ATL</a>
          <a href="https://doctordorsey.com/forms/inquiry?interest=enterprise_app">Unified App Early Access</a>
        </div>
      </section>

      <footer className={styles.footer}>
        { }
        <img src={EMBLEM} alt="The Kollective" />
        <p>Independent brands. Shared enterprise leverage. Direct action.</p>
        <div>
          <a href={BOOK_URL}>Buy the Book</a>
          <a href="https://doctordorsey.com">Dr. Dorsey</a>
          <a href="/kollective/locations">Locations</a>
          <a href="/kollective/careers">Careers</a>
          <a href="/access">Access</a>
        </div>
      </footer>
    </main>
  );
}
