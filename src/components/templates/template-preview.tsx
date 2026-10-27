"use client";
import type { TemplateEntry } from "@/data/templates";
import { SoundToggle } from "@/components/button-sound-effects";
import { SkeuoFormaLanding } from "@/components/skeuomorphic/templates/forma-landing";
import { SkeuoGlideLanding } from "@/components/skeuomorphic/templates/glide-landing";
import { SkeuoActivityDashboard } from "@/components/skeuomorphic/templates/activity-dashboard";
import { SkeuoWorkspaceDashboard } from "@/components/skeuomorphic/templates/workspace-dashboard";
export function TemplatePreview({ item }: { item: TemplateEntry }) {
  const options = {
    templatesHref: "/templates",
    soundControl: <SoundToggle />,
    syncPageBackground: true,
  };
  if (item.slug === "daymark") return <SkeuoFormaLanding {...options} />;
  if (item.slug === "glide") return <SkeuoGlideLanding {...options} />;
  if (item.slug === "activity") return <SkeuoActivityDashboard {...options} />;
  return <SkeuoWorkspaceDashboard {...options} />;
}
