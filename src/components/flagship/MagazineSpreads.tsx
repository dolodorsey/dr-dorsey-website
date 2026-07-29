import KHGImage from './KHGImage';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import styles from './sections.module.css';

export type Spread = {
  name: string;
  statement: string;
  category: string;
  location: string;
  status: string;
  image: string;
  video?: string;
  focal?: string;
  fit?: 'cover' | 'contain';
  href: string;
  cta: string;
};

type MagazineSpreadsProps = {
  kicker: string;
  title: React.ReactNode;
  standfirst?: React.ReactNode;
  spreads: Spread[];
  id?: string;
  tone?: 'ink' | 'paper';
};

/**
 * The portfolio without cards: alternating editorial spreads with
 * varied aspect ratios so no two entries share a rhythm.
 */
export default function MagazineSpreads({
  kicker,
  title,
  standfirst,
  spreads,
  id,
  tone = 'ink',
}: MagazineSpreadsProps) {
  return (
    <section
      className={`${styles.section} ${tone === 'paper' ? styles.paper : ''}`}
      id={id}
    >
      <SectionHead kicker={kicker} title={title} standfirst={standfirst} />

      <div className={styles.spreads}>
        {spreads.map((spread, index) => (
          <Reveal key={spread.name} threshold={0.12}>
            <a className={styles.spread} href={spread.href}>
              <div className={styles.spreadMedia}>
                {spread.video ? (
                  <video autoPlay muted loop playsInline poster={spread.image} aria-label={`${spread.name} animation`}>
                    <source src={spread.video} type="video/mp4" />
                  </video>
                ) : (
                  <KHGImage
                    src={spread.image}
                    alt={spread.name}
                    fill
                    fit={spread.fit || 'cover'}
                    focal={spread.focal}
                    sizes="(max-width: 880px) 100vw, 55vw"
                  />
                )}
                <span className={styles.spreadIndex}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className={styles.spreadCopy}>
                <small>{spread.category}</small>
                <h3>{spread.name}</h3>
                <p>{spread.statement}</p>
                <dl className={styles.spreadMeta}>
                  <div>
                    <dt>Location</dt>
                    <dd>{spread.location}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{spread.status}</dd>
                  </div>
                </dl>
                <span className={styles.enter}>
                  {spread.cta} <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
