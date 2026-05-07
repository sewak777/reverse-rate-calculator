import { ImageResponse } from "next/og";

export const alt = "The Reverse Rate Calculator — what freelancers actually charge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          backgroundColor: "#FAFAF7",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            color: "#5C5C58",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}
        >
          thegaplist.com · #001
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#1A1A1A",
            marginTop: 24,
            lineHeight: 1.1,
          }}
        >
          What should I charge?
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#5C5C58",
            marginTop: 20,
          }}
        >
          Real market rates, by skill and region. With the receipts.
        </div>

        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 60,
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 160,
              height: 80,
              backgroundColor: "#A8C5D9",
              borderRadius: 6,
            }}
          />
          <div
            style={{
              display: "flex",
              width: 160,
              height: 140,
              backgroundColor: "#E76F51",
              borderRadius: 6,
            }}
          />
          <div
            style={{
              display: "flex",
              width: 160,
              height: 200,
              backgroundColor: "#A8C5D9",
              borderRadius: 6,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 12,
            fontSize: 16,
            color: "#5C5C58",
          }}
        >
          <span style={{ display: "flex", width: 160, justifyContent: "center" }}>low</span>
          <span style={{ display: "flex", width: 160, justifyContent: "center" }}>median</span>
          <span style={{ display: "flex", width: 160, justifyContent: "center" }}>high</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
