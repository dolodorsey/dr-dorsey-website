'use client';

import styles from './kollective.module.css';
import upgradeStyles from './kollective-upgrade.module.css';
import { accessLinks, SB } from '@/lib/enterprise';
import DepartmentGrid from '@/components/DepartmentGrid';

const EMBLEM = `${SB}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;
const HERO_VIDEO = '/brand/kollective-hero.mp4';
const HERO_POSTER = '/brand/kollective-hero-poster.png';
const BOOK_COVER = 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/cover-hero.png?v=1783903956';
const BOOK_URL = 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey';



export default function KollectivePage() {
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

      <section className={styles.focus} id="departments">
        <header className={styles.sectionHead}>
          <div>
            <p className={styles.kicker}>The departments</p>
            <h2>Nine departments.<br />One enterprise.</h2>
          </div>
          <p>Every department runs its own companies, audience, economics, and atmosphere. The full company roster sits one click away.</p>
        </header>
        <DepartmentGrid />
        <div className={upgradeStyles.bookActions} style={{ marginTop: 38 }}>
          <a className={upgradeStyles.goldButton} href="/companies">See every company</a>
          <a className={upgradeStyles.lineButton} href="/entities">Open the Entity Universe</a>
        </div>
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
