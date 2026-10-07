/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getOpsClient } from "@/lib/ops-supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Json = Record<string, any>;
type Source = "work" | "note" | "opportunity" | "content" | "calendar" | "campaign" | "approval" | "handoff" | "worker";

const DORSEY_KEYS = ["dr-dorsey", "dr_dorsey", "dorsey", "the-kollective", "the_kollective", "kollective"];
const PROOF_TERMINAL = new Set(["executed", "verified", "done", "resolved", "published", "posted"]);

const cfg: Record<Source, { table: string; id: string; fields: string[] }> = {
  work: { table: "khg_work_queues", id: "id", fields: ["title","description","priority","status","owner_label","due_at","proof_required","proof_url","metadata"] },
  note: { table: "enterprise_handoff_notes", id: "id", fields: ["title","summary","assigned_to","status","priority","next_action","blocker","decision","source_url","due_at","resolved_at","metadata"] },
  opportunity: { table: "khg_revenue_opportunities", id: "id", fields: ["opportunity_name","contact_name","contact_method","offer_name","estimated_value","next_action","blocker_reason","owner_label","due_at","status","metadata"] },
  content: { table: "khg_content_items", id: "id", fields: ["title","brief","cta","target_url","status","priority","owner_label","publish_status","posted_url","final_asset_url","approval_status","qa_status","scheduled_time_label","metadata"] },
  calendar: { table: "khg_content_calendar_slots", id: "id", fields: ["scheduled_for","slot_status","publish_status","posted_url","metadata"] },
  campaign: { table: "khg_marketing_calendar_items", id: "id", fields: ["title","copy_preview","asset_url","audience_key","scheduled_for","status","external_url","funnel_stage","offer_name","campaign_goal","budget","owner_label","conversion_stage","ghl_stage","approval_status","metadata"] },
  approval: { table: "khg_approval_reque...[truncated]