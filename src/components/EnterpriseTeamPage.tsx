import Link from 'next/link';
import type { CSSProperties } from 'react';
import styles from './EnterpriseTeamPage.module.css';
import { SB } from '@/lib/enterprise';

type TeamMember = {
  name: string;
  title: string;
  division: string;
};

type PlaceholderAsset =
  | { kind: 'sprite'; index: number }
  | { kind: 'image'; url: string; position?: string };

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

const PEOPLE_ROOT = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/app/backgrounds';
const PEOPLE_BACKGROUNDS = Array.from({ length: 11 }, (_, index) => `${PEOPLE_ROOT}/app-background-${String(index + 1).padStart(2, '0')}.jpg`);
const TEAM_SPRITE = '/team-placeholder-sprite';

const APPROVED_PHOTOS: Record<string, string> = {
  JoJo: '/team/people/joseph.webp',
  'Joseph Siatta': '/team/people/joseph.webp',
  Quintin: '/team/people/quintin.webp',
};

// Every distinct named person has a distinct temporary visual. The same person keeps
// the same placeholder when they appear in more than one section.
const PLACEHOLDER_ASSETS: Record<string, PlaceholderAsset> = {
  JoJo: { kind: 'sprite', index: 0 },
  Quintin: { kind: 'sprite', index: 1 },
  Sevant: { kind: 'sprite', index: 2 },
  Grayson: { kind: 'sprite', index: 3 },
  Hartley: { kind: 'sprite', index: 4 },
  Raven: { kind: 'sprite', index: 5 },
  Kay: { kind: 'sprite', index: 6 },
  Scrolls: { kind: 'sprite', index: 7 },
  Lackey: { kind: 'sprite', index: 8 },
  Alexis: { kind: 'sprite', index: 9 },
  'Coach Harris': { kind: 'sprite', index: 10 },
  'Bob Johnson': { kind: 'sprite', index: 11 },
  'Countryboy Dorsey': { kind: 'sprite', index: 12 },
  Suave: { kind: 'sprite', index: 13 },
  Weezy: { kind: 'sprite', index: 14 },
  'Rick Wade': { kind: 'sprite', index: 15 },
  'Chief Lightfoot': { kind: 'sprite', index: 16 },
  'Chief Andre': { kind: 'sprite', index: 17 },
  'Chief Flyod': { kind: 'sprite', index: 18 },
  'Chief Joseph': { kind: 'image', url: PEOPLE_BACKGROUNDS[0] },
  'Brad Dorsey': { kind: 'image', url: PEOPLE_BACKGROUNDS[1] },
  'Zen Dorsey': { kind: 'image', url: PEOPLE_BACKGROUNDS[2] },
  'Joseph Siatta': { kind: 'image', url: PEOPLE_BACKGROUNDS[3] },
};

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

function placeholderStyle(name: string): CSSProperties {
  const approvedPhoto = APPROVED_PHOTOS[name];
  if (approvedPhoto) {
    return {
      backgroundImage: `url(${approvedPhoto})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 24%',
      backgroundRepeat: 'no-repeat',
    };
  }

  const asset = PLACEHOLDER_ASSETS[name];
  if (!asset) {
    return {
      backgroundImage: `url(${PEOPLE_BACKGROUNDS[10]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 25%',
      backgroundRepeat: 'no-repeat',
    };
  }

  if (asset.kind === 'image') {
    return {
      backgroundImage: `url(${asset.url})`,
      backgroundSize: 'cover',
      backgroundPosition: asset.position || 'center 25%',
      backgroundRepeat: 'no-repeat',
    };
  }

  const column = asset.index % 5;
  const row = Math.floor(asset.index / 5);
  return {
    backgroundImage: `url(${TEAM_SPRITE})`,
    backgroundSize: '500% 400%',
    backgroundPosition: `${column * 25}% ${row * (100 / 3)}%`,
    backgroundRepeat: 'no-repeat',
  };
}

function PhotoPlaceholder({ name, mini = false }: { name: string; mini?: boolean }) {
  const approved = Boolean(APPROVED_PHOTOS[name]);
  return (
    <div
      className={`${styles.photoPlaceholder} ${mini ? styles.photoMini : ''}`}
      aria-label={approved ? `${name} team portrait` : `${name} temporary placeholder portrait`}
      style={placeholderStyle(name)}
    >
      {!approved && !mini ? <small>TEMPORARY PLACEHOLDER</small> : null}
      {!approved ? <span className={styles.initialBadge}>{initials(name)}</span> : null}
    </div>
  );
}

export default function EnterpriseTeamPage({ brand }: { brand: 'kollective' | 'dorsey' }) {
  const isKollective = brand === 'kollective';
  const home = '/';
  const logo = isKollective
    ? `${SB}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`
    : '/dorsey/logo.png';
  const command = executiveTeam.slice(0, 3);
  const divisionLeads = executiveTeam.slice(3);
  const nightlife = executiveTeam.filter((member) => member.division === 'Nightlife');
  const heroImage = isKollective ? PEOPLE_BACKGROUNDS[10] : PEOPLE_BACKGROUNDS[8];

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

      <header className={styles.hero} style={{ backgroundImage: `linear-gradient(90deg, rgba(5,5,5,.92) 0%, rgba(5,5,5,.68) 48%, rgba(5,5,5,.25) 100%), url(${heroImage})` }}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p>{isKollective ? 'THE KOLLECTIVE / PEOPLE' : 'DR. DORSEY / ENTERPRISE'}</p>
            <h1>{isKollective ? 'The people behind the portfolio.' : 'The team behind the vision.'}</h1>
            <span>Operators, strategists, builders and culture leaders working across distinct lanes with one enterprise standard.</span>
          </div>
          <div className={styles.heroMeta}>
            <div><strong>{executiveTeam.length}</strong><span>Leadership</span></div>
            <div><strong>{board.length}</strong><span>Board</span></div>
            <div><strong>{nightlife.length}</strong><span>Nightlife</span></div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p>EXECUTIVE COMMAND</p>
          <h2>Operating leadership.</h2>
          <span>Enterprise-wide responsibility for operations, growth, strategy and activation.</span>
        </div>
        <div className={styles.commandGrid}>
          {command.map((member, index) => (
            <article className={styles.commandCard} key={member.name}>
              <PhotoPlaceholder name={member.name} />
              <div className={styles.commandCopy}>
                <span>{String(index + 1).padStart(2, '0')} / {member.division}</span>
                <h3>{member.name}</h3>
                <p>{member.title}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.leadershipSection}`}>
        <div className={styles.sectionIntro}>
          <p>DIVISION LEADERSHIP</p>
          <h2>Built by lane.</h2>
          <span>Compact team cards prioritize the people, their lane and their role without wasting page space.</span>
        </div>
        <div className={styles.leadershipGrid}>
          {divisionLeads.map((member) => (
            <article className={styles.leadCard} key={member.name}>
              <PhotoPlaceholder name={member.name} />
              <div className={styles.leadCopy}>
                <p>{member.division}</p>
                <h3>{member.name}</h3>
                <span>{member.title}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.nightlifeSection}>
        <div className={styles.nightlifeIntro}>
          <p>NIGHTLIFE DIVISION</p>
          <h2>Venue. Brand. Activation.</h2>
          <span>Grayson and Hartley lead the lane with Suave and Weezy assigned directly into Nightlife operations and activations.</span>
        </div>
        <div className={styles.nightlifeRoster}>
          {nightlife.map((member) => (
            <article key={member.name}>
              <PhotoPlaceholder name={member.name} mini />
              <div><h3>{member.name}</h3><p>{member.title}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.boardSection}`}>
        <div className={styles.sectionIntro}>
          <p>GOVERNANCE</p>
          <h2>The Board.</h2>
          <span>Institutional perspective, culture, accountability and long-range enterprise stewardship.</span>
        </div>
        <div className={styles.boardList}>
          {board.map((name, index) => (
            <article key={name}>
              <span className={styles.boardIndex}>{String(index + 1).padStart(2, '0')}</span>
              <PhotoPlaceholder name={name} mini />
              <div><h3>{name}</h3><p>Board Member</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <p>ONE TEAM · DISTINCT LANES</p>
        <h2>{isKollective ? 'One enterprise. Many worlds.' : 'Vision becomes execution here.'}</h2>
        <div><Link href="/app/forms/partnership">Partner with us</Link><Link href="/companies">Explore companies</Link></div>
      </section>

      <footer className={styles.footer}>
        <img src={logo} alt="" />
        <p>{isKollective ? 'Independent brands. Shared enterprise leverage.' : 'Founder vision. Enterprise execution.'}</p>
        <div><Link href="/companies">Companies</Link><Link href="/events">Current</Link><Link href="/team">Team</Link><Link href="/app">All Access</Link></div>
      </footer>
    </main>
  );
}
