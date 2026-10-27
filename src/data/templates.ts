export type TemplateKind = "landing" | "dashboard";
export type TemplateEntry = {
  kind: TemplateKind;
  slug: string;
  name: string;
  category: string;
  description: string;
  accent: string;
  registry: string;
};
export const templates: TemplateEntry[] = [
  {
    kind: "landing",
    slug: "daymark",
    name: "Forma",
    category: "Editorial landing",
    description:
      "Warm paper, charcoal, a little serif, and a circular centerpiece. A considered home for a generic product.",
    accent: "ember",
    registry: "skeuo-forma-landing",
  },
  {
    kind: "landing",
    slug: "glide",
    name: "Glide",
    category: "Product landing",
    description:
      "A lime orbit, sculptural chrome, tactile features, and a generous wordmark. Space for your next idea.",
    accent: "lime",
    registry: "skeuo-glide-landing",
  },
  {
    kind: "dashboard",
    slug: "activity",
    name: "Daymark",
    category: "Personal dashboard",
    description:
      "A calm view of daily activity, with a full-width chart, useful detail, and an expandable sidebar.",
    accent: "ember",
    registry: "skeuo-activity-dashboard",
  },
  {
    kind: "dashboard",
    slug: "workspace",
    name: "Formwork",
    category: "Workspace dashboard",
    description:
      "An organized team workspace with projects, people, analytics, and a searchable orders table.",
    accent: "cobalt",
    registry: "skeuo-workspace-dashboard",
  },
];
export const templatePath = (item: Pick<TemplateEntry, "kind" | "slug">) =>
  `/templates/${item.kind}/${item.slug}`;
