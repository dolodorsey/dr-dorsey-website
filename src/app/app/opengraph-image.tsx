import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Kollective customer app — members, events and direct access";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const EMBLEM_URL =
  "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png";

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
          background:
            "radial-gradient(circle at 84% 5%, #5b4211 0%, #17140d 27%, #050505 68%)",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 22,
            border: "2px solid rgba(216,176,76,.2)",
            borderRadius: 38,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 620,
            height: 620,
            borderRadius: 620,
            right: -220,
            top: -250,
            border: "1px solid rgba(216,176,76,.12)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  width: 82,
                  height: 82,
                  borderRadius: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(7,7,7,.86)",
                  border: "1px solid rgba(216,176,76,.36)",
                }}
              >
                <img
                  src={EMBLEM_URL}
                  alt="Kollective emblem"
                  width="62"
                  height="62"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: 8 }}>KOLLECTIVE</span>
                <span style={{ color: "#b8aa87", fontSize: 14, fontWeight: 800, letterSpacing: 5, marginTop: 8 }}>
                  CUSTOMER APP
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                border: "1px solid rgba(216,176,76,.35)",
                borderRadius: 999,
                padding: "12px 18px",
                color: "#e9c967",
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: 3,
              }}
            >
              SIGN UP · INSTALL · ENTER
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
            <div
              style={{
                color: "#d8b04c",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: 6,
                marginBottom: 22,
              }}
            >
              GROWN-ISH · RESERVATIONS · MEMBER ACCESS
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 72,
                lineHeight: .98,
                letterSpacing: -4,
                fontWeight: 900,
              }}
            >
              Your direct entrance to the Kollective.
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#999", fontSize: 20 }}>
            <span>Events · Brands · Staff · Perks</span>
            <span>thekollectivehospitality.com/app</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
