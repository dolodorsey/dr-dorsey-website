import styles from './kollective.module.css';
import { accessLinks, divisions, operatingBrands, stats, SB } from '@/lib/enterprise';

const EMBLEM = `${SB}/dr_dorsey/01_logos/KOLLECTIVEemblemW.png`;

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
          <a href="#operating">Operating</a>
          <a href="#divisions">Divisions</a>
          <a href="#access">Access</a>
          <a href="https://doctordorsey.com">Founder</a>
        </div>
        <a className={styles.navButton} href="/access">Open Access Center</a>
      </nav>

      <section className={styles.hero} id="top">
        <img className={styles.heroImage} src="/brand/kollective-hero.svg" alt="The Kollective enterprise" />
        <div className={styles.heroShade} />
        <div className={styles.heroFrame} />
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>The Enterprise · Established 2026</div>
          <h1>One enterprise.<br /><em>Independent brands.</em><br />Shared leverage.</h1>
          <p>
            The Kollective is a multi-city ecosystem of hospitality, food, events, consumer products,
            services, technology, institutions and cultural intellectual property.
          </p>
          <div className={styles.heroButtons}>
            <a className={styles.goldButton} href="#operating">See What Is Operating</a>
            <a className={styles.lineButton} href="/forms/sponsor">Partner With Us</a>
            <a className={styles.lineButton} href="/forms/rsvp">RSVP / Events</a>
          </div>
        </div>
        <div className={styles.heroRail}>
          <span>Hospitality</span><span>Food</span><span>Events</span><span>Products</span><span>Technology</span><span>Services</span><span>Institutions</span>
        </div>
      </section>

      <section className={styles.statBar}>
        {stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </section>

      <section className={styles.operating} id="operating">
        <div className={styles.sectionIntro}>
          <span>Enterprise Proof</span>
          <h2>Built in the real world.</h2>
          <p>The portfolio begins with businesses already operating, producing revenue, serving customers and expanding.</p>
        </div>
        <div className={styles.operatingGrid}>
          {operatingBrands.map((brand, index) => (
            <a key={brand.name} href={brand.href} className={`${styles.operatingCard} ${index < 5 ? styles.anchorBrand : ''}`}>
              <div className={styles.cardTop}><span>{brand.status}</span><b>{String(index + 1).padStart(2, '0')}</b></div>
              <div className={styles.cardLogo}><img src={brand.logo} alt={`${brand.name} logo`} /></div>
              <div className={styles.cardBottom}><strong>{brand.name}</strong><span>{brand.category}</span></div>
            </a>
          ))}
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
          <div><span>The Full Portfolio</span><h2>The enterprise is bigger than the logos people already know.</h2></div>
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
          <h2>Every sale, RSVP, application and opportunity starts here.</h2>
          <p>No hunting through social media. No guessing who to contact. Choose the correct entry point and your request is routed to the proper division.</p>
          <div className={styles.accessGrid}>
            {featuredAccess.map((item) => (
              <a href={item.href} key={item.title}><strong>{item.title}</strong><span>{item.description}</span><b>↗</b></a>
            ))}
          </div>
          <div className={styles.accessButtons}>
            <a className={styles.goldButton} href="/access">View Every Form & Link</a>
            <a className={styles.lineButton} href="/forms/nda">Request NDA</a>
            <a className={styles.lineButton} href="https://111atl.com">111ATL Directory</a>
          </div>
        </div>
      </section>

      <section className={styles.future}>
        <div>
          <span>Platform Roadmap</span>
          <h2>Website now. App ecosystem next.</h2>
          <p>The current architecture is being organized as a reusable platform layer for future mobile and member applications.</p>
        </div>
        <div className={styles.futureCards}>
          <article><b>01</b><h3>Public Enterprise</h3><p>Brands, offers, RSVPs, sales and public forms.</p></article>
          <article><b>02</b><h3>Partner Portal</h3><p>Approvals, documents, deals, reporting and communications.</p></article>
          <article><b>03</b><h3>Member App</h3><p>Access levels, benefits, events, services and network identity.</p></article>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}><img src={EMBLEM} alt="The Kollective" /><div><strong>The Kollective</strong><span>One enterprise. Many worlds.</span></div></div>
        <div className={styles.footerLinks}><a href="/access">Access Center</a><a href="/forms/sponsor">Partnerships</a><a href="/forms/hiring_inquiry">Careers</a><a href="https://doctordorsey.com">Dr. Dorsey</a></div>
        <p>© 2026 The Kollective. All brands remain independently operated within the enterprise portfolio.</p>
      </footer>
    </main>
  );
}
