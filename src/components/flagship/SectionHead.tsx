import type { ReactNode } from 'react';
import Reveal from './Reveal';
import styles from './sections.module.css';

type SectionHeadProps = {
  kicker: string;
  title: ReactNode;
  standfirst?: ReactNode;
};

/** Shared editorial header: kicker / display title / standfirst. */
export default function SectionHead({ kicker, title, standfirst }: SectionHeadProps) {
  return (
    <div className={styles.head}>
      <Reveal>
        <p className={styles.kicker}>{kicker}</p>
        <h2 className={styles.title}>{title}</h2>
      </Reveal>
      {standfirst ? (
        <Reveal delay={120}>
          <p className={styles.standfirst}>{standfirst}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
