import "server-only";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";
import { serverSupaSelect } from "@/lib/server-supabase";

let stripeClient: Stripe | null = null;

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  if (!stripeClient) stripeClient = new Stripe(key, { apiVersion: "2026-06-24.dahlia" });
  return stripeClient;
}

export const cleanText = (value: unknown, max = 500) =>
  typeof value === "string" ? value.trim().replace(/\u0000/g, "").slice(0, max) : "";

export const cleanEmail = (value: unknown) => {
  const email = cleanText(value, 254).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
};

export const cleanPhone = (value: unknown) => cleanText(value, 40).replace(/[^0-9+().\-\s]/g, "");

export function calculateQualification(input: Record<string, unknown> = {}) {
  let score = 0;
  if (cleanText(input.primary_goal, 1000).length >= 30) score += 20;
  if (cleanText(input.current_challenge, 1500).length >= 30) score += 20;
  if (cleanText(input.desired_outcome, 1500).length >= 30) score += 20;
  if (/now|immediate|30|60|90|quarter/i.test(cleanText(input.timeline, 100))) score += 15;
  if (/750|1,?000|1,?500|2,?500|5,?000|7,?500|10,?000|approved|allocated/i.test(cleanText(input.budget_range, 100))) score += 15;
  if (cleanText(input.website_url, 500) || cleanText(input.company_name, 200)) score += 10;
  return Math.min(score, 100);
}

export async function getLearningCatalog() {
  const [courses, lessons, levels, offers] = await Promise.all([
    serverSupaSelect("tlu_courses", "select=*&published=eq.true&order=sort_order.asc,price_cents.asc"),
    serverSupaSelect("tlu_lessons", "select=*&order=course_id.asc,module_order.asc,sort_order.asc"),
    serverSupaSelect("tlu_offer_levels", "select=*&published=eq.true&order=sort_order.asc"),
    serverSupaSelect("tlu_consultation_offers", "select=*&published=eq.true&order=sort_order.asc,price_cents.asc"),
  ]);
  const lessonsByCourse = new Map<string, any[]>();
  for (const lesson of lessons || []) {
    const rows = lessonsByCourse.get(lesson.course_id) || [];
    rows.push(lesson);
    lessonsByCourse.set(lesson.course_id, rows);
  }
  return {
    courses: (courses || []).map((course: any) => ({ ...course, lessons: lessonsByCourse.get(course.id) || [] })),
    courseLevels: (levels || []).filter((level: any) => level.lane === "course"),
    consultationLevels: (levels || []).filter((level: any) => level.lane === "consultation"),
    hybridLevels: (levels || []).filter((level: any) => level.lane === "hybrid"),
    levelPrograms: (offers || []).filter((offer: any) => offer.offer_kind === "course_level"),
    consultations: (offers || []).filter((offer: any) => offer.offer_kind === "consultation" && offer.sales_status === "live"),
    readiness: {
      stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET),
      appUrlConfigured: Boolean(process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || process.env.VERCEL_URL),
    },
  };
}

export function resolveAppUrl(request?: { nextUrl?: { origin?: string } }) {
  const configured = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
  if (configured) return configured.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return request?.nextUrl?.origin || "http://127.0.0.1:3000";
}

export function checkoutReadiness(offer: any) {
  const blockers: string[] = [];
  if (!offer?.published) blockers.push("offer_not_published");
  if (Number(offer?.price_cents || 0) <= 0) blockers.push("no_paid_price");
  if (!process.env.STRIPE_SECRET_KEY) blockers.push("stripe_secret_missing");
  if (!process.env.STRIPE_WEBHOOK_SECRET) blockers.push("stripe_webhook_secret_missing");
  return { ready: blockers.length === 0, blockers };
}
