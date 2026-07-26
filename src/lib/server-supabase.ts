import "server-only";

const SUPA_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const READ_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";
const WRITE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

function configured() {
  return Boolean(SUPA_URL && READ_KEY);
}

function headers(key = READ_KEY) {
  return { apikey: key, Authorization: `Bearer ${key}` };
}

async function errorText(response: Response) {
  try { return (await response.text()).slice(0, 500); } catch { return ""; }
}

export async function serverSupaSelect(table: string, query = "") {
  if (!configured()) return [];
  const response = await fetch(`${SUPA_URL}/rest/v1/${table}${query ? `?${query}` : ""}`, {
    headers: headers(),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Supabase select failed for ${table} (${response.status})`);
  return response.json();
}

export async function serverSupaInsert(table: string, data: unknown) {
  if (!SUPA_URL || !WRITE_KEY) throw new Error("Missing Supabase server write configuration");
  const response = await fetch(`${SUPA_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...headers(WRITE_KEY), "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Supabase insert failed for ${table} (${response.status}): ${await errorText(response)}`);
  return response.json();
}

export async function serverSupaUpdate(table: string, match: string, data: unknown) {
  if (!SUPA_URL || !WRITE_KEY) throw new Error("Missing Supabase server write configuration");
  const response = await fetch(`${SUPA_URL}/rest/v1/${table}?${match}`, {
    method: "PATCH",
    headers: { ...headers(WRITE_KEY), "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Supabase update failed for ${table} (${response.status}): ${await errorText(response)}`);
  return response.json();
}
