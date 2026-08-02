'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './MotionCover.module.css';
import { motionFor, type MotionAsset } from '@/lib/motion';

type Props = {
  /** Company / entity name. Used to look up an animation automatically. */
  name?: string;
  /** Explicit animation. Wins over the name lookup. */
  animation?: MotionAsset;
  /** Static cover used when no animation exists for this company. */
  image?: string;
  alt?: string;
  /**
   * Crop the animation to fill instead of containing it. Only use for
   * full-bleed hero bands where the source is known to be landscape.
   */
  fill?: boolean;
  /** Adds the standard bottom-to-top scrim used by the card grids. */
  veil?: boolean;
  /** Letterbox the static fallback too — for logo art on transparent backgrounds. */
  containStill?: boolean;
  /** Called when the static cover fails to load, so the caller can fall back. */
  onImageError?: () => void;
  className?: string;
};

/**
 * An autoplaying, muted, looping cover.
 *
 * Videos are only attached to the DOM once the card approaches the viewport,
 * and they pause the moment it leaves. Without this a 20-card grid decodes
 * twenty simultaneous video streams and the page stalls on mid-range devices.
 */
export default function MotionCover({
  name,
  animation,
  image,
  alt = '',
  fill = false,
  veil = false,
  containStill = false,
  onImageError,
  className,
}: Props) {
  const asset = animation ?? motionFor(name);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!asset || !host) return;

    if (typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setActive(entry.isIntersecting);
      },
      { rootMargin: '300px 0px', threshold: 0.01 },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [asset]);

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

  const classes = [styles.cover, fill ? styles.fill : '', className].filter(Boolean).join(' ');

  if (!asset) {
    return (
      <div className={classes} ref={hostRef}>
        {image ? (
          <img
            className={`${styles.still} ${containStill ? styles.stillContain : ''}`}
            src={image}
            alt={alt}
            loading="lazy"
            onError={onImageError}
          />
        ) : null}
        {veil ? <span className={styles.veil} /> : null}
      </div>
    );
  }

  return (
    <div className={classes} ref={hostRef}>
      <img className={styles.backdrop} src={asset.poster} alt="" aria-hidden="true" loading="lazy" />
      {/* Still base layer. Guarantees the card is never blank while the
          animation is fetching, and carries the alt text for screen readers. */}
      <img className={`${styles.media} ${styles.ready}`} src={asset.poster} alt={alt} loading="lazy" />
      {active ? (
        <video
          ref={videoRef}
          className={`${styles.media} ${ready ? styles.ready : ''}`}
          poster={asset.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onLoadedData={() => setReady(true)}
          onCanPlay={() => setReady(true)}
        >
          <source src={asset.src} type="video/mp4" />
        </video>
      ) : null}
      {veil ? <span className={styles.veil} /> : null}
    </div>
  );
}
