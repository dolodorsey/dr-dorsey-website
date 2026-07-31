"use client";

/**
 * App Access Control.
 *
 * Governs who can use the Kollective mobile apps and what they can do inside
 * them. Every change here takes effect on the user's next app launch or resume
 * — no rebuild, no App Store review.
 *
 * Runs entirely on the signed-in admin's own session against the anon key.
 * Row level security does the enforcing: `app_user_access` is writable only by
 * holders of `is_khg_admin()`, and every change is written to the append-only
 * `enterprise_audit_logs`.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useMemo, useState } from "react";

type AccessRow = {
  user_id: string;
  role_key: string;
  status: string;
  app_scope: string[];
  grant_extra: string[];
  deny_extra: string[];
  expires_at: string | null;
  notes: string | null;
  updated_at: string;
};

type Role = { key: string; label: string; access_level: number };
type Permission = { key: string; label: string; category: string; is_high_risk: boolean };
type Flag = { key: string; label: string; enabled: boolean; min_access_level: number; rollout_percentage: number };
type RemoteConfig = {
  app_scope: string;
  minimum_version: string;
  latest_version: string;
  force_update: boolean;
  maintenance_mode: boolean;
  maintenance_message: string | null;
};

const STATUSES = ["active", "suspended", "pending", "revoked"] as const;

export default function AccessControl() {
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [rows, setRows] = useState<AccessRow[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [flags, setFlags] = useState<Flag[]>([]);
  const [config, setConfig] = useState<RemoteConfig[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/ops-os/config")
      .then((r) => r.json())
      .then(({ url, key, error }) => {
        if (error) throw new Error(error);
        const next = createClient(url, key);
        setClient(next);
        return next.auth.getSession();
      })
      .then((session) => setSignedIn(Boolean(session?.data.session)))
      .catch((e) => setMessage(e instanceof Error ? e.message : "Configuration unavailable"));
  }, []);

  const load = useCallback(async () => {
    if (!client) return;
    setBusy(true);
    const [a, r, p, f, c] = await Promise.all([
      client.from("app_user_access").select("*").order("updated_at", { ascending: false }),
      client.from("app_roles").select("key, label, access_level").order("access_level", { ascending: false }),
      client.from("app_permissions").select("key, label, category, is_high_risk").order("category"),
      client.from("app_feature_flags").select("key, label, enabled, min_access_level, rollout_percentage").order("key"),
      client.from("app_remote_config").select("*").order("app_scope"),
    ]);
    setBusy(false);

    if (a.error) {
      setMessage(
        a.error.message.includes("permission")
          ? "Your account is not an admin on this project."
          : a.error.message,
      );
      return;
    }
    setRows(a.data ?? []);
    setRoles(r.data ?? []);
    setPermissions(p.data ?? []);
    setFlags(f.data ?? []);
    setConfig(c.data ?? []);
    setMessage("");
  }, [client]);

  useEffect(() => {
    if (client && signedIn) void load();
  }, [client, signedIn, load]);

  const patch = useCallback(
    async (userId: string, changes: Partial<AccessRow>) => {
      if (!client) return;
      setBusy(true);
      const { error } = await client
        .from("app_user_access")
        .update({ ...changes, updated_at: new Date().toISOString() })
        .eq("user_id", userId);
      setBusy(false);
      setMessage(error ? error.message : "Saved. Takes effect on their next app launch.");
      if (!error) void load();
    },
    [client, load],
  );

  const setFlag = useCallback(
    async (key: string, changes: Partial<Flag>) => {
      if (!client) return;
      setBusy(true);
      const { error } = await client
        .from("app_feature_flags")
        .update({ ...changes, updated_at: new Date().toISOString() })
        .eq("key", key);
      setBusy(false);
      setMessage(error ? error.message : "Flag updated.");
      if (!error) void load();
    },
    [client, load],
  );

  const setRemote = useCallback(
    async (scope: string, changes: Partial<RemoteConfig>) => {
      if (!client) return;
      setBusy(true);
      const { error } = await client
        .from("app_remote_config")
        .update({ ...changes, updated_at: new Date().toISOString() })
        .eq("app_scope", scope);
      setBusy(false);
      setMessage(error ? error.message : "Config updated.");
      if (!error) void load();
    },
    [client, load],
  );

  const byCategory = useMemo(() => {
    const map = new Map<string, Permission[]>();
    for (const p of permissions) {
      map.set(p.category, [...(map.get(p.category) ?? []), p]);
    }
    return [...map.entries()];
  }, [permissions]);

  if (!signedIn) {
    return (
      <section style={{ padding: 24 }}>
        <h1>App Access Control</h1>
        <p>Sign in from the Ops OS header to manage app access.</p>
      </section>
    );
  }

  return (
    <section style={{ padding: 24, display: "grid", gap: 32 }}>
      <header>
        <h1 style={{ margin: 0 }}>App Access Control</h1>
        <p style={{ opacity: 0.75, marginTop: 6 }}>
          Changes take effect on the user&rsquo;s next app launch or resume. No rebuild, no App Store review.
        </p>
        {message ? <p style={{ color: "#D8B04C" }}>{message}</p> : null}
      </header>

      <div>
        <h2>People</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #333" }}>
              <th style={{ padding: 8 }}>User</th>
              <th style={{ padding: 8 }}>Role</th>
              <th style={{ padding: 8 }}>Status</th>
              <th style={{ padding: 8 }}>Expires</th>
              <th style={{ padding: 8 }}>Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.user_id} style={{ borderBottom: "1px solid #222" }}>
                <td style={{ padding: 8, fontFamily: "monospace", fontSize: 12 }}>{row.user_id}</td>
                <td style={{ padding: 8 }}>
                  <select
                    value={row.role_key}
                    disabled={busy}
                    onChange={(e) => void patch(row.user_id, { role_key: e.target.value })}
                  >
                    {roles.map((r) => (
                      <option key={r.key} value={r.key}>
                        {r.label} ({r.access_level})
                      </option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: 8 }}>
                  <select
                    value={row.status}
                    disabled={busy}
                    onChange={(e) => void patch(row.user_id, { status: e.target.value })}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: 8 }}>
                  <input
                    type="date"
                    disabled={busy}
                    defaultValue={row.expires_at ? row.expires_at.slice(0, 10) : ""}
                    onBlur={(e) =>
                      void patch(row.user_id, {
                        expires_at: e.target.value ? new Date(e.target.value).toISOString() : null,
                      })
                    }
                  />
                </td>
                <td style={{ padding: 8, opacity: 0.6 }}>{new Date(row.updated_at).toLocaleString()}</td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 12, opacity: 0.6 }}>
                  No access records yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Feature flags</h2>
        {flags.map((f) => (
          <div key={f.key} style={{ display: "flex", gap: 12, alignItems: "center", padding: "6px 0" }}>
            <label style={{ minWidth: 260 }}>
              <input
                type="checkbox"
                checked={f.enabled}
                disabled={busy}
                onChange={(e) => void setFlag(f.key, { enabled: e.target.checked })}
              />{" "}
              {f.label} <code style={{ opacity: 0.6 }}>{f.key}</code>
            </label>
            <span style={{ opacity: 0.7 }}>min level</span>
            <input
              type="number"
              defaultValue={f.min_access_level}
              style={{ width: 70 }}
              disabled={busy}
              onBlur={(e) => void setFlag(f.key, { min_access_level: Number(e.target.value) })}
            />
            <span style={{ opacity: 0.7 }}>rollout %</span>
            <input
              type="number"
              defaultValue={f.rollout_percentage}
              style={{ width: 70 }}
              disabled={busy}
              onBlur={(e) => void setFlag(f.key, { rollout_percentage: Number(e.target.value) })}
            />
          </div>
        ))}
        {flags.length === 0 ? <p style={{ opacity: 0.6 }}>No flags defined.</p> : null}
      </div>

      <div>
        <h2>App control</h2>
        {config.map((c) => (
          <div key={c.app_scope} style={{ border: "1px solid #333", padding: 12, marginBottom: 12 }}>
            <strong style={{ textTransform: "capitalize" }}>{c.app_scope}</strong>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8, alignItems: "center" }}>
              <label>
                <input
                  type="checkbox"
                  checked={c.maintenance_mode}
                  disabled={busy}
                  onChange={(e) => void setRemote(c.app_scope, { maintenance_mode: e.target.checked })}
                />{" "}
                Maintenance mode
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={c.force_update}
                  disabled={busy}
                  onChange={(e) => void setRemote(c.app_scope, { force_update: e.target.checked })}
                />{" "}
                Force update
              </label>
              <label>
                Minimum version{" "}
                <input
                  defaultValue={c.minimum_version}
                  style={{ width: 90 }}
                  disabled={busy}
                  onBlur={(e) => void setRemote(c.app_scope, { minimum_version: e.target.value })}
                />
              </label>
              <label style={{ flex: 1, minWidth: 260 }}>
                Maintenance message{" "}
                <input
                  defaultValue={c.maintenance_message ?? ""}
                  style={{ width: "100%" }}
                  disabled={busy}
                  onBlur={(e) => void setRemote(c.app_scope, { maintenance_message: e.target.value || null })}
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <details>
        <summary style={{ cursor: "pointer" }}>Permission catalog ({permissions.length})</summary>
        <div style={{ marginTop: 12 }}>
          {byCategory.map(([category, perms]) => (
            <div key={category} style={{ marginBottom: 10 }}>
              <strong style={{ textTransform: "capitalize" }}>{category}</strong>
              <ul style={{ margin: "4px 0 0 18px" }}>
                {perms.map((p) => (
                  <li key={p.key}>
                    <code>{p.key}</code> — {p.label}
                    {p.is_high_risk ? <span style={{ color: "#E63946" }}> · high risk</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
