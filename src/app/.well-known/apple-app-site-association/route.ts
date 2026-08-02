const association = {
  applinks: {
    apps: [],
    details: [
      {
        appID: "AFU6P8WW9K.com.kollective.enterprise",
        paths: [
          "/ops-os/*",
          "/api/mobile/*",
          "/api/enterprise/mobile/*",
        ],
      },
      {
        appID: "AFU6P8WW9K.com.kollective.customer",
        paths: [
          "/app",
          "/app/*",
          "/kollective/*",
        ],
      },
    ],
  },
};

export const dynamic = "force-static";

export async function GET() {
  return Response.json(association, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
