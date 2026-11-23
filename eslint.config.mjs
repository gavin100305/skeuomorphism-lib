import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  { files: ["mobile/*.config.js"], rules: { "@typescript-eslint/no-require-imports": "off" } },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "artifacts/**",
    "mobile/node_modules/**",
    "mobile/dist/**",
    "mobile/dist-preview/**",
    "public/native-preview/**",
    "mobile/.expo/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
