import Link from 'next/link';
import styles from './EnterpriseTeamPage.module.css';
import { SB } from '@/lib/enterprise';

type TeamMember = {
  name: string;
  title: string;
  division: string;
};

const executiveTeam: TeamMember[] = [
  { name: 'JoJo', title: 'Co-Chief Operating Officer, Enterprise Operations', division: 'Enterprise Operations' },
  { name: 'Quintin', title: 'Co-Chief Operating Officer, Business Operations & Growth', division: 'Business Operations & Growth' },
  { name: 'Sevant', title: 'Chief Strategy & Activation Officer', division: 'Strategy & Activations' },
  { name: 'Grayson', title: 'Director of Nightlife & Brand Activations', division: 'Nightlife' },
  { name: 'Hartley', title: 'Director of Nightlife & Venue Operations', division: 'Nightlife' },
  { name: 'Raven', title: 'Director of Products & Apparel', division: 'Products & Apparel' },
  { name: 'Kay', title: 'Director of Beverage Operations & Strategic Projects', division: 'Beverage Operations' },
  { name: 'Scrolls', title: 'Director of Digital Systems & Applications', division: 'Digital Systems & Applications' },
  { name: 'Lackey', title: 'Director of Lifestyle Operations', division: 'Lifestyle Operations' },
  { name: 'Alexis', title: 'Executive Project Manager', division: 'Executive Project Management' },
  { name: 'Coach Harris', title: 'Executive Director of Strategic Development', division: 'Strategic Development' },
  { name: 'Bob Johnson', title: 'Executive Director of Culture & Community Affairs', division: 'Culture & Community Affairs' },
  { name: 'Countryboy Dorsey', title: 'Director of Community & Field Operations', division: 'Community & Field Operations' },
  { name: 'Suave', title: 'Nightlife Operations & Activations', division: 'Nightlife' },
  { name: 'Weezy', title: 'Nightlife Operations & Activations', division: 'Nightlife' },
];

const board = [
  'Rick Wade',
  'Bob Johnson',
  'Coach Harris',
  'Chief Lightfoot',
  'Chief Andre',
  'Chief Flyod',
  'Chief Joseph',
  'Brad Dorsey',
  'Zen Dorsey',
  'Joseph Siatta',
  'Quintin',
];

function initials(name: string) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function PhotoPlaceholder({ name, compact = false }: { name: string; compact?: boolean }) {
  return (
    <div className={`${styles.photoPlaceholder} ${compact ? styles.compactPlaceholder : ''}`} aria-label={`${name} photo placeholder`}>
      <div className={styles.placeholderFigure} aria-hidden="true" />
      <b className={styles.placeholderInitials}>{initials(name)}</b>
      <small>PHOTO PLACEHOLDER</small>
    </div>
  );
}

export default function EnterpriseTeamPage({ brand }: { brand: 'kollective' | 'dorsey' }) {
  const isKollective = brand === 'kollective';
  const home = '/';
  const logo = isKollective
    ? `${SB}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`
    : '/dorsey/logo.png';
  const nightlife = executiveTeam.filter((member) => member.division === 'Nightlife');

  return (
    <main className={styles.page} data-brand={brand}>
      <nav className={styles.nav}>
        <Link href={home} className={styles.brand} aria-label={isKollective ? 'The Kollective home' : 'Dr. Dorsey home'}>
          <img src={logo} alt={isKollective ? 'The Kollective' : 'Dr. Dorsey'} />
        </Link>
        <div className={styles.navLinks}>
          <Link href="/companies">Companies</Link>
          <Link href="/events">Current</Link>
          <Link href="/network">Network</Link>
          <Link href="/team" aria-current="page">Team</Link>
        </div>
        <Link className={styles.navCta} href="/app">All Access</Link>
      </nav>

      <section className={styles.hero}>
        <div className={styles.grid} />
        <div className={styles.heroCopy}>
          <p>{isKollective ? 'THE KOLLECTIVE / LEADERSHIP' : 'DR. DORSEY / ENTERPRISE TEAM'}</p>
          <h1>Experienced leaders.<br /><em>Built to execute.</em></h1>
          <span>
            A cross-functional leadership system connecting operations, strategy, nightlife, products, beverages,
            digital systems, lifestyle, community, and enterprise development.
          </span>
        </div>
        <div className={styles.heroStats}>
          <div><strong>{executiveTeam.length}</strong><span>Named leadership roles</span></div>
          <div><strong>{board.length}</strong><span>Board members</span></div>
          <div><strong>{nightlife.length}</strong><span>Nightlife team</span></div>
        </div>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHead}>
          <div><p>EXECUTIVE LEADERSHIP</p><h2>Clear lanes. Shared standards.</h2></div>
          <span>Temporary photo placeholders are installed for every team member and can be replaced individually as portraits are approved.</span>
        </header>
        <div className={styles.teamGrid}>
          {executiveTeam.map((member) => (
            <article className={styles.card} key={member.name}>
              <PhotoPlaceholder name={member.name} />
              <div className={styles.cardCopy}>
                <p>{member.division}</p>
                <h3>{member.name}</h3>
                <span>{member.title}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.nightlifeSection}`}>
        <header className={styles.sectionHead}>
          <div><p>NIGHTLIFE DIVISION</p><h2>Brand, venue, and activation execution.</h2></div>
          <span>Grayson and Hartley lead the division with Suave and Weezy assigned directly into Nightlife operations and activations.</span>
        </header>
        <div className={styles.nightlifeGrid}>
          {nightlife.map((member) => (
            <article key={member.name}>
              <PhotoPlaceholder name={member.name} compact />
              <div><h3>{member.name}</h3><p>{member.title}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.boardSection}`}>
        <header className={styles.sectionHead}>
          <div><p>GOVERNANCE</p><h2>The Board.</h2></div>
          <span>Governance, institutional perspective, culture, accountability, and long-range enterprise stewardship.</span>
        </header>
        <div className={styles.boardGrid}>
          {board.map((name, index) => (
            <article key={name}>
              <span className={styles.boardNumber}>{String(index + 1).padStart(2, '0')}</span>
              <PhotoPlaceholder name={name} compact />
              <h3>{name}</h3>
              <p>Board Member</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <p>ONE TEAM · DISTINCT LANES · ENTERPRISE LEVERAGE</p>
        <h2>Build the next move.</h2>
        <div><Link href="/app/forms/partnership">Partner with us</Link><Link href="/companies">Explore the companies</Link></div>
      </section>

      <footer className={styles.footer}>
        <img src={logo} alt="" />
        <p>{isKollective ? 'Independent brands. Shared enterprise leverage.' : 'Founder vision. Enterprise execution.'}</p>
        <div><Link href="/companies">Companies</Link><Link href="/events">Current</Link><Link href="/team">Team</Link><Link href="/app">All Access</Link></div>
      </footer>
    </main>
  );
}