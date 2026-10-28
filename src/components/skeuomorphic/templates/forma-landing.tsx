"use client";

import { useState } from "react";
import { SkeuoButton } from "../skeuo-button";
import { SkeuoSurface } from "../skeuo-surface";
import { SkeuoSwitch } from "../skeuo-switch";
import PushpinTearFooter from "./pushpin-tear-footer";
import {
  TemplateFrame,
  type TemplateOptions,
  type TemplateState,
} from "./template-frame";
import { themePresets } from "./theme-presets";
import { LandingNav, DashboardStill, Questions } from "./landing-parts";
import { Brand, Glyph, Reveal } from "./template-ui";

function FormaContent({
  state,
  options,
}: {
  state: TemplateState;
  options: TemplateOptions;
}) {
  const [view, setView] = useState(0);
  const [simple, setSimple] = useState(true);
  const color = themePresets[state.palette][state.mode];
  return (
    <div className="sk-t-forma" id="top">
      <LandingNav
        name="forma"
        state={state}
        soundControl={options.soundControl}
      />
      <main id="sk-template-main">
        <section className="sk-t-forma-hero sk-t-shell">
          <div>
            <p className="sk-t-eyebrow">A little space for what’s next.</p>
            <h1>
              Good things.
              <br />
              <em>Take shape.</em>
            </h1>
            <p className="sk-t-hero-description">
              A clearer way to bring it all together.
              <br />
              Your ideas, your people, your own little world.
            </p>
            <div className="sk-t-hero-actions">
              <SkeuoButton
                size="lg"
                onClick={() =>
                  document
                    .getElementById("details")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Meet Forma
                <Glyph name="chevron" size={17} />
              </SkeuoButton>
              <a className="sk-t-text-link" href="#possibilities">
                See what’s inside <Glyph name="down" size={15} />
              </a>
            </div>
            <p className="sk-t-fine-print">
              A thoughtful place for your next good thing.
            </p>
          </div>
          <div
            className="sk-t-forma-object"
            aria-label="A circular overview illustration"
          >
            <div className="sk-t-orbit-ticks" />
            <div className="sk-t-orbit-outer" />
            <div className="sk-t-orbit-inner" />
            <div className="sk-t-orbit-center">
              <span>A LITTLE PERSPECTIVE</span>
              <strong>All together.</strong>
              <em>Finally.</em>
              <small>Room for the bigger picture.</small>
            </div>
            <span className="sk-t-orbit-point" />
            <div className="sk-t-object-caption">
              <span>A simpler point of view</span>
              <span>Made for your everyday</span>
            </div>
          </div>
          <div className="sk-t-principles">
            {[
              "Less to figure out.",
              "More room to make.",
              "Yours to shape.",
            ].map((text) => (
              <span key={text}>{text}</span>
            ))}
          </div>
        </section>
        <section id="details" className="sk-t-shell sk-t-section">
          <Reveal>
            <div className="sk-t-section-heading">
              <h2>
                The whole picture.
                <br />
                <em>Without the noise.</em>
              </h2>
              <p>
                Some things work better when they’re together. A calm place to
                see what matters, find your way around, and get on with it.
              </p>
            </div>
          </Reveal>
          <div className="sk-t-product-explorer">
            <Reveal className="sk-t-product-frame">
              <div className="sk-t-window-chrome">
                <span>
                  <i />
                  <i />
                  <i />
                </span>
                <small>Forma workspace · sample preview</small>
                <Glyph name="grid" size={12} />
              </div>
              <DashboardStill />
              <div className="sk-t-preview-caption">
                <span>
                  {["A little clarity", "Make it yours", "Keep moving"][view]}
                </span>
                <span>Illustrative data</span>
              </div>
            </Reveal>
            <div
              className="sk-t-product-selector"
              role="group"
              aria-label="Product details"
            >
              {[
                "The bigger picture",
                "Your kind of space",
                "A little momentum",
              ].map((label, i) => (
                <button
                  type="button"
                  key={label}
                  aria-pressed={view === i}
                  onClick={() => setView(i)}
                >
                  {label}
                  <Glyph name="chevron" size={18} />
                </button>
              ))}
              <p>
                {
                  [
                    "A considered overview, so the useful things don’t disappear between everything else.",
                    "A few thoughtful choices. Enough to make it yours without turning setup into a whole project.",
                    "Pick up where you left off. The small things stay close, and the next step feels a little clearer.",
                  ][view]
                }
              </p>
              <a className="sk-t-text-link" href="#possibilities">
                A closer look
                <Glyph name="chevron" size={14} />
              </a>
            </div>
          </div>
          <div className="sk-t-feature-notes">
            {[
              [
                "A place for the pieces.",
                "Bring the useful things into one view. It’s easier to think when everything isn’t asking for attention.",
              ],
              [
                "Familiar, from the start.",
                "Clear labels, comfortable spacing, and the things you need exactly where you’d look for them.",
              ],
              [
                "Details you can feel.",
                "A little depth. A little warmth. The kind of finish you notice more the longer you use it.",
              ],
            ].map(([title, description]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>
        <section
          id="possibilities"
          className="sk-t-shell sk-t-section sk-t-forma-possibilities"
        >
          <Reveal>
            <h2>
              A little less effort.
              <br />
              <em>A little more you.</em>
            </h2>
            <p>
              It should feel comfortable from the first click. And then quietly
              get out of your way.
            </p>
          </Reveal>
          <Reveal>
            <SkeuoSurface className="sk-t-material-demo">
              <div className="sk-t-material-demo-heading">
                <Brand name="forma" />
                <span>YOUR SPACE</span>
              </div>
              <div className="sk-t-material-greeting">
                <span>Well, hello there.</span>
                <strong>
                  Make yourself
                  <br />
                  at home.
                </strong>
              </div>
              <div className="sk-t-material-switch">
                <div>
                  <strong>Keep things simple</strong>
                  <small>A little breathing room is good.</small>
                </div>
                <SkeuoSwitch
                  checked={simple}
                  onCheckedChange={setSimple}
                  aria-label="Keep things simple"
                />
              </div>
              <div
                className={`sk-t-material-lines ${simple ? "is-simple" : ""}`}
              >
                <i />
                <i />
                <i />
                <i />
              </div>
            </SkeuoSurface>
          </Reveal>
        </section>
        <section
          id="questions"
          className="sk-t-shell sk-t-section sk-t-questions"
        >
          <div>
            <h2>
              A few questions.
              <br />
              <em>Fair enough.</em>
            </h2>
            <p>The things you might be wondering.</p>
          </div>
          <Questions
            items={[
              [
                "What can I make with this?",
                "Whatever fits your idea. The content is deliberately generic, and the layout gives your own product a considered place to start.",
              ],
              [
                "Can I change how it looks?",
                "Yes. Open Customize to change the full palette, or use the theme button for light and dark. Surfaces, text, borders and controls change together.",
              ],
              [
                "Does this connect to anything?",
                "This is a frontend template with illustrative content. Connect your own data and services when you make it yours.",
              ],
              [
                "Will it fit a smaller screen?",
                "The layout adapts from a wide desktop to a narrow phone, with a compact menu and content that stacks in a useful order.",
              ],
            ]}
          />
        </section>
        <section
          className="sk-t-shell sk-t-section sk-t-forma-action"
          id="get-started"
        >
          <div>
            <h2>
              Your next thing.
              <br />
              <em>Starts somewhere.</em>
            </h2>
            <p>Make a little room for it.</p>
          </div>
          <a className="sk-t-text-link" href={options.templatesHref ?? "#top"}>
            Explore the collection
            <Glyph name="chevron" />
          </a>
        </section>
      </main>
      <PushpinTearFooter
        className="sk-t-tear-footer"
        brand="forma."
        name="forma"
        logo={<Brand name="forma" />}
        logoHref="#top"
        sheet={color.accent}
        sheetInk={color.accentInk}
        paper={color.background}
        paperInk={color.ink}
        seed={23}
        height="740px"
        fontSans="inherit"
        email={null}
        newsletter={null}
        status={null}
        timeZone={null}
        socials={[]}
        chat={null}
        mark="A LITTLE MORE CONSIDERED"
        columns={[
          {
            title: "Take a look",
            links: [
              { label: "The details", href: "#details" },
              { label: "Made for you", href: "#possibilities" },
            ],
            cta: { label: "explore.", href: "#details" },
          },
          {
            title: "Stay a while",
            links: [
              { label: "Questions", href: "#questions" },
              { label: "Back to top", href: "#top" },
            ],
            cta: { label: "begin.", href: "#get-started" },
          },
        ]}
        sideLinks={[]}
        copyright="© 2026 Forma. A product concept."
        credit="Made with Skeuomorphism UI"
        handle={{
          label: "the collection",
          href: options.templatesHref ?? "#top",
        }}
      />
    </div>
  );
}

export function SkeuoFormaLanding(options: TemplateOptions = {}) {
  return (
    <TemplateFrame
      id="forma"
      initialPalette="ember"
      initialMode="dark"
      {...options}
    >
      {(state) => <FormaContent state={state} options={options} />}
    </TemplateFrame>
  );
}
