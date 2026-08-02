import { NextRequest } from "next/server";
import {
  KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
  KOLLECTIVE_SUPABASE_URL,
} from "@/lib/kollective-public";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Client-Info, Apikey",
  "Cache-Control": "no-store",
  Vary: "Origin",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

async function proxy(
  request: NextRequest,
  context: { params: { path?: string[] } },
) {
  const segments = context.params.path ?? [];

  if (segments.length === 0 || segments[0] === "health") {
    return json({
      ok: true,
      gateway: "doctordorsey.com",
      service: "kollective-enterprise-mobile",
      upstream: "supabase-enterprise-mobile",
      timestamp: new Date().toISOString(),
    });
  }

  const authorization = request.headers.get("authorization") ?? "";
  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return json({ error: "A signed-in enterprise session is required." }, 401);
  }

  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(
    `${KOLLECTIVE_SUPABASE_URL}/functions/v1/enterprise-mobile/${segments
      .map(encodeURIComponent)
      .join("/")}`,
  );
  incomingUrl.searchParams.forEach((value, key) => {
    upstreamUrl.searchParams.append(key, value);
  });

  const headers = new Headers();
  headers.set("Accept", "application/json");
  headers.set("Content-Type", request.headers.get("content-type") ?? "application/json");
  headers.set("Authorization", authorization);
  headers.set("apikey", KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY);
  headers.set("x-client-info", request.headers.get("x-client-info") ?? "doctordorsey-mobile-gateway/1.0");

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
    responseHeaders.set(
      "Content-Type",
      upstream.headers.get("content-type") ?? "application/json; charset=utf-8",
    );
    responseHeaders.set("X-Kollective-Gateway", "doctordorsey.com");

    return new Response(await upstream.arrayBuffer(), {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Enterprise mobile gateway error", error);
    return json({ error: "The enterprise backend is temporarily unavailable." }, 502);
  }
}

export async function GET(
  request: NextRequest,
  context: { params: { path?: string[] } },
) {
  return proxy(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: { path?: string[] } },
) {
  return proxy(request, context);
}
