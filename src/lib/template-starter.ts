import { zipSync, strToU8 } from "fflate";
import forma from "../../public/r/skeuo-forma-landing.json";
import glide from "../../public/r/skeuo-glide-landing.json";
import activity from "../../public/r/skeuo-activity-dashboard.json";
import workspace from "../../public/r/skeuo-workspace-dashboard.json";
import type {
  TemplateMode,
  TemplatePalette,
} from "@/components/skeuomorphic/templates/theme-presets";

const items = {
  "skeuo-forma-landing": {
    registry: forma,
    component: "SkeuoFormaLanding",
    module: "forma-landing",
  },
  "skeuo-glide-landing": {
    registry: glide,
    component: "SkeuoGlideLanding",
    module: "glide-landing",
  },
  "skeuo-activity-dashboard": {
    registry: activity,
    component: "SkeuoActivityDashboard",
    module: "activity-dashboard",
  },
  "skeuo-workspace-dashboard": {
    registry: workspace,
    component: "SkeuoWorkspaceDashboard",
    module: "workspace-dashboard",
  },
};
export type StarterFramework = "next" | "react" | "astro";
export type StarterTemplate = keyof typeof items;
export const starterTemplates = Object.keys(items);
const json = (value: unknown) => JSON.stringify(value, null, 2) + "\n";

export function createTemplateStarter(
  template: StarterTemplate,
  framework: StarterFramework,
  palette: TemplatePalette,
  mode: TemplateMode,
) {
  const item = items[template];
  const files: Record<string, string> = {};
  for (const file of item.registry.files) {
    const path = file.path.replace(
      "src/components/skeuomorphic/",
      "src/components/ui/",
    );
    files[path] = file.content;
  }
  const name = item.module;
  const dependencies: Record<string, string> = {
    react: "19.3.0",
    "react-dom": "19.3.0",
    "framer-motion": "14.7.1",
  };
  const devDependencies: Record<string, string> = {
    typescript: "^5.9.0",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/node": "^22",
  };
  const scripts: Record<string, string> = {};
  files["src/Template.tsx"] =
    `"use client";\nimport { ${item.component} } from "./components/ui/templates/${item.module}";\nexport default function Template() {\n  return <${item.component} initialPalette="${palette}" initialMode="${mode}" syncPageBackground />;\n}\n`;
  files["src/global.css"] =
    `:root { color-scheme: ${mode}; }\nhtml,body { margin:0; min-width:320px; }\nbody { font-family:system-ui,sans-serif; }\nbutton,input,select,textarea { font:inherit; }\na { color:inherit; }\n`;
  const compilerOptions = {
    target: "ES2022",
    lib: ["DOM", "DOM.Iterable", "ESNext"],
    strict: true,
    skipLibCheck: true,
    noEmit: true,
    esModuleInterop: true,
    module: "ESNext",
    moduleResolution: "Bundler",
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: "react-jsx",
  };
  if (framework === "next") {
    dependencies.next = "16.4.2";
    Object.assign(scripts, {
      dev: "next dev",
      build: "next build",
      start: "next start",
      check: "tsc --noEmit",
    });
    files["src/app/page.tsx"] =
      'import Template from "../Template";\nexport default function Page() { return <Template />; }\n';
    files["src/app/layout.tsx"] =
      `import type { ReactNode } from "react";\nimport "../global.css";\nexport const metadata = { title: "${name} starter", description: "Built with Skeuomorphism UI" };\nexport default function Layout({ children }: { children: ReactNode }) { return <html lang="en"><body>{children}</body></html>; }\n`;
    files["tsconfig.json"] = json({
      compilerOptions: { ...compilerOptions, plugins: [{ name: "next" }] },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"],
    });
    files["next-env.d.ts"] =
      '/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n';
  } else if (framework === "react") {
    Object.assign(devDependencies, {
      vite: "8.3.6",
      "@vitejs/plugin-react": "6.2.1",
    });
    Object.assign(scripts, {
      dev: "vite",
      build: "tsc --noEmit && vite build",
      preview: "vite preview",
      check: "tsc --noEmit",
    });
    files["index.html"] =
      `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${name} starter</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n`;
    files["src/main.tsx"] =
      'import { createRoot } from "react-dom/client";\nimport Template from "./Template";\nimport "./global.css";\ncreateRoot(document.getElementById("root")!).render(<Template />);\n';
    files["vite.config.ts"] =
      'import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nexport default defineConfig({ plugins:[react()] });\n';
    files["tsconfig.json"] = json({
      compilerOptions,
      include: ["src", "vite.config.ts"],
    });
  } else {
    Object.assign(dependencies, { astro: "5.16.0", "@astrojs/react": "4.4.2" });
    Object.assign(devDependencies, { "@astrojs/check": "^0.9.5" });
    Object.assign(scripts, {
      dev: "astro dev",
      build: "astro check && astro build",
      preview: "astro preview",
      check: "astro check",
    });
    files["astro.config.mjs"] =
      'import { defineConfig } from "astro/config";\nimport react from "@astrojs/react";\nexport default defineConfig({ integrations:[react()] });\n';
    files["src/pages/index.astro"] =
      `---\nimport Template from "../Template";\nimport "../global.css";\n---\n<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${name} starter</title></head><body><Template client:load /></body></html>\n`;
    files["tsconfig.json"] = json({
      extends: "astro/tsconfigs/strict",
      compilerOptions: { jsx: "react-jsx", jsxImportSource: "react" },
      include: [".astro/types.d.ts", "**/*"],
      exclude: ["dist"],
    });
  }
  files["package.json"] = json({
    name: `${name}-starter`,
    version: "0.1.0",
    private: true,
    type: "module",
    engines: { node: ">=20.19.0" },
    scripts,
    dependencies,
    devDependencies,
  });
  files[".gitignore"] =
    "node_modules/\ndist/\n.next/\n.astro/\n.env*\n!.env.example\n";
  files["README.md"] =
    `# ${name} / ${framework}\n\nGenerated from Skeuomorphism UI.\n\n## Start\n\nUse Node.js 20.19+ (or a current Node 22 LTS). Extract this ZIP, then run:\n\n\`\`\`sh\nnpm install\nnpm run dev\n\`\`\`\n\nProduction build: \`npm run build\`.\n\nYour initial theme is **${palette} / ${mode}**. Edit \`src/Template.tsx\` to change the defaults. The in-page customizer persists the visitor's later choices in local storage.\n\nComponents and native CSS live in \`src/components/ui\`. All records, metrics, and stories are sample content. Connect your own data and replace copy before publishing. No environment credentials are required.\n\n${framework === "astro" ? "Astro uses @astrojs/react and a hydrated React island (client:load) for this interactive template.\n\n" : ""}Source: https://github.com/gavin100305/skeuomorphism-lib\n`;
  files["LICENSE"] =
    `MIT License\n\nCopyright (c) 2026 Gavin Soares\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n`;
  return zipSync(
    Object.fromEntries(
      Object.entries(files).map(([path, content]) => [
        `${name}-${framework}/${path}`,
        strToU8(content),
      ]),
    ),
    { level: 6 },
  );
}
