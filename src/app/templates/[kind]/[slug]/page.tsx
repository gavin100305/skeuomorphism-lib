import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { templates } from "@/data/templates";
import { TemplatePreview } from "@/components/templates/template-preview";

export function generateStaticParams() { return templates.map(({ kind, slug }) => ({ kind, slug })); }

export async function generateMetadata({ params }: { params: Promise<{ kind: string; slug: string }> }): Promise<Metadata> {
  const { kind, slug } = await params;
  const item = templates.find(entry => entry.kind === kind && entry.slug === slug);
  return { title: item ? `${item.name} template — Skeuomorphism UI` : "Template", description: item?.description };
}

async function TemplatePageContent({ params }: { params: Promise<{ kind: string; slug: string }> }) {
  const { kind, slug } = await params;
  const item = templates.find(entry => entry.kind === kind && entry.slug === slug);
  if (!item) notFound();
  return <TemplatePreview item={item} />;
}

export default function TemplatePage({ params }: { params: Promise<{ kind: string; slug: string }> }) {
  return <Suspense fallback={<div className="template-route-loading" role="status">Opening template…</div>}><TemplatePageContent params={params} /></Suspense>;
}
