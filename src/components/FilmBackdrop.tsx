'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './FilmBackdrop.module.css';
import type { MotionAsset } from '@/lib/motion';

/**
 * A Kollective animation running as a section background.
 *
 * Sits behind the content at low opacity with a heavy shade over it, so type
 * stays readable. Like the card covers, it only plays while the section is on
 * screen — a background film that keeps decoding after you scroll past is pure
 * battery cost.
 *
 * Drop inside any element with `position: relative`.
 */
export default function FilmBackdrop({
  animation,
  opacity = 0.18,
}: {
  animation: MotionAsset;
  opacity?: number;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setActive(entry.isIntersecting);
      },
      { rootMargin: '200px 0px', threshold: 0.01 },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => undefined);
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <div className={styles.backdrop} ref={hostRef} aria-hidden="true">
      {active ? (
        <video
          ref={videoRef}
          className={`${styles.video} ${ready ? styles.ready : ''}`}
          style={{ ['--film-opacity' as string]: opacity }}
          poster={animation.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={() => setReady(true)}
          onCanPlay={() => setReady(true)}
        >
          <source src={animation.src} type="video/mp4" />
        </video>
      ) : null}
      <span className={styles.shade} />
    </div>
  );
}
