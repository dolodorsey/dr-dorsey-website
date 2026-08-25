'use client';

import { FormEvent, useMemo, useState } from 'react';
import styles from './page.module.css';

type Props = {
  pageUrl: string;
};

type Mode = 'group_pricing' | 'table_reservation' | 'ambassador_application';

const MODE_COPY: Record<Mode, { eyebrow: string; title: string; body: string; submit: string }> = {
  group_pricing: {
    eyebrow: 'GREEK ORGANIZATIONS · GROUPS',
    title: 'BRING YOUR PEOPLE.',
    body: 'Fraternities, sororities, alumni chapters, campus organizations and large groups can request coordinated access and group pricing.',
    submit: 'Request group access ↗',
  },
  table_reservation: {
    eyebrow: 'VIP SECTIONS · HOSTING',
    title: 'OWN YOUR SECTION.',
    body: 'Submit your party size and hosting details for section placement and bottle-service coordination.',
    submit: 'Request a section ↗',
  },
  ambassador_application: {
    eyebrow: 'AMBASSADOR PROGRAM',
    title: 'MOVE THE ROOM.',
    body: 'Apply for a tracked referral code to promote Greek Ball to your organization, alumni network, campus or audience.',
    submit: 'Apply as ambassador ↗',
  },
};

export default function GreekBallConversion({ pageUrl }: Props) {
  const [mode, setMode] = useState<Mode>('group_pricing');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [refCode, setRefCode] = useState('');
  const copy = MODE_COPY[mode];

  const referralLink = useMemo(() => {
    const code = refCode.trim().replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);
    if (!code) return `${pageUrl}?ref=YOURCODE&utm_source=ambassador&utm_medium=referral&utm_campaign=greek-ball-2026`;
    return `${pageUrl}?ref=${encodeURIComponent(code)}&utm_source=ambassador&utm_medium=referral&utm_campaign=greek-ball-2026`;
  }, [pageUrl, refCode]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setMessage('');
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get('full_name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const organization = String(form.get('organization') || '').trim();
    const partySize = String(form.get('party_size') || '').trim();
    const referral = String(form.get('referral_code') || '').trim();
    const notes = String(form.get('notes') || '').trim();

    try {
      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: mode,
          full_name: fullName,
          email,
          phone,
          source: 'kollective-app',
          form_data: {
            event_slug: 'greek-ball',
            event_name: 'Beauty & The Beast: Greek Ball',
            organization,
            party_size: partySize ? Number(partySize) : null,
            referral_code: referral || null,
            notes,
            source_url: window.location.href,
            utm_source: new URLSearchParams(window.location.search).get('utm_source'),
            utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
            utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
          },
        }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error || 'Unable to submit request.');
      setStatus('success');
      setMessage('Received. The Ball Series team has your request.');
      event.currentTarget.reset();
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to submit request.');
    }
  };

  const copyReferral = async () => {
    await navigator.clipboard.writeText(referralLink);
    setMessage('Referral link copied.');
    setStatus('success');
  };

  return (
    <section className={styles.greekSales} id="greek-sales">
      <header>
        <p>GREEK BALL SALES DESK</p>
        <h2>GROUPS. TABLES.<br /><em>AMBASSADORS.</em></h2>
        <span>Choose the move. Every request is tagged to Greek Ball so follow-up stays inside the correct event pipeline.</span>
      </header>

      <nav className={styles.salesTabs} aria-label="Greek Ball sales options">
        <button type="button" className={mode === 'group_pricing' ? styles.activeTab : ''} onClick={() => setMode('group_pricing')}>Organization / Group</button>
        <button type="button" className={mode === 'table_reservation' ? styles.activeTab : ''} onClick={() => setMode('table_reservation')}>VIP Section</button>
        <button type="button" className={mode === 'ambassador_application' ? styles.activeTab : ''} onClick={() => setMode('ambassador_application')}>Ambassador</button>
      </nav>

      <div className={styles.salesGrid}>
        <div className={styles.salesPitch}>
          <small>{copy.eyebrow}</small>
          <h3>{copy.title}</h3>
          <p>{copy.body}</p>

          {mode === 'ambassador_application' ? (
            <div className={styles.referralBuilder}>
              <label htmlFor="ref-code">Preview your referral link</label>
              <input id="ref-code" value={refCode} onChange={(event) => setRefCode(event.target.value)} placeholder="YOURCODE" />
              <code>{referralLink}</code>
              <button type="button" onClick={copyReferral}>Copy referral link</button>
            </div>
          ) : null}
        </div>

        <form className={styles.salesForm} onSubmit={submit}>
          <label>Full name<input required name="full_name" autoComplete="name" /></label>
          <label>Email<input required type="email" name="email" autoComplete="email" /></label>
          <label>Phone<input name="phone" autoComplete="tel" /></label>
          <label>Organization / Chapter<input name="organization" placeholder="Organization, fraternity, sorority, alumni chapter…" /></label>
          <label>Party size<input name="party_size" type="number" min="1" max="500" placeholder="8" /></label>
          <label>Referral code<input name="referral_code" placeholder="Optional" /></label>
          <label>Notes<textarea name="notes" rows={4} placeholder="Tell us what you need." /></label>
          <button className={styles.primaryButton} disabled={status === 'sending'} type="submit">{status === 'sending' ? 'Sending…' : copy.submit}</button>
          {message ? <p className={status === 'error' ? styles.formError : styles.formSuccess}>{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
