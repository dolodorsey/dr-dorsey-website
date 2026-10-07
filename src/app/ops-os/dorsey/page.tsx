import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Dorsey — Private Dashboard",
  robots: { index: false, follow: false },
};

// This public website does not own the private execution workspace.
// Runtime rendering preserves the actual HTTP Location header.
export default function DorseyExecutionPage() {
  redirect("https://thedoctordorsey.com/");
}
