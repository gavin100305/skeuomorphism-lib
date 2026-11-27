import { Suspense } from "react";
import { RouteSkeleton } from "@/components/route-skeleton";
import { notFound } from "next/navigation";
import { components, findComponent } from "@/data/components";
import { ComponentDocumentation } from "@/components/component-documentation";

export function generateStaticParams() {
  return components.map(component => ({ slug: component.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const component = findComponent(slug);
  return { title: component ? `${component.name} — Skeuomorphism` : "Component not found" };
}
async function ComponentContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const component = findComponent(slug);
  if (!component) notFound();
  return <ComponentDocumentation key={slug} slug={slug} />;
}

export default function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  return <Suspense fallback={<RouteSkeleton />}><ComponentContent params={params} /></Suspense>;
}
