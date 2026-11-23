import { readFile, writeFile } from "node:fs/promises";
const paths = [
  "components/skeuomorphic/index.tsx",
  "components/skeuomorphic/theme.tsx",
];
const pkg = JSON.parse(await readFile("mobile/package.json", "utf8"));
const names = [
  "expo-linear-gradient",
  "expo-haptics",
  "@rn-primitives/checkbox",
  "@rn-primitives/switch",
  "@react-native-community/slider",
];
const dependencies = Object.fromEntries(
  names.map((name) => [name, pkg.dependencies[name]?.replace(/^[~^]/, "")]),
);
if (Object.values(dependencies).some((value) => !value))
  throw new Error("Install mobile dependencies first.");
const files = await Promise.all(
  paths.map(async (path) => ({
    path,
    content: await readFile(`mobile/${path}`, "utf8"),
  })),
);
files.push({ path: "LICENSE", content: await readFile("LICENSE", "utf8") });
await writeFile(
  "public/r/skeuo-native.json",
  JSON.stringify(
    { name: "skeuo-native", platform: "react-native", dependencies, files },
    null,
    2,
  ) + "\n",
);
