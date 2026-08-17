import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const SUPABASE_ASSET_PREFIX =
  "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/";

const BRAND_STYLES: Record<
  string,
  { name: string; accent: string; glow: string; background: string; foreground: string }
> = {
  good_times: {
    name: "GOOD TIMES",
    accent: "#F4D03F",
    glow: "rgba(244, 208, 63, 0.22)",
    background: "#100B1D",
    foreground: "#FFFFFF",
  },
  help_911: {
    name: "HELP 911",
    accent: "#FF3B30",
    glow: "rgba(255, 59, 48, 0.24)",
    background: "#090909",
    foreground: "#FFFFFF",
  },
  kollective: {
    name: "THE KOLLECTIVE",
    accent: "#D6B35A",
    glow: "rgba(214, 179, 90, 0.22)",
    background: "#080808",
    foreground: "#FFFFFF",
  },
  maga: {
    name: "MAKE ATLANTA GREAT AGAIN",
    accent: "#E53935",
    glow: "rgba(229, 57, 53, 0.22)",
    background: "#101010",
    foreground: "#FFF8EC",
  },
};

function clean(value: string | null, fallback = "", max = 280) {
  return (value || fallback).replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max);
}

function safeBackground(value: string | null) {
  if (!value) return null;
  try {
    const decoded = decodeURIComponent(value);
    return decoded.startsWith(SUPABASE_ASSET_PREFIX) ? decoded : null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const brandKey = clean(searchParams.get("brand"), "kollective", 48).toLowerCase();
  const brand = BRAND_STYLES[brandKey] || BRAND_STYLES.kollective;
  const eyebrow = clean(searchParams.get("eyebrow"), "NOW LOADING", 70);
  const title = clean(searchParams.get("title"), "Something worth knowing is next.", 150);
  const body = clean(
    searchParams.get("body"),
    "Stay close for the next release, update or access window.",
    360,
  );
  const cta = clean(searchParams.get("cta"), "DM FOR DETAILS", 80);
  const footer = clean(searchParams.get("footer"), "@" + brandKey, 80);
  const background = safeBackground(searchParams.get("background"));
  const accent = clean(searchParams.get("accent"), brand.accent, 16);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          background: brand.background,
          color: brand.foreground,
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {background ? (
          <img
            src={background}
            alt=""
            width="1080"
            height="1920"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: 0.58,
            }}
          />
        ) : null}

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(0,0,0,.28) 0%, rgba(0,0,0,.54) 45%, rgba(0,0,0,.92) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 760,
            height: 760,
            borderRadius: 760,
            top: 110,
            right: -320,
            display: "flex",
            background: brand.glow,
            filter: "blur(70px)",
          }}
        />

        <div
          style={{
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "96px 82px 86px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: 4,
                color: accent,
              }}
            >
              {brand.name}
            </div>
            <div
              style={{
                display: "flex",
                padding: "14px 22px",
                border: `2px solid ${accent}`,
                borderRadius: 999,
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 2,
                background: "rgba(0,0,0,.42)",
              }}
            >
              STORY
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", maxWidth: 900 }}>
            <div
              style={{
                display: "flex",
                color: accent,
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: title.length > 84 ? 78 : 92,
                lineHeight: 0.98,
                fontWeight: 900,
                letterSpacing: -3,
                textTransform: "uppercase",
                textShadow: "0 8px 28px rgba(0,0,0,.5)",
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 34,
                maxWidth: 820,
                fontSize: body.length > 230 ? 34 : 40,
                lineHeight: 1.28,
                fontWeight: 500,
                color: "rgba(255,255,255,.88)",
              }}
            >
              {body}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 54,
                gap: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "24px 34px",
                  borderRadius: 18,
                  background: accent,
                  color: "#080808",
                  fontSize: 29,
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                {cta}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "rgba(255,255,255,.68)",
                  textAlign: "right",
                }}
              >
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    },
  );
}
