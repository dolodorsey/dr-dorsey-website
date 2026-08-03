"use client";

import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./table-deposit.module.css";

export default function TableDepositPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paid, setPaid] = useState(false);

  useEffect(() => setPaid(new URLSearchParams(window.location.search).get("paid") === "1"), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/customer/table-deposit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form)),
    });
    const result = await response.json();
    if (!response.ok || !result.url) {
      setError(result.error || "Checkout could not be started.");
      setLoading(false);
      return;
    }
    window.location.assign(result.url);
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Link href="/app"><ArrowLeft /> Back to Kollective</Link>
        {paid ? (
          <div className={styles.success}>
            <ShieldCheck />
            <p>DEPOSIT RECEIVED</p>
            <h1>Your table deposit is paid.</h1>
            <span>Stripe has emailed your receipt. Your host can match the payment using your checkout details.</span>
            <Link href="/app">RETURN TO THE APP</Link>
          </div>
        ) : (
          <>
        <CreditCard className={styles.heroIcon} />
        <p>SECURE TABLE PAYMENT</p>
        <h1>Pay your 25% deposit.</h1>
        <span>Enter the table total confirmed by your host. Your deposit is calculated automatically at checkout.</span>
        <form onSubmit={submit}>
          <label>Full name<input name="name" autoComplete="name" required /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
          <label>Instagram handle<input name="instagram" required placeholder="@yourhandle" /></label>
          <label>Event or venue<input name="event" required placeholder="Example: GROWN-ISH at Rose on Piedmont" /></label>
          <label>Confirmed table total<input name="total" type="number" inputMode="decimal" min="100" max="10000" step="0.01" required placeholder="$" /></label>
          <label>Reservation or host name <small>(optional)</small><input name="reference" /></label>
          {error ? <div className={styles.error}>{error}</div> : null}
          <button disabled={loading}>{loading ? "STARTING CHECKOUT…" : "PAY 25% DEPOSIT"}</button>
        </form>
        <div className={styles.secure}><ShieldCheck /> Secure checkout powered by Stripe. The remaining 75% is due under your host’s table terms.</div>
          </>
        )}
      </section>
    </main>
  );
}
