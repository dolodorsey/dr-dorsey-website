import { notFound } from "next/navigation";
import Workspace from "../Workspace";
import SocialCommandPro from "../social/SocialCommandPro";
import MarketingCommandPro from "../marketing/MarketingCommandPro";

const sections = ["social", "marketing", "approvals", "content-studio", "events", "revenue", "tasks"];

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export default function OpsSectionPage({ params }: { params: { section: string } }) {
  if (!sections.includes(params.section)) notFound();
  if (params.section === "social") return <SocialCommandPro />;
  if (params.section === "marketing") return <MarketingCommandPro />;
  return <Workspace section={params.section} />;
}
