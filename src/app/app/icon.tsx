import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

const EMBLEM_URL =
  "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png";

export default function Icon() {
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
          borderRadius: 112,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 20,
            border: "3px solid rgba(216,176,76,.26)",
            borderRadius: 94,
          }}
        />
        <div
          style={{
            width: 370,
            height: 370,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
            borderRadius: 84,
            background: "radial-gradient(circle, rgba(216,176,76,.16), rgba(5,5,5,0) 68%)",
          }}
        >
          <img
            src={EMBLEM_URL}
            alt="Kollective emblem"
            width="306"
            height="306"
            style={{ objectFit: "contain", filter: "drop-shadow(0 28px 40px rgba(0,0,0,.6))" }}
          />
        </div>
      </div>
    ),
    size,
  );
}
