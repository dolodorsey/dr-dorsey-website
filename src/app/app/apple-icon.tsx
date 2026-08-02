import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const EMBLEM_URL =
  "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: "radial-gradient(circle at 78% 12%, #3a2d10 0%, #090909 52%, #030303 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 8,
            border: "2px solid rgba(216,176,76,.25)",
            borderRadius: 34,
          }}
        />
        <img
          src={EMBLEM_URL}
          alt="Kollective emblem"
          width="126"
          height="126"
          style={{ objectFit: "contain", filter: "drop-shadow(0 12px 18px rgba(0,0,0,.6))" }}
        />
      </div>
    ),
    size,
  );
}
