'use client';

import { useEffect, useState } from 'react';
import styles from './home.module.css';
import { BOOK_COVER, BOOK_URL, divisions, operatingBrands, stats, SB } from '@/lib/enterprise';

const HERO_VIDEO = `${SB}/dr_dorsey/website/hero-video.mp4`;
const HERO_POSTER = `${SB}/dr_dorsey/website/hero-bg.jpg`;
const DORSEY_LOGO = `${SB}/dr_dorsey/01_logos/DorseyNewW.png`;
const KOLLECTIVE_EMBLEM = `${SB}/dr_dorsey/01_logos/KOLLECTIVEemblemW.png`;

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className={styles.page}>
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <a href="#top" className={styles.brandMark} aria-label="Dr. Dorsey home">
          <img src={DORSEY_LOGO} alt="Dr. Dorsey" />
        </a>
        <div className={styles.desktopNav}>
          <a href="#operating">Operating Now</a>
          <a href="#enterprise">Enterprise</a>
          <a href="#strategy">Strategy</a>
          <a href="/access">All Access</a>
        </div>
        <div className={styles.navActions}>
          <a href="/forms/consultation" className={styles.navCta}>Book Strategy</a>
          <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        {['operating', 'enterprise', 'strategy', 'convert'].map((id) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{id === 'convert' ? 'Work With Us' : id}</a>
        ))}
        <a href="/access">All Forms & Links</a>
        <a href="/kollective">The Kollective</a>
      </div>

      <section className={styles.hero} id="top">
        <video className={styles.heroVideo} autoPlay muted loop playsInline preload="auto" poster={HERO_POSTER}>
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className={styles.heroOverlay} />
        <div className={styles.heroGrid} />
        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <div className={styles.kicker}>Founder · Architect · Operator</div>
            <h1>Dr. Dorsey builds <em>ecosystems</em>, not isolated businesses.</h1>
            <p>
              Hospitality. Food. Events. Products. Technology. Services. Culture. Institutions.
              One founder commanding an enterprise built to expand city by city.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="/kollective">Enter The Kollective</a>
              <a className={styles.secondaryButton} href="/access">All Forms & Links</a>
              <a className={styles.textButton} href={BOOK_URL}>Buy Hakuna Matata →</a>
            </div>
          </div>
          <div className={styles.heroBook}>
            <div className={styles.heroBookLabel}>The Founder’s Field Manual</div>
            <img src={BOOK_COVER} alt="Hakuna Matata by Dr. Dorsey" />
            <a href={BOOK_URL}>Order now · $44.44</a>
          </div>
        </div>
        <div className={styles.heroBottom}>
          <div>Atlanta · Houston · Miami · Los Angeles · Dallas · Washington · Charlotte · New York</div>
          <div>Scroll to enter the enterprise ↓</div>
        </div>
      </section>

      <section className={styles.statsBand}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.operating} id="operating">
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.eyebrow}>Operating Now</span>
            <h2>The enterprise is already moving.</h2>
          </div>
          <p>These are not concept mockups. These are active, operating or scaling brands inside the ecosystem.</p>
        </div>
        <div className={styles.brandGrid}>
          {operatingBrands.map((brand, index) => (
            <a href={brand.href} className={`${styles.brandCard} ${index < 5 ? styles.brandCardMajor : ''}`} key={brand.name}>
              <div className={styles.statusDot}><span />{brand.status}</div>
              <div className={styles.logoFrame}><img src={brand.logo} alt={`${brand.name} logo`} /></div>
              <div className={styles.brandMeta}>
                <div><strong>{brand.name}</strong><span>{brand.category}</span></div>
                <b>↗</b>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.enterprise} id="enterprise">
        <div className={styles.enterpriseBackdrop} style={{ backgroundImage: "url('/brand/kollective-hero.svg')" }} />
        <div className={styles.sectionHeaderLight}>
          <div>
            <span className={styles.eyebrowGold}>The Full Command</span>
            <h2>Eight divisions. Independent brands. Shared leverage.</h2>
          </div>
          <a href="/access">Open enterprise access center →</a>
        </div>
        <div className={styles.divisionGrid}>
          {divisions.map((division, index) => (
            <article className={styles.divisionCard} key={division.title}>
              <div className={styles.divisionNumber}>{String(index + 1).padStart(2, '0')}</div>
              <span>{division.eyebrow}</span>
              <h3>{division.title}</h3>
              <p>{division.description}</p>
              <div className={styles.brandList}>
                {division.brands.map((brand) => <b key={brand}>{brand}</b>)}
              </div>
              <a href={division.href}>{division.cta} →</a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.strategy} id="strategy">
        <div className={styles.strategyVisual}>
          <img className={styles.boardroom} src={`${SB}/dr_dorsey/website/luxury-venue.jpg`} alt="The Kollective executive boardroom" />
          <img className={styles.miniDorsey} src={`${SB}/dr_dorsey/characters/dolo_mini/DOLO_MINI.png`} alt="Dr. Dorsey illustrated character" />
          <div className={styles.visualBadge}>
            <img src={KOLLECTIVE_EMBLEM} alt="The Kollective emblem" />
            <span>Enterprise Command</span>
          </div>
        </div>
        <div className={styles.strategyCopy}>
          <span className={styles.eyebrow}>Dr. Dorsey · The Strategist</span>
          <h2>I built the system that builds the brands.</h2>
          <p>
            The real product is not one restaurant, one event or one app. It is the repeatable operating system behind them:
            positioning, creative direction, partnerships, sales, automation, execution and expansion.
          </p>
          <div className={styles.strategyPoints}>
            <div><strong>01</strong><span>Brand architecture and portfolio design</span></div>
            <div><strong>02</strong><span>Hospitality, event and cultural execution</span></div>
            <div><strong>03</strong><span>Automation-first operating infrastructure</span></div>
            <div><strong>04</strong><span>City-by-city expansion strategy</span></div>
          </div>
          <div className={styles.strategyActions}>
            <a className={styles.darkButton} href="/forms/consultation">Book a Strategy Session</a>
            <a className={styles.outlineDarkButton} href="/forms/speaking">Speaking & Appearances</a>
          </div>
        </div>
      </section>

      <section className={styles.bookFeature}>
        <div className={styles.bookArt}>
          <img src={BOOK_COVER} alt="Hakuna Matata book cover" />
        </div>
        <div className={styles.bookCopy}>
          <span className={styles.eyebrowGold}>Hakuna Matata</span>
          <h2>The mindset behind the machine.</h2>
          <p>A direct look at the philosophy, pressure, ambition and discipline behind Dr. Dorsey’s approach to life and enterprise.</p>
          <div className={styles.bookButtons}>
            <a className={styles.primaryButton} href={BOOK_URL}>Buy the Book · $44.44</a>
            <a className={styles.secondaryButton} href="/forms/bulk_orders">Bulk Orders</a>
            <a className={styles.secondaryButton} href="/forms/book_club">Book Clubs</a>
          </div>
        </div>
      </section>

      <section className={styles.convert} id="convert">
        <div className={styles.convertGraphic}>
          <img src="/brand/kollective-hero.svg" alt="The Kollective global enterprise map" />
        </div>
        <div className={styles.convertContent}>
          <span className={styles.eyebrowGold}>Choose Your Entry Point</span>
          <h2>Buy. RSVP. Book. Partner. Join.</h2>
          <p>Every public pathway is organized in one access center so the right request reaches the right division.</p>
          <div className={styles.conversionGrid}>
            <a href="/forms/rsvp"><strong>RSVP</strong><span>Events & guest lists</span></a>
            <a href="/forms/table_reservation"><strong>Reserve</strong><span>Tables & hospitality</span></a>
            <a href="/forms/sponsor"><strong>Partner</strong><span>Sponsorship & brand deals</span></a>
            <a href="/forms/hiring_inquiry"><strong>Join</strong><span>Careers & team</span></a>
            <a href="/forms/nda"><strong>NDA</strong><span>Private conversations</span></a>
            <a href="/access"><strong>All Access</strong><span>Every form and link</span></a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <img src={DORSEY_LOGO} alt="Dr. Dorsey" />
          <span>Founder & CEO · The Kollective</span>
        </div>
        <div className={styles.footerLinks}>
          <a href="/kollective">The Kollective</a>
          <a href="/access">All Forms</a>
          <a href={BOOK_URL}>Book</a>
          <a href="https://instagram.com/dolodorsey">Instagram</a>
          <a href="mailto:thedoctordorsey@gmail.com">Email</a>
        </div>
        <div className={styles.copyright}>© 2026 Dr. DoLo Dorsey. Built for scale.</div>
      </footer>
    </main>
  );
}
