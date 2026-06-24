import DepartmentRibbon from "./DepartmentRibbon";
import OpsShell from "./OpsShell";
import "./ops.css";

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return <OpsShell><DepartmentRibbon />{children}</OpsShell>;
}
