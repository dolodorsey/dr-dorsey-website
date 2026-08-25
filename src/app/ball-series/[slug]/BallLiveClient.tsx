'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './page.module.css';

type Props = {
  slug: string;
  name: string;
  title: string;
  dateIso: string;
  ticketUrl?: string | null;
  trackingUrl?: string | null;
  poster: string;
  statusLabel: string;
};

type Countdown = { days: number; hours: number; minutes: number; seconds: number; passed: boolean };

function getCountdown(dateIso: string): Countdown {
  const distance = new Date(dateIso).getTime() - Date.now();
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance % 86_400_000) / 3_600_000),
    minutes: Math.floor((distance % 3_600_000) / 60_000),
    seconds: Math.floor((distance % 60_000) / 1000),
    passed: false,
  };
}

function withTracking(url: string, params: URLSearchParams) {
  try {
    const next = new URL(url);
    const referral = params.get('ref') || params.get('referral_code');
    const source = params.get('utm_source');
    const medium = params.get('utm_medium');
    const campaign = params.get('utm_campaign');
    if (referral) next.searchParams.set('ref', referral);
    if (source) next.searchParams.set('utm_source', source);
    if (medium) next.searchParams.set('utm_medium', medium);
    if (campaign) next.searchParams.set('utm_campaign', campaign);
    return next.toString();
  } catch {
    return url;
  }
}

export default function BallLiveClient({
  slug,
  name,
  title,
  dateIso,
  ticketUrl,
  trackingUrl,
  poster,
  statusLabel,
}: Props) {
  const [countdown, setCountdown] = useState(() => getCountdown(dateIso));
  const [copied, setCopied] = useState(false);
  const [params, setParams] = useState(() => new URLSearchParams());

  useEffect(() => {
    setParams(new URLSearchParams(window.location.search));
    const timer = window.setInterval(() => setCountdown(getCountdown(dateIso)), 1000);
    return () => window.clearInterval(timer);
  }, [dateIso]);

  const outbound = useMemo(() => {
    const url = trackingUrl || ticketUrl;
    return url ? withTracking(url, params) : null;
  }, [trackingUrl, ticketUrl, params]);

  const shareUrl = typeof window === 'undefined' ? '' : window.location.href;
  const hashtag = `#${slug.replace(/-/g, '')}`;
  const caption = `${title}: ${name}. The Ball Series by The Kollective. Dress up. Show out. Come correct. ${shareUrl} ${hashtag}`;
  const storyAsset = `/api/social/story-card?brand=kollective&eyebrow=${encodeURIComponent('THE BALL SERIES')}&title=${encodeURIComponent(`${title}: ${name}`)}&body=${encodeURIComponent('Dress up. Show out. Come correct.')}&cta=${encodeURIComponent(statusLabel)}&footer=${encodeURIComponent('@thekollectiveent')}&background=${encodeURIComponent(poster)}`;

  const copyCaption = async () => {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: `${title}: ${name}`, text: 'Dress up. Show out. Come correct.', url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <>
      <div className={styles.countdown} aria-label={`Countdown to ${name}`}>
        {countdown.passed ? (
          <strong>THIS CHAPTER HAS ARRIVED.</strong>
        ) : (
          <>
            <div><b>{countdown.days}</b><span>DAYS</span></div>
            <div><b>{String(countdown.hours).padStart(2, '0')}</b><span>HRS</span></div>
            <div><b>{String(countdown.minutes).padStart(2, '0')}</b><span>MIN</span></div>
            <div><b>{String(countdown.seconds).padStart(2, '0')}</b><span>SEC</span></div>
          </>
        )}
      </div>

      <div className={styles.liveActions}>
        {outbound ? <a className={styles.primaryButton} href={outbound}>{statusLabel === 'SOLD OUT' ? 'Sold out' : 'Get tickets ↗'}</a> : null}
        <a className={styles.secondaryButton} href={storyAsset} target="_blank" rel="noreferrer">Open IG story asset ↗</a>
        <button type="button" onClick={copyCaption}>{copied ? 'Copied ✓' : 'Copy IG caption'}</button>
        <button type="button" onClick={share}>Share event ↗</button>
      </div>
      <span className={styles.trackingNote}>Referral and campaign codes in the page URL carry into ticket access.</span>
    </>
  );
}
