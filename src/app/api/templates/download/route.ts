import {
  createTemplateStarter,
  starterTemplates,
  type StarterFramework,
  type StarterTemplate,
} from "@/lib/template-starter";
import type {
  TemplateMode,
  TemplatePalette,
} from "@/components/skeuomorphic/templates/theme-presets";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const template = params.get("template") ?? "";
  const framework = params.get("framework") ?? "";
  const palette = params.get("palette") ?? "";
  const mode = params.get("mode") ?? "";
  if (
    !starterTemplates.includes(template) ||
    !["next", "react", "astro"].includes(framework) ||
    !["ember", "cobalt", "lime"].includes(palette) ||
    !["light", "dark"].includes(mode)
  ) {
    return Response.json(
      { error: "Choose a valid template, framework, palette, and appearance." },
      { status: 400 },
    );
  }
  const zip = createTemplateStarter(
    template as StarterTemplate,
    framework as StarterFramework,
    palette as TemplatePalette,
    mode as TemplateMode,
  );
  return new Response(new Uint8Array(zip), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${template}-${framework}.zip"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
