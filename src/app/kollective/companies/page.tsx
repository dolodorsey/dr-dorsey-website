import type { Metadata } from 'next';
import styles from './page.module.css';
import CompanyDirectory from '@/components/CompanyDirectory';
import FilmBackdrop from '@/components/FilmBackdrop';
import { motion } from '@/lib/motion';
import { SB } from '@/lib/enterprise';

const EMBLEM = `${SB}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;

export const metadata: Metadata = {
  title: 'Companies — The Kollective',
  description:
    'Every company inside The Kollective: hospitality, nightlife, events, technology, products, water, services, impact, and the Casper Group.',
  alternates: { canonical: '/kollective/companies' },
};

export default function KollectiveCompaniesPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a href="/kollective" aria-label="The Kollective home">
          <img className={styles.navLogo} src={EMBLEM} alt="The Kollective" />
        </a>
        <div>
          <a href="/kollective#departments">Departments</a>
          <a href="/entities">Entities</a>
          <a href="/events">Current</a>
          <a href="/network">Network</a>
          <a href="/access">Access</a>
        </div>
      </nav>

      <header className={`${styles.hero} k-surface k-surface-deep`}>
        <FilmBackdrop animation={motion.kollectiveNetwork} opacity={0.2} />
        <p className={styles.kicker}>Companies / the full roster</p>
        <h1>
          Every company.
          <br />
          <em>One enterprise.</em>
        </h1>
        <p>
          The complete portfolio, grouped by department. Every company keeps its own identity,
          audience, and route to market. The enterprise supplies the leverage behind them.
        </p>
      </header>

      <div className={`${styles.body} k-surface k-emblem k-edge`}>
        <CompanyDirectory />
      </div>

      <footer className={`${styles.footer} k-surface k-surface-deep`}>
        <img className={styles.footerLogo} src={EMBLEM} alt="The Kollective" />
        <p>Independent brands. Shared enterprise leverage. Direct action.</p>
        <a href="/access">Open all access ↗</a>
      </footer>
    </main>
  );
}
