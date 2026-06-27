"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { LogIn, LogOut, ShieldCheck } from "lucide-react";

const inputStyle = {
  width: "100%",
  background: "#090b0e",
  color: "#fff",
  border: "1px solid #343840",
  borderRadius: 5,
  padding: "9px 10px",
  font: "inherit",
  fontSize: 12,
} as const;

const buttonStyle = {
  width: "100%",
  border: "1px solid #d7b768",
  background: "#d7b768",
  color: "#111",
  borderRadius: 5,
  padding: "9px 10px",
  font: "inherit",
  fontSize: 12,
  fontWeight: 800,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 7,
  cursor: "pointer",
} as const;

export default function EnterpriseAuthPanel() {
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const [message, setMessage] = useState("Write actions require Ops database access.");

  useEffect(() => {
    fetch("/api/ops-os/config")
      .then((response) => response.json())
      .then(({ url, key, error }) => {
        if (error) throw new Error(error);
        const next = createClient(url, key);
        setClient(next);
        next.auth.getSession().then(({ data }) => {
          const session = data.session;
          setUser(session?.user.email || null);
          if (session?.access_token) localStorage.setItem("khg_ops_token", session.access_token);
        });
        next.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user.email || null);
          if (session?.access_token) {
            localStorage.setItem("khg_ops_token", session.access_token);
            setMessage("Enterprise write actions are enabled.");
          } else {
            localStorage.removeItem("khg_ops_token");
            setMessage("Write actions require Ops database access.");
          }
        });
      })
      .catch((error) => setMessage(error instanceof Error ? error.message : "Database access unavailable."));
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client) return;
    setMessage("Signing in...");
    const { error } = await client.auth.signInWithPassword({ email, password });
    setMessage(error ? error.message : "Enterprise write actions are enabled.");
  }

  async function signOut() {
    await client?.auth.signOut();
    localStorage.removeItem("khg_ops_token");
    setMessage("Signed out. Enterprise write actions are locked.");
  }

  return <div className="ent-sidebar-foot" style={{ gap: 10 }}>
    <span>DATABASE ACCESS</span>
    {user ? <>
      <strong style={{ display: "flex", alignItems: "center", gap: 7 }}><ShieldCheck size={15} /> {user}</strong>
      <button type="button" onClick={signOut} style={{ ...buttonStyle, background: "#202329", borderColor: "#373b43", color: "#fff" }}><LogOut size={15} /> Sign out</button>
    </> : <form onSubmit={signIn} style={{ display: "grid", gap: 8 }}>
      <input aria-label="Enterprise email" type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required style={inputStyle} />
      <input aria-label="Enterprise password" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required style={inputStyle} />
      <button type="submit" disabled={!client} style={{ ...buttonStyle, opacity: client ? 1 : 0.55 }}><LogIn size={15} /> Enable writes</button>
    </form>}
    <p style={{ color: user ? "#9fe5bd" : "#e6c97f", fontSize: 11, lineHeight: 1.45, margin: 0 }}>{message}</p>
  </div>;
}
