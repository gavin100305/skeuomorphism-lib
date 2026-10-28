"use client";

import { useId, useState, type ReactNode } from "react";
import { SkeuoThemeButton } from "../skeuo-theme-button";
import { Brand, Glyph } from "./template-ui";
import type { TemplateState } from "./template-frame";

export function LandingNav({
  name,
  state,
  soundControl,
}: {
  name: string;
  state: TemplateState;
  soundControl?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sk-t-landing-nav sk-t-shell">
      <a href="#top" aria-label={`${name} home`}>
        <Brand name={name} />
      </a>
      <nav
        className={open ? "is-open" : ""}
        aria-label="Page sections"
        id="sk-t-landing-menu"
      >
        {[
          ["The details", "#details"],
          ["Made for you", "#possibilities"],
          ["Questions", "#questions"],
        ].map(([label, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="sk-t-nav-actions">
        {soundControl}
        <SkeuoThemeButton
          theme={state.mode}
          onThemeChange={state.setMode}
          variant="round"
        />
        <a className="sk-t-nav-cta" href="#get-started">
          Take a look <Glyph name="chevron" size={15} />
        </a>
        <button
          className="sk-t-mobile-trigger sk-t-icon-button"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="sk-t-landing-menu"
          onClick={() => setOpen(!open)}
        >
          <Glyph name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}

export function DashboardStill() {
  const id = useId();
  return (
    <svg
      className="sk-t-dashboard-still"
      viewBox="0 0 1200 700"
      role="img"
      aria-label="Illustrative workspace dashboard with sample metrics, a chart, projects, and recent activity"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="var(--tpl-accent)" stopOpacity=".2" />
          <stop offset="1" stopColor="var(--tpl-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1200" height="700" fill="var(--tpl-bg)" />
      <path d="M180 0V700M180 65H1200" stroke="var(--tpl-line)" />
      <g fill="var(--tpl-ink)" fontFamily="inherit">
        <text x="25" y="43" fontWeight="650" fontSize="23">
          workspace.
        </text>
        <text x="210" y="30" fontSize="11" fill="var(--tpl-muted)">
          Your workspace
        </text>
        <text x="210" y="50" fontSize="15" fontWeight="600">
          Overview
        </text>
      </g>
      <rect
        x="16"
        y="98"
        width="148"
        height="37"
        rx="7"
        fill="var(--tpl-panel)"
        stroke="var(--tpl-line)"
      />
      {["Overview", "Projects", "Activity", "Your team", "Settings"].map(
        (label, i) => (
          <g key={label}>
            <rect
              x="29"
              y={110 + i * 48}
              width="12"
              height="12"
              rx="3"
              fill="none"
              stroke={i === 0 ? "var(--tpl-accent)" : "var(--tpl-muted)"}
            />
            <text
              x="53"
              y={121 + i * 48}
              fontSize="12"
              fill={i === 0 ? "var(--tpl-accent)" : "var(--tpl-muted)"}
            >
              {label}
            </text>
          </g>
        ),
      )}
      <circle cx="39" cy="652" r="16" fill="var(--tpl-panel)" />
      <text x="30" y="656" fill="var(--tpl-accent)" fontSize="11">
        JD
      </text>
      <text x="63" y="650" fill="var(--tpl-ink)" fontSize="12">
        Jamie Demo
      </text>
      <text x="63" y="667" fill="var(--tpl-muted)" fontSize="9">
        Your preferences
      </text>
      <text
        x="215"
        y="112"
        fill="var(--tpl-muted)"
        fontSize="10"
        letterSpacing="2"
      >
        EVERYTHING IN ONE PLACE
      </text>
      <text
        x="215"
        y="153"
        fill="var(--tpl-ink)"
        fontSize="32"
        fontWeight="600"
        letterSpacing="-1.3"
      >
        A little room for the bigger picture.
      </text>
      <text x="215" y="181" fill="var(--tpl-muted)" fontSize="13">
        Your work, your people, and a clear view of what’s next.
      </text>
      {[
        ["Total activity", "24,580", "+12.8%"],
        ["Active projects", "12", "+3 this week"],
        ["Your team", "8", "All caught up"],
        ["Completed", "84%", "Looking good"],
      ].map(([label, value, note], i) => (
        <g key={label}>
          <rect
            x={215 + i * 240}
            y="212"
            width="223"
            height="108"
            rx="9"
            fill="var(--tpl-panel)"
            stroke="var(--tpl-line)"
          />
          <text x={233 + i * 240} y="238" fill="var(--tpl-muted)" fontSize="11">
            {label}
          </text>
          <text
            x={233 + i * 240}
            y="275"
            fill="var(--tpl-ink)"
            fontSize="28"
            fontWeight="600"
          >
            {value}
          </text>
          <text
            x={233 + i * 240}
            y="301"
            fill="var(--tpl-accent)"
            fontSize="10"
          >
            {note}
          </text>
        </g>
      ))}
      <rect
        x="215"
        y="341"
        width="626"
        height="320"
        rx="9"
        fill="var(--tpl-panel)"
        stroke="var(--tpl-line)"
      />
      <text
        x="237"
        y="372"
        fill="var(--tpl-ink)"
        fontSize="16"
        fontWeight="600"
      >
        The bigger picture
      </text>
      <text x="237" y="396" fill="var(--tpl-muted)" fontSize="11">
        A week at a glance · sample data
      </text>
      {[440, 485, 530, 575, 620].map((y) => (
        <path
          key={y}
          d={`M240 ${y}H815`}
          stroke="var(--tpl-line)"
          strokeDasharray="2 6"
        />
      ))}
      <path
        d="M240 600C290 605 310 540 360 550S430 600 480 520S560 560 610 475S700 520 760 440S795 460 815 435V625H240Z"
        fill={`url(#${id})`}
      />
      <path
        d="M240 600C290 605 310 540 360 550S430 600 480 520S560 560 610 475S700 520 760 440S795 460 815 435"
        fill="none"
        stroke="var(--tpl-accent)"
        strokeWidth="3"
      />
      <rect
        x="860"
        y="341"
        width="298"
        height="320"
        rx="9"
        fill="var(--tpl-panel)"
        stroke="var(--tpl-line)"
      />
      <text
        x="883"
        y="372"
        fill="var(--tpl-ink)"
        fontSize="16"
        fontWeight="600"
      >
        Moving things forward
      </text>
      {[
        ["A fresh start", "A little progress every day", 75],
        ["The next chapter", "Good things take shape", 54],
        ["Something new", "Room for another idea", 34],
      ].map(([label, note, value], i) => (
        <g key={label}>
          <text x="883" y={420 + i * 79} fill="var(--tpl-ink)" fontSize="12">
            {label}
          </text>
          <text x="883" y={440 + i * 79} fill="var(--tpl-muted)" fontSize="10">
            {note}
          </text>
          <rect
            x="883"
            y={454 + i * 79}
            width="250"
            height="4"
            rx="2"
            fill="var(--tpl-well)"
          />
          <rect
            x="883"
            y={454 + i * 79}
            width={Number(value) * 2.5}
            height="4"
            rx="2"
            fill="var(--tpl-accent)"
          />
        </g>
      ))}
    </svg>
  );
}

export function Questions({ items }: { items: [string, string][] }) {
  return (
    <div className="sk-t-questions-list">
      {items.map(([question, answer]) => (
        <details key={question}>
          <summary>
            {question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}

export function ChromeLoop() {
  const id = useId();
  return (
    <svg
      className="sk-t-chrome-loop"
      viewBox="0 0 560 520"
      role="img"
      aria-label="A sculptural silver loop wrapped in a lime-colored orbit"
    >
      <defs>
        <linearGradient id={`${id}metal`} x1="0" y1="0" x2=".9" y2="1">
          <stop stopColor="#353837" />
          <stop offset=".13" stopColor="#f9faf7" />
          <stop offset=".21" stopColor="#6a706c" />
          <stop offset=".28" stopColor="#f4f5f1" />
          <stop offset=".38" stopColor="#a1a5a1" />
          <stop offset=".52" stopColor="#292d29" />
          <stop offset=".61" stopColor="#f7f9f5" />
          <stop offset=".75" stopColor="#858c83" />
          <stop offset=".9" stopColor="#e6eae3" />
          <stop offset="1" stopColor="#333a31" />
        </linearGradient>
        <linearGradient id={`${id}rim`}>
          <stop stopColor="#e8eee4" />
          <stop offset=".5" stopColor="#686f65" />
          <stop offset="1" stopColor="#f6f8f2" />
        </linearGradient>
        <filter id={`${id}shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="13" />
        </filter>
      </defs>
      <ellipse
        cx="283"
        cy="443"
        rx="125"
        ry="18"
        fill="var(--tpl-accent)"
        opacity=".12"
        filter={`url(#${id}shadow)`}
      />
      <ellipse
        cx="282"
        cy="256"
        rx="222"
        ry="89"
        transform="rotate(-28 282 256)"
        fill="none"
        stroke="var(--tpl-accent)"
        strokeWidth="4"
        opacity=".65"
      />
      <g transform="rotate(-28 280 250)">
        <path
          d="M180 110C150 75 80 145 112 195L282 393C315 430 385 355 352 316Z"
          fill="none"
          stroke="#11170e"
          strokeWidth="59"
          transform="translate(5 7)"
        />
        <path
          d="M180 110C150 75 80 145 112 195L282 393C315 430 385 355 352 316Z"
          fill="none"
          stroke={`url(#${id}metal)`}
          strokeWidth="55"
          strokeLinejoin="round"
        />
        <path
          d="M180 110C150 75 80 145 112 195L282 393C315 430 385 355 352 316Z"
          fill="none"
          stroke={`url(#${id}rim)`}
          strokeWidth="2"
          transform="translate(-21 0)"
          opacity=".85"
        />
      </g>
      <path
        d="M85 325C140 398 427 266 469 181"
        fill="none"
        stroke="var(--tpl-accent)"
        strokeWidth="5"
      />
      <path
        d="M86 322C145 391 424 264 467 181"
        fill="none"
        stroke="#f4ffcc"
        strokeWidth="1"
        opacity=".8"
      />
      <circle cx="466" cy="184" r="14" fill={`url(#${id}metal)`} />
      <circle cx="462" cy="179" r="4" fill="#ffffff" opacity=".7" />
    </svg>
  );
}
