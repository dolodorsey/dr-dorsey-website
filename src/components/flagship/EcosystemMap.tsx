'use client';

import { useState, type CSSProperties } from 'react';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import styles from './sections.module.css';

const BRAND_MARKS: Record<string, string> = {
  'Rose on Piedmont': '/brand-logos/rose-on-piedmont.png',
  'GROWN-ISH': '/brand-logos/grown-ish.png',
  'Taste of Art': '/brand-logos/taste-of-art.png',
  'GOOD TIMES': '/brand-logos/good-times.png',
  'The Casper Group': '/brand-logos/casper-group.png',
  'Infinity Water': '/brand-logos/infinity-water.png',
  'Pronto Energy': '/brand-logos/pronto-energy.png',
  'Tribal Water': '/brand-logos/tribal-water.png',
  'Help 911': '/brand-logos/help-911.png',
  'Sole Exchange': '/brand-logos/sole-exchange.png',
  'The University': '/brand-logos/the-university.png',
  STUSH: '/brand-logos/stush.png',
  PULSE: '/brand-logos/pulse.png',
  Bodega: '/brand-logos/bodega.png',
  'Make Atlanta Great Again': '/brand-logos/make-atlanta-great-again.png',
};

export type Branch = {
  name: string;
  count: string;
  description: string;
  brands: string[];
  href: string;
  cta: string;
};

type EcosystemMapProps = {
  kicker: string;
  title: React.ReactNode;
  standfirst?: React.ReactNode;
  emblem: string;
  branches: Branch[];
  id?: string;
};

/**
 * Radial enterprise diagram. Branches sit on an orbit and expand the
 * detail panel on hover, focus, or tap — one shared panel so mobile
 * gets the same information without a hover state.
 */
export default function EcosystemMap({
  kicker,
  title,
  standfirst,
  emblem,
  branches,
  id,
}: EcosystemMapProps) {
  const [active, setActive] = useState(0);
  const current = branches[active] ?? branches[0];

  return (
    <section className={styles.section} id={id}>
      <SectionHead kicker={kicker} title={title} standfirst={standfirst} />

      <div className={styles.ecosystem}>
        <Reveal>
          <div className={styles.orbit}>
            <span className={`${styles.ring} ${styles.ring1}`} aria-hidden="true" />
            <span className={`${styles.ring} ${styles.ring2}`} aria-hidden="true" />
            <span className={`${styles.ring} ${styles.ring3}`} aria-hidden="true" />

            <div className={styles.orbitCore}>
              { }
              <img src={emblem} alt="" aria-hidden="true" />
            </div>

            {branches.map((branch, index) => {
              const angle = (index / branches.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 38;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              return (
                <button
                  key={branch.name}
                  type="button"
                  className={styles.branch}
                  data-active={index === active}
                  style={{ ['--x' as string]: `${x}%`, ['--y' as string]: `${y}%` } as CSSProperties}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-pressed={index === active}
                >
                  <span className={styles.branchDot}>
                    <b>{branch.name}</b>
                    <small>{branch.count}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={140} className={styles.orbitPanel}>
          <h3>{current.name}</h3>
          <p>{current.description}</p>
          <div className={styles.orbitList}>
            {current.brands.map((brand) => (
              <a key={brand} href={`/directory?search=${encodeURIComponent(brand)}`}>
                {BRAND_MARKS[brand] ? <img src={BRAND_MARKS[brand]} alt="" /> : null}
                <span>{brand}</span>
              </a>
            ))}
          </div>
          <a className={styles.orbitCta} href={current.href}>
            {current.cta} <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
