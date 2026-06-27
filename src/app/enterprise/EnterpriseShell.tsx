"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Bot, Building2, CalendarDays, ChevronRight, LayoutDashboard, Megaphone, Network, ShieldCheck, TicketCheck } from "lucide-react";
import EnterpriseAuthPanel from "./EnterpriseAuthPanel";

const links = [
  ["/enterprise", "Enterprise HQ", LayoutDashboard],
  ["/enterprise/command-centers", "Command Centers", Network],
  ["/enterprise/marketing/campaigns", "Marketing OS", Megaphone],
  ["/enterprise/eventbrite/drafts", "Eventbrite", TicketCheck],
  ["/enterprise/security/rls", "Security", ShieldCheck],
  ["/enterprise/ai/tasks", "AI / Codex", Bot],
  ["/enterprise/approvals", "Approvals", Activity],
  ["/enterprise/registry/projects", "Project Registry", Building2],
  ["/enterprise/registry/dashboards", "Dashboard Registry", CalendarDays],
] as const;

export default function EnterpriseShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div className="ent-app">
    <aside className="ent-sidebar">
      <Link href="/enterprise" className="ent-mark"><span>KHG</span><div><strong>ENTERPRISE</strong><small>COMMAND LAYER</small></div></Link>
      <div className="ent-nav-label">CONTROL ROOMS</div>
      <nav>{links.map(([href, title, Icon]) => <Link key={href} href={href} className={pathname === href || (href !== "/enterprise" && pathname.startsWith(href)) ? "active" : ""}><Icon size={17} /><span>{title}</span><ChevronRight size={14} /></Link>)}</nav>
      <EnterpriseAuthPanel />
      <div className="ent-sidebar-foot"><span>PRODUCTION</span><strong>Enterprise layer online</strong><Link href="/ops-os">Open Ops OS</Link></div>
    </aside>
    <main className="ent-main">{children}</main>
  </div>;
}
