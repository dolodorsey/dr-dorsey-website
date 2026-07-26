import type { Metadata } from "next";
import { getLearningCatalog } from "@/lib/learning-revenue";
import LearningCatalogClient from "./LearningCatalogClient";
import "./learn.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Courses + Consultations | Dr. Dorsey",
  description: "The Doctor Dorsey ascension system: self-paced courses, interactive programs, private mentorship, certification, and five levels of strategic consultation.",
  alternates: { canonical: "https://doctordorsey.com/learn" },
  openGraph: {
    title: "The Doctor Dorsey Ascension System",
    description: "Choose the level of knowledge, accountability, and direct access your next move requires.",
    url: "https://doctordorsey.com/learn",
    type: "website",
  },
};

export default async function LearnPage() {
  const catalog = await getLearningCatalog();
  return <LearningCatalogClient {...catalog} />;
}
