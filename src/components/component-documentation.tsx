"use client";
import { findComponent } from "@/data/components";
import { ComponentDemo } from "./component-demos";
import "./component-documentation.css";
export function ComponentDocumentation({ slug }: { slug: string }) {
  const component = findComponent(slug)!;
  return <main id="docs-workspace" className="docs-workspace component-documentation">
    <header id="overview" className="doc-component-heading"><span className="docs-kicker">{component.group}</span><h1>{component.name}</h1><p>{component.description}</p><span className="doc-origin">Reused from: {component.origin}</span></header>
    <section id="preview" className="doc-section"><h2>Preview</h2><div className={`doc-live-preview preview-${slug}`}><ComponentDemo slug={slug} /></div></section>
    <section id="props" className="doc-section"><h2>Props</h2><div className="doc-table-scroll"><table><thead><tr><th>Prop</th><th>Type</th><th>Default</th></tr></thead><tbody>{component.props.map(([name,type,value]) => <tr key={name}><td><code>{name}</code></td><td><code>{type}</code></td><td>{value}</td></tr>)}</tbody></table></div></section>
    <section id="accessibility" className="doc-section"><h2>Accessibility</h2><p>{component.accessibility}</p></section>
  </main>;
}
