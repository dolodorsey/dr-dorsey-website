'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import styles from './sections.module.css';

export type Market = {
  city: string;
  /** Projected position in the 100 x 60 coordinate field. */
  x: number;
  y: number;
  tier: 'home' | 'active' | 'expansion';
  tierLabel: string;
  note: string;
  entries: Array<{ name: string; kind: string; href?: string }>;
};

type FootprintMapProps = {
  kicker: string;
  title: React.ReactNode;
  standfirst?: React.ReactNode;
  markets: Market[];
  /** Index of the market every line originates from. */
  originIndex?: number;
  id?: string;
  tone?: 'ink' | 'paper';
};

/**
 * Operating-footprint map. Cities are placed on a true equirectangular
 * projection of the continental US rather than a decorative illustration,
 * and connection lines run from the home market outward.
 */
export default function FootprintMap({
  kicker,
  title,
  standfirst,
  markets,
  originIndex = 0,
  id,
  tone = 'ink',
}: FootprintMapProps) {
  const [active, setActive] = useState(originIndex);
  const current = markets[active] ?? markets[0];
  const origin = markets[originIndex] ?? markets[0];

  return (
    <section
      className={`${styles.section} ${tone === 'paper' ? styles.paper : ''}`}
      id={id}
    >
      <SectionHead kicker={kicker} title={title} standfirst={standfirst} />

      <div className={styles.footprint}>
        <Reveal className={styles.mapWrap}>
          <svg
            className={styles.mapSvg}
            viewBox="0 0 100 60"
            role="group"
            aria-label="Operating markets"
          >
            <g aria-hidden="true">
              {[10, 20, 30, 40, 50].map((y) => (
                <line key={`h${y}`} className={styles.mapOutline} x1="4" y1={y} x2="96" y2={y} fill="none" />
              ))}
              {[15, 30, 45, 60, 75, 90].map((x) => (
                <line key={`v${x}`} className={styles.mapOutline} x1={x} y1="6" x2={x} y2="56" fill="none" />
              ))}
              {markets.map((market, index) =>
                index === originIndex ? null : (
                  <line
                    key={`link-${market.city}`}
                    className={styles.mapOutline}
                    x1={origin.x}
                    y1={origin.y}
                    x2={market.x}
                    y2={market.y}
                    fill="none"
                  />
                ),
              )}
            </g>

            {markets.map((market, index) => (
              <g
                key={market.city}
                className={styles.pin}
                data-tier={market.tier}
                data-active={index === active}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                onFocus={() => setActive(index)}
                tabIndex={0}
                role="button"
                aria-label={`${market.city} — ${market.tierLabel}`}
              >
                <circle className={styles.pinHalo} cx={market.x} cy={market.y} r="2.6" />
                <circle
                  className={styles.pinCore}
                  cx={market.x}
                  cy={market.y}
                  r={market.tier === 'home' ? 1.5 : 1}
                />
                <text
                  className={styles.pinLabel}
                  x={market.x}
                  y={market.y - 3.2}
                  textAnchor="middle"
                >
                  {market.city}
                </text>
              </g>
            ))}
          </svg>
        </Reveal>

        <Reveal delay={140} className={styles.cityPanel}>
          <span className={styles.cityTier}>{current.tierLabel}</span>
          <h3>{current.city}</h3>
          <p>{current.note}</p>
          <div className={styles.cityList}>
            {current.entries.map((entry) =>
              entry.href ? (
                <a key={entry.name} href={entry.href}>
                  {entry.name} <i>{entry.kind}</i>
                </a>
              ) : (
                <span key={entry.name}>
                  {entry.name} <i>{entry.kind}</i>
                </span>
              ),
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
