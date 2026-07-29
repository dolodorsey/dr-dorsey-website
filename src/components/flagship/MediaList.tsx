import Reveal from './Reveal';
import SectionHead from './SectionHead';
import styles from './sections.module.css';

export type MediaEntry = {
  kind: string;
  title: string;
  outlet: string;
  href: string;
  action?: string;
};

type MediaListProps = {
  kicker: string;
  title: React.ReactNode;
  standfirst?: React.ReactNode;
  entries: MediaEntry[];
  id?: string;
  tone?: 'ink' | 'paper';
};

/** Press, speaking, and appearance index as an editorial ledger. */
export default function MediaList({
  kicker,
  title,
  standfirst,
  entries,
  id,
  tone = 'ink',
}: MediaListProps) {
  return (
    <section
      className={`${styles.section} ${tone === 'paper' ? styles.paper : ''}`}
      id={id}
    >
      <SectionHead kicker={kicker} title={title} standfirst={standfirst} />

      <div className={styles.mediaList}>
        {entries.map((entry, index) => (
          <Reveal key={entry.title} delay={index * 50}>
            <a className={styles.mediaItem} href={entry.href}>
              <span className={styles.mediaKind}>{entry.kind}</span>
              <h3>
                {entry.title}
                <span>{entry.outlet}</span>
              </h3>
              <span className={styles.mediaArrow}>{entry.action || 'Open'} →</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
