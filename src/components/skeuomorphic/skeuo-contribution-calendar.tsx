"use client";
import "./styles/skeuo-contribution-calendar.css";


import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type GitHubActivity = { through: string; days: ContributionDay[] };
export function SkeuoContributionCalendar({ days, mobile = false }: { days: ContributionDay[]; mobile?: boolean }) {
  if (!days.length) return <p>No contribution history yet.</p>;
  return <div data-sk-root="" className="sk-contribution-calendar" data-mobile={mobile}><ContributionKeyboard key={String(mobile)} activity={{days, through: days[days.length - 1].date}} /></div>;
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayMs = 86400000;
function dateKey(date: Date) { return date.toISOString().slice(0, 10); }
function utc(date: string) { return new Date(`${date}T00:00:00Z`); }
function readable(date: string) { return utc(date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }); }
function Arrow({ previous = false }: { previous?: boolean }) {
  return <svg data-sk-root="" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={previous ? "m12 5-5 5 5 5" : "m8 5 5 5-5 5"} /></svg>;
}

/** Animate caps independently so the recessed keyboard bed never disappears. */
function animateKeyWave(grid: HTMLElement, entering: boolean, direction = 1, scrollEntrance = false) {
  const keys = Array.from(grid.querySelectorAll<HTMLElement>(".sk-contribution-key"));
  const columns = Math.ceil(grid.children.length / 7);
  return keys.map(key => {
    const cell = Number(key.dataset.cell);
    const column = Math.floor(cell / 7);
    const progress = direction > 0 ? column / Math.max(1, columns - 1) : 1 - column / Math.max(1, columns - 1);
    const delay = progress * (entering ? 230 : 75) + (cell % 7) * (entering ? 9 : 3);
    return key.animate(entering ? [
      { opacity: 0, transform: `translateY(${scrollEntrance ? 12 : 6}px) scale(.94)`, offset: 0 },
      { opacity: 1, transform: "translateY(-.6px) scale(1)", offset: .8 },
      { opacity: 1, transform: "translateY(0) scale(1)", offset: 1 },
    ] : [
      { opacity: 1, transform: "translateY(0) scale(1)" },
      { opacity: 0, transform: "translateY(3px) scale(.96)" },
    ], {
      duration: entering ? (scrollEntrance ? 760 : 620) : 180,
      delay, easing: "cubic-bezier(.22,.61,.28,1)", fill: entering ? "backwards" : "forwards",
    });
  });
}

function ContributionKeyboard({ activity }: { activity: GitHubActivity }) {
  const [annualOffset, setAnnualOffset] = useState(0);
  const [monthlyOffset, setMonthlyOffset] = useState(0);
  const [selected, setSelected] = useState<ContributionDay | null>(null);
  const [hovered, setHovered] = useState<ContributionDay | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const [transitioning, setTransitioning] = useState(false);
  const pending = useRef<{ monthly: boolean; offset: number; direction: number; entering: boolean } | null>(null);
  const animations = useRef<Animation[]>([]);
  const finishEntrance = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const grids = Array.from(element.querySelectorAll<HTMLElement>(".sk-contribution-year-keys, .sk-contribution-month-keys"));
    const entrances: Animation[] = [];
    const reveal = () => {
      grids.forEach(grid => { delete grid.dataset.reveal; });
      entrances.forEach(animation => animation.cancel());
      observer.disconnect();
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const grid = entry.target as HTMLElement;
        observer.unobserve(grid);
        delete grid.dataset.reveal;
        grid.dataset.entered = "true";
        if (motion.matches) continue;
        entrances.push(...animateKeyWave(grid, true, 1, true));
        const view = grid.closest<HTMLElement>("[data-view]");
        const copy = [view?.querySelector(".sk-contribution-toolbar"), view?.querySelector(".sk-contribution-month-labels"), element.querySelector(".sk-contribution-bottom")];
        copy.forEach(item => {
          if (!item) return;
          entrances.push(item.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 650, delay: 90, easing: "cubic-bezier(.22,.61,.28,1)", fill: "backwards" }));
        });
        Promise.all(entrances.map(animation => animation.finished)).then(() => entrances.forEach(animation => animation.cancel())).catch(() => {});
      }
    }, { threshold: .15, rootMargin: "0px 0px -35px 0px" });
    grids.forEach(grid => { grid.dataset.reveal = "pending"; observer.observe(grid); });
    finishEntrance.current = reveal;
    const motionChanged = () => { if (motion.matches) reveal(); };
    motion.addEventListener("change", motionChanged);
    return () => {
      reveal();
      finishEntrance.current = () => {};
      motion.removeEventListener("change", motionChanged);
    };
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { if (motion.matches) animations.current.forEach(animation => animation.finish()); };
    motion.addEventListener("change", finish);
    return () => {
      pending.current = null;
      animations.current.forEach(animation => animation.cancel());
      motion.removeEventListener("change", finish);
    };
  }, []);

  useLayoutEffect(() => {
    const change = pending.current;
    if (!change?.entering) return;
    const view = root.current?.querySelector<HTMLElement>(`[data-view="${change.monthly ? "month" : "year"}"]`);
    animations.current.forEach(animation => animation.cancel());
    const grid = view?.querySelector<HTMLElement>(".sk-contribution-year-keys, .sk-contribution-month-keys");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    animations.current = reduce || !grid ? [] : animateKeyWave(grid, true, change.direction);
    const toolbar = view?.querySelector(".sk-contribution-toolbar > div:first-child");
    if (!reduce && toolbar) animations.current.push(toolbar.animate([{ opacity: 0, transform: "translateY(3px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 440, easing: "cubic-bezier(.22,.61,.28,1)", fill: "backwards" }));
    const current = animations.current;
    Promise.all(current.map(animation => animation.finished)).then(() => {
      if (pending.current !== change) return;
      current.forEach(animation => animation.cancel());
      animations.current = [];
      pending.current = null;
      setTransitioning(false);
    }).catch(() => {});
  }, [annualOffset, monthlyOffset]);

  const lookup = new Map(activity.days.map(day => [day.date, day]));
  const today = utc(activity.through).getTime();
  const available = Math.round((today - utc(activity.days[0].date).getTime()) / dayMs) + 1;

  function range(length: number, offset: number) {
    const end = today - offset * length * dayMs;
    const start = end - (length - 1) * dayMs;
    const first = new Date(start);
    const gridStart = start - first.getUTCDay() * dayMs;
    const cells = Math.ceil((first.getUTCDay() + length) / 7) * 7;
    const days = Array.from({ length: cells }, (_, index) => {
      const time = gridStart + index * dayMs;
      return time >= start && time <= end ? lookup.get(dateKey(new Date(time))) ?? null : null;
    });
    return { start, end, gridStart, days, total: days.reduce((sum, day) => sum + (day?.count ?? 0), 0) };
  }
  const annual = range(365, annualOffset);
  const monthly = range(90, monthlyOffset);
  const yearDays = annual.days;
  const monthDays = monthly.days;
  const columns = yearDays.length / 7;
  function labelsFor(days: (ContributionDay | null)[]) {
    const labels: { label: string; column: number }[] = [];
    for (let column = 0; column < days.length / 7; column++) {
      const week = days.slice(column * 7, column * 7 + 7);
      const date = column === 0 ? week.find(Boolean)?.date : week.find(day => day?.date.endsWith("-01"))?.date;
      if (date) {
        if (column > 0 && column - (labels.at(-1)?.column ?? -10) < 3) labels.pop();
        labels.push({ label: months[utc(date).getUTCMonth()], column });
      }
    }
    return labels;
  }
  const monthLabels = labelsFor(yearDays);
  const mobileLabels = labelsFor(monthDays);
  const inspecting = hovered ?? selected;
  const annualFocus = selected && yearDays.some(day => day?.date === selected?.date) ? selected?.date : [...yearDays].reverse().find(day => day !== null)?.date;
  const monthlyFocus = selected && monthDays.some(day => day?.date === selected?.date) ? selected?.date : [...monthDays].reverse().find(day => day !== null)?.date;
  const rangeLabel = (start: number, end: number) => `${readable(dateKey(new Date(start)))} – ${readable(dateKey(new Date(end)))}`;
  function changeRange(monthly: boolean, offset: number) {
    if (pending.current) return;
    const commit = () => {
      (monthly ? setMonthlyOffset : setAnnualOffset)(offset);
      setSelected(null);
      setHovered(null);
    };
    const keys = root.current?.querySelector<HTMLElement>(monthly ? ".sk-contribution-month-keys" : ".sk-contribution-year-keys");
    if (!keys || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { commit(); return; }
    const change = { monthly, offset, direction: offset > (monthly ? monthlyOffset : annualOffset) ? 1 : -1, entering: false };
    pending.current = change;
    setTransitioning(true);
    finishEntrance.current();
    animations.current = animateKeyWave(keys, false, change.direction);
    Promise.all(animations.current.map(animation => animation.finished)).then(() => {
      if (pending.current !== change) return;
      change.entering = true;
      commit();
    }).catch(() => {});
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, days: (ContributionDay | null)[], index: number, monthly: boolean) {
    const step = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 }[event.key];
    let target = index;
    if (step !== undefined) target += step;
    else if (event.key === "Home") target = days.findIndex(Boolean);
    else if (event.key === "End") target = days.length - 1 - [...days].reverse().findIndex(Boolean);
    else return;
    event.preventDefault();
    const day = days[target];
    if (!day) return;
    setSelected(day);
    root.current?.querySelector<HTMLButtonElement>(`[data-view="${monthly ? "month" : "year"}"] [data-date="${day.date}"]`)?.focus();
  }

  function key(day: ContributionDay | null, index: number, monthly: boolean) {
    if (!day) return <span key={index} className="sk-contribution-blank" aria-hidden="true" />;
    return <button data-sk-root="" key={day.date} type="button" className="sk-contribution-key" data-level={day.level} data-date={day.date} data-cell={index} data-selected={selected?.date === day.date} aria-label={`${readable(day.date)}: ${day.count} contribution${day.count === 1 ? "" : "s"}`} aria-pressed={selected?.date === day.date} tabIndex={day.date === (monthly ? monthlyFocus : annualFocus) ? 0 : -1}
      onPointerEnter={() => setHovered(day)} onPointerLeave={() => setHovered(null)} onFocus={() => setHovered(day)} onBlur={() => setHovered(null)} onClick={() => setSelected(day)} onKeyDown={event => navigate(event, monthly ? monthDays : yearDays, index, monthly)}>
      <span className="sk-contribution-key-face" aria-hidden="true" />
    </button>;
  }

  return <div data-sk-root="" ref={root} className="sk-contribution-history" aria-busy={transitioning} onPointerDownCapture={() => finishEntrance.current()} onKeyDownCapture={() => finishEntrance.current()}>
    <div className="sk-contribution-year" data-view="year">
      <div className="sk-contribution-toolbar">
        <div><p><strong>{annual.total.toLocaleString("en")}</strong> contributions <span className="sk-text-subtle">{annualOffset === 0 ? "in the last 365 days" : "over 365 days"}</span></p><p className="sk-contribution-range">{rangeLabel(annual.start, annual.end)}</p></div>
        <div className="sk-contribution-navigation" aria-label="Contribution history range"><button type="button" className="sk-raised-control" aria-label="Previous 365 days" disabled={transitioning || (annualOffset + 2) * 365 > available} onClick={() => changeRange(false, annualOffset + 1)}><Arrow previous /></button><button type="button" className="sk-raised-control" aria-label="Next 365 days" disabled={transitioning || annualOffset === 0} onClick={() => changeRange(false, annualOffset - 1)}><Arrow /></button></div>
      </div>
      <div className="sk-contribution-year-layout">
        <div className="sk-contribution-weekdays" aria-hidden="true">{weekdays.map((name, index) => <span key={name}>{index % 2 ? name : ""}</span>)}</div>
        <div className="sk-contribution-annual" style={{ "--sk-contribution-columns": columns } as CSSProperties}>
          <div className="sk-contribution-month-labels" aria-hidden="true">{monthLabels.map(({ label, column }) => <span key={column} style={{ gridColumnStart: column + 1, gridRow: 1 }}>{label}</span>)}</div>
          <div className="sk-contribution-case"><div className="sk-contribution-year-keys" role="group" aria-label={`${rangeLabel(annual.start, annual.end)} daily contributions. Use arrow keys to explore.`}>{yearDays.map((day, index) => key(day, index, false))}</div></div>
        </div>
      </div>
    </div>
    <div className="sk-contribution-month" data-view="month">
      <div className="sk-contribution-toolbar">
        <div><p><strong>{monthly.total.toLocaleString("en")}</strong> contributions <span className="sk-text-subtle">{monthlyOffset === 0 ? "in the last 90 days" : "over 90 days"}</span></p><p className="sk-contribution-range">{rangeLabel(monthly.start, monthly.end)}</p></div>
        <div className="sk-contribution-navigation" aria-label="Contribution history range"><button type="button" className="sk-raised-control" aria-label="Previous 90 days" disabled={transitioning || (monthlyOffset + 2) * 90 > available} onClick={() => changeRange(true, monthlyOffset + 1)}><Arrow previous /></button><button type="button" className="sk-raised-control" aria-label="Next 90 days" disabled={transitioning || monthlyOffset === 0} onClick={() => changeRange(true, monthlyOffset - 1)}><Arrow /></button></div>
      </div>
      <div className="sk-contribution-year-layout">
        <div className="sk-contribution-weekdays" aria-hidden="true">{weekdays.map((name, index) => <span key={name}>{index % 2 ? name : ""}</span>)}</div>
        <div className="sk-contribution-annual" style={{ "--sk-contribution-columns": monthDays.length / 7 } as CSSProperties}>
          <div className="sk-contribution-month-labels" aria-hidden="true">{mobileLabels.map(({ label, column }) => <span key={column} style={{ gridColumnStart: column + 1, gridRow: 1 }}>{label}</span>)}</div>
          <div className="sk-contribution-case"><div key={monthlyOffset} className="sk-contribution-month-keys" role="group" aria-label={`${rangeLabel(monthly.start, monthly.end)} daily contributions. Use arrow keys to explore.`}>{monthDays.map((day, index) => key(day, index, true))}</div></div>
        </div>
      </div>
    </div>
    <div className="sk-contribution-bottom"><p className="sk-contribution-readout" aria-live="polite" aria-atomic="true">{inspecting ? <><strong>{inspecting.count} contribution{inspecting.count === 1 ? "" : "s"}</strong><span>{readable(inspecting.date)}</span></> : <><span className="sk-contribution-idle-desktop">Hover or press a key to explore</span><span className="sk-contribution-idle-mobile">Tap a day to explore</span></>}</p><div className="sk-contribution-legend" aria-label="Contribution intensity: less to more"><span>Less</span>{[0, 1, 2, 3, 4].map(level => <span key={level} className="sk-contribution-swatch" data-level={level} />)}<span>More</span></div></div>
  </div>;
}
