/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Activity, AlertTriangle, ArrowRightLeft, Bot, Check, CheckCircle2, Clock3,
  ExternalLink, FileCheck2, Handshake, History, Loader2, Megaphone, MessageSquare,
  Newspaper, Plus, RefreshCw, Search, ShieldCheck, Sparkles, Target, UserCheck,
  Users, X, Zap
} from "lucide-react";
import styles from "./DorseyExecutionOS.module.css";

type Json = Record<string, any>;
type Source = "work" | "note" | "opportunity" | "content" | "calendar" | "campaign" | "approval" | "handoff" | "worker";
type TabKey = "today" | "founder" | "social" | "relationships" | "authority" | "origination" | "approvals" | "campaigns" | "agents" | "proof";

const tabs: { key: TabKey; label: string; icon: any }[] = [
  { key:"today", label:"Today", icon:Zap },
  { key:"founder", label:"Founder Queue", icon:UserCheck },
  { key:"social", label:"Social & Content", icon:MessageSquare },
  { key:"relationships", label:"Relationships", icon:Handshake },
  { key:"authority", label:"Authority", icon:Newspaper },
  { key:"origination", label:"Origination", icon:Target },
  { key:"approvals", label:"Approvals", icon:ShieldCheck },
  { key:"campaigns", label:"Campaigns", icon:Megaphone },
  { key:"agents", label:"Agents", icon:Bot },
  { key:"proof", label:"Proof", icon:FileCheck2 },
];

const priorities: Record<string, number> = { urgent:0, critical:0, executive:0, high:1, p0:1, medium:2, normal:2, p1:2, low:3 };
const closed = new Set(["verified","executed","done","resolved","rejected","cancelled","published","handed_off"]);
const agentNames = ["muse","claude","dot"];

function token() {
  return typeof window === "undefined" ? "" : localStorage.getItem("khg_ops_token") || "";
}
function text(v: unknown) { return v == null ? "" : String(v); }
function lower(v: unknown) { return text(v).toLowerCase(); }
function fmtDate(v?: string) {
  if (!v) return "No due time";
  const d...[truncated]