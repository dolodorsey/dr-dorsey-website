import Link from "next/link";

const departmentLinks = [
  ["/ops-os/departments", "Department OS"],
  ["/ops-os/casper", "Casper Group"],
  ["/ops-os/mind-studio", "Mind Studio"],
  ["/ops-os/products", "Products"],
  ["/ops-os/tech", "Tech Builds"],
  ["/ops-os/codex", "Codex Sprint"],
] as const;

export default function DepartmentRibbon() {
  return (
    <div className="ops-panel" style={{ margin: "0 34px 18px", padding: 14 }}>
      <div className="ops-action-row">
        {departmentLinks.map(([href, label]) => <Link className="ops-button secondary" href={href} key={href}>{label}</Link>)}
      </div>
    </div>
  );
}
