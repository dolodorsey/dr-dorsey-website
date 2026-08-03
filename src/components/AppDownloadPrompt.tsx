'use client';

import { useEffect, useState } from 'react';
import styles from './AppDownloadPrompt.module.css';

type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

const DOOR = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/app/backgrounds/app-background-09.jpg';

export default function AppDownloadPrompt() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [apple, setApple] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (window.location.pathname.startsWith('/app')) return;
    setHidden(false);
    setApple(/iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
    const onPrompt = (event: Event) => { event.preventDefault(); setPrompt(event as InstallPrompt); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    const timer = window.setTimeout(() => {
      if (sessionStorage.getItem('kollective-download-prompt') !== 'seen') setOpen(true);
    }, 1100);
    return () => { window.clearTimeout(timer); window.removeEventListener('beforeinstallprompt', onPrompt); };
  }, []);

  async function install() {
    if (prompt) {
      await prompt.prompt();
      await prompt.userChoice;
      setPrompt(null);
      setOpen(false);
      sessionStorage.setItem('kollective-download-prompt', 'seen');
      return;
    }
    window.location.href = '/app?install=1';
  }

  function close() {
    setOpen(false);
    sessionStorage.setItem('kollective-download-prompt', 'seen');
  }

  if (hidden) return null;

  return (
    <>
      <button className={styles.floating} onClick={() => setOpen(true)} type="button">DOWNLOAD APP</button>
      {open ? (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="download-app-title" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <section className={styles.sheet}>
            <button className={styles.close} type="button" onClick={close} aria-label="Close">×</button>
            <div className={styles.visual} style={{ backgroundImage: `url("${DOOR}")` }}><span>YOUR ACCESS STARTS HERE</span></div>
            <div className={styles.copy}>
              <p>THE KOLLECTIVE CUSTOMER APP</p>
              <h2 id="download-app-title">One icon. Direct access.</h2>
              <span>RSVP, reserve, join, shop, and reach the right Kollective team without searching through multiple sites.</span>
              <button type="button" onClick={install}>{prompt ? 'INSTALL KOLLECTIVE NOW' : apple ? 'OPEN iPHONE INSTALL STEPS' : 'DOWNLOAD APP'}</button>
              <small>{apple ? 'On iPhone: Safari → Share → Add to Home Screen.' : 'The browser will open its secure installation prompt when supported.'}</small>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
