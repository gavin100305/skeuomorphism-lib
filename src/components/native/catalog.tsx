"use client";
import Link from "next/link";
import { TemplateThumbnail } from "../templates/template-thumbnail";
import { useState, useSyncExternalStore } from "react";
import allNativeItems from "../../../mobile/catalog.json";
import unlisted from "../../../mobile/unlisted.json";
import runtimeDependencies from "../../../mobile/runtime-dependencies.json";
import { PhonePreview } from "./phone-preview";
import { CodeBlock } from "../code-block";
import "../component-documentation.css";
import "./native.css";
const catalog = allNativeItems.filter((item) => !unlisted.includes(item.slug));
const noop = () => () => {};
const origin = () => window.location.origin;
const serverOrigin = () => "";
export function NativeInstall({ slug }: { slug: string }) {
  const site = useSyncExternalStore(noop, origin, serverOrigin);
  return (
    <div className="native-install">
      {site ? (
        <CodeBlock
          name="Add to your Expo / Reusables project"
          code={`npx expo install ${(runtimeDependencies as Record<string, string[]>)[slug].join(" ")}\nnpx --yes --package=shadcn@4.22.1 -- shadcn add ${site}/r/native/${slug}.json`}
        />
      ) : (
        <p>Loading install command…</p>
      )}
      <details>
        <summary>Prefer a single command?</summary>
        <p>
          The optional installer runs both steps for you. Your npm configuration
          must allow URL packages.
        </p>
        {site && (
          <CodeBlock
            name="Automatic SDK-compatible installer"
            code={`npx --yes --package=${site}/native/skeuo-native-cli-0.1.0.tgz skeuo-native add ${site}/r/native/${slug}.json`}
          />
        )}
      </details>
    </div>
  );
}
function NativeTile({ item }: { item: (typeof catalog)[number] }) {
  return (
    <Link
      href={`/docs/mobile/${item.slug}`}
      className={`native-tile native-tile-${item.group.toLowerCase().replace(" ", "-")}`}
    >
      <div className="native-tile-art" aria-hidden="true">
        {item.group === "Templates" ? (
          <TemplateThumbnail name={item.slug} />
        ) : (
          <div className={`native-miniature native-miniature-${item.slug}`}>
            <span />
            <span />
            <span />
            <span />
          </div>
        )}
        {item.group !== "Templates" && <span className="native-tile-open">Preview ↗</span>}
      </div>
      <div className="native-tile-copy">
        <div className="native-tile-title">
          <h3>{item.name}</h3>
          {item.group !== "Templates" && <span aria-hidden="true">↗</span>}
        </div>
        <p>{item.description}</p>
        {item.group === "Templates" && <span className="native-feature-link">Open live preview ↗</span>}
      </div>
    </Link>
  );
}
export function NativeCatalog({
  category,
}: {
  category?: "Templates" | "Blocks";
}) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const group = category ?? filter;
  const items = catalog.filter(
    (x) =>
      (group === "All"
        ? x.group !== "Blocks" && x.group !== "Templates"
        : x.group === group) &&
      `${x.name} ${x.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <main id="docs-workspace" className="native-catalog">
      <header className="native-catalog-heading">
        <h1>Mobile {category?.toLowerCase() ?? "components"}</h1>
        <p>
          {category === "Templates"
            ? "A working expense tracker for Expo."
            : category === "Blocks"
              ? "Ready-to-use layouts for balance, activity, and transactions."
              : "Tactile controls for Expo and React Native Reusables."}
        </p>
        <nav aria-label="Mobile collection" className="native-catalog-links">
          <Link href="/docs/mobile" aria-current={!category ? "page" : undefined}>
            Components
          </Link>
          <Link href="/docs/mobile/blocks" aria-current={category === "Blocks" ? "page" : undefined}>
            Blocks
          </Link>
          <Link href="/templates/mobile" aria-current={category === "Templates" ? "page" : undefined}>
            Templates
          </Link>
        </nav>
      </header>
      {!category && (
        <div className="native-catalog-toolbar">
          <div role="group" aria-label="Filter native components">
            {[
              "All",
              "Buttons",
              "Forms",
              "Navigation",
              "Surfaces",
              "Signature",
              "Bottom bars",
            ].map((group) => (
              <button
                key={group}
                aria-pressed={filter === group}
                onClick={() => setFilter(group)}
              >
                {group}
              </button>
            ))}
          </div>
          <label>
            <span className="sr-only">Search native collection</span>
            <input
              type="search"
              placeholder="Find something…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
      )}
      {category !== "Templates" && <div className="native-catalog-count">
        <span>
          {category ?? (filter === "All" ? "The collection" : filter)}
        </span>
        <span>
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>}
      <div
        className={
          category === "Templates"
            ? "native-catalog-grid native-template-grid"
            : "native-catalog-grid"
        }
      >
        {items.map((item) => (
          <NativeTile key={item.slug} item={item} />
        ))}
      </div>
      {items.length === 0 && <p role="status">No pieces match your search.</p>}
    </main>
  );
}
export function NativeDocumentation({ slug }: { slug: string }) {
  const item = allNativeItems.find((x) => x.slug === slug)!;
  const showPhone = item.group === "Templates" || item.group === "Bottom bars";
  const [panel, setPanel] = useState("preview");
  const file = item.file.replace(/\.tsx$/, "");
  const stateful =
    [
      "switch",
      "checkbox",
      "radio-group",
      "slider",
      "rotary-knob",
      "tabs",
      "bottom-sheet",
      "dialog",
    ].includes(slug) || slug.startsWith("bottom-bar-");
  const states =
    slug === "rotary-knob"
      ? "const [volume, setVolume] = useState(68);"
      : slug === "slider"
        ? "const [volume, setVolume] = useState(65);"
        : slug.startsWith("bottom-bar-")
          ? 'const [tab, setTab] = useState("home");'
          : ["dialog", "bottom-sheet"].includes(slug)
            ? "const [open, setOpen] = useState(false);"
            : ["switch", "checkbox"].includes(slug)
              ? "const [enabled, setEnabled] = useState(true);"
              : 'const [value, setValue] = useState("week");';
  const pocketUsage = `import { SafeAreaProvider } from "react-native-safe-area-context";
import { SkeuoProvider } from "@/components/ui/skeuo-native/theme";
import { PocketTemplate } from "@/components/ui/skeuo-native/templates/pocket";

export default function App() {
  return (
    <SafeAreaProvider>
      <SkeuoProvider>
        <PocketTemplate />
      </SkeuoProvider>
    </SafeAreaProvider>
  );
}`;
  return (
    <main id="docs-workspace" className="native-detail component-documentation">
      <header id="overview" className="doc-component-heading">
        <Link
          className="native-back"
          href={
            item.group === "Templates"
              ? "/templates/mobile"
              : item.group === "Blocks"
                ? "/docs/mobile/blocks"
                : "/docs/mobile"
          }
        >
          ‹ {item.group === "Templates" ? "Templates" : "Native collection"}
        </Link>
        <div className="native-heading-meta">
          <span>{item.group.toUpperCase()}</span>
          <span>REACT NATIVE</span>
        </div>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
      </header>
      <div className={slug === "pocket" ? "native-detail-grid native-pocket-layout" : "native-detail-grid"}>
        <section id="preview" className="doc-section">
          <div className="native-preview-toolbar">
            <div role="group" aria-label="Example view">
              <button
                aria-pressed={panel === "preview"}
                onClick={() => setPanel("preview")}
              >
                Preview
              </button>
              <button
                aria-pressed={panel === "code"}
                onClick={() => setPanel("code")}
              >
                Code
              </button>
            </div>
            <span>React Native Web</span>
          </div>
          {panel === "preview" ? (
            <div className={showPhone ? "native-preview-stage" : "native-preview-stage native-preview-inline"}>
              {slug === "pocket" && (
                <div className="native-pocket-intro">
                  <h2>Take Pocket for a spin.</h2>
                  <p>Add an expense and see the balance update, or use the dock to explore spending and account settings.</p>
                  <a href="#installation">Install Pocket <span aria-hidden="true">↓</span></a>
                </div>
              )}
              <PhonePreview slug={slug} framed={showPhone} />
            </div>
          ) : (
            <CodeBlock
              name={`${file.split("/").pop()}.tsx`}
              code={item.example}
            />
          )}
        </section>
        <div className="native-detail-guide">
          <section id="installation" className="doc-section">
            <h2>Installation</h2>
            <p>
              Run these commands in an Expo project configured for React Native Reusables and NativeWind.
            </p>
            <NativeInstall slug={slug} />
            <p className="doc-small-note">
              Tested baseline: Expo 54, React Native 0.81, React 19.1, NativeWind 4.
              Existing Reusables controls are reused; the tactile source is added
              under <code>components/ui/skeuo-native/</code>. No overwrite flag is
              used.
            </p>
          </section>
          <section id="usage" className="doc-section">
            <h2>Usage</h2>
            <CodeBlock
              name="example.tsx"
              code={slug === "pocket" ? pocketUsage : `${stateful ? 'import { useState } from "react";\n' : ""}${slug === "icon-button" ? 'import { Text } from "react-native";\n' : ""}import { ${item.export} } from "@/components/ui/skeuo-native/${file}";\n${stateful ? "\n// Inside your component:\n" + states + "\n" : ""}\n${item.example}`}
            />
            {slug !== "pocket" && <p className="doc-small-note">
              Wrap your app in <code>SkeuoProvider</code> from{" "}
              <code>skeuo-native/theme</code> to set appearance, color overrides and
              optional sound or haptic feedback. Templates use your app&apos;s
              existing <code>SafeAreaProvider</code>. Sample data stays in memory.
            </p>}
          </section>
          <section id="compatibility" className="doc-section">
            <h2>Compatibility</h2>
            <p>
              The registry follows React Native Reusables&apos; source-owned
              conventions. Your existing buttons, aliases and app navigation remain
              yours. Use the copied source as a starting point, including your own
              icons and data.
            </p>
            {slug !== "pocket" && <CodeBlock
              name="Theme and feedback"
              code={
                '<SkeuoProvider appearance="system" haptics={false}\n  onSound={() => playYourClickSound()}>\n  {children}\n</SkeuoProvider>'
              }
            />}
            <p>
              Previews render the actual native source through React Native Web.
              Device keyboard, screen-reader and hardware haptics still need checks
              on your target devices.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
