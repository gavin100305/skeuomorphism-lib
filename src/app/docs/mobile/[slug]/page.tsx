import { Suspense } from "react";
import { RouteSkeleton } from "@/components/route-skeleton";
import { notFound } from "next/navigation";
import catalog from "../../../../../mobile/catalog.json";
import { NativeDocumentation } from "@/components/native/catalog";
export function generateStaticParams() {
  return catalog.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: `${catalog.find((item) => item.slug === slug)?.name ?? "Mobile"} | Skeuomorphism`,
  };
}
async function Content({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!catalog.some((item) => item.slug === slug)) notFound();
  return <NativeDocumentation key={slug} slug={slug} />;
}
export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={<RouteSkeleton />}
    >
      <Content params={params} />
    </Suspense>
  );
}
