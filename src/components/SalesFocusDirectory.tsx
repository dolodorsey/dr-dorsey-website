'use client';

import MotionCover from './MotionCover';
import styles from './SalesFocusDirectory.module.css';
import type { FocusCard, FocusSection } from '@/lib/sales-focus';

function FocusCardView({ card, featuredCard = false }: { card: FocusCard; featuredCard?: boolean }) {
  const kinetic = !card.animation && !card.sequence?.length && Boolean(card.image);
  return (
    <a
      className={`${styles.card} ${featuredCard ? styles.featuredCard : ''}`}
      href={card.href}
      aria-label={`Open ${card.name}`}
    >
      <span className={`${styles.media} ${kinetic ? styles.kinetic : ''}`}>
        {card.sequence?.length ? (
          <span className={styles.sequence} aria-label={card.name}>
            {card.sequence.map((src, index) => (
              <img
                src={src}
                alt={index === 0 ? card.name : ''}
                aria-hidden={index === 0 ? undefined : true}
                loading="lazy"
                key={src}
                style={{
                  animationDelay: `${-(index * (12 / card.sequence!.length))}s`,
                }}
              />
            ))}
          </span>
        ) : (
          <MotionCover
            animation={card.animation}
            image={card.image}
            alt={card.name}
            veil
            containStill={card.contain}
          />
        )}
      </span>
      <span className={styles.copy}>
        <small>{card.eyebrow}</small>
        <strong>{card.name}</strong>
        <em>{card.category}</em>
        <p>{card.description}</p>
        <b>OPEN <span>↗</span></b>
      </span>
    </a>
  );
}

export default function SalesFocusDirectory({ featured, sections }: { featured: FocusCard[]; sections: FocusSection[] }) {
  return (
    <div className={styles.directory}>
      <section className={styles.featured} aria-labelledby="sales-focus-title">
        <header className={styles.featuredHead}>
          <span>CURRENT SALES FOCUS</span>
          <h2 id="sales-focus-title">THE FRONT DOOR TO WHAT WE&apos;RE SELLING NOW.</h2>
          <p>Independent companies. Independent identities. One clean directory into the active sales focus.</p>
        </header>
        <div className={styles.featuredGrid}>
          {featured.map((card) => <FocusCardView card={card} featuredCard key={card.key} />)}
        </div>
      </section>

      <nav className={styles.jump} aria-label="Sales focus categories">
        {sections.map((section) => <a href={`#focus-${section.key}`} key={section.key}>{section.title}</a>)}
      </nav>

      {sections.map((section) => (
        <section className={styles.section} id={`focus-${section.key}`} key={section.key}>
          <header className={styles.sectionHead}>
            <div>
              <span>SALES FOCUS</span>
              <h2>{section.title}</h2>
            </div>
            <p>{section.description}</p>
          </header>
          <div className={styles.grid}>
            {section.cards.map((card) => <FocusCardView card={card} key={card.key} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
