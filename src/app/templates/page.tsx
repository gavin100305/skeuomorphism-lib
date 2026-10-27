import type { Metadata } from "next";
import Link from "next/link";
import { templates, templatePath } from "@/data/templates";
import type { TemplateEntry } from "@/data/templates";
import "./templates.css";
import "./refined-gallery.css";

export const metadata: Metadata = {
  title: "Templates — Skeuomorphism UI",
  description: "Full-page tactile landing and dashboard templates.",
};

const artCaptions: Record<string, string> = {
  daymark: "A day in motion",
  reel: "Record / refine / share",
  stillroom: "A softer rhythm",
  signal: "Audience at a glance",
  ledger: "The numbers, gently",
  orbit: "Work, together",
};

function TemplateTile({ item }: { item: TemplateEntry }) {
  return (
    <Link className={`template-tile template-tile-${item.slug}`} href={templatePath(item)}>
      <div className="template-tile-art" aria-hidden="true">
        <span className="template-tile-preview-label">{item.category}</span>
        <span className="template-tile-brand">{item.slug}<b>.</b></span>
        <span className="template-tile-shape" />
        <span className="template-tile-caption">{artCaptions[item.slug]}</span>
        <span className="template-tile-view">Open full page ↗</span>
      </div>
      <div className="template-tile-meta">
        <div>
          <span>{item.kind === "landing" ? "LANDING PAGE" : "DASHBOARD"}</span>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
        <span className="template-tile-arrow" aria-hidden="true">↗</span>
      </div>
    </Link>
  );
}

export default function TemplatesIndex() {
  return (
    <main className="template-index">
      <header className="template-index-header">
        <Link href="/" className="template-index-brand"><span className="template-index-mark">✳</span> skeuomorphism.</Link>
        <nav aria-label="Site navigation">
          <Link href="/">Home</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/docs#components">Components</Link>
          <span aria-current="page">Templates</span>
        </nav>
      </header>

      <section className="template-index-hero">
        <p className="template-kicker">THE FULL PICTURE / 001—006</p>
        <h1>Made to <em>feel</em><br />like something.</h1>
        <p>Six complete, hypothetical pages built with the same tactile language as the component library. Open one to explore it full-size, switch its color, and see how the details work together.</p>
      </section>

      {(["landing", "dashboard"] as const).map((kind) => (
        <section className="template-index-section" key={kind} id={kind}>
          <div className="template-section-heading">
            <div>
              <span>{kind === "landing" ? "PAGES WITH A POINT OF VIEW" : "WORKSPACES WITH CHARACTER"}</span>
              <h2>{kind === "landing" ? "Landing pages" : "Dashboards"}</h2>
            </div>
            <p>{kind === "landing" ? "Three different stories, each with its own visual rhythm." : "Three workspaces, each with a top bar and an expandable sidebar."}</p>
          </div>
          <div className="template-grid">
            {templates.filter((item) => item.kind === kind).map((item) => <TemplateTile item={item} key={item.slug} />)}
          </div>
        </section>
      ))}

      <footer className="template-index-footer">
        <span>Six starting points. Make them yours.</span>
        <Link href="/docs/skills">Use the skill ↗</Link>
        <Link href="/">Back home ↑</Link>
      </footer>
    </main>
  );
}
