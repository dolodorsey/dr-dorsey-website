"use client";

import { ArrowRight, Copy, Download, LogIn, UserPlus } from "lucide-react";
import { createClient, type Session } from "@supabase/supabase-js";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY, KOLLECTIVE_SUPABASE_URL } from "@/lib/kollective-public";
import styles from "./customer-app-gateway.module.css";

type AuthMode = "signup" | "signin";
type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};
type StandaloneNavigator = Navigator & { standalone?: boolean };

const EMBLEM = "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png";
const DOOR = "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/app/backgrounds/app-background-09.jpg";
const APP_URL = "https://thekollectivehospitality.com/app?install=1";

const supabase = createClient(KOLLECTIVE_SUPABASE_URL, KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

function isStandalone() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches || Boolean((window.navigator as StandaloneNavigator).standalone);
}

function isAppleMobile() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function friendlyAuthError(cause: unknown) {
  const message = cause instanceof Error ? cause.message : "We could not complete that request.";
  if (/database error saving new user|unexpected_failure/i.test(message)) return "Signup is temporarily unavailable. Please try again.";
  if (/user already registered/i.test(message)) return "That email already has an account. Choose SIGN IN instead.";
  return message;
}

export default function CustomerAppGateway({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<InstallPrompt | null>(null);
  const [mode, setMode] = useState<AuthMode>("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const appleMobile = useMemo(isAppleMobile, []);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      if (!active) return;
      setSession(next);
      setReady(true);
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    const check = () => setInstalled(isStandalone());
    const onPrompt = (event: Event) => { event.preventDefault(); setInstallPrompt(event as InstallPrompt); };
    const onInstalled = () => { setInstalled(true); setInstallPrompt(null); };
    check();
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js?v=8", { updateViaCache: "none" }).then((registration) => registration.update()).catch(() => undefined);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function installApp() {
    setError(null);
    setNotice(null);

    if (installPrompt) {
      setBusy(true);
      try {
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (choice.outcome === "accepted") setNotice("Installed. Open Kollective from the new icon to continue.");
        else setError("Installation was dismissed. Tap Download App when you are ready.");
      } finally {
        setInstallPrompt(null);
        setBusy(false);
      }
      return;
    }

    if (appleMobile) {
      try {
        await navigator.clipboard.writeText(APP_URL);
        setNotice("APP LINK COPIED. Tap ••• at the bottom right, choose Open in Safari, then use Safari’s Share button and Add to Home Screen.");
      } catch {
        setNotice("Tap ••• at the bottom right, choose Open in Safari, then use Safari’s Share button and Add to Home Screen.");
      }
      return;
    }

    setNotice("Open your browser menu and choose Install app or Add to Home Screen.");
  }

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "signup") {
        if (fullName.trim().length < 2) throw new Error("Enter your full name.");
        if (password.length < 8) throw new Error("Use at least 8 characters for your password.");
        const { data, error: signupError } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/app`,
            data: { full_name: fullName.trim(), display_name: fullName.trim().split(/\s+/)[0], signup_source: "kollective_customer_app", requested_access: "customer_app" },
          },
        });
        if (signupError) throw signupError;
        if (data.session) setSession(data.session);
        else { setNotice("Account created. Confirm your email, then return and sign in."); setMode("signin"); }
      } else {
        const { data, error: signinError } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
        if (signinError) throw signinError;
        setSession(data.session);
      }
    } catch (cause) {
      setError(friendlyAuthError(cause));
    } finally {
      setBusy(false);
    }
  }

  async function resetPassword() {
    if (!email.trim()) { setError("Enter your email first."); return; }
    setBusy(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo: `${window.location.origin}/app` });
    setBusy(false);
    if (resetError) setError(resetError.message); else setNotice("Password reset email sent.");
  }

  if (!ready) {
    return <main className={styles.gate}><section className={styles.card}><div className={styles.loading}><span className={styles.spinner} />PREPARING THE KOLLECTIVE</div></section></main>;
  }

  if (!installed) {
    return (
      <main className={styles.gate}>
        <section className={`${styles.card} ${styles.installCard}`} role="dialog" aria-modal="true" aria-labelledby="install-title">
          <div className={styles.installVisual} style={{ backgroundImage: `url("${DOOR}")` }}>
            <div className={styles.brand}><img src={EMBLEM} alt="The Kollective emblem" /><span><strong>KOLLECTIVE</strong><small>CUSTOMER APP</small></span></div>
            <span className={styles.visualLabel}>YOUR ACCESS STARTS HERE</span>
          </div>
          <div className={styles.installBody}>
            <div className={styles.progress}><span className={styles.active}>1 · DOWNLOAD</span><span>2 · ACCOUNT</span></div>
            <p>DOWNLOAD THE APP</p>
            <h1 id="install-title">The Kollective belongs on your phone.</h1>
            <span>One icon for RSVPs, reservations, member perks, companies, events and direct access.</span>
            <div className={styles.instructions}>
              <b>{appleMobile ? "IPHONE / IPAD · OPEN IN SAFARI FIRST" : installPrompt ? "READY TO INSTALL" : "MOBILE INSTALL"}</b>
              <span>{appleMobile ? "Links opened from Messages do not include Add to Home Screen. Tap ••• at the bottom right, choose Open in Safari, then tap Safari’s Share button and Add to Home Screen." : installPrompt ? "Tap below and approve the secure browser prompt." : "Tap below for the correct install steps for your browser."}</span>
            </div>
            {error ? <p className={styles.error}>{error}</p> : null}
            {notice ? <p className={styles.notice}>{notice}</p> : null}
            <button className={styles.primary} type="button" onClick={installApp} disabled={busy}>
              {appleMobile ? <Copy /> : <Download />}{busy ? "OPENING…" : installPrompt ? "INSTALL KOLLECTIVE" : appleMobile ? "COPY LINK · OPEN IN SAFARI" : "DOWNLOAD APP"}<ArrowRight />
            </button>
            <button className={styles.secondary} type="button" onClick={() => { const next = isStandalone(); setInstalled(next); if (!next) setNotice(appleMobile ? "Still in a browser. Open the new Kollective home-screen icon after adding it." : "After installing, open Kollective from the new home-screen icon."); }}>I INSTALLED IT — CHECK AGAIN</button>
            <p className={styles.footer}>{appleMobile ? "MESSAGES BROWSER → OPEN IN SAFARI → SHARE → ADD TO HOME SCREEN" : "Install once. Open from your home screen. Create your account next."}</p>
          </div>
        </section>
      </main>
    );
  }

  if (!session) {
    return (
      <main className={styles.gate}>
        <section className={styles.card} aria-labelledby="access-title">
          <div className={styles.brand}><img src={EMBLEM} alt="The Kollective emblem" /><span><strong>KOLLECTIVE</strong><small>CUSTOMER APP</small></span></div>
          <div className={styles.progress}><span className={styles.done}>✓ INSTALLED</span><span className={styles.active}>2 · ACCOUNT</span></div>
          <div className={styles.copy}><p>MEMBER ACCESS REQUIRED</p><h1 id="access-title">Join before you enter.</h1><span>Create your account to access the complete customer experience.</span></div>
          <div className={styles.mode} role="tablist">
            <button type="button" className={mode === "signup" ? styles.selected : undefined} onClick={() => setMode("signup")}>CREATE ACCOUNT</button>
            <button type="button" className={mode === "signin" ? styles.selected : undefined} onClick={() => setMode("signin")}>SIGN IN</button>
          </div>
          <form className={styles.form} onSubmit={submitAuth}>
            {mode === "signup" ? <label className={styles.field}><span>FULL NAME</span><input value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" required /></label> : null}
            <label className={styles.field}><span>EMAIL</span><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required /></label>
            <label className={styles.field}><span>PASSWORD</span><input value={password} onChange={(event) => setPassword(event.target.value)} type="password" minLength={8} autoComplete={mode === "signup" ? "new-password" : "current-password"} required /></label>
            {error ? <p className={styles.error}>{error}</p> : null}{notice ? <p className={styles.notice}>{notice}</p> : null}
            <button className={styles.primary} disabled={busy} type="submit">{mode === "signup" ? <UserPlus /> : <LogIn />}{busy ? "WORKING…" : mode === "signup" ? "CREATE ACCOUNT" : "SIGN IN"}<ArrowRight /></button>
            {mode === "signin" ? <button className={styles.textButton} type="button" onClick={resetPassword}>Forgot password?</button> : null}
          </form>
        </section>
      </main>
    );
  }

  return <>{children}</>;
}