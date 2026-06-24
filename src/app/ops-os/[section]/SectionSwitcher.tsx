"use client";

import Workspace from "../Workspace";
import SocialCommandPro from "../social/SocialCommandPro";
import MarketingCommandPro from "../marketing/MarketingCommandPro";

export default function SectionSwitcher({ section }: { section: string }) {
  if (section === "social") return <SocialCommandPro />;
  if (section === "marketing") return <MarketingCommandPro />;
  return <Workspace section={section} />;
}
