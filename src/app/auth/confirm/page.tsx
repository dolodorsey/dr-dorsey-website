'use client';

import { CheckCircle2, Loader2, MailWarning } from 'lucide-react';
import { createClient, type EmailOtpType } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import {
  KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
  KOLLECTIVE_SUPABASE_URL,
} from '@/lib/kollective-public';
import styles from './page.module.css';

type ConfirmationState = 'checking' | 'success' | 'error';

const supabase = createClient(
  KOLLECTIVE_SUPABASE_URL,
  KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  },
);

function readableError(message?: string | null) {
  if (!message) return 'This confirmation link could not be completed.';
  const decoded = decodeURIComponent(message.replace(/\+/g, ' '));
  if (/expired|otp_expired|token.*not found|invalid/i.test(decoded)) {
    return 'This confirmation link has expired or was already used. Return to the app and request a new confirmation email.';
  }
  return decoded;
}

export default function ConfirmEmailPage() {
  const [state, setState] = useState<ConfirmationState>('checking');
  const [message, setMessage] = useState('Securing your Kollective account…');

  useEffect(() => {
    let active = true;

    async function confirm() {
      try {
        const url = new URL(window.location.href);
        const hash = new URLSearchParams(url.hash.replace(/^#/, ''));
        const callbackError =
          url.searchParams.get('error_description') ||
          url.searchParams.get('error') ||
          hash.get('error_description') ||
          hash.get('error');

        if (callbackError) throw new Error(readableError(callbackError));

        const tokenHash = url.searchParams.get('token_hash');
        const otpType = url.searchParams.get('type') as EmailOtpType | null;
        const code = url.searchParams.get('code');
        const accessToken = hash.get('access_token');
        const refreshToken = hash.get('refresh_token');

        if (tokenHash && otpType) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: otpType,
          });
          if (error) throw error;
        } else if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;
        } else {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          if (!data.session) {
            throw new Error('No valid confirmation was found. Open the newest email from The Kollective and use its confirmation button once.');
          }
        }

        window.history.replaceState({}, document.title, '/auth/confirm');
        if (!active) return;
        setState('success');
        setMessage('Your email is confirmed. Your Kollective account is ready.');
      } catch (cause) {
        if (!active) return;
        const text = cause instanceof Error ? cause.message : null;
        setState('error');
        setMessage(readableError(text));
      }
    }

    void confirm();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-live="polite">
        <div className={styles.brand}>
          <span>K</span>
          <div>
            <strong>THE KOLLECTIVE</strong>
            <small>ACCOUNT ACCESS</small>
          </div>
        </div>

        <div className={`${styles.icon} ${state === 'error' ? styles.errorIcon : ''}`}>
          {state === 'checking' ? <Loader2 className={styles.spinner} /> : null}
          {state === 'success' ? <CheckCircle2 /> : null}
          {state === 'error' ? <MailWarning /> : null}
        </div>

        <p className={styles.eyebrow}>
          {state === 'checking' ? 'CONFIRMING EMAIL' : state === 'success' ? 'EMAIL CONFIRMED' : 'LINK NEEDS ATTENTION'}
        </p>
        <h1>
          {state === 'checking' ? 'One moment.' : state === 'success' ? 'You are confirmed.' : 'Use a new link.'}
        </h1>
        <p className={styles.message}>{message}</p>

        {state === 'success' ? (
          <a className={styles.primary} href="/app">OPEN THE KOLLECTIVE APP</a>
        ) : null}

        {state === 'error' ? (
          <div className={styles.actions}>
            <a className={styles.primary} href="/app">RETURN TO SIGN IN</a>
            <p>Enter your email in the app and tap <strong>RESEND CONFIRMATION</strong>. Only the newest email link should be used.</p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
