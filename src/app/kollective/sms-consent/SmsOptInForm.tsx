'use client';

import { FormEvent, useState } from 'react';
import styles from './sms-opt-in.module.css';

const CONSENT_TEXT = 'I agree to receive recurring informational and marketing text messages from Kollective Hospitality Texas at the number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out and HELP for help. Consent is not a condition of purchase.';

export default function SmsOptInForm() {
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setBusy(true);
    setNotice('');
    setError('');

    try {
      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: 'inquiry',
          full_name: String(data.get('full_name') || ''),
          email: String(data.get('email') || ''),
          phone: String(data.get('phone') || ''),
          source: 'kollective-app',
          form_data: {
            request_type: 'sms_opt_in',
            sms_consent: true,
            sms_consent_text: CONSENT_TEXT,
            consent_timestamp: new Date().toISOString(),
            consent_page: window.location.href,
          },
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Your consent could not be saved.');

      form.reset();
      setNotice('Your SMS consent has been recorded. Reply STOP to any message to opt out.');
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Your consent could not be saved.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className={styles.optInForm} onSubmit={submit}>
      <div className={styles.formGrid}>
        <label>
          <span>Full name</span>
          <input name="full_name" autoComplete="name" minLength={2} maxLength={120} required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" maxLength={254} required />
        </label>
        <label className={styles.fullField}>
          <span>Mobile number</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} required />
        </label>
      </div>

      <label className={styles.consentRow}>
        <input name="sms_consent" type="checkbox" required />
        <span>
          {CONSENT_TEXT} Review our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.
        </span>
      </label>

      <button type="submit" disabled={busy}>{busy ? 'Saving…' : 'Opt in to SMS'}</button>
      {notice ? <p className={styles.success} role="status">{notice}</p> : null}
      {error ? <p className={styles.error} role="alert">{error}</p> : null}
    </form>
  );
}
