import Link from "next/link";
import { components } from "@/data/components";
import { Icon } from "./icons";
import { CodeBlock } from "./code-block";
import "./component-documentation.css";

export default function DocsIntroduction() {
  const composed = (group: string) => group === "Cards" || group === "Signature";
  function index(items: typeof components) {
    return <div className="doc-component-index">{items.map(component => <Link href={`/docs/${component.slug}`} key={component.slug}><div><strong>{component.name}</strong><span>{component.group}</span></div><Icon name="diagonal" size={15} /></Link>)}</div>;
  }
  return <main id="docs-workspace" className="docs-workspace component-documentation">
    <header id="overview" className="doc-component-heading"><span className="docs-kicker">GETTING STARTED</span><h1>Introduction</h1><p>Tactile React components with their own styles, replaceable content, and semantic color tokens.</p></header>
    <section id="components" className="doc-section"><h2>Components</h2><p>Choose a control or utility for its preview, installation command, usage, and props.</p>{index(components.filter(component => !composed(component.group)))}</section>
    <section id="blocks" className="doc-section"><h2>Composed components</h2><p>Cards, forms, calendars, timers, and carousels. Each registry item includes the smaller components and styles it needs.</p>{index(components.filter(component => composed(component.group)))}</section>
    <section id="getting-started" className="doc-section"><h2>Installation</h2><p>Start with a React project configured for shadcn. If needed, initialize it first:</p><CodeBlock name="Initialize shadcn" code="npx shadcn@4.22.1 init" /><p>Then install an item from the public registry:</p><CodeBlock name="Install a button" code="npx shadcn@4.22.1 add https://skeuomorphismui.vercel.app/r/skeuo-button.json" /><p>Each component page has its own command. Prefixed files coexist with an existing shadcn button. Your bundler must support CSS imports; no website stylesheet is required.</p><p>Use the <Link href="/docs/provider">theme provider guide</Link> for semantic colors and scoped overrides, or the <Link href="/docs/sound-provider">sound provider guide</Link> for optional click playback.</p></section>
  </main>;
}
