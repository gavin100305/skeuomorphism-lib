"use client";
import { useEffect, useState } from "react";
import { componentGuides } from "@/data/component-guides";
import { CodeBlock } from "./code-block";
import { findComponent } from "@/data/components";
import { ComponentDemo } from "./component-demos";
import "./component-documentation.css";
export function ComponentDocumentation({ slug }: { slug: string }) {
  const component = findComponent(slug)!;
  const guide = componentGuides[slug];
  const [origin, setOrigin] = useState("");
  useEffect(() => { setOrigin(window.location.origin); }, []);
  const registryName = slug === "keyboard-button" ? "skeuo-key-button" : slug === "textarea" ? "skeuo-input" : `skeuo-${slug}`;
  return <main id="docs-workspace" className="docs-workspace component-documentation">
    <header id="overview" className="doc-component-heading"><span className="docs-kicker">{component.group}</span><h1>{component.name}</h1><p>{component.description}</p><span className="doc-origin">Reused from: {component.origin}</span></header>
    <section id="preview" className="doc-section"><h2>Preview</h2><div className={`doc-live-preview preview-${slug}`}><ComponentDemo slug={slug} /></div></section>
    <section id="installation" className="doc-section"><h2>Installation</h2><p>Run from a React project configured for shadcn. The item includes its required local controls, icons, and CSS. Existing <code>button.tsx</code> files are not replaced.</p>{origin ? <CodeBlock name="Terminal" code={`npx shadcn@4.22.1 add ${origin}/r/${registryName}.json`} /> : <p>Loading the registry address…</p>}<p className="doc-small-note">{origin.includes("localhost") || origin.includes("127.0.0.1") ? "This is a local registry URL. Public installation requires deployment." : "This command uses this website’s registry address."} Requires a CSS-import-capable React setup. If shadcn is not configured, run its init command first. Adjust the example import alias to your configured UI folder.</p></section>
    <section id="usage" className="doc-section"><h2>Usage</h2><CodeBlock code={guide?.example ?? component.example} name="example.tsx" /><p className="doc-small-note">Examples with state or event handlers use a Next.js client boundary. Image paths are placeholders for assets you supply.</p></section>
    <section id="customization" className="doc-section"><h2>Customization</h2><p>{guide?.notes}</p><p>Styles use <code>sk-*</code> classes and <code>--sk-*</code> tokens. Light and dark defaults follow your app’s <code>.light</code>, <code>.dark</code>, or <code>data-theme</code> convention. Fonts follow the host; no font files are downloaded.</p><p>All controls are silent by default. The optional <a href="/docs/provider">theme provider</a> applies local font and token overrides; the <a href="/docs/sound-provider">sound provider</a> connects your own click playback.</p></section>
    <section id="props" className="doc-section"><h2>Props</h2><div className="doc-table-scroll"><table><thead><tr><th>Prop</th><th>Type</th><th>Default</th></tr></thead><tbody>{component.props.map(([name,type,value]) => <tr key={name}><td><code>{name}</code></td><td><code>{type}</code></td><td>{value}</td></tr>)}</tbody></table></div></section>
    <section id="accessibility" className="doc-section"><h2>Accessibility</h2><p>{component.accessibility}</p></section>
  </main>;
}
