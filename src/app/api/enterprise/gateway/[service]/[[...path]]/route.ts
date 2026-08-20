import { NextRequest } from "next/server";
import {
  KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
  KOLLECTIVE_SUPABASE_URL,
} from "@/lib/kollective-public";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const SERVICES: Record<string, string> = {
  work: "enterprise-work",
  command: "enterprise-command-intelligence",
  calendar: "enterprise-calendar",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Client-Info, Apikey",
  "Cache-Control": "no-store",
  Vary: "Origin",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

async function proxy(
  request: NextRequest,
  context: { params: { service: string; path?: string[] } },
) {
  const service = String(context.params.service || "").toLowerCase();
  const upstreamFunction = SERVICES[service];
  if (!upstreamFunction) return json({ error: "Unknown enterprise service." }, 404);

  const authorization = request.headers.get("authorization") ?? "";
  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return json({ error: "A signed-in enterprise session is required." }, 401);
  }

  const segments = context.params.path ?? [];
  const upstreamPath = segments.length
    ? `/${segments.map(encodeURIComponent).join("/")}`
    : "";
  const upstreamUrl = new URL(
    `${KOLLECTIVE_SUPABASE_URL}/functions/v1/${upstreamFunction}${upstreamPath}`,
  );
  new URL(request.url).searchParams.forEach((value, key) => {
    upstreamUrl.searchParams.append(key, value);
  });

  const headers = new Headers();
  headers.set("Accept", "application/json");
  headers.set("Content-Type", request.headers.get("content-type") ?? "application/json");
  headers.set("Authorization", authorization);
  headers.set("apikey", KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY);
  headers.set("x-client-info", request.headers.get("x-client-info") ?? "doctordorsey-enterprise-gateway/2.1");

  try {
    const body = request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.arrayBuffer();
    const upstream = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      body: body && body.byteLength > 0 ? body : undefined,
      cache: "no-store",
      redirect: "manual",
    });

    const responseHeaders = new Headers(corsHeaders);
    responseHeaders.set("Content-Type", upstream.headers.get("content-type") ?? "application/json; charset=utf-8");
    responseHeaders.set("X-Kollective-Gateway", "doctordorsey.com");
    responseHeaders.set("X-Kollective-Service", service);
    return new Response(await upstream.arrayBuffer(), {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Enterprise service gateway error", { service, error });
    return json({ error: "The enterprise backend is temporarily unavailable." }, 502);
  }
}

export async function GET(request: NextRequest, context: { params: { service: string; path?: string[] } }) { return proxy(request, context); }
export async function POST(request: NextRequest, context: { params: { service: string; path?: string[] } }) { return proxy(request, context); }
export async function PATCH(request: NextRequest, context: { params: { service: string; path?: string[] } }) { return proxy(request, context); }
export async function DELETE(request: NextRequest, context: { params: { service: string; path?: string[] } }) { return proxy(request, context); }
