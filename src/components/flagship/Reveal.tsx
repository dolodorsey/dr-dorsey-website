'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Stagger in ms. Use index * 90 for lists. */
  delay?: number;
  /** Fraction of the element visible before firing. */
  threshold?: number;
  as?: ElementType;
  className?: string;
};

/**
 * IntersectionObserver scroll reveal. Fires once, then unobserves.
 * No animation library, no layout shift, honours prefers-reduced-motion
 * via the CSS in flagship.css.
 */
export default function Reveal({
  children,
  delay = 0,
  threshold = 0.18,
  as: Tag = 'div',
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      node.setAttribute('data-reveal', 'in');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-reveal', 'in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
