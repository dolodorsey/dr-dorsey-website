'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import styles from './sections.module.css';

export type Chapter = {
  era: string;
  title: string;
  body: string;
  marks?: string[];
};

type TimelineProps = {
  kicker: string;
  title: React.ReactNode;
  standfirst?: React.ReactNode;
  chapters: Chapter[];
  id?: string;
  tone?: 'ink' | 'paper';
};

/**
 * Vertical chapter spine whose gold fill tracks scroll position.
 * rAF-throttled, passive listener, no animation dependency.
 */
export default function Timeline({
  kicker,
  title,
  standfirst,
  chapters,
  id,
  tone = 'ink',
}: TimelineProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(100);
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const anchor = window.innerHeight * 0.62;
      const travelled = anchor - rect.top;
      const next = Math.min(100, Math.max(0, (travelled / rect.height) * 100));
      setProgress(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      className={`${styles.section} ${tone === 'paper' ? styles.paper : ''}`}
      id={id}
    >
      <SectionHead kicker={kicker} title={title} standfirst={standfirst} />

      <div className={styles.timeline} ref={trackRef}>
        <div className={styles.spine} aria-hidden="true">
          <span
            className={styles.spineFill}
            style={{ ['--progress' as string]: `${progress}%` }}
          />
        </div>

        {chapters.map((chapter, index) => (
          <Reveal
            key={chapter.title}
            className={styles.chapter}
            delay={index * 60}
            threshold={0.25}
          >
            <span className={styles.node} aria-hidden="true" />
            <span className={styles.era}>{chapter.era}</span>
            <h3 className={styles.chapterTitle}>{chapter.title}</h3>
            <div className={styles.chapterBody}>
              <p>{chapter.body}</p>
              {chapter.marks?.length ? (
                <div className={styles.marks}>
                  {chapter.marks.map((mark) => (
                    <span key={mark}>{mark}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
