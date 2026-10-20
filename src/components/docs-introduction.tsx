import Link from "next/link";
import { components } from "@/data/components";
import { Icon } from "./icons";
import "./component-documentation.css";
export default function DocsIntroduction() {
  return <main id="docs-workspace" className="docs-workspace component-documentation"><header id="overview" className="doc-component-heading"><span className="docs-kicker">GETTING STARTED</span><h1>Introduction</h1><p>Working components, extracted from the landing page and professional portfolio.</p></header><section id="components" className="doc-section"><h2>The first collection</h2><p>Choose a component to try its live preview.</p><div className="doc-component-index">{components.map(component => <Link href={`/docs/${component.slug}`} key={component.slug}><div><strong>{component.name}</strong><span>{component.group}</span></div><Icon name="diagonal" size={15} /></Link>)}</div></section><section id="getting-started" className="doc-section"><h2>About the previews</h2><p>Explore each component’s interactions, light and dark appearance, and accessibility notes. Installation and source examples will be added when the library is ready to publish.</p><p>The components use React and TypeScript, with native controls where possible. They follow the site’s light and dark themes.</p></section></main>;
}
