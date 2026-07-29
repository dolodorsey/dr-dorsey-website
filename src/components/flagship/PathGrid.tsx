import Reveal from './Reveal';
import SectionHead from './SectionHead';
import styles from './sections.module.css';

export type Path = {
  audience: string;
  line: string;
  href: string;
  cta: string;
};

type PathGridProps = {
  kicker: string;
  title: React.ReactNode;
  standfirst?: React.ReactNode;
  paths: Path[];
  id?: string;
  tone?: 'ink' | 'paper';
};

/** One door per audience. Every route ends in a real destination. */
export default function PathGrid({
  kicker,
  title,
  standfirst,
  paths,
  id,
  tone = 'ink',
}: PathGridProps) {
  return (
    <section
      className={`${styles.section} ${tone === 'paper' ? styles.paper : ''}`}
      id={id}
    >
      <SectionHead kicker={kicker} title={title} standfirst={standfirst} />

      <div className={styles.paths}>
        {paths.map((path, index) => (
          <Reveal key={path.audience} delay={index * 70}>
            <a className={styles.path} href={path.href}>
              <span className={styles.pathNum}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{path.audience}</h3>
              <p>{path.line}</p>
              <span className={styles.pathCta}>{path.cta} →</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
