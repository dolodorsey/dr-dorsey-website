import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
        <div
          style={{
            display: "flex",
            color: "#d8b04c",
            fontSize: 108,
            lineHeight: 1,
            fontWeight: 900,
            transform: "translateX(-2px)",
          }}
        >
          K
        </div>
        <div
          style={{
            position: "absolute",
            right: 32,
            top: 31,
            width: 13,
            height: 13,
            borderRadius: 999,
            background: "#f3dc94",
          }}
        />
      </div>
    ),
    size,
  );
}
