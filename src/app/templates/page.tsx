import type { Metadata } from "next";
import Link from "next/link";
import { templates, templatePath, type TemplateEntry } from "@/data/templates";
import { InstallCommand } from "@/components/templates/install-command";
import DocsShell from "@/components/docs-shell";
import { TemplateDownload } from "@/components/templates/template-download";
import "./refined-gallery.css";
export const metadata: Metadata = {
  title: "Templates — Skeuomorphism UI",
  description:
    "Two considered landing pages and two tactile dashboards. Preview, customize, and install.",
};
function TemplateTile({ item }: { item: TemplateEntry }) {
  return (
    <article className={`template-tile template-tile-${item.slug}`}>
      <Link
        className="template-tile-link"
        href={templatePath(item)}
        aria-label={`Preview ${item.name}`}
      >
        <div className="template-tile-art" aria-hidden="true">
          <div className={`template-abstract template-abstract-${item.slug}`}>
            <span className="abstract-orbit" />
            <span className="abstract-orbit" />
            <span className="abstract-orbit" />
            <span className="abstract-core" />
            <span className="abstract-rule" />
          </div>
          <span className="template-art-open">
            Open preview <span>↗</span>
          </span>
        </div>
        <div className="template-tile-meta">
          <div>
            <p>{item.category}</p>
            <h3>{item.name}</h3>
          </div>
          <span className="template-tile-arrow">↗</span>
        </div>
        <p className="template-tile-description">{item.description}</p>
      </Link>
      <InstallCommand name={item.registry} />
    </article>
  );
}
export default function TemplatesIndex() {
  return (
    <DocsShell wide>
      <main className="template-index" id="docs-workspace">
        <div className="template-collection-toolbar">
          <span>LIBRARY / TEMPLATES</span>
          <TemplateDownload />
        </div>
        <section className="template-index-hero">
          <p>A LITTLE MORE CONSIDERED</p>
          <h1>
            A place to <em>start.</em>
          </h1>
          <div>
            <p>
              Two landing pages. Two dashboards. Each with its own point of
              view, and the same tactile details that make the library feel like
              itself.
            </p>
            <span>Open a preview. Make it yours.</span>
          </div>
        </section>
        {(["landing", "dashboard"] as const).map((kind) => (
          <section className="template-index-section" key={kind} id={kind}>
            <div className="template-section-heading">
              <h2>{kind === "landing" ? "Landing pages" : "Dashboards"}</h2>
              <p>
                {kind === "landing"
                  ? "Different shapes for your next good thing."
                  : "Comfortable workspaces, down to the details."}
              </p>
            </div>
            <div className="template-grid">
              {templates
                .filter((x) => x.kind === kind)
                .map((item) => (
                  <TemplateTile item={item} key={item.slug} />
                ))}
            </div>
          </section>
        ))}
        <footer className="template-index-footer">
          <span>Four starting points. The rest is yours.</span>
          <Link href="/docs/skills">Use the skill ↗</Link>
          <Link href="/">Back home ↑</Link>
        </footer>
      </main>
    </DocsShell>
  );
}
