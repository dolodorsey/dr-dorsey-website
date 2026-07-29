import type { Metadata } from 'next';
import FootprintMap from '@/components/flagship/FootprintMap';
import PathGrid from '@/components/flagship/PathGrid';
import Timeline from '@/components/flagship/Timeline';
import { markets, partnerPaths, EMBLEM } from '@/lib/flagship-kollective';
import styles from '../kollective.module.css';

export const metadata: Metadata = {
  title: 'Locations — The Kollective Hospitality Group',
  description:
    'The Kollective operating footprint: Atlanta as the home market, Memphis active, and six expansion markets with partnership conversations open.',
};

const expansion = markets
  .filter((market) => market.tier === 'expansion')
  .map((market) => ({
    era: 'Expansion market',
    title: market.city,
    body: market.note,
    marks: market.entries.map((entry) => entry.name),
  }));

export default function LocationsPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a className={styles.navBrand} href="/kollective">
          { }
          <img src={EMBLEM} alt="The Kollective" />
        </a>
        <div className={styles.navLinks}>
          <a href="/kollective#philosophy">Philosophy</a>
          <a href="/kollective#portfolio">Portfolio</a>
          <a href="/kollective/entities">Entities</a>
          <a href="/kollective/careers">Careers</a>
        </div>
        <a className={styles.navCta} href="/kollective#build">Build with us</a>
      </nav>

      <section className={styles.intro} style={{ paddingTop: 'clamp(150px, 18vh, 240px)' }}>
        <p className={styles.kicker}>The Kollective global footprint</p>
        <h1>Where the<br />enterprise operates.</h1>
        <p>
          One home market carrying the majority of live operations, one active second
          market, and six expansion markets where partnership, licensing, and operator
          conversations are open. Nothing on this page is marked as operating until it is.
        </p>
      </section>

      <FootprintMap
        kicker="Select a market"
        title={<>Built in Atlanta.<br /><em>Moving outward.</em></>}
        standfirst="Cities are plotted on their true coordinates. Tier reflects what is actually running there today."
        markets={markets}
      />

      <Timeline
        kicker="Expansion pipeline"
        title={<>Six markets.<br /><em>Open conversations.</em></>}
        standfirst="What each expansion market is being scoped for, and what a first move there would look like."
        chapters={expansion}
        tone="paper"
      />

      <PathGrid
        id="build"
        kicker="Build with The Kollective"
        title={<>Bring us<br /><em>to your city.</em></>}
        standfirst="Operators, venue partners, and investors in these markets have a direct route in."
        paths={partnerPaths}
      />

      <footer className={styles.footer}>
        { }
        <img src={EMBLEM} alt="The Kollective" />
        <p>Independent brands. Shared enterprise leverage. Direct action.</p>
        <div>
          <a href="/kollective">Home</a>
          <a href="/kollective/careers">Careers</a>
          <a href="/access">Access</a>
        </div>
      </footer>
    </main>
  );
}
