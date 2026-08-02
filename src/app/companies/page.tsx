import type { Metadata } from 'next';
import styles from './page.module.css';
import CompanyDirectory from '@/components/CompanyDirectory';
import FilmBackdrop from '@/components/FilmBackdrop';
import { motion } from '@/lib/motion';

export const metadata: Metadata = {
  title: 'Companies — Dr. DoLo Dorsey',
  description:
    'Every company across The Kollective: hospitality, events, technology, products, water, services, impact, and the Casper Group.',
  alternates: { canonical: '/companies' },
};

export default function CompaniesPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a href="/" aria-label="Dr. Dorsey home">
          <img className={styles.navLogo} src="/dorsey/logo.png" alt="Dr. Dorsey" />
        </a>
        <div>
          <a href="/#departments">Departments</a>
          <a href="/directory">Directory</a>
          <a href="/events">Current</a>
          <a href="/links">Links</a>
          <a href="/access">Access</a>
        </div>
      </nav>

      <header className={`${styles.hero} k-surface k-surface-deep`}>
        <FilmBackdrop animation={motion.kollectiveGlobal} opacity={0.2} />
        <p className={styles.kicker}>Companies / the full roster</p>
        <h1>
          EVERY COMPANY.
          <br />
          <em>ONE ENTERPRISE.</em>
        </h1>
        <p>
          The complete portfolio, grouped by department. Each company keeps its own identity,
          audience, and route to market — the enterprise supplies the leverage behind them.
        </p>
      </header>

      <div className={`${styles.body} k-surface k-emblem k-edge`}>
        <CompanyDirectory />
      </div>

      <footer className={`${styles.footer} k-surface k-surface-deep`}>
        <img className={styles.footerLogo} src="/dorsey/logo.png" alt="Dr. Dorsey" />
        <p>Live for today. Plan for tomorrow. Party tonight.</p>
        <a href="/forms/inquiry">Start a conversation ↗</a>
      </footer>
    </main>
  );
}
