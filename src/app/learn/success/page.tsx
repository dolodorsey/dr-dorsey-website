import Link from "next/link";
import { getStripe } from "@/lib/learning-revenue";
import "../learn.css";

export const dynamic = "force-dynamic";

export default async function LearningSuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  const sessionId = typeof searchParams?.session_id === "string" ? searchParams.session_id : "";
  let session = null;
  let error = "";
  try {
    const stripe = getStripe();
    if (sessionId && stripe) session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch { error = "We could not verify this checkout yet."; }
  const paid = session?.payment_status === "paid";
  return <main className="ddLearn"><section className="ddSuccess"><span>SECURE CHECKOUT</span><h1>{paid ? "Payment received." : "Checkout received."}</h1><p>{paid ? "Your payment is being reconciled with course access or engagement scheduling. The email used at checkout is your delivery identity." : error || "Payment confirmation is still processing. Please do not submit a duplicate payment."}</p><Link href="/learn">Return to the ascension system</Link></section></main>;
}
