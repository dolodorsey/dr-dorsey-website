import { NextResponse } from "next/server";

/**
 * Apple App Site Association.
 *
 * iOS fetches this to decide whether a link to this domain should open the
 * Kollective Enterprise app instead of Safari. It must be served over HTTPS at
 * exactly /.well-known/apple-app-site-association, with content type
 * application/json, no redirect, and no file extension.
 *
 * Served from a route handler rather than /public so the content type is
 * correct — a file with no extension in /public is served as
 * application/octet-stream, which iOS rejects.
 *
 * appID is <Apple Team ID>.<bundle identifier>, matching app.json
 * `ios.associatedDomains` in dolodorsey/rork-kollective-command-app.
 */

const APP_ID = "AFU6P8WW9K.com.kollective.enterprise";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(
    {
      applinks: {
        details: [
          {
            appIDs: [APP_ID],
            components: [
              { "/": "/ops-os/*", comment: "Ops OS deep links open in the app" },
              { "/": "/app/*", comment: "App-specific routes" },
            ],
          },
        ],
      },
      webcredentials: {
        apps: [APP_ID],
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
