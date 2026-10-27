"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { SkeuoSurface } from "@/components/skeuomorphic/skeuo-surface";
import PushpinTearFooter from "@/components/ui/pushpin-tear-footer";
import { themePresets } from "./theme-presets";
import type { TemplateMode, TemplatePalette } from "./theme-presets";
import { TemplateMark } from "./template-mark";
import { useTemplateMotion } from "./template-motion";

function LandingHeader({ name, links, action }: {
  name: string;
  links: [string, string][];
  action: [string, string];
}) {
  return (
    <header className="tpl-landing-nav">
      <a className="tpl-brand" href="#top"><TemplateMark variant={name} />{name}<span>.</span></a>
      <nav aria-label={`${name} sections`}>
        {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <a className="tpl-nav-action" href={action[1]}>{action[0]} <span aria-hidden="true">↗</span></a>
    </header>
  );
}

const feedbackPrompts = [
  { lead: "The moment it clicked.", question: "What became easier after you started using it?", note: "Add a verified customer story that names a real change." },
  { lead: "The detail they remember.", question: "Which small interaction made the work feel better?", note: "Use a genuine quote with permission and attribution." },
  { lead: "The result that lasted.", question: "What would they miss if this disappeared tomorrow?", note: "A specific answer is stronger than a vague compliment." },
];

function FeedbackSection({ product }: { product: string }) {
  const [index, setIndex] = useState(0);
  const slide = feedbackPrompts[index];
  return (
    <section className="tpl-feedback tpl-reveal" id="voices" aria-label="Testimonial layout">
      <div className="tpl-feedback-title">
        <span className="tpl-kicker">IN THEIR WORDS</span>
        <h2>Let a real story<br /><em>do the talking.</em></h2>
        <p>This is a testimonial layout for {product}. Replace the prompts with permissioned words from actual people.</p>
      </div>
      <div className="tpl-feedback-stage">
        <div className="tpl-feedback-quote-mark" aria-hidden="true">“</div>
        <p className="tpl-feedback-lead">{slide.lead}</p>
        <blockquote>{slide.question}</blockquote>
        <div className="tpl-feedback-stage-bottom">
          <span>{slide.note}</span>
          <div>
            <button type="button" onClick={() => setIndex((index + feedbackPrompts.length - 1) % feedbackPrompts.length)} aria-label="Previous testimonial prompt">←</button>
            <span aria-live="polite">{index + 1} / {feedbackPrompts.length}</span>
            <button type="button" onClick={() => setIndex((index + 1) % feedbackPrompts.length)} aria-label="Next testimonial prompt">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function LandingFooter({ name, message, action, palette, mode }: {
  name: string;
  message: ReactNode;
  action: [string, string];
  palette: TemplatePalette;
  mode: TemplateMode;
}) {
  const colors = themePresets[palette][mode];
  return (
    <div className="tpl-footer-wrap" id="footer">
      <section className="tpl-footer-cta">
        <span className="tpl-kicker">THE NEXT STEP IS YOURS</span>
        <h2>{message}</h2>
        <a className="tpl-solid-button" href={action[1]}>{action[0]} ↗</a>
      </section>
      <PushpinTearFooter
        className="tpl-pushpin-footer"
        brand={`${name}.`}
        name={name}
        logo={<span className="tpl-pushpin-logo"><TemplateMark variant={name} />{name}.</span>}
        logoHref="#top"
        sheet={colors.accent}
        sheetInk={colors.accentInk}
        paper={colors.background}
        paperInk={colors.ink}
        seed={name === "daymark" ? 23 : name === "reel" ? 31 : 41}
        height="760px"
        fontSans='var(--font-geist-sans), sans-serif'
        email={null}
        newsletter={null}
        status={null}
        timeZone={null}
        socials={[]}
        chat={null}
        mark="CONCEPT / 2026"
        columns={[
          { title: "Explore", links: [{ label: "The product", href: "#features" }, { label: "Stories", href: "#voices" }], cta: { label: "explore.", href: action[1] } },
          { title: "Collection", links: [{ label: "All templates", href: "/templates" }, { label: "The skill", href: "/docs/skills" }], cta: { label: "browse.", href: "/templates" } },
        ]}
        sideLinks={[]}
        copyright={`© 2026 ${name} concept`}
        credit="built with Skeuomorphism UI"
        handle={{ label: "all templates", href: "/templates" }}
      />
    </div>
  );
}

const dayModes = {
  Day: { focus: "5h 35m", longest: "92 min", bars: [26, 40, 76, 48, 94, 70, 36, 56, 21, 41, 15, 28] },
  Week: { focus: "27h 10m", longest: "2h 04m", bars: [42, 60, 72, 67, 86, 43, 30, 56, 71, 82, 62, 74] },
  Month: { focus: "106h 42m", longest: "2h 18m", bars: [30, 44, 37, 56, 72, 68, 81, 70, 85, 78, 94, 88] },
};
type DayMode = keyof typeof dayModes;

export function DaymarkLanding({ palette, mode }: { palette: TemplatePalette; mode: TemplateMode }) {
  const scope = useTemplateMotion();
  const [range, setRange] = useState<DayMode>("Day");
  const stats = dayModes[range];

  return (
    <div ref={scope} className="tpl-landing tpl-daymark" id="top">
      <LandingHeader name="daymark" links={[["The day", "#features"], ["Inside", "#inside"], ["Voices", "#voices"]]} action={["See the workspace", "#inside"]} />
      <main>
        <section className="day-hero">
          <div className="day-hero-copy">
            <span className="tpl-kicker">YOUR DAY, IN VIEW</span>
            <h1>Time leaves<br /><em>a trace.</em></h1>
            <p>Notice where your hours really go. Keep the focus that matters, and let the rest of the day breathe.</p>
            <div className="tpl-actions">
              <a className="tpl-solid-button" href="#inside">Explore the workspace ↗</a>
              <a className="tpl-under-link" href="#features">Follow a day ↓</a>
            </div>
            <span className="day-hero-aside">A fictional product with illustrative data</span>
          </div>
          <div className="day-clock-wrap" aria-label="Illustrative circular day timeline">
            <div className="day-clock">
              <div className="day-clock-inner">
                <span>THE DAY IN MOTION</span>
                <strong>12:56</strong>
                <small>FOCUS SESSION</small>
                <em>Building something good</em>
              </div>
            </div>
            <div className="day-clock-foot"><span>6 AM</span><div className="day-activity" /><span>6 PM</span></div>
          </div>
        </section>

        <div className="day-principles" aria-label="Daymark benefits">
          <span>See the shape.</span><span>Find the focus.</span><span>Keep the good hours.</span>
        </div>

        <section className="day-story" id="features">
          <div className="day-story-copy">
            <span className="tpl-kicker">A QUIETER KIND OF CLARITY</span>
            <h2>Every day<br /><em>tells a story.</em></h2>
            <p>Not a score to chase. A way to understand the rhythm of your work and make more intentional room for it.</p>
          </div>
          <div className="day-story-track">
            <article className="day-story-event tpl-reveal"><time>09:20</time><div><span>Deep work</span><h3>The first good stretch.</h3><p>One task. One quiet window. Nothing competing for your attention.</p></div></article>
            <article className="day-story-event tpl-reveal"><time>12:40</time><div><span>Room to pause</span><h3>Step away without losing the thread.</h3><p>The timeline keeps the context. You get to take the break.</p></div></article>
            <article className="day-story-event tpl-reveal"><time>16:15</time><div><span>Looking back</span><h3>Know when the day worked.</h3><p>See patterns across the hours, then leave the numbers behind.</p></div></article>
          </div>
        </section>

        <section className="day-interface tpl-reveal" id="inside">
          <div className="day-interface-intro"><span className="tpl-kicker">THE WORKSPACE</span><h2>Your attention,<br /><em>in perspective.</em></h2><p>Choose a view to see how the story changes. This demo uses sample data and stays entirely in your browser.</p></div>
          <SkeuoSurface className="day-product">
            <div className="day-product-top"><span><TemplateMark /> daymark / overview</span><div role="group" aria-label="Time range">{(Object.keys(dayModes) as DayMode[]).map((key) => <button type="button" key={key} aria-pressed={range === key} onClick={() => setRange(key)}>{key}</button>)}</div></div>
            <div className="day-product-body">
              <span className="tpl-kicker">YOUR ATTENTION, AT A GLANCE</span>
              <div className="day-product-title">A little clarity for your day.</div>
              <div className="day-product-stats"><div><small>FOCUSED TIME</small><strong>{stats.focus}</strong><span>Time spent in focus</span></div><div><small>BEST STRETCH</small><strong>{stats.longest}</strong><span>Your longest session</span></div><div><small>DAY BALANCE</small><strong>72%</strong><span>Room for the rest</span></div></div>
              <div className="day-chart" aria-label={`${range} focus chart`}><div className="day-chart-bars">{stats.bars.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></div>
              <div className="day-chart-axis"><span>06:00</span><span>10:00</span><span>14:00</span><span>18:00</span></div>
            </div>
          </SkeuoSurface>
        </section>

        <FeedbackSection product="Daymark" />
      </main>
      <LandingFooter name="daymark" message={<>Make time for<br /><em>what matters.</em></>} action={["Return to the day", "#top"]} palette={palette} mode={mode} />
    </div>
  );
}

export function ReelLanding({ palette, mode }: { palette: TemplatePalette; mode: TemplateMode }) {
  const scope = useTemplateMotion();
  return (
    <div ref={scope} className="tpl-landing tpl-reel" id="top">
      <LandingHeader name="reel" links={[["Watch", "#demo"], ["How it works", "#features"], ["Voices", "#voices"]]} action={["Play the demo", "#demo"]} />
      <main>
        <section className="reel-hero">
          <span className="tpl-kicker">A BETTER WAY TO SHOW THE WORK</span>
          <h1>Some things are<br />easier to <em>show.</em></h1>
          <p>Capture an idea, shape the story, and give someone the context they actually need. One clear link can do a lot.</p>
          <div className="tpl-actions"><a className="tpl-solid-button" href="#demo">Watch the product film ↗</a><a className="tpl-under-link" href="#features">Explore the flow ↓</a></div>
          <div className="reel-orbit reel-orbit-one" aria-hidden="true" /><div className="reel-orbit reel-orbit-two" aria-hidden="true" />
        </section>

        <section className="reel-video-section tpl-reveal" id="demo">
          <div className="reel-video-heading"><span className="tpl-kicker">THE PRODUCT FILM</span><p>Record. Refine. Share. The whole flow in 16 seconds.</p></div>
          <div className="reel-video-frame">
            <div className="reel-video-chrome"><span><i /><i /><i /></span><span>reel / a short walkthrough</span><span>STUDIO VIEW</span></div>
            <video controls playsInline preload="metadata" poster="/templates/reel-poster-v2.svg" aria-label="Original Reel concept product demo video"><source src="/templates/reel-demo.mp4" type="video/mp4" />Your browser does not support video playback.</video>
          </div>
          <p className="tpl-sample-note">This is an original concept film for the fictional Reel product.</p>
        </section>

        <div className="reel-marquee" aria-label="Ways to use Reel"><div aria-hidden="true">WALKTHROUGHS <span>◆</span> FEEDBACK <span>◆</span> PRODUCT UPDATES <span>◆</span> ASYNC REVIEWS <span>◆</span> WALKTHROUGHS <span>◆</span> FEEDBACK <span>◆</span></div></div>

        <section className="reel-feature" id="features">
          <div className="reel-feature-heading tpl-reveal"><span className="tpl-kicker">FROM THE FIRST THOUGHT</span><h2>Show the work.<br /><em>Keep the nuance.</em></h2><p>A complete story in the space between a quick message and another meeting.</p></div>
          <div className="reel-bento">
            <article className="reel-bento-main tpl-reveal"><span>THE STUDIO</span><div className="reel-editor-art"><div className="reel-editor-preview"><span>REC</span><strong>See the moment.</strong><small>Keep the context.</small></div><div className="reel-editor-timeline"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div><h3>Make the story yours.</h3><p>Keep the good moments, trim the pauses, and give the viewer a clear way through.</p></article>
            <article className="reel-bento-small tpl-reveal"><span>SHAREABLE BY DESIGN</span><h3>One link.<br />Full context.</h3><p>The explanation stays with the work, wherever it goes.</p><b aria-hidden="true">↗</b></article>
            <article className="reel-bento-small tpl-reveal"><span>MADE FOR TEAMS</span><h3>Less meeting.<br />More momentum.</h3><p>Show a decision once. Let people watch when it suits them.</p><b aria-hidden="true">◉</b></article>
          </div>
        </section>

        <section className="reel-desire"><div className="reel-desire-head"><span className="tpl-kicker">THREE SIMPLE MOVES</span><h2>A thought becomes<br /><em>a story.</em></h2></div><div className="reel-stack"><article className="reel-stack-card"><span>Record</span><h3>Start with what is on your screen.</h3><p>Bring your voice, your cursor, and the work itself into one place.</p><div className="reel-stack-mark" aria-hidden="true">◉</div></article><article className="reel-stack-card"><span>Shape</span><h3>Keep the part worth watching.</h3><p>A light edit turns a rough recording into a useful explanation.</p><div className="reel-stack-mark" aria-hidden="true">⌁</div></article><article className="reel-stack-card"><span>Send</span><h3>Give everyone the same clear picture.</h3><p>A link that holds the story together, even after the conversation moves on.</p><div className="reel-stack-mark" aria-hidden="true">↗</div></article></div></section>

        <FeedbackSection product="Reel" />
      </main>
      <LandingFooter name="reel" message={<>Let the work<br /><em>speak for itself.</em></>} action={["Watch it again", "#demo"]} palette={palette} mode={mode} />
    </div>
  );
}

const rituals = [
  { name: "Morning light", length: "5 minutes", detail: "Start the day before the day starts asking for things.", art: "morning" },
  { name: "In between", length: "12 minutes", detail: "A little room between one obligation and the next.", art: "between" },
  { name: "Evening return", length: "8 minutes", detail: "Put the day down without needing to solve it first.", art: "evening" },
];

export function StillroomLanding({ palette, mode }: { palette: TemplatePalette; mode: TemplateMode }) {
  const scope = useTemplateMotion();
  const [selected, setSelected] = useState(0);
  return (
    <div ref={scope} className="tpl-landing tpl-stillroom" id="top">
      <LandingHeader name="stillroom" links={[["The space", "#features"], ["Rituals", "#inside"], ["Voices", "#voices"]]} action={["Explore the rituals", "#inside"]} />
      <main>
        <section className="still-hero">
          <div className="still-hero-copy"><span className="tpl-kicker">A SMALL PLACE TO RETURN TO YOURSELF</span><h1>Make room<br />for <em>quiet.</em></h1><p>Short, thoughtful rituals for the spaces between everything else. Arrive as you are. Leave with a little more room.</p><div className="tpl-actions"><a className="tpl-solid-button" href="#inside">Find a ritual ↗</a><a className="tpl-under-link" href="#features">What is Stillroom? ↓</a></div></div>
          <div className="still-hero-art" role="img" aria-label="Sunlit plaster room overlooking quiet hills"><span>THE SPACE BETWEEN MOMENTS</span></div>
        </section>

        <section className="still-statement tpl-reveal" id="features"><span className="tpl-kicker">AN INVITATION, NOT ANOTHER TASK</span><p>You do not have to earn <span className="still-statement-image" role="img" aria-label="A quiet sunlit room" /> a pause.<br /><em>You can just take one.</em></p></section>

        <section className="still-rituals" id="inside"><div className="tpl-section-head tpl-reveal"><span className="tpl-kicker">PICK A MOMENT</span><h2>Find your way<br /><em>back to now.</em></h2><p>Three small rituals. Each is a place to begin, never a requirement to finish.</p></div><div className="still-accordion" role="group" aria-label="Choose a ritual">{rituals.map((ritual, index) => <button className={`still-ritual still-ritual-${ritual.art}`} type="button" key={ritual.name} aria-expanded={selected === index} onClick={() => setSelected(index)}><span className="still-ritual-art" aria-hidden="true" /><span className="still-ritual-content"><small>{ritual.length}</small><strong>{ritual.name}</strong><span>{ritual.detail}</span></span><span className="still-ritual-arrow" aria-hidden="true">↗</span></button>)}</div></section>

        <section className="still-note tpl-reveal"><div><span className="tpl-kicker">A LITTLE MORE SPACE</span><h2>Take the moment.<br /><em>Keep the feeling.</em></h2></div><p>Stillroom is imagined as a gentle companion, not a system to optimize. A few minutes can belong entirely to you.</p></section>

        <FeedbackSection product="Stillroom" />
      </main>
      <LandingFooter name="stillroom" message={<>Come back<br /><em>to yourself.</em></>} action={["Explore the rituals", "#inside"]} palette={palette} mode={mode} />
    </div>
  );
}
