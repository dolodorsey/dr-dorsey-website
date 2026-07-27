import styles from './kollective.module.css';
import upgradeStyles from './kollective-upgrade.module.css';
import { accessLinks, currentFocusBrands, divisions, stats, SB } from '@/lib/enterprise';

const EMBLEM = `${SB}/dr_dorsey/01_logos/KOLLECTIVEemblemW.png`;
const HERO_VIDEO = 'https://drive.google.com/uc?export=download&id=1Toznssv2hgr4QSAHmGTBfxnmneUSZ1tU';
const HERO_POSTER = 'https://drive.google.com/uc?export=view&id=1ewqIbpjtL1DhWQGCLjXAF1US0BQtltd6';
const BOOK_COVER = 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/cover-hero.png?v=1783903956';
const BOOK_URL = 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey';

const WORDMARK_STYLE = {
  maxWidth: '100%',
  padding: '12px',
  color: '#f0d37e',
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 'clamp(24px, 2.5vw, 40px)',
  fontWeight: 500,
  lineHeight: 0.95,
  letterSpacing: '-0.025em',
  textAlign: 'center' as const,
};

export default function KollectivePage() {
  const featuredAccess = accessLinks.filter((item) => item.featured);

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a className={styles.brand} href="#top">
          <img src={EMBLEM} alt="The Kollective emblem" />
          <div><strong>THE KOLLECTIVE</strong><span>Enterprise</span></div>
        </a>
        <div className={styles.navLinks}>
          <a href="#focus">Current Focus</a>
          <a href="#divisions">Full Enterprise</a>
          <a href="#book">The Book</a>
          <a href="#access">Direct Access</a>
        </div>
        <a className={styles.navButton} href="/access">Open Access Center</a>
      </nav>

      <section className={styles.hero} id="top">
        <video className={upgradeStyles.heroVideo} autoPlay muted loop playsInline preload="auto" poster={HERO_POSTER} aria-label="The Kollective global enterprise animation">
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className={styles.heroShade} />
        <div className={styles.heroFrame} />
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>The Enterprise · Established 2026</div>
          <h1>One enterprise.<br /><em>Independent brands.</em><br />Shared leverage.</h1>
          <p>
            The Kollective is a multi-city ecosystem spanning hospitality, food, events, products,
            services, technology, institutions, culture and community impact.
          </p>
          <div className={styles.heroButtons}>
            <a className={styles.goldButton} href="#focus">Explore the Enterprise</a>
            <a className={styles.lineButton} href="/forms/rsvp">RSVP / Events</a>
            <a className={styles.lineButton} href="/forms/table_reservation">Reserve a Table</a>
            <a className={styles.lineButton} href={BOOK_URL}>Buy Hakuna Matata</a>
          </div>
        </div>
        <div className={styles.heroRail}>
          <span>Hospitality</span><span>Food</span><span>Events</span><span>Products</span><span>Technology</span><span>Services</span><span>Institutions</span>
        </div>
      </section>

      <section className={styles.statBar}>
        {stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </section>

      <section className={upgradeStyles.actionBar} aria-label="Fast enterprise actions">
        <a href="/forms/rsvp"><strong>RSVP</strong><span>Events and guest lists</span></a>
        <a href="/forms/table_reservation"><strong>Reserve</strong><span>Dining and nightlife</span></a>
        <a href={BOOK_URL}><strong>Buy</strong><span>Hakuna Matata</span></a>
        <a href="/forms/sponsor"><strong>Partner</strong><span>Sponsors and enterprise deals</span></a>
        <a href="/forms/hiring_inquiry"><strong>Join</strong><span>Careers and opportunities</span></a>
        <a href="/access"><strong>All Access</strong><span>Every form and link</span></a>
      </section>

      <section className={styles.operating} id="focus">
        <div className={styles.sectionIntro}>
          <span>Current Enterprise Command</span>
          <h2>Twenty entities receiving active focus.</h2>
          <p>These statuses distinguish operating companies, active brands, available products and platforms still being built. The full enterprise portfolio remains visible below.</p>
        </div>
        <div className={styles.operatingGrid}>
          {currentFocusBrands.map((brand, index) => (
            <a key={brand.name} href={brand.href} className={`${styles.operatingCard} ${index < 5 ? styles.anchorBrand : ''}`}>
              <div className={styles.cardTop}><span>{brand.status}</span><b>{String(index + 1).padStart(2, '0')}</b></div>
              <div className={styles.cardLogo}>
                {brand.logo ? <img src={brand.logo} alt={`${brand.name} logo`} /> : <span style={WORDMARK_STYLE}>{brand.name}</span>}
              </div>
              <div className={styles.cardBottom}><strong>{brand.name}</strong><span>{brand.category}</span></div>
            </a>
          ))}
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
          <p>A direct look at the philosophy, pressure, ambition and discipline behind Dr. Dorsey’s approach to life, leadership and enterprise building.</p>
          <div className={upgradeStyles.bookPrice}>Available now · $44.44</div>
          <div className={styles.heroButtons}>
            <a className={styles.goldButton} href={BOOK_URL}>Buy the Book</a>
            <a className={styles.lineButton} href="/forms/bulk_orders">Bulk Orders</a>
            <a className={styles.lineButton} href="/forms/speaking">Book Dr. Dorsey</a>
          </div>
        </div>
      </section>

      <section className={styles.commandSection}>
        <div className={styles.commandImage}><img src="/brand/kollective-hero.svg" alt="The Kollective command architecture" /></div>
        <div className={styles.commandCopy}>
          <span>Enterprise Architecture</span>
          <h2>Each brand stands alone. The enterprise makes every brand stronger.</h2>
          <p>
            Every entity keeps its own identity, audience, offers, funnel and operating model. The Kollective provides the shared command layer:
            strategy, capital coordination, creative direction, technology, data, partnerships, talent and expansion.
          </p>
          <div className={styles.commandPillars}>
            <div><b>01</b><span>Independent brand systems</span></div>
            <div><b>02</b><span>Shared enterprise intelligence</span></div>
            <div><b>03</b><span>Centralized leverage</span></div>
            <div><b>04</b><span>Repeatable market expansion</span></div>
          </div>
          <a href="/forms/inquiry">Start an enterprise conversation →</a>
        </div>
      </section>

      <section className={styles.divisions} id="divisions">
        <div className={styles.divisionHero}>
          <div><span>The Full Portfolio</span><h2>Current focus is the front line. The full enterprise is the long game.</h2></div>
          <img src="/brand/kollective-hero.svg" alt="The Kollective enterprise world" />
        </div>
        <div className={styles.divisionGrid}>
          {divisions.map((division, index) => (
            <article key={division.title} className={styles.divisionCard}>
              <div className={styles.divisionHead}><span>{division.eyebrow}</span><b>{String(index + 1).padStart(2, '0')}</b></div>
              <h3>{division.title}</h3>
              <p>{division.description}</p>
              <div>{division.brands.map((brand) => <span key={brand}>{brand}</span>)}</div>
              <a href={division.href}>{division.cta} →</a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.access} id="access">
        <img className={styles.gateway} src="/brand/kollective-hero.svg" alt="Enter The Kollective" />
        <div className={styles.accessContent}>
          <span>Direct Access</span>
          <h2>Every sale, RSVP, application, download and opportunity starts here.</h2>
          <p>The destination router sends each action to the correct website, direct form, enterprise screen or app-store listing.</p>
          <div className={styles.accessGrid}>
            {featuredAccess.map((item) => (
              <a href={item.href} key={item.title}><strong>{item.title}</strong><span>{item.description}</span><b>↗</b></a>
            ))}
          </div>
          <div className={styles.accessButtons}>
            <a className={styles.goldButton} href="/access">View Every Form & Link</a>
            <a className={styles.lineButton} href="/forms/nda">Request NDA</a>
            <a className={styles.lineButton} href="https://111atl.com">111ATL Current Access</a>
          </div>
        </div>
      </section>

      <section className={styles.future}>
        <div>
          <span>Unified Enterprise App</span>
          <h2>One account. The whole enterprise. Immediate action.</h2>
          <p>The combined app will create persistent users, direct access, personalized enterprise updates and smart destination routing. A platform such as Black Pages will open its App Store or Google Play listing; a hospitality offer will open its reservation flow; a product will open checkout.</p>
          <div className={styles.heroButtons}>
            <a className={styles.goldButton} href="/forms/inquiry?interest=enterprise_app">Join App Early Access</a>
          </div>
        </div>
        <div className={styles.futureCards}>
          <article><b>01</b><h3>Universal Identity</h3><p>One account, saved preferences, city, interests and access level across the enterprise.</p></article>
          <article><b>02</b><h3>Smart CTA Router</h3><p>Open a screen, form, checkout, website or app-store destination based on the entity and device.</p></article>
          <article><b>03</b><h3>Enterprise Push</h3><p>Segmented notifications for events, products, services, opportunities and app launches.</p></article>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}><img src={EMBLEM} alt="The Kollective" /><div><strong>The Kollective</strong><span>One enterprise. Many worlds.</span></div></div>
        <div className={styles.footerLinks}><a href="/access">Access Center</a><a href="/forms/sponsor">Partnerships</a><a href="/forms/hiring_inquiry">Careers</a><a href={BOOK_URL}>Buy the Book</a><a href="https://doctordorsey.com">Dr. Dorsey</a></div>
        <p>© 2026 The Kollective. Every brand remains independently operated within the enterprise portfolio.</p>
      </footer>
    </main>
  );
}
