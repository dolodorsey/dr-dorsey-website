const baseUrl = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const routes = [
  "/", "/book", "/brands", "/events", "/shop", "/forms",
  "/enterprise", "/ops-os", "/ops-os/social", "/ops-os/marketing",
  "/ops-os/approvals", "/ops-os/content-studio", "/ops-os/events",
  "/ops-os/revenue", "/ops-os/tasks", "/ops-os/casper",
  "/ops-os/mind-studio", "/ops-os/products", "/ops-os/tech",
  "/ops-os/workers", "/ops-os/codex", "/ops-os/departments",
  "/os/ig-connect", "/os/ig-sessions",
];

const failures = [];
for (const route of routes) {
  try {
    const response = await fetch(`${baseUrl}${route}`, { redirect: "follow" });
    const result = `${response.status} ${route}`;
    // Next App Router server redirects can return a 3xx navigation response
    // without a conventional Location header. Intentional redirects are healthy.
    if (response.status < 200 || response.status >= 400) failures.push(result);
    console.log(result);
  } catch (error) {
    failures.push(`ERR ${route}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length) {
  console.error(`\nSmoke failures:\n${failures.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`\n${routes.length} routes passed against ${baseUrl}.`);
}
