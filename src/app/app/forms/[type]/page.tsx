"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import styles from "../../table-deposit/table-deposit.module.css";

const FORM_CONFIG = {
  rsvp: { title: "Join the free RSVP list.", formType: "rsvp", kind: "event" },
  ticket: { title: "Request event tickets.", formType: "ticket", kind: "event" },
  table: { title: "Reserve your table.", formType: "table_reservation", kind: "table" },
  birthday: { title: "Book your birthday.", formType: "table_reservation", kind: "event" },
  vendor: { title: "Apply as a vendor.", formType: "vendor", kind: "vendor" },
  hiring: { title: "Join the Kollective team.", formType: "hiring_inquiry", kind: "hiring" },
  volunteer: { title: "Volunteer with the Kollective.", formType: "volunteer", kind: "volunteer" },
  partnership: { title: "Build a partnership.", formType: "sponsor", kind: "partnership" },
  inquiry: { title: "Tell us what you need.", formType: "inquiry", kind: "inquiry" },
} as const;

type FormKey = keyof typeof FORM_CONFIG;
type QueryState = { event: string; venue: string; date: string; package: string };

export default function AppForm({ params }: { params: { type: string } }) {
  const type = params.type as FormKey;
  const config = FORM_CONFIG[type];
  const [query, setQuery] = useState<QueryState>({ event: "", venue: "", date: "", package: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    setQuery({
      event: search.get("event") || "",
      venue: search.get("venue") || "",
      date: search.get("date") || "",
      package: search.get("package") || "",
    });
  }, []);

  if (!config) return null;

  const eventRequest = ["event", "table", "vendor"].includes(config.kind);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const table = config.kind === "table";

    if (table && !data.package && !data.total) {
      setStatus("Choose a table package or enter the confirmed table total.");
      setLoading(false);
      return;
    }

    const response = await fetch(table ? "/api/customer/table-deposit" : "/api/forms/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(
        table
          ? data
          : {
              form_type: config.formType,
              full_name: String(data.name || ""),
              email: String(data.email || ""),
              phone: String(data.phone || ""),
              form_data: data,
              source: "kollective-app",
            },
      ),
    });
    const output = await response.json();
    if (response.ok && output.url) {
      location.assign(output.url);
      return;
    }
    setStatus(
      response.ok
        ? "Received. The Kollective team will follow up using the details you provided."
        : output.error || "We could not submit this yet.",
    );
    setLoading(false);
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Link href="/app">← Back to Kollective</Link>
        <p>DIRECT ACCESS · IN-APP REQUEST</p>
        <h1>{config.title}</h1>
        <span>Complete every field you can so the team can confirm faster.</span>

        <form key={`${query.event}-${query.venue}-${query.date}`} onSubmit={submit}>
          <input type="hidden" name="request_type" value={type} />
          <input type="hidden" name="selected_venue" value={query.venue} />

          <label>Full name<input name="name" autoComplete="name" required /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>

          {eventRequest ? <label>Instagram handle<input name="instagram" required={config.kind === "table"} placeholder="@yourhandle" /></label> : null}

          {eventRequest ? (
            <>
              <label className={styles.full}>Event<input name="event" defaultValue={query.event || query.venue} required /></label>
              <label>Venue<input name="venue" defaultValue={query.venue} /></label>
              <label>Requested date<input name="date" type="date" defaultValue={query.date} required /></label>
              <label>Arrival time<input name="arrival_time" type="time" /></label>
              <label>Number of guests<input name="guest_count" type="number" min="1" max="1000" required /></label>
            </>
          ) : null}

          {type === "ticket" ? (
            <>
              <label>Ticket quantity<input name="ticket_quantity" type="number" min="1" max="100" required /></label>
              <label>Admission type<select name="admission_type" required><option value="">Choose one</option><option>General admission</option><option>VIP</option><option>Group tickets</option><option>Need guidance</option></select></label>
            </>
          ) : null}

          {config.kind === "table" ? (
            <>
              <label className={styles.full}>Table package<select name="package" value={query.package} onChange={(event) => setQuery({ ...query, package: event.target.value })}><option value="">Choose a package or use confirmed total</option>{[575, 800, 1250, 1500, 1600, 1800, 2500].map((value) => <option key={`opium-${value}`} value={`opium-${value}`}>Opium · ${value.toLocaleString()}</option>)}{[1000, 1250, 1500, 1800, 2100].map((value) => <option key={`revel-${value}`} value={`revel-${value}`}>Revel · ${value.toLocaleString()}</option>)}</select></label>
              <label>Confirmed table total<input name="total" type="number" min="100" max="10000" step="1" placeholder="For Rose or custom tables" /></label>
              <label>Host or promoter<input name="reference" /></label>
            </>
          ) : null}

          {type === "birthday" ? (
            <>
              <label>Birthday person<input name="birthday_person" required /></label>
              <label>Actual birthday<input name="birthday_date" type="date" required /></label>
            </>
          ) : null}

          {config.kind === "vendor" ? (
            <>
              <label>Business name<input name="business_name" required /></label>
              <label>Vendor category<select name="vendor_category" required><option value="">Choose one</option><option>Food + beverage</option><option>Retail</option><option>Beauty + wellness</option><option>Art + culture</option><option>Production + services</option><option>Other</option></select></label>
              <label className={styles.full}>Website or social link<input name="website" type="url" placeholder="https://" /></label>
            </>
          ) : null}

          {config.kind === "hiring" ? (
            <>
              <label>Role or department<input name="role_interest" required /></label>
              <label>Availability<select name="availability" required><option value="">Choose one</option><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option><option>Event-based</option></select></label>
              <label className={styles.full}>Résumé or portfolio link<input name="resume_url" type="url" placeholder="https://" /></label>
            </>
          ) : null}

          {config.kind === "volunteer" ? (
            <>
              <label>Area of interest<input name="volunteer_interest" required /></label>
              <label>Availability<input name="availability" required placeholder="Days, evenings, or event dates" /></label>
            </>
          ) : null}

          {config.kind === "partnership" ? (
            <>
              <label>Organization<input name="organization" required /></label>
              <label>Partnership type<select name="partnership_type" required><option value="">Choose one</option><option>Sponsorship</option><option>Brand activation</option><option>Collaboration</option><option>Community partnership</option><option>Venue partnership</option><option>Other</option></select></label>
              <label className={styles.full}>Website<input name="website" type="url" placeholder="https://" /></label>
            </>
          ) : null}

          {config.kind === "inquiry" ? <label className={styles.full}>What do you need?<input name="topic" required /></label> : null}

          <label className={styles.full}>Details and special requests<textarea name="notes" rows={5} required /></label>
          {status ? <div className={styles.error}>{status}</div> : null}
          <button disabled={loading}>{loading ? "SUBMITTING…" : config.kind === "table" ? "CONTINUE TO SECURE DEPOSIT" : "SUBMIT REQUEST"}</button>
        </form>
      </section>
    </main>
  );
}
