import type { Metadata } from "next";
import Link from "next/link";
import { templates, templatePath, type TemplateEntry } from "@/data/templates";
import { DemoThemeButton } from "@/components/demo-theme-button";
import { InstallCommand } from "@/components/templates/install-command";
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
          <div className="template-art-chrome">
            <i />
            <i />
            <i />
            <span>{item.name.toLowerCase()}.</span>
          </div>
          {item.kind === "landing" ? (
            <div className="template-art-landing">
              <div>
                <small>
                  {item.slug === "daymark"
                    ? "A LITTLE PERSPECTIVE"
                    : "ROOM FOR WHAT’S NEXT"}
                </small>
                <strong>
                  {item.slug === "daymark" ? (
                    <>
                      Good things.
                      <br />
                      <em>Take shape.</em>
                    </>
                  ) : (
                    <>
                      Less friction.
                      <br />
                      <em>More possibility.</em>
                    </>
                  )}
                </strong>
                <i />
              </div>
              <div className="template-art-object">
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : (
            <div className="template-art-dashboard">
              <aside>
                <i />
                <i />
                <i />
                <i />
                <i />
              </aside>
              <div>
                <strong>
                  {item.slug === "activity"
                    ? "A clearer view of your day."
                    : "A good day to make things."}
                </strong>
                <div className="template-art-stats">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="template-art-chart">
                  <svg viewBox="0 0 500 100" preserveAspectRatio="none">
                    <path
                      d="M0 90C40 95 50 35 80 50S150 90 190 35S270 75 320 25S410 55 500 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
                <div className="template-art-bottom">
                  <i />
                  <i />
                </div>
              </div>
            </div>
          )}
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
    <main className="template-index">
      <header className="template-index-header">
        <Link href="/" className="template-index-brand">
          skeuomorphism<span>.</span>
        </Link>
        <nav aria-label="Site navigation">
          <Link href="/">Home</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/docs#components">Components</Link>
          <span aria-current="page">Templates</span>
        </nav>
        <DemoThemeButton variant="round" />
      </header>
      <section className="template-index-hero">
        <p>A LITTLE MORE CONSIDERED</p>
        <h1>
          A place to <em>start.</em>
        </h1>
        <div>
          <p>
            Two landing pages. Two dashboards. Each with its own point of view,
            and the same tactile details that make the library feel like itself.
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
  );
}
