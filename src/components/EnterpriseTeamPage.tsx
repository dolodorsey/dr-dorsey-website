import Link from 'next/link';
import type { CSSProperties } from 'react';
import styles from './EnterpriseTeamPage.module.css';
import { SB } from '@/lib/enterprise';

type TeamMember = {
  name: string;
  title: string;
  division: string;
  focus: string;
};

type PlaceholderAsset =
  | { kind: 'sprite'; index: number }
  | { kind: 'image'; url: string; position?: string };

const command: TeamMember[] = [
  {
    name: 'Bri',
    title: 'Executive Assistant · Enterprise Communications & Operations',
    division: 'Executive Office',
    focus: 'ICONIC LIVE · KOLLECTIVE · CASPER',
  },
  {
    name: 'JoJo',
    title: 'Operating Partner · Enterprise Execution',
    division: 'Enterprise Operations',
    focus: 'KOLLECTIVE · CASPER · SOLE EXCHANGE · S.O.S. · MISSION 365',
  },
  {
    name: 'Quinten',
    title: 'Strategic Partner · Growth, Capital & External Development',
    division: 'Strategy & Growth',
    focus: 'KOLLECTIVE · GOOD TIMES · S.O.S. · ICONIC MUSIC · MISSION 365',
  },
];

const ownerOperators: TeamMember[] = [
  {
    name: 'Diesel',
    title: 'ICONIC LIVE Partner · Live Entertainment & Activations',
    division: 'ICONIC LIVE',
    focus: 'ICONIC LIVE',
  },
  {
    name: 'Kay',
    title: 'BEVCO Owner-Operator · Beverage Portfolio',
    division: 'BEVCO + Beverage Brands',
    focus: 'BEVCO INTL. · INFINITY · PRONTO · ORA · OTINI · TEMPO · CASA CANTINA · ISLAND WATER · DOUBLE ZERO · NOIR · PRIVÈ · XXX',
  },
  {
    name: 'Chizzy',
    title: 'Entertainment & Community Owner-Operator',
    division: 'Entertainment / Community',
    focus: 'ENT. · SOLE EXCHANGE · GOOD TIMES · MISSION 365',
  },
  {
    name: 'Sevant',
    title: 'Entertainment Strategy · Music & Activations',
    division: 'Entertainment / Music',
    focus: 'ENT. · ICONIC MUSIC',
  },
  {
    name: 'Raven',
    title: 'Fashion & Retail Owner-Operator',
    division: 'Fashion / Retail',
    focus: 'FĚNYX · STUSH · PULSE / BARE',
  },
  {
    name: 'Tay',
    title: 'Products, Retail & Sports Owner-Operator',
    division: 'Products / Sports',
    focus: 'FĚNYX · STUSH · SOLE EXCHANGE · MISTER MANUFACTURING · MEMBER’S ELITE · PULSE / BARE',
  },
  {
    name: 'Kenny',
    title: 'Manufacturing & Merchandise Lead',
    division: 'Manufacturing',
    focus: 'MISTER MANUFACTURING',
  },
  {
    name: 'Justin',
    title: 'Member’s Elite Operator',
    division: 'Sports / Membership',
    focus: 'MEMBER’S ELITE',
  },
];

const fullTeam = [...command, ...ownerOperators];
const PEOPLE_ROOT = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/app/backgrounds';
const PEOPLE_BACKGROUNDS = Array.from({ length: 11 }, (_, index) => `${PEOPLE_ROOT}/app-background-${String(index + 1).padStart(2, '0')}.jpg`);
const TEAM_SPRITE = '/team-placeholder-sprite';

const APPROVED_PHOTOS: Record<string, string> = {
  JoJo: '/team/people/joseph.webp',
  Quinten: '/team/people/quintin.webp',
};

const PLACEHOLDER_ASSETS: Record<string, PlaceholderAsset> = {
  Bri: { kind: 'sprite', index: 0 },
  JoJo: { kind: 'sprite', index: 1 },
  Quinten: { kind: 'sprite', index: 2 },
  Diesel: { kind: 'sprite', index: 3 },
  Kay: { kind: 'sprite', index: 4 },
  Chizzy: { kind: 'sprite', index: 5 },
  Sevant: { kind: 'sprite', index: 6 },
  Raven: { kind: 'sprite', index: 7 },
  Tay: { kind: 'sprite', index: 8 },
  Kenny: { kind: 'sprite', index: 9 },
  Justin: { kind: 'sprite', index: 10 },
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

function PhotoPlaceholder({ name }: { name: string }) {
  const approved = Boolean(APPROVED_PHOTOS[name]);
  return (
    <div
      className={styles.photoPlaceholder}
      aria-label={approved ? `${name} team portrait` : `${name} temporary placeholder portrait`}
      style={placeholderStyle(name)}
    >
      {!approved ? <small>TEMPORARY PLACEHOLDER</small> : null}
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
            <span>Enterprise command and owner-operators with clear lanes, accountable focuses and one operating standard.</span>
          </div>
          <div className={styles.heroMeta}>
            <div><strong>{fullTeam.length}</strong><span>Team</span></div>
            <div><strong>{command.length}</strong><span>Command</span></div>
            <div><strong>15</strong><span>Focus Lanes</span></div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p>EXECUTIVE COMMAND</p>
          <h2>Enterprise leadership.</h2>
          <span>The enterprise layer keeps communication, execution, growth and accountability moving across distinct companies.</span>
        </div>
        <div className={styles.commandGrid}>
          {command.map((member, index) => (
            <article className={styles.commandCard} key={member.name}>
              <PhotoPlaceholder name={member.name} />
              <div className={styles.commandCopy}>
                <span>{String(index + 1).padStart(2, '0')} / {member.division}</span>
                <h3>{member.name}</h3>
                <p>{member.title}</p>
                <p><b>Focus:</b> {member.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.leadershipSection}`}>
        <div className={styles.sectionIntro}>
          <p>OWNER-OPERATORS</p>
          <h2>Built by lane.</h2>
          <span>Every operator has a defined company lane. Brands stay separate; accountability stays visible.</span>
        </div>
        <div className={styles.leadershipGrid}>
          {ownerOperators.map((member) => (
            <article className={styles.leadCard} key={member.name}>
              <PhotoPlaceholder name={member.name} />
              <div className={styles.leadCopy}>
                <p>{member.division}</p>
                <h3>{member.name}</h3>
                <span>{member.title}</span>
                <span><b>Focus:</b> {member.focus}</span>
              </div>
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
