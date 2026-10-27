"use client";

import { useState } from "react";
import { SkeuoButton } from "../skeuo-button";
import { SkeuoInput } from "../skeuo-input";
import {
  TemplateFrame,
  type TemplateOptions,
  type TemplateState,
} from "./template-frame";
import { DashboardLayout } from "./dashboard-layout";
import { Glyph, LineChart, Reveal, saveCsv } from "./template-ui";

const orders = [
  {
    id: "FW-1048",
    name: "Ellis Park",
    initials: "EP",
    item: "Brand identity",
    date: "Oct 28, 2026",
    amount: 2400,
    status: "Paid",
  },
  {
    id: "FW-1047",
    name: "Avery Morgan",
    initials: "AM",
    item: "Website design",
    date: "Oct 27, 2026",
    amount: 4800,
    status: "Pending",
  },
  {
    id: "FW-1046",
    name: "Rowan Lee",
    initials: "RL",
    item: "Design system",
    date: "Oct 26, 2026",
    amount: 3200,
    status: "Paid",
  },
  {
    id: "FW-1045",
    name: "Casey Brooks",
    initials: "CB",
    item: "Editorial package",
    date: "Oct 25, 2026",
    amount: 1600,
    status: "Paid",
  },
  {
    id: "FW-1044",
    name: "Drew Taylor",
    initials: "DT",
    item: "Product strategy",
    date: "Oct 24, 2026",
    amount: 2100,
    status: "Pending",
  },
];
const money = (value: number) => `$${value.toLocaleString("en-US")}`;

function WorkspaceContent({
  state,
  options,
}: {
  state: TemplateState;
  options: TemplateOptions;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All orders");
  const [period, setPeriod] = useState(0);
  const hi = state.language === "hi";
  const filtered = orders.filter(
    (order) =>
      `${order.name} ${order.id} ${order.item}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (status === "All orders" || status === order.status),
  );
  const controls = (
    <>
      <div className="sk-t-top-search">
        <Glyph name="search" size={16} />
        <SkeuoInput
          aria-label="Search orders"
          placeholder={hi ? "ऑर्डर खोजें…" : "Search orders…"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <SkeuoButton
        size="sm"
        onClick={() =>
          saveCsv("formwork-orders.csv", [
            ["Order", "Customer", "Service", "Amount", "Status"],
            ...filtered.map((x) => [
              x.id,
              x.name,
              x.item,
              String(x.amount),
              x.status,
            ]),
          ])
        }
      >
        <Glyph name="down" size={16} />
        <span className="sk-t-action-label">{hi ? "निर्यात" : "Export"}</span>
      </SkeuoButton>
    </>
  );
  return (
    <DashboardLayout
      variant="workspace"
      state={state}
      controls={controls}
      templatesHref={options.templatesHref}
      soundControl={options.soundControl}
    >
      <section id="overview" className="sk-t-dashboard-intro">
        <div>
          <p className="sk-t-eyebrow">
            {hi ? "बुधवार, 28 अक्टूबर" : "Wednesday, October 28"}
          </p>
          <h1>{hi ? "काम की पूरी तस्वीर।" : "A good day to make things."}</h1>
          <p>
            {hi
              ? "आपके प्रोजेक्ट, आपकी टीम और सब कुछ एक जगह।"
              : "Here’s what’s moving at North studio. Nice and clear."}
          </p>
        </div>
        <span className="sk-t-date-label">
          <Glyph name="clock" size={16} />
          Oct 21 – Oct 28, 2026
        </span>
      </section>
      <div className="sk-t-workspace-metrics">
        {[
          ["Revenue", "$24,580", "+12.8%", "vs. previous period"],
          ["Active projects", "12", "+3", "ready to move forward"],
          ["New clients", "28", "+8.2%", "good people, good work"],
          ["Open invoices", "$8,420", "5 invoices", "2 due this week"],
        ].map(([label, value, change, note], i) => (
          <Reveal className="sk-t-panel sk-t-workspace-metric" key={label}>
            <div>
              <span>
                {hi
                  ? ["आय", "सक्रिय प्रोजेक्ट", "नए ग्राहक", "खुले बिल"][i]
                  : label}
              </span>
              <Glyph
                name={["chart", "folder", "people", "note"][i]}
                size={18}
              />
            </div>
            <strong>{value}</strong>
            <p>
              <b>{change}</b>
              <span>{note}</span>
            </p>
          </Reveal>
        ))}
      </div>
      <div className="sk-t-workspace-charts">
        <Reveal className="sk-t-panel">
          <section id="revenue">
            <div className="sk-t-panel-heading">
              <div>
                <h2>{hi ? "आय की तस्वीर" : "Revenue overview"}</h2>
                <p>
                  {hi
                    ? "सप्ताह के उदाहरण आँकड़े।"
                    : "A little momentum, across the week."}
                </p>
              </div>
              <select
                aria-label="Revenue chart period"
                value={period}
                onChange={(e) => setPeriod(Number(e.target.value))}
              >
                <option value="0">This week</option>
                <option value="1">Last week</option>
                <option value="2">Two weeks ago</option>
              </select>
            </div>
            <div className="sk-t-revenue-total">
              <strong>{["$24,580", "$21,790", "$18,640"][period]}</strong>
              <span>Revenue · sample data</span>
            </div>
            <LineChart variant="revenue" period={period} />
          </section>
        </Reveal>
        <Reveal className="sk-t-panel sk-t-goal-panel">
          <h2>{hi ? "महीने का लक्ष्य" : "A month in the making."}</h2>
          <p>
            {hi
              ? "धीरे-धीरे, आगे बढ़ते हुए।"
              : "Good work takes a little consistency."}
          </p>
          <div className="sk-t-goal-dial">
            <svg viewBox="0 0 220 150" aria-hidden="true">
              <path
                d="M30 125A80 80 0 1 1 190 125"
                fill="none"
                stroke="var(--tpl-well)"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path
                d="M30 125A80 80 0 1 1 190 125"
                fill="none"
                stroke="var(--tpl-accent)"
                strokeWidth="18"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="72 100"
              />
            </svg>
            <div>
              <strong>
                72<span>%</span>
              </strong>
              <small>of this month’s goal</small>
            </div>
          </div>
          <div className="sk-t-goal-summary">
            <div>
              <span>Made so far</span>
              <strong>$24,580</strong>
            </div>
            <div>
              <span>Monthly goal</span>
              <strong>$34,000</strong>
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal className="sk-t-panel sk-t-orders-panel">
        <section id="orders">
          <div className="sk-t-panel-heading">
            <div>
              <h2>{hi ? "हाल के ऑर्डर" : "Recent orders"}</h2>
              <p>
                {hi
                  ? "नाम, संख्याएँ और विवरण उदाहरण हैं।"
                  : "A few moving pieces, all in one place."}
              </p>
            </div>
            <select
              aria-label="Filter orders by status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>All orders</option>
              <option>Paid</option>
              <option>Pending</option>
            </select>
          </div>
          <div
            className="sk-t-table-scroll"
            tabIndex={0}
            aria-label="Orders table, scroll horizontally on small screens"
          >
            <table>
              <thead>
                <tr>
                  {(hi
                    ? ["ऑर्डर", "ग्राहक", "सेवा", "राशि", "स्थिति"]
                    : ["Order", "Customer", "Service", "Amount", "Status"]
                  ).map((label) => (
                    <th scope="col" key={label}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.id}</strong>
                      <small>{order.date}</small>
                    </td>
                    <td>
                      <span className="sk-t-table-person">
                        <span className="sk-t-avatar">{order.initials}</span>
                        {order.name}
                      </span>
                    </td>
                    <td>{order.item}</td>
                    <td className="sk-t-amount">{money(order.amount)}</td>
                    <td>
                      <span
                        className="sk-t-order-status"
                        data-status={order.status}
                      >
                        <i />
                        {hi
                          ? order.status === "Paid"
                            ? "भुगतान हुआ"
                            : "लंबित"
                          : order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="sk-t-empty" role="status">
                {hi
                  ? "कोई ऑर्डर नहीं मिला।"
                  : "No orders match. Try another name or status."}
              </p>
            )}
          </div>
          <div className="sk-t-table-footer" aria-live="polite">
            {filtered.length} of {orders.length} sample orders
          </div>
        </section>
      </Reveal>
      <div className="sk-t-team-grid">
        <Reveal className="sk-t-panel">
          <section id="projects">
            <div className="sk-t-panel-heading">
              <h2>{hi ? "चल रहे प्रोजेक्ट" : "Work in progress"}</h2>
              <Glyph name="folder" size={18} />
            </div>
            {[
              ["Website refresh", "Design review", 78],
              ["Autumn collection", "Production", 54],
              ["Field notes", "Exploration", 32],
            ].map(([name, detail, progress]) => (
              <div className="sk-t-project-row" key={name}>
                <div>
                  <strong>{name}</strong>
                  <span>{detail}</span>
                </div>
                <span>{progress}%</span>
                <div className="sk-t-meter">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>
            ))}
          </section>
        </Reveal>
        <Reveal className="sk-t-panel">
          <section id="team">
            <div className="sk-t-panel-heading">
              <h2>{hi ? "आपकी टीम" : "People behind the work"}</h2>
              <span className="sk-t-subtle">4 members</span>
            </div>
            {[
              ["JD", "Jamie Demo", "Design lead"],
              ["AR", "Alex Rivers", "Product designer"],
              ["SK", "Sam Kim", "Developer"],
              ["MP", "Morgan Price", "Strategy"],
            ].map(([initials, name, role]) => (
              <div className="sk-t-team-person" key={name}>
                <span className="sk-t-avatar">{initials}</span>
                <div>
                  <strong>{name}</strong>
                  <span>{role}</span>
                </div>
                <span className="sk-t-status-dot" />
              </div>
            ))}
          </section>
        </Reveal>
      </div>
    </DashboardLayout>
  );
}

export function SkeuoWorkspaceDashboard(options: TemplateOptions = {}) {
  return (
    <TemplateFrame
      id="workspace"
      initialPalette="cobalt"
      initialMode="light"
      {...options}
    >
      {(state) => <WorkspaceContent state={state} options={options} />}
    </TemplateFrame>
  );
}
