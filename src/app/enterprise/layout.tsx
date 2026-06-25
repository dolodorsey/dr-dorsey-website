import EnterpriseShell from "./EnterpriseShell";
import "./enterprise.css";

export const metadata = {
  title: "KHG Enterprise Command Center",
  description: "Executive command layer for The Kollective ecosystem.",
};

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
  return <EnterpriseShell>{children}</EnterpriseShell>;
}
