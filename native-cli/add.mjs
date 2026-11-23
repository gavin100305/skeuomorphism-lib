#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
const [action, url, ...flags] = process.argv.slice(2);
if (action !== "add" || !url) {
  console.log("Usage: skeuo-native add <registry-item-url> [--yes]");
  process.exit(action === "--help" ? 0 : 1);
}
const address = new URL(url);
if (!["http:", "https:"].includes(address.protocol))
  throw Error("Use an HTTP registry URL.");
if (!existsSync("package.json"))
  throw Error("Run inside your Expo / React Native Reusables project.");
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const response = await fetch(address);
if (!response.ok) throw Error(`Registry request failed (${response.status}).`);
const item = await response.json();
if (item.meta?.platform !== "react-native")
  throw Error("This is not a native registry item.");
const native = item.meta.expoDependencies ?? [];
if (native.some((name) => !/^(@[a-z0-9-]+\/)?[a-z0-9-]+$/.test(name)))
  throw Error("Invalid dependency name in registry.");
function run(args) {
  const result = spawnSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    args,
    { stdio: "inherit", shell: false },
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
}
if (native.length) {
  if (!pkg.dependencies?.expo)
    throw Error(
      "This collection requires Expo modules. Configure Expo modules before adding it to a bare React Native project.",
    );
  run(["expo", "install", ...native]);
}
// Use RNR's documented shadcn registry engine directly, pinned for repeatable installs.
// No overwrite flag: preserve existing host components.
run([
  "--yes",
  "--package=shadcn@4.22.1",
  "--",
  "shadcn",
  "add",
  address.href,
  ...(flags.includes("--yes") ? ["--yes"] : []),
]);
