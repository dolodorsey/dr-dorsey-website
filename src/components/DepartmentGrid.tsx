'use client';

import styles from './DepartmentGrid.module.css';
import MotionCover from './MotionCover';
import { departments } from '@/lib/departments';
import { useVisitRotation } from '@/lib/use-visit-rotation';

/**
 * The fourteen departments — two featured, then four across, which lands as
 * exactly three full rows. Leads both homepages.
 *
 * Each department is represented by one of its own companies' animations, and
 * the pick rotates every visit, so the page has a different face each time
 * someone comes back to it.
 */
export default function DepartmentGrid({ featuredCount = 2 }: { featuredCount?: number }) {
  const visit = useVisitRotation();

  return (
    <div className={styles.grid}>
      {departments.map((department, index) => {
        const featured = index < featuredCount;
        const pool = department.animations;
        // Offsetting by the card index as well as the visit means two
        // departments sharing an animation rarely land on it at the same time.
        const animation = pool[(visit + index) % pool.length];

        return (
          <a
            className={`${styles.card} ${featured ? styles.feature : styles.tile}`}
            href={department.href}
            key={department.title}
          >
            <span className={styles.media}>
              <MotionCover
                key={animation.src}
                animation={animation}
                alt={department.title}
              />
            </span>
            <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
            <div className={styles.body}>
              <p className={styles.eyebrow}>{department.eyebrow}</p>
              <h3 className={styles.title}>{department.title}</h3>
              <p className={styles.detail}>{department.detail}</p>
              <div className={styles.sample}>
                {department.sample.slice(0, featured ? 5 : 3).map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
              <b className={styles.cta}>{department.cta} ↗</b>
            </div>
          </a>
        );
      })}
    </div>
  );
}
