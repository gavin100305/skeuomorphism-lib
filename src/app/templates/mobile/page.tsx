import DocsShell from "@/components/docs-shell";
import { NativeCatalog } from "@/components/native/catalog";
export const metadata = { title: "Mobile templates | Skeuomorphism" };
export default function Page() {
  return (
    <DocsShell wide>
      <NativeCatalog category="Templates" />
    </DocsShell>
  );
}
