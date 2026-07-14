"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database, Loader2, RefreshCw, ChevronRight, Flame, Table2 } from "lucide-react";

type AppRow = {
  dashboard_key: string;
  dashboard_label: string;
  route: string;
  icon: string | null;
  build_status: string | null;
  section_count: number;
  hot_sections: number;
  total_records: number;
  hot_tables: number;
};

type SectionRow = {
  dashboard_key: string;
  section_key: string;
  section_name: string;
  n: number;
  sort_order: number;
  hot: boolean;
  source_table: string;
};

function token() {
  return typeof window === "undefined" ? "" : localStorage.getItem("khg_ops_token") || "";
}

export default function MasterDatabasePage() {
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [apps, setApps] = useState<AppRow[]>([]);
  const [sections, setSections] = useState<SectionRow[]>([]);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<SectionRow | null>(null);
  const [drillRows, setDrillRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [drillLoading, setDrillLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  // Bootstrap Supabase client with the auth token (same pattern as OpsShell)
  useEffect(() => {
    fetch("/api/ops-os/config").then((r) => r.json()).then(({ url, key, error }) => {
      if (error) throw new Error(error);
      const t = token();
      const next = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: t ? { headers: { Authorization: `Bearer ${t}` } } : undefined,
      });
      setClient(next);
    }).catch((e) => setError(e.message));
  }, []);

  // Load app summary + all sections
  useEffect(() => {
    if (!client) return;
    setLoading(true);
    setError(null);
    Promise.all([
      client.from("v_khg_dashboard_toplevel").select("*"),
      client.from("v_khg_all_dashboard_sections").select("*").order("sort_order", { ascending: true }),
    ]).then(([topResp, secResp]) => {
      if (topResp.error) throw topResp.error;
      if (secResp.error) throw secResp.error;
      setApps((topResp.data || []) as AppRow[]);
      setSections((secResp.data || []) as SectionRow[]);
      setLoading(false);
    }).catch((e) => { setError(e.message || String(e)); setLoading(false); });
  }, [client, refreshCount]);

  // When a section is clicked, drill into the source table (limit 25 rows)
  const openSection = useCallback((s: SectionRow) => {
    setSelectedSection(s);
    setDrillRows([]);
    if (!client) return;
    setDrillLoading(true);
    client.from(s.source_table).select("*").limit(25).then(({ data, error }) => {
      if (error) setError(error.message);
      else setDrillRows((data || []) as Record<string, unknown>[]);
      setDrillLoading(false);
    });
  }, [client]);

  const activeApp = selectedApp || apps[0]?.dashboard_key || null;
  const sectionsForApp = useMemo(
    () => sections.filter((s) => s.dashboard_key === activeApp).sort((a, b) => a.sort_order - b.sort_order),
    [sections, activeApp]
  );

  const drillCols = useMemo(() => {
    if (!drillRows.length) return [];
    const priorityCols = ["display_name", "name", "business_name", "title", "event_name", "first_name", "last_name", "phone", "email", "city", "status", "tier", "priority"];
    const allCols = Object.keys(drillRows[0]);
    const primary = priorityCols.filter((c) => allCols.includes(c));
    const remaining = allCols.filter((c) => !primary.includes(c) && !["metadata", "raw_data", "notes", "created_at", "updated_at", "id"].includes(c));
    return [...primary, ...remaining].slice(0, 6);
  }, [drillRows]);

  return (
    <div style={{ padding: "24px", minHeight: "100vh" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 }}>
            EVERY VERTICAL • EVERY TABLE • EVERY SECTION
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, margin: 0, display: "flex", alignItems: "center", gap: 12 }}>
            <Database size={26} /> Master Database
          </h1>
        </div>
        <button
          onClick={() => setRefreshCount((c) => c + 1)}
          style={{ background: "#1e293b", color: "#e2e8f0", padding: "8px 14px", borderRadius: 8, border: "1px solid #334155", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </header>

      {error && (
        <div style={{ background: "#450a0a", color: "#fecaca", padding: "12px 16px", borderRadius: 8, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8" }}>
          <Loader2 className="animate-spin" size={16} /> Loading dashboard state...
        </div>
      ) : (
        <>
          {/* Top-line vertical grid — click to filter sections */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 28 }}>
            {apps.map((app) => {
              const isActive = activeApp === app.dashboard_key;
              return (
                <button
                  key={app.dashboard_key}
                  onClick={() => { setSelectedApp(app.dashboard_key); setSelectedSection(null); }}
                  style={{
                    textAlign: "left",
                    background: isActive ? "#1e293b" : "#0f172a",
                    border: isActive ? "1px solid #38bdf8" : "1px solid #1e293b",
                    borderRadius: 12,
                    padding: "14px 16px",
                    cursor: "pointer",
                    color: "#e2e8f0",
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 700 }}>{app.dashboard_label}</span>
                    {app.build_status === "clean-slate" && (
                      <span style={{ fontSize: 9, background: "#065f46", padding: "2px 6px", borderRadius: 4, color: "#a7f3d0" }}>CLEAN SLATE</span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#94a3b8" }}>
                    <span><strong style={{ color: "#e2e8f0" }}>{Number(app.total_records || 0).toLocaleString()}</strong> rows</span>
                    <span>{app.section_count} sections</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: selectedSection ? "1fr 1.2fr" : "1fr", gap: 20 }}>
            {/* Sections for the active app */}
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#94a3b8", textTransform: "uppercase", marginBottom: 12 }}>
                {activeApp ? `SECTIONS — ${apps.find((a) => a.dashboard_key === activeApp)?.dashboard_label || activeApp}` : "SELECT A VERTICAL ABOVE"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {sectionsForApp.map((s) => {
                  const isActive = selectedSection?.section_key === s.section_key;
                  return (
                    <button
                      key={s.section_key}
                      onClick={() => openSection(s)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: isActive ? "#1e293b" : "#0f172a",
                        border: isActive ? "1px solid #38bdf8" : "1px solid #1e293b",
                        borderRadius: 10,
                        padding: "12px 14px",
                        cursor: "pointer",
                        color: "#e2e8f0",
                        transition: "all 0.15s",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {s.hot && <Flame size={14} color="#f59e0b" />}
                        <span style={{ fontSize: 14, fontWeight: 500 }}>{s.section_name}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: s.hot ? "#f59e0b" : "#94a3b8" }}>{s.n.toLocaleString()}</span>
                        <ChevronRight size={14} color="#64748b" />
                      </div>
                    </button>
                  );
                })}
                {sectionsForApp.length === 0 && (
                  <div style={{ color: "#64748b", fontSize: 13, padding: 12 }}>No live sections in this vertical.</div>
                )}
              </div>
            </div>

            {/* Drill-down panel */}
            {selectedSection && (
              <div>
                <div style={{ fontSize: 11, letterSpacing: 2, color: "#94a3b8", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <Table2 size={12} /> {selectedSection.source_table} · Showing first 25
                </div>
                {drillLoading ? (
                  <div style={{ color: "#94a3b8", display: "flex", gap: 8, alignItems: "center" }}>
                    <Loader2 className="animate-spin" size={16} /> Loading records...
                  </div>
                ) : drillRows.length === 0 ? (
                  <div style={{ color: "#64748b", fontSize: 13 }}>No records returned.</div>
                ) : (
                  <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, overflow: "auto", maxHeight: 500 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                      <thead style={{ background: "#1e293b", position: "sticky", top: 0 }}>
                        <tr>
                          {drillCols.map((c) => (
                            <th key={c} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 600, color: "#94a3b8", letterSpacing: 0.5, textTransform: "uppercase", fontSize: 10, borderBottom: "1px solid #334155" }}>
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {drillRows.map((row, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid #1e293b" }}>
                            {drillCols.map((c) => {
                              const v = row[c];
                              const display = v === null || v === undefined ? "—" : typeof v === "object" ? JSON.stringify(v).slice(0, 40) : String(v).slice(0, 60);
                              return (
                                <td key={c} style={{ padding: "8px 10px", color: "#e2e8f0", verticalAlign: "top" }}>{display}</td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
