import { notFound } from "next/navigation";
import SectionSwitcher from "./SectionSwitcher";

const sections = ["social", "marketing", "approvals", "content-studio", "events", "revenue", "tasks"];

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export default async function OpsSectionPage(props: { params: Promise<{ section: string }> }) {
  const params = await props.params;
  if (!sections.includes(params.section)) notFound();
  return <SectionSwitcher section={params.section} />;
}
