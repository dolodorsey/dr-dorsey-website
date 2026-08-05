'use client';

import styles from './kollective.module.css';
import upgradeStyles from './kollective-upgrade.module.css';
import { accessLinks, SB } from '@/lib/enterprise';
import DepartmentGrid from '@/components/DepartmentGrid';
import MotionCover from '@/components/MotionCover';
import FilmBackdrop from '@/components/FilmBackdrop';
import { motion } from '@/lib/motion';

const EMBLEM = `${SB}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;
const HERO_VIDEO = '/brand/kollective-hero.mp4';
const HERO_POSTER = '/brand/kollective-hero-poster.png';
const BOOK_URL = 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey';

function publicAccessHref(item: { title: string; href: string }) {
  if (item.title === 'Rose Weekly Schedule') return '/events';
  if (item.title === 'Table Reservation') return '/app/forms/reserve-table';
  if (/111atl\.com/i.test(item.href)) return '/app/forms/inquiry';
  if (item.href.startsWith('/forms')) return `/app${item.href}`;
  if (item.href === '/shop') return '/store';
  return item.href;
}

export default function KollectivePage() {
  const featuredAccess = accessLinks.filter((item) => item.featured).slice(0, 6);

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a className={styles.navBrand} href="#top"><img src={EMBLEM} alt="The Kollective" /></a>
        <div className={styles.navLinks}>
          <a href="/companies">Companies</a>
          <a href="/events">Current</a>
          <a href="/network">Network</a>
          <a href="/links">Links</a>
          <a href="/app">Apps</a>
        </div>
        <a className={styles.navCta} href="/app?install=1">Download App</a>
      </nav>

      <section className={`${styles.hero} ${upgradeStyles.compactHero}`} id="top" aria-label="The Kollective visual introduction">
        <video className={upgradeStyles.heroVideo} autoPlay muted loop playsInline preload="metadata" poster={HERO_POSTER} aria-label="The Kollective global enterprise animation">
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <a className={styles.scrollCue} href="#departments"><span /></a>
      </section>

      <section className={`${upgradeStyles.actionBar} k-surface k-edge`} aria-label="Fast enterprise actions">
        <a href="/app/forms/rsvp"><strong>RSVP</strong><span>Events and guest lists</span></a>
        <a href="/app/forms/reserve-table"><strong>Reserve</strong><span>Dining and nightlife</span></a>
        <a href={BOOK_URL}><strong>Buy</strong><span>Hakuna Matata</span></a>
        <a href="/app/forms/partnership"><strong>Partner</strong><span>Sponsors and enterprise deals</span></a>
        <a href="/app/forms/hiring"><strong>Join</strong><span>Careers and opportunities</span></a>
        <a href="/app"><strong>All Access</strong><span>Every form and link</span></a>
      </section>

      <section className={`${styles.focus} ${upgradeStyles.compactSection} k-surface k-bleed k-surface-deep k-edge`} id="departments">
        <FilmBackdrop animation={motion.kollectiveGlobal} opacity={0.15} />
        <header className={`${styles.sectionHead} ${upgradeStyles.compactSectionHead}`}>
          <div><p className={styles.kicker}>The companies</p><h2>Live for today.<br />Plan for tomorrow.<br />Party tonight!</h2></div>
          <p>Every division runs its own companies, audience, economics, and atmosphere. Every card routes to a direct company site or the correct internal access page.</p>
        </header>
        <DepartmentGrid />
        <div className={upgradeStyles.bookActions} style={{ marginTop: 30, justifyContent: 'center' }}>
          <a className={upgradeStyles.goldButton} href="/companies">See every company</a>
          <a className={upgradeStyles.lineButton} href="/events">Open Current Culture</a>
        </div>
      </section>

      <section className={`${upgradeStyles.bookPromo} k-surface k-surface-warm k-emblem`} id="book">
        <div className={upgradeStyles.bookVisual}><div className={upgradeStyles.bookGlow} /><div className={upgradeStyles.bookFilm}><MotionCover animation={motion.hakunaMatata} alt="Hakuna Matata by Dr. Dorsey" /></div></div>
        <div className={upgradeStyles.bookCopy}>
          <span>The Founder’s Field Manual</span>
          <h2>Hakuna Matata.<br />The mindset behind the machine.</h2>
          <p>A direct look at the philosophy, pressure, ambition, and discipline behind Dr. Dorsey’s approach to life, leadership, and enterprise building.</p>
          <div className={upgradeStyles.bookPrice}>Available now · $44.44</div>
          <div className={upgradeStyles.bookActions}><a className={upgradeStyles.goldButton} href={BOOK_URL}>Buy the Book</a><a className={upgradeStyles.lineButton} href="https://doctordorsey.com/forms/bulk_orders">Bulk Orders</a><a className={upgradeStyles.lineButton} href="https://doctordorsey.com/forms/speaking">Book Dr. Dorsey</a></div>
        </div>
      </section>

      <section className={`${styles.access} ${upgradeStyles.compactAccess} k-surface k-surface-deep k-edge`} id="access">
        <FilmBackdrop animation={motion.kollectiveNetwork} opacity={0.12} />
        <div><p className={styles.kicker}>Direct access</p><h2>Every discovery ends in a move.</h2><p>Buy, reserve, apply, partner, download, request service, or start a protected conversation.</p></div>
        <div className={`${styles.accessGrid} ${upgradeStyles.compactAccessGrid}`}>{featuredAccess.map((item) => (
          <a href={publicAccessHref(item)} key={item.title}><b>{item.title}</b><span>{item.description}</span><i>↗</i></a>
        ))}</div>
        <div className={`${styles.accessButtons} ${upgradeStyles.compactAccessButtons}`}><a href="/app">Open the App</a><a href="/app/forms/inquiry">Ask for More Info</a><a href="/app?install=1">Download Kollective</a></div>
      </section>

      <footer className={styles.footer}><img src={EMBLEM} alt="The Kollective" /><p>Independent brands. Shared enterprise leverage. Direct action.</p><div><a href={BOOK_URL}>Buy the Book</a><a href="https://doctordorsey.com">Dr. Dorsey</a><a href="/events">Current</a><a href="/access">Access</a></div></footer>
    </main>
  );
}
