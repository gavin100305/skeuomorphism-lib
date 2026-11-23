import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
const root = "mobile/components/skeuomorphic";
const catalog = JSON.parse(await readFile("mobile/catalog.json", "utf8"));
await mkdir("public/r/native", { recursive: true });
const runtime = {};
for (const item of catalog) {
  const files = new Map();
  const packages = new Set();
  const expo = new Set();
  const registryDependencies = new Set();
  async function visit(relative) {
    if (files.has(relative)) return;
    const content = await readFile(path.join(root, relative), "utf8");
    files.set(relative, content);
    for (const match of content.matchAll(
      /(?:from\s+|import\s*)['"]([^'"]+)['"]/g,
    )) {
      const dep = match[1];
      if (dep.startsWith(".")) {
        let p = path.posix.normalize(
          path.posix.join(path.posix.dirname(relative), dep),
        );
        if (!path.extname(p)) {
          try {
            await readFile(path.join(root, p + ".tsx"));
            p += ".tsx";
          } catch {
            p += ".ts";
          }
        }
        await visit(p);
      } else if (dep.startsWith("@/components/ui/"))
        registryDependencies.add(
          `https://reactnativereusables.com/r/nativewind/${dep.split("/").pop()}.json`,
        );
      else if (
        dep.startsWith("expo-") ||
        dep === "@react-native-community/slider" ||
        dep === "react-native-safe-area-context"
      )
        expo.add(dep);
      else if (!["react", "react-native"].includes(dep)) packages.add(dep);
    }
  }
  await visit(item.file);
  runtime[item.slug] = [...expo];
  const result = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `skeuo-native-${item.slug}`,
    type:
      item.group === "Templates" || item.group === "Blocks"
        ? "registry:block"
        : "registry:ui",
    title: item.name,
    description: item.description,
    dependencies: [...packages],
    registryDependencies: [...registryDependencies],
    meta: {
      platform: "react-native",
      expoDependencies: [...expo],
      testedWith: { expo: "54", reactNative: "0.81.5", nativewind: "4.2.1" },
    },
    files: [...files].map(([p, content]) => ({
      path: `mobile/components/skeuomorphic/${p}`,
      type: "registry:ui",
      target: `@ui/skeuo-native/${p}`,
      content,
    })),
  };
  await writeFile(
    `public/r/native/${item.slug}.json`,
    JSON.stringify(result, null, 2) + "\n",
  );
}
console.log(`Built ${catalog.length} native registry items.`);

await writeFile(
  "mobile/runtime-dependencies.json",
  JSON.stringify(runtime, null, 2) + "\n",
);
