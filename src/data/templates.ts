export type TemplateKind = "landing" | "dashboard";
export type TemplateEntry = {
  kind: TemplateKind;
  slug: string;
  name: string;
  category: string;
  description: string;
  accent: string;
};

export const templates: TemplateEntry[] = [
  { kind: "landing", slug: "daymark", name: "Daymark", category: "Focus app", description: "An editorial day-planning product with a tactile circular timeline.", accent: "ember" },
  { kind: "landing", slug: "reel", name: "Reel", category: "Screen recording", description: "A cinematic product launch with a playable demo video.", accent: "cobalt" },
  { kind: "landing", slug: "stillroom", name: "Stillroom", category: "Wellness studio", description: "A softer, image-led landing for rituals and guided sessions.", accent: "sage" },
  { kind: "dashboard", slug: "signal", name: "Signal", category: "Analytics", description: "A dense but legible metrics workspace with a compact rail.", accent: "cobalt" },
  { kind: "dashboard", slug: "ledger", name: "Ledger", category: "Finance", description: "A warm financial overview with strong numerical hierarchy.", accent: "ember" },
  { kind: "dashboard", slug: "orbit", name: "Orbit", category: "Projects", description: "A calm project workspace with a colorful task board.", accent: "sage" },
];

export const templatePath = (item: Pick<TemplateEntry, "kind" | "slug">) => `/templates/${item.kind}/${item.slug}`;
