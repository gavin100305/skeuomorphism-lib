import type { Metadata } from "next";
import DocsIntroduction from "@/components/docs-introduction";
export const metadata: Metadata = { title: "Documentation — Skeumorphism", description: "Live previews, usage, and reusable component source from Skeumorphism." };
export default function Documentation() { return <DocsIntroduction />; }
