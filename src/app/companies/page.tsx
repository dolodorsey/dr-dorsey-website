import type { Metadata } from 'next';
import styles from './page.module.css';
import SalesFocusDirectory from '@/components/SalesFocusDirectory';
import FilmBackdrop from '@/components/FilmBackdrop';
import { motion } from '@/lib/motion';

export const metadata: Metadata = {
  title: 'Companies — Dr. DoLo Dorsey',
  description:
    'The current sales focus across Dr. Dorsey and The Kollective — direct paths into active companies, products and platforms.',
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
        <FilmBackdrop animation={motion.drDorsey} opacity={0.2} />
        <p className={styles.kicker}>Companies / current sales focus</p>
        <h1>
          WHAT WE’RE SELLING.
          <br />
          <em>RIGHT NOW.</em>
        </h1>
        <p>
          The current sales focus across Dr. Dorsey and The Kollective. Every company keeps its own identity,
          audience and route to market — this is the clean front door into what is active now.
        </p>
      </header>

      <div className={`${styles.body} k-surface k-emblem k-edge`}>
        <div className={styles.inner}>
          <SalesFocusDirectory />
        </div>
      </div>

      <footer className={`${styles.footer} k-surface k-surface-deep`}>
        <img className={styles.footerLogo} src="/dorsey/logo.png" alt="Dr. Dorsey" />
        <p>Live for today. Plan for tomorrow. Party tonight.</p>
        <a href="/forms/inquiry">Start a conversation ↗</a>
      </footer>
    </main>
  );
}
