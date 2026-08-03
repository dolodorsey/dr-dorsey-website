"use client";

import { ArrowRight, Download, LogIn, ShieldCheck, UserPlus } from "lucide-react";
import { createClient, type Session } from "@supabase/supabase-js";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
  KOLLECTIVE_SUPABASE_URL,
} from "@/lib/kollective-public";
import styles from "./customer-app-gateway.module.css";

type AuthMode = "signup" | "signin";
type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform?: string }>;
};
type StandaloneNavigator = Navigator & { standalone?: boolean };

const EMBLEM =
  "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png";

const supabase = createClient(
  KOLLECTIVE_SUPABASE_URL,
  KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    Boolean((window.navigator as StandaloneNavigator).standalone)
  );
}

function isAppleMobile() {
  if (typeof navigator === "undefined") return false;
  return (
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function isMacSafari() {
  if (typeof navigator === "undefined") return false;
  return (
    /Macintosh/i.test(navigator.userAgent) &&
    /Safari/i.test(navigator.userAgent) &&
    !/Chrome|CriOS|Edg/i.test(navigator.userAgent)
  );
}

function friendlyAuthError(cause: unknown) {
  const message = cause instanceof Error ? cause.message : "We could not complete that request.";
  if (/database error saving new user|unexpected_failure/i.test(message)) {
    return "Signup was temporarily unavailable. It has been repaired—please try again.";
  }
  if (/user already registered/i.test(message)) {
    return "That email already has an account. Choose SIGN IN instead.";
  }
  return message;
}

export default function CustomerAppGateway({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [installed, setInstalled] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<InstallPrompt | null>(null);
  const [installChecked, setInstallChecked] = useState(false);

  const appleMobile = useMemo(isAppleMobile, []);
  const macSafari = useMemo(isMacSafari, []);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      if (sessionError) setError(sessionError.message);
      setSession(data.session);
      setAuthReady(true);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setAuthReady(true);
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const updateInstalled = () => {
      setInstalled(isStandalone());
      setInstallChecked(true);
    };
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPrompt);
      setInstallChecked(true);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
      setInstallChecked(true);
    };

    updateInstalled();
    const media = window.matchMedia("(display-mode: standalone)");
    media.addEventListener?.("change", updateInstalled);
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js?v=6", { updateViaCache: "none" })
        .then((registration) => registration.update())
        .catch(() => undefined);
    }

    const timer = window.setTimeout(() => setInstallChecked(true), 900);
    return () => {
      window.clearTimeout(timer);
      media.removeEventListener?.("change", updateInstalled);
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

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
            data: {
              full_name: fullName.trim(),
              display_name: fullName.trim().split(/\s+/)[0],
              signup_source: "kollective_customer_app",
              requested_access: "customer_app",
            },
          },
        });
        if (signupError) throw signupError;

        if (data.session) {
          setSession(data.session);
          setNotice("Account created. Opening The Kollective.");
        } else {
          setNotice("Account created. Check your email to confirm it, then return here and sign in.");
          setMode("signin");
        }
      } else {
        const { data, error: signinError } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });
        if (signinError) throw signinError;
        setSession(data.session);
        setNotice("Signed in. Opening The Kollective.");
      }
    } catch (cause) {
      setError(friendlyAuthError(cause));
    } finally {
      setBusy(false);
    }
  }

  async function resetPassword() {
    if (!email.trim()) {
      setError("Enter your email first, then request the reset link.");
      return;
    }
    setBusy(true);
    setError(null);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo: `${window.location.origin}/app` },
    );
    setBusy(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setNotice("Password reset email sent.");
  }

  async function installApp() {
    setError(null);
    setNotice(null);

    if (!installPrompt) {
      setInstalled(isStandalone());
      if (!isStandalone()) {
        setNotice(
          appleMobile
            ? "Tap Share in Safari, choose Add to Home Screen, tap Add, then open the new Kollective icon."
            : macSafari
              ? "Choose File → Add to Dock, then open Kollective from the Dock or Applications."
              : "Open the browser menu, choose Install app or Add to Home Screen, then launch the Kollective icon.",
        );
      }
      return;
    }

    setBusy(true);
    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setInstalled(true);
        setNotice("Kollective installed. Create your account to continue.");
      } else {
        setError("Installation is required before signup opens.");
      }
      setInstallPrompt(null);
    } catch {
      setError("Use the browser install control to add Kollective to your home screen.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    setMode("signin");
  }

  if (!authReady || !installChecked) {
    return (
      <main className={styles.gate}>
        <section className={styles.card}>
          <div className={styles.loading}>
            <span className={styles.spinner} />
            PREPARING THE KOLLECTIVE
          </div>
        </section>
      </main>
    );
  }

  if (!installed) {
    return (
      <main
        className={styles.gate}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          padding: 12,
          placeItems: "center",
          overflowY: "auto",
          background: "rgba(0, 0, 0, .82)",
          backdropFilter: "blur(16px)",
        }}
      >
        <section
          className={styles.card}
          role="dialog"
          aria-modal="true"
          aria-labelledby="kollective-install-title"
          style={{
            width: "min(100%, 470px)",
            minHeight: "auto",
            maxHeight: "calc(100svh - 24px)",
            overflowY: "auto",
            border: "1px solid rgba(216, 176, 76, .42)",
            borderRadius: 28,
            padding: 24,
          }}
        >
          <div className={styles.brand}>
            <img src={EMBLEM} alt="The Kollective emblem" />
            <span><strong>KOLLECTIVE</strong><small>CUSTOMER APP</small></span>
          </div>
          <div className={styles.progress} aria-label="Access progress">
            <span className={styles.active}>1 · DOWNLOAD</span>
            <span>2 · ACCOUNT</span>
          </div>
          <div className={styles.installBody}>
            <div className={styles.installIcon}><Download aria-hidden="true" /></div>
            <p>DOWNLOAD REQUIRED</p>
            <h1 id="kollective-install-title">Add Kollective to your home screen.</h1>
            <span>This popup appears as soon as you arrive. Install the customer app first, then create your account to enter.</span>
            {appleMobile ? (
              <ol className={styles.steps}>
                <li>Tap the Share button in Safari.</li>
                <li>Choose <strong>Add to Home Screen</strong>.</li>
                <li>Tap Add, then open the new Kollective icon.</li>
              </ol>
            ) : macSafari ? (
              <ol className={styles.steps}>
                <li>Open Safari’s File menu.</li>
                <li>Choose <strong>Add to Dock</strong>.</li>
                <li>Launch Kollective from the Dock or Applications.</li>
              </ol>
            ) : installPrompt ? (
              <ol className={styles.steps}>
                <li>Tap the download button below.</li>
                <li>Approve the browser installation prompt.</li>
                <li>Create your Kollective account on the next screen.</li>
              </ol>
            ) : (
              <ol className={styles.steps}>
                <li>Open your browser menu.</li>
                <li>Choose <strong>Install app</strong> or <strong>Add to Home Screen</strong>.</li>
                <li>Launch the new Kollective icon and create your account.</li>
              </ol>
            )}
            {error ? <p className={styles.error} role="alert">{error}</p> : null}
            {notice ? <p className={styles.notice} role="status">{notice}</p> : null}
            <button className={styles.primary} type="button" onClick={installApp} disabled={busy}>
              {installPrompt ? <Download /> : <ShieldCheck />}
              {busy
                ? "DOWNLOADING…"
                : installPrompt
                  ? "DOWNLOAD KOLLECTIVE APP"
                  : appleMobile
                    ? "SHOW ADD TO HOME SCREEN"
                    : "CHECK INSTALLATION"}
              {!busy ? <ArrowRight /> : null}
            </button>
            {!installPrompt ? (
              <button
                className={styles.secondary}
                type="button"
                onClick={() => {
                  const ready = isStandalone();
                  setInstalled(ready);
                  if (!ready) setNotice("After adding it, open Kollective from the new icon—not this browser tab.");
                }}
              >
                I ADDED IT — CHECK AGAIN
              </button>
            ) : null}
            {session ? (
              <p className={styles.account}>Signed in as {session.user.email}. <button type="button" onClick={signOut}>Use another account</button></p>
            ) : (
              <p className={styles.account}>The signup screen opens after installation.</p>
            )}
          </div>
          <p className={styles.footer}>INSTALL FIRST. ACCOUNT SIGNUP OPENS NEXT. THERE IS NO WEB-ONLY BYPASS.</p>
        </section>
      </main>
    );
  }

  if (!session) {
    return (
      <main className={styles.gate}>
        <section className={styles.card} aria-labelledby="kollective-access-title">
          <div className={styles.brand}>
            <img src={EMBLEM} alt="The Kollective emblem" />
            <span><strong>KOLLECTIVE</strong><small>CUSTOMER APP</small></span>
          </div>
          <div className={styles.progress} aria-label="Access progress">
            <span className={styles.done}>✓ INSTALLED</span>
            <span className={styles.active}>2 · ACCOUNT</span>
          </div>
          <div className={styles.copy}>
            <p>MEMBER ACCESS REQUIRED</p>
            <h1 id="kollective-access-title">Join before you enter.</h1>
            <span>Create your customer account to access Grown-Ish, reservations, member perks, brands, and direct Kollective contacts.</span>
          </div>
          <div className={styles.mode} role="tablist" aria-label="Account action">
            <button
              type="button"
              className={mode === "signup" ? styles.selected : undefined}
              onClick={() => { setMode("signup"); setError(null); setNotice(null); }}
              role="tab"
              aria-selected={mode === "signup"}
            >
              CREATE ACCOUNT
            </button>
            <button
              type="button"
              className={mode === "signin" ? styles.selected : undefined}
              onClick={() => { setMode("signin"); setError(null); setNotice(null); }}
              role="tab"
              aria-selected={mode === "signin"}
            >
              SIGN IN
            </button>
          </div>
          <form className={styles.form} onSubmit={submitAuth}>
            {mode === "signup" ? (
              <label className={styles.field}>
                <span>FULL NAME</span>
                <input value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" required placeholder="Your name" />
              </label>
            ) : null}
            <label className={styles.field}>
              <span>EMAIL</span>
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" inputMode="email" autoCapitalize="none" autoComplete="email" required placeholder="you@email.com" />
            </label>
            <label className={styles.field}>
              <span>PASSWORD</span>
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={8} required placeholder="8+ characters" />
            </label>
            {error ? <p className={styles.error} role="alert">{error}</p> : null}
            {notice ? <p className={styles.notice} role="status">{notice}</p> : null}
            <button className={styles.primary} disabled={busy} type="submit">
              {mode === "signup" ? <UserPlus /> : <LogIn />}
              {busy ? "WORKING…" : mode === "signup" ? "CREATE ACCOUNT" : "SIGN IN"}
              {!busy ? <ArrowRight /> : null}
            </button>
            {mode === "signin" ? (
              <button type="button" className={styles.textButton} onClick={resetPassword} disabled={busy}>
                Forgot password?
              </button>
            ) : null}
          </form>
          <p className={styles.footer}>ACCOUNT ACCESS IS REQUIRED. YOUR SESSION STAYS PRIVATE TO THE KOLLECTIVE APP.</p>
        </section>
      </main>
    );
  }

  return <>{children}</>;
}
