"use client";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import catalog from "../../../mobile/catalog.json";
import runtimeDependencies from "../../../mobile/runtime-dependencies.json";
import { PhonePreview } from "./phone-preview";
import { CodeBlock } from "../code-block";
import "../component-documentation.css";
import "./native.css";
export const nativeCatalog = catalog;
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
        <div className={`native-miniature native-miniature-${item.slug}`}>
          <span />
          <span />
          <span />
          <span />
          {item.group === "Templates" && <b>{item.name.toLowerCase()}.</b>}
        </div>
        <span className="native-tile-open">Preview ↗</span>
      </div>
      <div className="native-tile-title">
        <h3>{item.name}</h3>
        <span>↗</span>
      </div>
      <p>{item.description}</p>
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
  const items = catalog.filter(
    (x) =>
      (category
        ? x.group === category
        : filter === "All" || x.group === filter) &&
      `${x.name} ${x.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <main id="docs-workspace" className="native-catalog">
      <header className="native-catalog-heading">
        <div className="native-heading-meta">
          <span>THE NATIVE COLLECTION</span>
          <span>EXPO + REACT NATIVE REUSABLES</span>
        </div>
        <h1>
          {category === "Templates" ? (
            <>
              A place to <em>begin.</em>
            </>
          ) : category === "Blocks" ? (
            <>
              Good things, <em>together.</em>
            </>
          ) : (
            <>
              Made for <em>touch.</em>
            </>
          )}
        </h1>
        <p>
          {category === "Templates"
            ? "Three small worlds. Real screens, working navigation, and the same familiar feel."
            : category === "Blocks"
              ? "A balance, a rhythm, a daily ritual. Compose your next screen from pieces that already belong together."
              : "The keys, the paper, the little bit of depth. Your favorite web materials, made native."}
        </p>
        <div className="native-catalog-links">
          <Link href="/docs/mobile">Components</Link>
          <Link href="/docs/mobile/blocks">Blocks</Link>
          <Link href="/templates/mobile">
            Templates <span>03</span>
          </Link>
        </div>
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
      <div className="native-catalog-count">
        <span>
          {category ?? (filter === "All" ? "The collection" : filter)}
        </span>
        <span>{items.length.toString().padStart(2, "0")} pieces</span>
      </div>
      <div className="native-catalog-grid">
        {items.map((item) => (
          <NativeTile key={item.slug} item={item} />
        ))}
      </div>
      {items.length === 0 && <p role="status">No pieces match your search.</p>}
      <footer className="native-catalog-footer">
        Source you own. Preview it. Press it. Make it yours.
        <Link href="/docs/mobile/button">Try the first key ↗</Link>
      </footer>
    </main>
  );
}
export function NativeDocumentation({ slug }: { slug: string }) {
  const item = catalog.find((x) => x.slug === slug)!;
  const [panel, setPanel] = useState("preview");
  const file = item.file.replace(/\.tsx$/, "");
  const stateful =
    [
      "switch",
      "checkbox",
      "radio-group",
      "slider",
      "tabs",
      "bottom-sheet",
      "dialog",
    ].includes(slug) || slug.startsWith("bottom-bar-");
  const states =
    slug === "slider"
      ? "const [volume, setVolume] = useState(65);"
      : slug.startsWith("bottom-bar-")
        ? 'const [tab, setTab] = useState("home");'
        : ["dialog", "bottom-sheet"].includes(slug)
          ? "const [open, setOpen] = useState(false);"
          : ["switch", "checkbox"].includes(slug)
            ? "const [enabled, setEnabled] = useState(true);"
            : 'const [value, setValue] = useState("week");';
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
          <span>Interactive native source</span>
        </div>
        {panel === "preview" ? (
          <div
            className={`native-preview-stage ${item.group === "Templates" ? "native-preview-template" : ""}`}
          >
            <div className="native-preview-caption">
              <span>
                {item.group === "Templates"
                  ? "A COMPLETE LITTLE WORLD"
                  : "A LITTLE DEPTH GOES A LONG WAY"}
              </span>
              <p>
                {item.group === "Templates"
                  ? "Four tabs. Your own pace."
                  : "Go on. Give it a touch."}
              </p>
              <small>
                Light and dark follow the library theme.
                <br />
                Sound follows the toolbar control.
              </small>
            </div>
            <PhonePreview slug={slug} />
          </div>
        ) : (
          <CodeBlock
            name={`${file.split("/").pop()}.tsx`}
            code={item.example}
          />
        )}
      </section>
      <section id="installation" className="doc-section">
        <h2>Make it yours.</h2>
        <p>
          Run inside an Expo project configured for React Native Reusables with
          NativeWind. The command selects native dependencies for your Expo SDK,
          then adds this item through the registry engine used by React Native Reusables.
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
          code={`${stateful ? 'import { useState } from "react";\n' : ""}${slug === "icon-button" ? 'import { Text } from "react-native";\n' : ""}import { ${item.export} } from "@/components/ui/skeuo-native/${file}";\n${stateful ? "\n// Inside your component:\n" + states + "\n" : ""}\n${item.example}`}
        />
        <p className="doc-small-note">
          Wrap your app in <code>SkeuoProvider</code> from{" "}
          <code>skeuo-native/theme</code> to set appearance, color overrides and
          optional sound or haptic feedback. Templates use your app&apos;s
          existing <code>SafeAreaProvider</code>. Sample data stays in memory.
        </p>
      </section>
      <section id="compatibility" className="doc-section">
        <h2>Fits your app.</h2>
        <p>
          The registry follows React Native Reusables&apos; source-owned
          conventions. Your existing buttons, aliases and app navigation remain
          yours. Use the copied source as a starting point, including your own
          icons and data.
        </p>
        <CodeBlock
          name="Theme and feedback"
          code={
            '<SkeuoProvider appearance="system" haptics={false}\n  onSound={() => playYourClickSound()}>\n  {children}\n</SkeuoProvider>'
          }
        />
        <p>
          Previews render the actual native source through React Native Web.
          Device keyboard, screen-reader and hardware haptics still need checks
          on your target devices.
        </p>
      </section>
    </main>
  );
}
