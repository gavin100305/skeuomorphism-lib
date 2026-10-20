import type { Metadata } from "next";
import DocsShell from "@/components/docs-shell";

export const metadata: Metadata = {
  title: "Documentation layout — Skeumorphism",
  description: "The documentation sidebar and responsive layout preview for Skeumorphism.",
};

export default function DocumentationPreview() {
  return <DocsShell />;
}
