import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import "@/components/component-documentation.css";

export const metadata: Metadata = {
  title: "Skills — Skeuomorphism",
  description: "Install and use the Skeuomorphism UI skill with Codex.",
};

export default function SkillsPage() {
  return <main id="docs-workspace" className="docs-workspace component-documentation">
    <header id="overview" className="doc-component-heading">
      <span className="docs-kicker">GETTING STARTED</span>
      <h1>Skills</h1>
      <p>The <code>skeuomorphism-ui</code> skill helps Codex choose, use, and design components that fit this library’s materials and theme tokens. It includes guidance for all 19 original registry items.</p>
    </header>
    <section id="install" className="doc-section">
      <h2>Install in Codex</h2>
      <p>Ask the built-in skill installer to get the skill from the repository:</p>
      <CodeBlock name="Codex prompt" code={`$skill-installer
Install skeuomorphism-ui from
wrestle-R/skeuomorphism-lib,
path skills/skeuomorphism-ui.`} />
      <p className="doc-small-note">Codex can detect installed skills automatically. If it doesn’t appear, restart Codex. <a href="https://github.com/wrestle-R/skeuomorphism-lib/tree/main/skills/skeuomorphism-ui">View the skill source ↗</a></p>
    </section>
    <section id="start" className="doc-section">
      <h2>Start using it</h2>
      <p>Mention the skill in your prompt. For example:</p>
      <CodeBlock name="Starter prompt" code={`Use $skeuomorphism-ui.
Build a settings panel with a switch
and slider in the library’s style.`} />
      <p>The skill guides Codex; the components are installed separately through the shadcn registry. See the <Link href="/docs#getting-started">installation guide</Link> for a component command.</p>
    </section>
  </main>;
}
