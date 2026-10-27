"use client";

import { useState } from "react";
import { SkeuoButton } from "../skeuo-button";
import {
  TemplateFrame,
  type TemplateOptions,
  type TemplateState,
} from "./template-frame";
import { DashboardLayout } from "./dashboard-layout";
import { Glyph, LineChart, Reveal, saveCsv } from "./template-ui";

const apps = [
  {
    name: "Code editor",
    detail: "Building the next thing",
    time: "2h 24m",
    value: 41,
  },
  {
    name: "Browser",
    detail: "Research and the occasional rabbit hole",
    time: "1h 18m",
    value: 23,
  },
  {
    name: "Design tool",
    detail: "Making the details count",
    time: "1h 02m",
    value: 18,
  },
  { name: "Notes", detail: "Thoughts worth keeping", time: "42m", value: 12 },
  {
    name: "Messages",
    detail: "A little back and forth",
    time: "21m",
    value: 6,
  },
];
const stats = [
  ["Tracked time", "5h 47m", "Time in your active windows"],
  ["Focused time", "3h 26m", "59% of the tracked day"],
  ["Top application", "Code editor", "2h 24m of good work"],
  ["Active streak", "12 days", "A little consistency adds up"],
];

function ActivityContent({
  state,
  options,
}: {
  state: TemplateState;
  options: TemplateOptions;
}) {
  const [period, setPeriod] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const hi = state.language === "hi";
  const appTimes = [
    ["2h 24m", "1h 18m", "1h 02m", "42m", "21m"],
    ["13h 10m", "7h 26m", "5h 43m", "3h 53m", "2h 06m"],
    ["51h 56m", "29h 08m", "22h 48m", "15h 12m", "7h 36m"],
  ][period];
  const focusedShare = [59, 59, 62][period];
  const controls = (
    <>
      <div className="sk-t-segment" role="group" aria-label="Time period">
        {[
          hi ? "आज" : "Today",
          hi ? "7 दिन" : "7 days",
          hi ? "30 दिन" : "30 days",
        ].map((label, i) => (
          <button
            type="button"
            key={label}
            aria-pressed={i === period}
            onClick={() => setPeriod(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <SkeuoButton size="sm" onClick={() => setRefresh(!refresh)}>
        <Glyph name="refresh" size={16} />
        <span className="sk-t-action-label">{hi ? "रीफ़्रेश" : "Refresh"}</span>
      </SkeuoButton>
    </>
  );
  return (
    <DashboardLayout
      variant="activity"
      state={state}
      controls={controls}
      templatesHref={options.templatesHref}
      soundControl={options.soundControl}
    >
      <section id="overview" className="sk-t-dashboard-intro">
        <div>
          <p className="sk-t-eyebrow">
            {hi ? "आपका दिन, एक नज़र में" : "Your day, in perspective"}
          </p>
          <h1>
            {hi ? "आपके दिन की एक साफ़ तस्वीर।" : "A clearer view of your day."}
          </h1>
          <p>
            {hi
              ? "आपका समय, आपके ऐप्स और काम की लय।"
              : "The hours, the apps, and the little patterns in between."}
          </p>
        </div>
        <div className="sk-t-update">
          <span className="sk-t-status-dot" />
          {hi ? "उदाहरण डेटा" : "Sample activity"}
          <strong>
            {refresh ? "28 Oct 2026, 10:42 am" : "28 Oct 2026, 10:40 am"}
          </strong>
          <span className="sk-t-sr" role="status">
            {refresh ? "Sample view refreshed" : ""}
          </span>
        </div>
      </section>
      <Reveal>
        <div className="sk-t-metric-strip">
          {stats.map(([label, value, detail], i) => (
            <div key={label}>
              <span>
                {hi
                  ? [
                      "ट्रैक किया समय",
                      "फ़ोकस का समय",
                      "मुख्य ऐप",
                      "सक्रिय दिन",
                    ][i]
                  : label}
              </span>
              <strong>
                {period === 0
                  ? value
                  : [
                      period === 1 ? "32h 18m" : "126h 40m",
                      period === 1 ? "19h 12m" : "78h 05m",
                      "Code editor",
                      "12 days",
                    ][i]}
              </strong>
              <small>{detail}</small>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal className="sk-t-panel sk-t-rhythm-panel">
        <section id="rhythm">
          <div className="sk-t-panel-heading">
            <div>
              <p className="sk-t-eyebrow">
                {hi ? "दिन की लय" : "The shape of your day"}
              </p>
              <h2>{hi ? "गतिविधि की लय" : "Activity rhythm"}</h2>
              <p>
                {hi
                  ? "चुनी अवधि में ट्रैक किए गए मिनट।"
                  : "Tracked minutes across the selected period."}
              </p>
            </div>
            <div className="sk-t-chart-summary">
              <span>{hi ? "प्रति घंटा औसत" : "Average per hour"}</span>
              <strong>{["28m", "32m", "35m"][period]}</strong>
            </div>
          </div>
          <LineChart period={period} />
        </section>
      </Reveal>
      <div className="sk-t-activity-lower">
        <Reveal className="sk-t-panel">
          <section id="applications">
            <div className="sk-t-panel-heading">
              <div>
                <p className="sk-t-eyebrow">
                  {hi ? "ऐप का उपयोग" : "Where the time went"}
                </p>
                <h2>{hi ? "आपके मुख्य ऐप्स" : "Your top applications"}</h2>
              </div>
              <span className="sk-t-subtle">5 apps</span>
            </div>
            <div className="sk-t-app-list">
              {apps.map((app, i) => (
                <div className="sk-t-app-row" key={app.name}>
                  <span className="sk-t-app-rank">{i + 1}</span>
                  <div>
                    <div>
                      <strong>{app.name}</strong>
                      <span>{appTimes[i]}</span>
                    </div>
                    <p>{app.detail}</p>
                    <div className="sk-t-meter">
                      <span style={{ width: `${app.value * 2}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
        <Reveal className="sk-t-panel">
          <section id="focus">
            <div className="sk-t-panel-heading">
              <div>
                <p className="sk-t-eyebrow">
                  {hi ? "थोड़ा गहरा काम" : "Room to settle in"}
                </p>
                <h2>{hi ? "फ़ोकस की गुणवत्ता" : "Focus, without the fuss."}</h2>
              </div>
              <Glyph name="clock" />
            </div>
            <div className="sk-t-focus-ring">
              <svg viewBox="0 0 180 180" aria-hidden="true">
                <circle
                  cx="90"
                  cy="90"
                  r="73"
                  fill="none"
                  stroke="var(--tpl-well)"
                  strokeWidth="12"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="73"
                  fill="none"
                  stroke="var(--tpl-accent)"
                  strokeWidth="12"
                  strokeDasharray={`${focusedShare * 4.59} 459`}
                  strokeLinecap="round"
                  transform="rotate(-90 90 90)"
                />
              </svg>
              <div>
                <strong>
                  {focusedShare}
                  <span>%</span>
                </strong>
                <small>{hi ? "फ़ोकस का समय" : "focused time"}</small>
              </div>
            </div>
            <dl className="sk-t-focus-details">
              <div>
                <dt>{hi ? "सबसे लंबा सत्र" : "Longest session"}</dt>
                <dd>{["48m", "1h 12m", "1h 26m"][period]}</dd>
              </div>
              <div>
                <dt>{hi ? "फ़ोकस सत्र" : "Focus sessions"}</dt>
                <dd>{[4, 23, 87][period]}</dd>
              </div>
              <div>
                <dt>{hi ? "बदलाव / घंटा" : "Context switches / hour"}</dt>
                <dd>{[3.2, 3.4, 2.8][period]}</dd>
              </div>
            </dl>
          </section>
        </Reveal>
      </div>
      <div className="sk-t-export-row">
        <p>
          {hi
            ? "अपने डेटा को साथ रखें।"
            : "Your day is yours. Keep a copy of it."}
        </p>
        <SkeuoButton
          size="sm"
          onClick={() =>
            saveCsv("daymark-sample.csv", [
              ["Application", "Tracked time", "Share"],
              ...apps.map((x, i) => [x.name, appTimes[i], `${x.value}%`]),
            ])
          }
        >
          {hi ? "CSV डाउनलोड" : "Export sample CSV"}
          <Glyph name="down" size={15} />
        </SkeuoButton>
      </div>
    </DashboardLayout>
  );
}

export function SkeuoActivityDashboard(options: TemplateOptions = {}) {
  return (
    <TemplateFrame
      id="activity"
      initialPalette="ember"
      initialMode="dark"
      {...options}
    >
      {(state) => <ActivityContent state={state} options={options} />}
    </TemplateFrame>
  );
}
