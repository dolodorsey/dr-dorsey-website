"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { BarChart3, Bot, CalendarDays, CheckSquare, Clapperboard, DollarSign, Home, LogIn, LogOut, Megaphone, Menu, Share2, X } from "lucide-react";

const links = [
  ["/ops-os", "Command Center", Home],
  ["/ops-os/social", "Social Media", Share2],
  ["/ops-os/marketing", "Marketing", Megaphone],
  ["/ops-os/approvals", "Approvals", CheckSquare],
  ["/ops-os/content-studio", "Content Studio", Clapperboard],
  ["/ops-os/events", "Events", CalendarDays],
  ["/ops-os/revenue", "Revenue", DollarSign],
  ["/ops-os/tasks", "Tasks", BarChart3],
  ["/ops-os/codex", "Codex Sprint", Bot],
] as const;

export default function OpsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/ops-os/config").then((r) => r.json()).then(({ url, key, error }) => {
      if (error) throw new Error(error);
      const next = createClient(url, key);
      setClient(next);
      next.auth.getSession().then(({ data }) => setUser(data.session?.user.email || null));
      next.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user.email || null);
        if (session?.access_token) localStorage.setItem("khg_ops_token", session.access_token);
        else localStorage.removeItem("khg_ops_token");
      });
    }).catch((error) => setMessage(error.message));
  }, []);

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    if (!client) return;
    setMessage("Signing in...");
    const { error } = await client.auth.signInWithPassword({ email, password });
    setMessage(error ? error.message : "Signed in. Database actions are enabled.");
  }

  async function signOut() {
    await client?.auth.signOut();
    setMessage("Signed out.");
  }

  return (
    <div className="ops-app">
      <button className="ops-mobile-menu" aria-label="Open navigation" onClick={() => setOpen(true)}><Menu size={20} /></button>
      <aside className={`ops-sidebar ${open ? "is-open" : ""}`}>
        <div className="ops-brand"><span>KHG</span><strong>OPS OS</strong><button aria-label="Close navigation" onClick={() => setOpen(false)}><X size={18} /></button></div>
        <div className="ops-nav-label">OPS OS</div>
        <nav>{links.map(([href, label, Icon]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={pathname === href ? "active" : ""}><Icon size={18} /><span>{label}</span></Link>)}</nav>
        <div className="ops-auth">
          <div className="ops-nav-label">DATABASE ACCESS</div>
          {user ? <><div className="ops-user">{user}</div><button className="ops-button secondary" onClick={signOut}><LogOut size={16} /> Sign out</button></> :
          <form onSubmit={signIn}><input aria-label="Email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><input aria-label="Password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><button className="ops-button" type="submit" disabled={!client}><LogIn size={16} /> Sign in</button></form>}
          {message && <p className="ops-auth-message">{message}</p>}
        </div>
      </aside>
      {open && <button className="ops-scrim" aria-label="Close navigation" onClick={() => setOpen(false)} />}
      <main className="ops-main">{children}</main>
    </div>
  );
}
