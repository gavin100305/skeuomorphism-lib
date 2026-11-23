import { spawnSync } from "node:child_process";
import { cp, mkdir, rm } from "node:fs/promises";
const run = (command, args, cwd) => {
  const r = spawnSync(command, args, { cwd, stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
};
// Build the actual portable source, not separately authored HTML previews.
run("npm", ["ci", "--no-audit", "--no-fund"], "mobile");
run(
  process.execPath,
  [
    "node_modules/expo/bin/cli",
    "export",
    "--platform",
    "web",
    "--output-dir",
    "dist-preview",
  ],
  "mobile",
);
await rm("public/native-preview", { recursive: true, force: true });
await cp("mobile/dist-preview", "public/native-preview", { recursive: true });
// Expo exports absolute /_expo asset URLs; scope them to the isolated preview directory.
const { readFile, writeFile } = await import("node:fs/promises");
const html = await readFile("public/native-preview/index.html", "utf8");
await writeFile(
  "public/native-preview/index.html",
  html
    .replaceAll('src="/', 'src="/native-preview/')
    .replaceAll('href="/', 'href="/native-preview/'),
);
await mkdir("public/native", { recursive: true });
run(
  "npm",
  ["pack", "./native-cli", "--pack-destination", "public/native"],
  process.cwd(),
);
