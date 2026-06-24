"use client";

import Workspace from "../Workspace";
import SocialCommandPro from "../social/SocialCommandPro";
import MarketingCommandLive from "../marketing/MarketingCommandLive";

export default function SectionSwitcher({ section }: { section: string }) {
  if (section === "social") return <SocialCommandPro />;
  if (section === "marketing") return <MarketingCommandLive />;
  return <Workspace section={section} />;
}
