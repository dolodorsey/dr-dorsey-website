import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

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
            display: "flex",
            color: "#d8b04c",
            fontSize: 292,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: -32,
            transform: "translateX(-9px)",
            textShadow: "0 24px 60px rgba(0,0,0,.55)",
          }}
        >
          K
        </div>
        <div
          style={{
            position: "absolute",
            right: 92,
            top: 92,
            width: 34,
            height: 34,
            borderRadius: 999,
            background: "#f3dc94",
            boxShadow: "0 0 38px rgba(243,220,148,.42)",
          }}
        />
      </div>
    ),
    size,
  );
}
