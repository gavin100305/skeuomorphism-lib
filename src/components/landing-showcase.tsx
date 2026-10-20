"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { SkeuoButton as Button } from "./skeuomorphic/skeuo-button";
import { SkeuoFocusTimer as FocusTimer } from "./skeuomorphic/skeuo-focus-timer";

export function ObjectShowcase() {
  const [tasks, setTasks] = useState([true, false, false]);
  const [playing, setPlaying] = useState(false);
  return <div className="object-showcase" data-reveal>
    <div className="showcase-heading"><span className="eyebrow">A FEW THINGS TO GET YOUR HANDS ON</span><span>Working objects, made from simple pieces.</span></div>
    <div className="object-scene">
      <article className="task-object tactile-object">
        <div className="object-overline"><span>THE SHORT LIST</span><Icon name="check" size={15} /></div>
        <h3>One thing at a time.</h3>
        <div className="task-list">{["Find an idea", "Make it tangible", "Put it out there"].map((task, i) => <label key={task} className={tasks[i] ? "done" : ""}><input type="checkbox" checked={tasks[i]} onChange={() => setTasks(tasks.map((v, n) => n === i ? !v : v))} /><span className="task-checkbox"><Icon name="check" size={11} /></span><span>{task}</span></label>)}</div>
        <div className="task-bottom"><span>{tasks.filter(Boolean).length} of 3 complete</span><span className="task-progress"><i style={{ width: `${tasks.filter(Boolean).length / 3 * 100}%` }} /></span></div>
      </article>
      <FocusTimer />
      <article className={`audio-object tactile-object ${playing ? "is-playing" : ""}`}>
        <div className="object-overline"><span>OFF THE CLOCK</span><Icon name="music" size={15} /></div>
        <div className="record-sleeve"><div className="record"><span><Icon name="music" size={19} /></span></div><div className="record-label"><span>SIDE A</span><strong>Slow<br />Sunday.</strong><span>A PLAYER STUDY</span></div></div>
        <div className="audio-bottom"><div><strong>A little room to breathe.</strong><span>Interactive player preview · no audio</span></div><Button square aria-label={playing ? "Pause player animation" : "Play player animation"} onClick={() => setPlaying(!playing)}><Icon name={playing ? "pause" : "play"} size={15} /></Button></div>
      </article>
    </div>
    <div className="showcase-footer"><span>Check a task. Start a timer. Spin a record.</span><Link href="/docs/focus-timer" className="landing-doc-link">Focus timer docs <Icon name="diagonal" size={14} /></Link></div>
  </div>;
}

export function ComponentCarousel({ children }: { children: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);
  const [paused, setPaused] = useState(false);
  const [position, setPosition] = useState(1);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update(); media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 });
    if (track.current) observer.observe(track.current);
    return () => { media.removeEventListener("change", update); observer.disconnect(); };
  }, []);
  function move(direction: number) {
    const el = track.current;
    if (!el) return;
    const step = (el.firstElementChild as HTMLElement)?.offsetWidth + 22;
    const max = el.scrollWidth - el.clientWidth;
    const next = direction > 0 && el.scrollLeft >= max - 5 ? 0 : direction < 0 && el.scrollLeft <= 5 ? max : el.scrollLeft + step * direction;
    el.scrollTo({ left: next, behavior: reduced ? "auto" : "smooth" });
  }
  useEffect(() => {
    if (paused || reduced || !visible) return;
    const interval = window.setInterval(() => {
      if (hovered.current || track.current?.contains(document.activeElement)) return;
      move(1);
    }, 5200);
    return () => window.clearInterval(interval);
  // move reads the live scroll position and media preference.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reduced, visible]);
  return <div className="component-carousel" data-reveal onMouseEnter={() => { hovered.current = true; }} onMouseLeave={() => { hovered.current = false; }}>
    <div className="carousel-track" ref={track} role="region" aria-label="Component previews" tabIndex={0} onKeyDown={e => { if (e.target !== e.currentTarget) return; if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); move(e.key === "ArrowRight" ? 1 : -1); } }} onScroll={() => {
      const el = track.current;
      if (el?.firstElementChild) setPosition(Math.round(el.scrollLeft / ((el.firstElementChild as HTMLElement).offsetWidth + 22)) + 1);
    }} onTouchStart={() => setPaused(true)}>{children}</div>
    <div className="carousel-footer"><span>0{position} <span>/ 06</span></span><div><Button square aria-label="Previous components" onClick={() => { setPaused(true); move(-1); }}><Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} /></Button><Button square aria-label="Next components" onClick={() => { setPaused(true); move(1); }}><Icon name="arrow" size={16} /></Button></div></div>
  </div>;
}

export function ProjectPreview() {
  const art = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function update() {
      frame = 0;
      const el = art.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = media.matches ? .6 : Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * .8)));
      el.style.setProperty("--fan", String(progress));
    }
    function onScroll() { if (!frame) frame = requestAnimationFrame(update); }
    update(); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, []);
  return <Link href="/docs/photo-carousel" className="project-mini" aria-label="Photo carousel documentation"><div className="project-art" ref={art}><div className="stack-paper paper-back" /><div className="stack-paper paper-middle" /><div className="stack-paper paper-front"><span>FORM &<br />FUNCTION.</span><i>001 — A STUDY IN DEPTH</i></div></div><div className="project-mini-caption"><span>Something worth showing.</span><Icon name="diagonal" /></div></Link>;
}
