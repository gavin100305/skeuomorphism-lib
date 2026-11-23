import { strToU8, zipSync } from "fflate";
import source from "../../../../../public/r/skeuo-native.json";
export function GET() {
  const files = Object.fromEntries(
    source.files.map((file) => [file.path, strToU8(file.content)]),
  );
  files["DEPENDENCIES.json"] = strToU8(
    JSON.stringify(source.dependencies, null, 2),
  );
  files["README.txt"] = strToU8(
    "Skeuomorphism native source\n\nCopy components/ into your Expo app. Install the packages in DEPENDENCIES.json with npx expo install. Wrap your app in SkeuoProvider. See /docs/mobile on the library website for usage. These files are React Native source, not web shadcn registry items.\n",
  );
  return new Response(new Uint8Array(zipSync(files)), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="skeuomorphism-native.zip"',
    },
  });
}
