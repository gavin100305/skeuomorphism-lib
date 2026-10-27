"use client";

import { useRef, useState, type ReactNode } from "react";
import { SkeuoButton } from "../skeuo-button";
import { SkeuoKeyButton } from "../skeuo-key-button";
import {
  TemplateFrame,
  type TemplateOptions,
  type TemplateState,
} from "./template-frame";
import { LandingNav, ChromeLoop, Questions } from "./landing-parts";
import { Brand, Glyph, Reveal } from "./template-ui";

function BentoCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  return (
    <article
      ref={ref}
      className={`sk-t-bento-card ${className}`}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        ref.current?.style.setProperty(
          "--glow-x",
          `${event.clientX - rect.left}px`,
        );
        ref.current?.style.setProperty(
          "--glow-y",
          `${event.clientY - rect.top}px`,
        );
      }}
    >
      {children}
    </article>
  );
}

const stories = [
  [
    "I opened it and knew where everything was. Honestly, that’s half the battle.",
    "Jamie",
    "A fresh perspective",
  ],
  [
    "It’s the little things. The spacing, the controls, the fact that it all feels like it belongs together.",
    "Alex",
    "The details count",
  ],
  [
    "There’s enough here to make it mine, without giving me another hundred decisions to make.",
    "Sam",
    "Room to make it yours",
  ],
  [
    "A calmer place to start. I can work with that.",
    "Morgan",
    "A little less noise",
  ],
];

function GlideContent({
  state,
  options,
}: {
  state: TemplateState;
  options: TemplateOptions;
}) {
  const [paused, setPaused] = useState(false);
  const [demoView, setDemoView] = useState(0);
  return (
    <div className="sk-t-glide" id="top">
      <LandingNav
        name="glide"
        state={state}
        soundControl={options.soundControl}
      />
      <main id="sk-template-main">
        <section className="sk-t-shell sk-t-glide-hero">
          <div>
            <p className="sk-t-eyebrow">A simpler way into your everyday.</p>
            <h1>
              Less friction.
              <br />
              <span>More possibility.</span>
            </h1>
            <p className="sk-t-hero-description">
              A little more space for the things you care about.
              <br />
              And a little less of everything getting in the way.
            </p>
            <div className="sk-t-hero-actions">
              <SkeuoButton
                variant="primary"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("details")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Meet Glide
                <Glyph name="chevron" size={17} />
              </SkeuoButton>
              <a href="#possibilities" className="sk-t-text-link">
                How it comes together
                <Glyph name="down" size={15} />
              </a>
            </div>
          </div>
          <div className="sk-t-glide-object">
            <ChromeLoop />
          </div>
          <div className="sk-t-glide-principles">
            <span>
              A little more freedom.
              <br />A lot less figuring it out.
            </span>
            {[
              ["cursor", "Familiar from the first click"],
              ["settings", "Thoughtfully flexible"],
              ["shield", "Your space, your way"],
            ].map(([icon, text]) => (
              <span key={text}>
                <Glyph name={icon} size={17} />
                {text}
              </span>
            ))}
          </div>
        </section>
        <section id="details" className="sk-t-shell sk-t-section">
          <Reveal>
            <div className="sk-t-glide-heading">
              <h2>
                One simple idea.
                <br />
                <span>More ways to make it yours.</span>
              </h2>
              <p>
                Good tools leave room for the person using them.
                <br />
                Here’s a little of what that can look like.
              </p>
            </div>
          </Reveal>
          <div className="sk-t-feature-rows">
            {[
              [
                "grid",
                "Bring it together.",
                "A clear place for the things that matter.",
                "See the useful things at a glance. Keep the details close, and let the bigger picture stay in view.",
              ],
              [
                "settings",
                "Find your own rhythm.",
                "A few choices. A lot of breathing room.",
                "Keep what works for you, change what doesn’t. The good parts should feel familiar, the rest should feel like yours.",
              ],
              [
                "bolt",
                "Keep moving.",
                "Less between the idea and the next step.",
                "You don’t need a whole new way to do everything. Sometimes you just need the next thing to be a little easier.",
              ],
            ].map(([icon, title, subtitle, text]) => (
              <Reveal key={title}>
                <div className="sk-t-feature-row">
                  <span className="sk-t-feature-icon">
                    <Glyph name={icon} size={26} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                  </div>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="sk-t-shell sk-t-section" id="possibilities">
          <Reveal>
            <div className="sk-t-glide-heading">
              <h2>
                The useful things.
                <br />
                <span>With a little more feeling.</span>
              </h2>
              <p>
                Nothing shouting for your attention.
                <br />
                Just the details, doing their thing.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="sk-t-bento" style={{ gridAutoFlow: "dense" }}>
              <BentoCard className="sk-t-bento-main">
                <div className="sk-t-bento-browser">
                  <div>
                    <i />
                    <i />
                    <i />
                    <span>Your little corner</span>
                  </div>
                  <div className="sk-t-bento-browser-body">
                    <span className="sk-t-bento-mini-label">
                      MAKE YOURSELF AT HOME
                    </span>
                    <strong aria-live="polite">
                      {demoView === 0 ? "A fresh start." : "A little momentum."}
                    </strong>
                    <p>A little room for whatever comes next.</p>
                    {[
                      "A place to begin",
                      "The things worth keeping",
                      "Room for another idea",
                    ].map((text, i) => (
                      <div key={text}>
                        <span className="sk-t-mini-check">
                          <Glyph name={i === 0 ? "check" : "note"} size={14} />
                        </span>
                        {text}
                        <span>↗</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3>It all belongs together.</h3>
                  <p>
                    The bigger picture and the little details.
                    <br />
                    One considered space for both.
                  </p>
                </div>
              </BentoCard>
              <BentoCard className="sk-t-bento-keys">
                <div className="sk-t-key-art">
                  <SkeuoKeyButton
                    aria-label="A little clarity"
                    aria-pressed={demoView === 0}
                    onClick={() => setDemoView(0)}
                    icon={<Glyph name="grid" size={30} />}
                  />
                  <SkeuoKeyButton
                    aria-label="A little momentum"
                    aria-pressed={demoView === 1}
                    onClick={() => setDemoView(1)}
                    icon={<Glyph name="bolt" size={30} />}
                    tone="accent"
                  />
                </div>
                <div>
                  <h3>Feels right, from the start.</h3>
                  <p>Familiar shapes. Clear feedback. A satisfying click.</p>
                </div>
              </BentoCard>
              <BentoCard className="sk-t-bento-palette">
                <div className="sk-t-palette-art">
                  <i />
                  <i />
                  <i />
                  <span>Yours.</span>
                </div>
                <div>
                  <h3>Your kind of space.</h3>
                  <p>
                    Light or dark. Warm or cool. The whole feeling changes with
                    you.
                  </p>
                </div>
              </BentoCard>
            </div>
          </Reveal>
        </section>
        <section className="sk-t-shell sk-t-section sk-t-glide-steps">
          <div>
            <h2>
              A small beginning.
              <br />
              <span>Room for bigger things.</span>
            </h2>
            <p>
              Start with what you need. The rest can find its place when you’re
              ready.
            </p>
          </div>
          <div>
            {[
              [
                "Take a look around.",
                "Get a feel for the layout. The useful things are easy to spot, and there’s no hurry to figure it all out.",
              ],
              [
                "Make a few little choices.",
                "Choose a palette, find your view, and make the space feel a little more like you.",
              ],
              [
                "Get on with your thing.",
                "That’s the point, really. A good starting place, and then room to do whatever you came here to do.",
              ],
            ].map(([title, text], i) => (
              <div key={title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section
          id="questions"
          className="sk-t-shell sk-t-section sk-t-questions"
        >
          <div>
            <h2>
              Good questions.
              <br />
              <span>Clear answers.</span>
            </h2>
            <p>A few things before you make yourself at home.</p>
          </div>
          <Questions
            items={[
              [
                "What kind of product is this for?",
                "That part is up to you. Glide uses generic content and flexible sections so your own idea can take the lead.",
              ],
              [
                "Can I change the theme?",
                "Yes. Customize changes the entire color system. The theme button switches between coordinated light and dark views.",
              ],
              [
                "Are the stories real reviews?",
                "They’re illustrative copy for this template. Replace them with permissioned customer stories when you use it for your own product.",
              ],
              [
                "What happens on a smaller screen?",
                "The content stacks, the navigation becomes a menu, and the feature grid turns into a single comfortable column.",
              ],
            ]}
          />
        </section>
        <section
          className="sk-t-section sk-t-stories"
          aria-label="Illustrative testimonial examples"
        >
          <div className="sk-t-story-heading">
            <h2>
              A few words.
              <br />
              <span>A little perspective.</span>
            </h2>
            <p>Illustrative stories for a product that’s yours to make.</p>
            <button
              className="sk-t-text-link"
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
            >
              {paused ? "Play stories" : "Pause stories"}
            </button>
          </div>
          <div className={`sk-t-story-marquees ${paused ? "is-paused" : ""}`}>
            {[0, 1].map((row) => (
              <div className={`sk-t-story-row row-${row}`} key={row}>
                {[0, 1].map((copy) => (
                  <div
                    className="sk-t-story-set"
                    key={copy}
                    aria-hidden={copy === 1 || undefined}
                  >
                    {stories
                      .slice(row * 2, row * 2 + 2)
                      .map(([text, name, role]) => (
                        <figure key={name}>
                          <blockquote>“{text}”</blockquote>
                          <figcaption>
                            <span className="sk-t-avatar">{name[0]}</span>
                            <div>
                              <strong>{name}</strong>
                              <span>{role} · sample story</span>
                            </div>
                          </figcaption>
                        </figure>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
        <section
          id="get-started"
          className="sk-t-shell sk-t-section sk-t-glide-action"
        >
          <h2>
            A little more room.
            <br />
            <span>For your next good thing.</span>
          </h2>
          <p>Take the shape. Make it yours.</p>
          <SkeuoButton
            variant="primary"
            size="lg"
            onClick={() =>
              document
                .getElementById("top")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Have another look
            <Glyph name="chevron" size={17} />
          </SkeuoButton>
        </section>
      </main>
      <footer className="sk-t-glide-footer sk-t-shell">
        <div>
          <a href="#top">
            <Brand name="glide" />
          </a>
          <span>A little more possibility.</span>
          <a href="#top" className="sk-t-text-link">
            Back to top
            <Glyph name="chevron" size={14} />
          </a>
        </div>
        <p className="sk-t-glide-wordmark">
          glide<span>.</span>
        </p>
        <div>
          <span>© 2026 Glide. A product concept.</span>
          <nav aria-label="Footer">
            <a href="#details">The details</a>
            <a href="#questions">Questions</a>
            <a href={options.templatesHref ?? "#top"}>The collection</a>
          </nav>
          <span>Made with a little more care.</span>
        </div>
      </footer>
    </div>
  );
}

export function SkeuoGlideLanding(options: TemplateOptions = {}) {
  return (
    <TemplateFrame
      id="glide"
      initialPalette="lime"
      initialMode="dark"
      {...options}
    >
      {(state) => <GlideContent state={state} options={options} />}
    </TemplateFrame>
  );
}
