"use client";

import { useId, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduce ? undefined : { y: [12, 0], opacity: [0.72, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Glyph({
  name = "grid",
  size = 20,
}: {
  name?: string;
  size?: number;
}) {
  const paths: Record<string, ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7v10H3Z" />
        <path d="M9 20v-7h6v7" />
      </>
    ),
    chart: (
      <>
        <path d="M4 4v16h17M8 15l4-5 4 3 5-8" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    folder: <path d="M3 7V4h6l2 3h10v13H3Z" />,
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-3a6 6 0 0 1 12 0v3m2-17a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 5v2" />
      </>
    ),
    settings: (
      <>
        <path d="M4 7h16M4 17h16" />
        <circle cx="9" cy="7" r="3" />
        <circle cx="16" cy="17" r="3" />
      </>
    ),
    search: (
      <>
        <circle cx="10" cy="10" r="6" />
        <path d="m15 15 6 6" />
      </>
    ),
    arrow: <path d="M5 19 19 5M5 5h14v14" />,
    down: <path d="M12 4v16m-6-6 6 6 6-6" />,
    refresh: (
      <>
        <path d="M20 8A8 8 0 1 0 20 16M20 3v5h-5" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    collapse: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M9 4v16m7-12-4 4 4 4" />
      </>
    ),
    check: <path d="m5 12 4 4L20 5" />,
    cursor: <path d="m5 3 15 10-7 1-3 7Z" />,
    note: (
      <>
        <path d="M5 3h10l4 4v14H5Z" />
        <path d="M9 10h6m-6 4h6m-6 4h3" />
      </>
    ),
    shield: (
      <>
        <path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    bolt: <path d="m14 2-9 12h7l-2 8 9-12h-7Z" />,
    chevron: <path d="m9 5 7 7-7 7" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.grid}
    </svg>
  );
}

export function Brand({
  name,
  compact = false,
}: {
  name: string;
  compact?: boolean;
}) {
  return (
    <span className={`sk-t-brand ${name === "glide" ? "is-glide" : ""}`}>
      <span className="sk-t-brand-symbol" aria-hidden="true">
        {name === "glide" ? (
          <svg viewBox="0 0 24 24" fill="none">
            <rect
              x="5"
              y="3"
              width="9"
              height="15"
              rx="4.5"
              stroke="currentColor"
              strokeWidth="2"
              transform="rotate(-35 12 12)"
            />
            <path
              d="M13 8c7-2 10 5 4 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : name === "forma" ? (
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M4 16 16 4v12H4Zm12 0h12L16 28V16Z" fill="currentColor" />
            <path
              d="M18 5h9v9h-9zM5 18h9v9H5z"
              fill="currentColor"
              opacity=".45"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 32 32" fill="none">
            <path
              d="M3 16h6l4-10 5 21 4-15 3 4h4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {!compact && (
        <span>
          {name}
          <b>.</b>
        </span>
      )}
    </span>
  );
}

export function LineChart({
  variant = "activity",
  period = 0,
}: {
  variant?: "activity" | "revenue";
  period?: number;
}) {
  const id = useId();
  const paths =
    variant === "activity"
      ? [
          "M0 180 C35 180 40 240 75 240 L170 240 C200 240 190 160 225 165 S260 50 295 90 S325 210 360 205 S400 45 435 75 S470 215 510 220 L650 220 C680 220 690 130 725 140 S760 230 800 240",
          "M0 220 C45 220 50 160 100 175 S160 230 205 190 S260 65 305 100 S360 145 400 100 S450 180 500 130 S550 75 600 100 S660 200 700 150 S755 95 800 110",
          "M0 230 C65 230 70 175 120 170 S190 215 245 150 S320 210 370 120 S430 170 480 110 S550 180 610 70 S710 140 800 45",
        ][period]
      : [
          "M0 220 C70 230 85 170 145 180 S230 205 280 150 S380 180 440 115 S540 160 595 90 S700 105 800 35",
          "M0 235 C60 210 100 230 160 180 S240 220 300 155 S400 160 460 110 S550 140 620 65 S740 100 800 25",
          "M0 240 C80 200 110 230 170 160 S250 180 320 130 S400 160 470 90 S560 140 640 55 S740 70 800 20",
        ][period];
  return (
    <div className="sk-t-chart">
      <div className="sk-t-chart-y">
        {(variant === "activity"
          ? ["60m", "45m", "30m", "15m", "0m"]
          : ["$24k", "$18k", "$12k", "$6k", "$0"]
        ).map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>
      <div className="sk-t-chart-plot">
        <svg
          viewBox="0 0 800 260"
          preserveAspectRatio="none"
          role="img"
          aria-label={`${variant === "activity" ? "Activity minutes" : "Revenue"} over the selected sample period`}
        >
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="var(--tpl-accent)" stopOpacity=".23" />
              <stop offset="1" stopColor="var(--tpl-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20, 75, 130, 185, 240].map((y) => (
            <path
              key={y}
              d={`M0 ${y}H800`}
              stroke="var(--tpl-line)"
              strokeDasharray="2 7"
            />
          ))}
          <path d={`${paths} L800 260H0Z`} fill={`url(#${id})`} />
          <path
            d={paths}
            stroke="var(--tpl-accent)"
            strokeWidth="2.5"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 170H800"
            stroke="var(--tpl-muted)"
            strokeDasharray="5 8"
            opacity=".5"
          />
        </svg>
        <div className="sk-t-chart-x">
          {(variant === "activity"
            ? period === 0
              ? period === 0
                ? [
                    "00:00",
                    "04:00",
                    "08:00",
                    "12:00",
                    "16:00",
                    "20:00",
                    "24:00",
                  ]
                : period === 1
                  ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                  : [
                      "Oct 1",
                      "Oct 5",
                      "Oct 10",
                      "Oct 15",
                      "Oct 20",
                      "Oct 25",
                      "Oct 28",
                    ]
              : period === 1
                ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                : [
                    "Oct 1",
                    "Oct 5",
                    "Oct 10",
                    "Oct 15",
                    "Oct 20",
                    "Oct 25",
                    "Oct 28",
                  ]
            : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          ).map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function saveCsv(filename: string, rows: string[][]) {
  const blob = new Blob(
    [
      rows
        .map((row) =>
          row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","),
        )
        .join("\n"),
    ],
    { type: "text/csv;charset=utf-8;" },
  );
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
