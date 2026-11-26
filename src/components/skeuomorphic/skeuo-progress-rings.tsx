"use client";

import { useId, useState, type CSSProperties } from "react";
import "./styles/skeuo-progress-rings.css";

export type ProgressRing = {
  id: string;
  label: string;
  value: number;
  max: number;
  unit?: string;
  color?: string;
};

const formatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

export function SkeuoProgressRings({
  items,
  title = "Daily goals",
  animate = true,
}: {
  items: ProgressRing[];
  title?: string;
  animate?: boolean;
}) {
  const id = useId();
  const [selectedId, setSelectedId] = useState(items[0]?.id);
  const rings = items.map((item) => {
    const value = Number.isFinite(item.value) ? item.value : 0;
    const max = Number.isFinite(item.max) && item.max > 0 ? item.max : 0;
    const percent = max ? Math.min(100, Math.max(0, value / max * 100)) : 0;
    return { ...item, value, max, percent };
  });
  const selected = rings.find((ring) => ring.id === selectedId) ?? rings[0];
  if (!selected) return null;

  const spacing = Math.min(23, 56 / Math.max(1, rings.length - 1));
  const thickness = Math.min(14, spacing * 0.65);

  return (
    <section data-sk-root="" className="sk-progress-rings" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{title}</h2>
      <div className="sk-rings-layout">
        <div className="sk-rings-dial" data-animate={animate || undefined}>
          <svg viewBox="0 0 240 240" aria-hidden="true">
            <defs>
              <linearGradient id={`${id}-groove`} x2="0%" y2="100%">
                <stop stopColor="var(--sk-groove-wall)" />
                <stop offset=".55" stopColor="var(--sk-base)" />
                <stop offset="1" stopColor="var(--sk-well)" />
              </linearGradient>
              <linearGradient id={`${id}-floor`} x2="0%" y2="100%">
                <stop stopColor="var(--sk-base)" />
                <stop offset="1" stopColor="var(--sk-well)" />
              </linearGradient>
              <linearGradient id={`${id}-bevel`}>
                <stop stopColor="black" stopOpacity=".42" />
                <stop offset=".52" stopColor="black" stopOpacity=".22" />
                <stop offset="1" stopColor="white" stopOpacity=".24" />
              </linearGradient>
              <linearGradient id={`${id}-fill`}>
                <stop stopColor="black" stopOpacity=".16" />
                <stop offset=".48" stopColor="white" stopOpacity=".05" />
                <stop offset=".83" stopColor="white" stopOpacity=".32" />
                <stop offset="1" stopColor="white" stopOpacity=".44" />
              </linearGradient>
            </defs>
            {rings.map((ring, index) => {
              const radius = 104 - index * spacing;
              const style = {
                "--sk-ring-color": ring.color,
                "--sk-ring-progress": ring.percent,
                "--sk-ring-delay": `${Math.min(index, 5) * 85}ms`,
              } as CSSProperties;
              return (
                <g key={ring.id} className="sk-ring-series" data-tone={index % 3} style={style} fill="none">
                  <circle cx="120" cy="121.2" r={radius} stroke="var(--sk-highlight)" strokeWidth={thickness * 1.4} />
                  <circle cx="120" cy="120" r={radius} stroke={`url(#${id}-groove)`} strokeWidth={thickness * 1.3} />
                  <circle cx="120" cy="121.1" r={radius} stroke={`url(#${id}-floor)`} strokeWidth={thickness * .94} />
                  {ring.percent > 0 && (
                    <g className="sk-ring-arc" strokeDasharray={`${ring.percent} 100`} strokeLinecap="round">
                      <circle className="sk-ring-shadow" cx="118.4" cy="120" r={radius} pathLength="100" stroke="var(--sk-arc-shadow)" strokeWidth={thickness} />
                      <circle cx="120" cy="120" r={radius} pathLength="100" stroke="var(--sk-ring-ink)" strokeWidth={thickness} />
                      <circle cx="120" cy="120" r={radius} pathLength="100" stroke={`url(#${id}-bevel)`} strokeWidth={thickness} />
                      <circle cx="120.7" cy="120" r={radius} pathLength="100" stroke={`url(#${id}-fill)`} strokeWidth={thickness * .76} />
                    </g>
                  )}
                  <circle className="sk-ring-target" cx="120" cy="120" r={radius} stroke="transparent" strokeWidth={spacing} onClick={() => setSelectedId(ring.id)} />
                </g>
              );
            })}
          </svg>
          <div className="sk-rings-readout" aria-hidden="true">
            <strong>{formatter.format(selected.percent)}%</strong>
            <span>{selected.label}</span>
          </div>
        </div>
        <ul className="sk-rings-legend" aria-label="Goals">
          {rings.map((ring, index) => (
            <li key={ring.id}>
              <button
                type="button"
                className="sk-ring-series"
                data-tone={index % 3}
                style={{ "--sk-ring-color": ring.color } as CSSProperties}
                aria-pressed={ring.id === selected.id}
                onClick={() => setSelectedId(ring.id)}
              >
                <span className="sk-ring-dot" aria-hidden="true" />
                <span className="sk-ring-label">{ring.label}</span>
                <span className="sk-ring-value">
                  {formatter.format(ring.value)} / {formatter.format(ring.max)}{ring.unit && ` ${ring.unit}`}
                </span>
                <span className="sk-ring-sr">{formatter.format(ring.percent)}% complete</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
