import { notFound } from "next/navigation";
import Workspace from "../Workspace";

const sections = ["approvals", "content-studio", "events", "revenue", "tasks"];

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export default function OpsSectionPage({ params }: { params: { section: string } }) {
  if (!sections.includes(params.section)) notFound();
  return <Workspace section={params.section} />;
}
