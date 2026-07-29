import KHGImage from './KHGImage';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import styles from './sections.module.css';

export type CaseStudy = {
  name: string;
  discipline: string;
  challenge: string;
  vision: string;
  execution: string;
  impact: Array<{ figure: string; label: string }>;
  image: string;
  focal?: string;
  fit?: 'cover' | 'contain';
};

type CaseStudiesProps = {
  kicker: string;
  title: React.ReactNode;
  standfirst?: React.ReactNode;
  cases: CaseStudy[];
  id?: string;
  tone?: 'ink' | 'paper';
};

/** Challenge → Vision → Execution → Impact, in the brief's own order. */
export default function CaseStudies({
  kicker,
  title,
  standfirst,
  cases,
  id,
  tone = 'ink',
}: CaseStudiesProps) {
  return (
    <section
      className={`${styles.section} ${tone === 'paper' ? styles.paper : ''}`}
      id={id}
    >
      <SectionHead kicker={kicker} title={title} standfirst={standfirst} />

      <div className={styles.cases}>
        {cases.map((item) => (
          <Reveal key={item.name} className={styles.case} threshold={0.12}>
            <div className={styles.caseMedia}>
              <KHGImage
                src={item.image}
                alt={item.name}
                fill
                fit={item.fit || 'cover'}
                focal={item.focal}
                sizes="(max-width: 880px) 100vw, 40vw"
              />
            </div>

            <div>
              <div className={styles.caseHead}>
                <small>{item.discipline}</small>
                <h3>{item.name}</h3>
              </div>

              <div className={styles.caseGrid}>
                <div>
                  <b>Challenge</b>
                  <p>{item.challenge}</p>
                </div>
                <div>
                  <b>Vision</b>
                  <p>{item.vision}</p>
                </div>
                <div>
                  <b>Execution</b>
                  <p>{item.execution}</p>
                </div>
              </div>

              <div className={styles.caseImpact}>
                {item.impact.map((metric) => (
                  <div key={metric.label}>
                    <strong>{metric.figure}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
