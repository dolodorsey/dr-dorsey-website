'use client';

import styles from './DepartmentGrid.module.css';
import MotionCover from './MotionCover';
import { departments } from '@/lib/departments';
import { useVisitRotation } from '@/lib/use-visit-rotation';

export default function DepartmentGrid({ featuredCount = 2 }: { featuredCount?: number }) {
  const visit = useVisitRotation();

  return (
    <div className={styles.grid}>
      {departments.map((department, index) => {
        const featured = index < featuredCount;
        const pool = department.animations;
        const animation = pool[(visit + index) % pool.length];

        return (
          <a
            className={`${styles.card} ${featured ? styles.feature : styles.tile}`}
            href={department.href}
            key={department.title}
          >
            <span className={styles.media}>
              <MotionCover key={animation.src} animation={animation} alt={department.title} />
            </span>
            <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
            <div className={styles.body}>
              <p className={styles.eyebrow}>{department.eyebrow}</p>
              <h3 className={styles.title}>{department.title}</h3>
              <p className={styles.detail}>{department.detail}</p>
              <div className={styles.sample}>
                {department.sample.map((name) => <span key={name}>{name}</span>)}
              </div>
              <b className={styles.cta}>{department.cta} ↗</b>
            </div>
          </a>
        );
      })}
    </div>
  );
}
