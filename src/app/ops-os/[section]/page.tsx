import { notFound } from "next/navigation";
import SectionSwitcher from "./SectionSwitcher";

const sections = ["social", "marketing", "approvals", "content-studio", "events", "revenue", "tasks"];

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export default function OpsSectionPage({ params }: { params: { section: string } }) {
  if (!sections.includes(params.section)) notFound();
  return <SectionSwitcher section={params.section} />;
}
