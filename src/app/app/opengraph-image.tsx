import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kollective — Events, Brands & Experiences";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          color: "white",
          background: "radial-gradient(circle at 82% 4%, #4a3711 0%, #11100d 30%, #050505 72%)",
          padding: "70px 76px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 22,
            border: "2px solid rgba(216,176,76,.18)",
            borderRadius: 38,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#d8b04c",
                color: "#070707",
                fontSize: 38,
                fontWeight: 900,
              }}
            >
              K
            </div>
            <div style={{ display: "flex", fontSize: 26, fontWeight: 900, letterSpacing: 8 }}>
              KOLLECTIVE
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}>
            <div style={{ color: "#d8b04c", fontSize: 18, fontWeight: 900, letterSpacing: 6, marginBottom: 22 }}>
              YOUR CITY · YOUR PEOPLE · YOUR NEXT MOVE
            </div>
            <div style={{ display: "flex", fontSize: 76, lineHeight: .98, letterSpacing: -4, fontWeight: 900 }}>
              Events, brands and experiences in one app.
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#999", fontSize: 20 }}>
            <span>Powered by the Kollective</span>
            <span>doctordorsey.com/app</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
