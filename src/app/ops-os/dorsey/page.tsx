import { redirect } from "next/navigation";

export const metadata = {
  title: "Dorsey — Private Dashboard",
  robots: { index: false, follow: false },
};

// The operating dashboard belongs to the private dashboard domain.
// This public website must not host a second execution workspace.
export default function DorseyExecutionPage() {
  redirect("https://thedoctordorsey.com/");
}
