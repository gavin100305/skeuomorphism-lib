"use client";
import { useEffect, useLayoutEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import "./photo-carousel.css";
export type PhotoCarouselItem = { id: string; image: string; imageAlt: string; title: string; label: string; meta?: string; eyebrow?: string; subtitle?: string; description?: string; photoPosition?: string };
export function PhotoCarousel({ items, label = "Photo collection", autoPlay = true }: { items: PhotoCarouselItem[]; label?: string; autoPlay?: boolean }) {
  if (!items.length) return <p>No photographs yet.</p>;
  return <CarouselContent key={items.map(item => item.id).join("|")} items={items} label={label} autoPlay={autoPlay} />;
}
function PhotoRecord({ item, onClose }: { item: PhotoCarouselItem; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const title = useId();
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    const previous = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar > 0) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    document.body.style.overflow = "hidden";
    node.showModal();
    // Establish the starting frame before moving into the open pose.
    node.getBoundingClientRect();
    const frame = requestAnimationFrame(() => { node.dataset.phase = "open"; });
    return () => {
      cancelAnimationFrame(frame);
      if (closeTimer.current) clearTimeout(closeTimer.current);
      node.close();
      document.body.style.overflow = previous;
      document.body.style.paddingRight = previousPadding;
    };
  }, []);
  function dismiss() {
    if (closing.current) return;
    closing.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { onClose(); return; }
    if (dialog.current) dialog.current.dataset.phase = "closing";
    closeTimer.current = setTimeout(onClose, 450);
  }
  return <dialog ref={dialog} className="sk-photo-record" aria-labelledby={title} onCancel={event => { event.preventDefault(); dismiss(); }} onClick={event => { if(event.target === event.currentTarget) { const r=event.currentTarget.getBoundingClientRect();if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) dismiss(); } }}><header><h3 id={title}>{item.title}</h3><button autoFocus type="button" className="sk-album-more" onClick={dismiss}>Close ×</button></header><div className="sk-photo-record-image"><img src={item.image} alt={item.imageAlt} /></div><p>{item.description ?? item.subtitle}</p></dialog>;
}
function CarouselContent({ items: achievements, label, autoPlay }: { items: PhotoCarouselItem[]; label: string; autoPlay: boolean }) {
  const headingId = useId();
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const root = useRef<HTMLElement>(null);
  const finishReveal = useRef<() => void>(() => {});
  const hovered = useRef(false);
  const focused = useRef(false);
  const readingUntil = useRef(0);
  const restart = useRef<() => void>(() => {});
  const opener = useRef<HTMLButtonElement | null>(null);
  const swipe = useRef<{ x: number; y: number; pointer: number } | null>(null);
  const suppressClick = useRef(false);
  const resetClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const award = achievements[active % achievements.length];
  // Reuse the portfolio’s centered stack-to-fan reveal when it enters view.
  useLayoutEffect(() => {
    const stage = root.current?.querySelector<HTMLElement>(".sk-album-stage");
    if (!stage) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const animations: Animation[] = [];
    let revealed = false;
    const finish = () => {
      revealed = true;
      delete stage.dataset.reveal;
      animations.forEach(animation => animation.cancel());
      observer.disconnect();
    };
    const observer = new IntersectionObserver(entries => {
      if (revealed || !entries.some(entry => entry.isIntersecting)) return;
      revealed = true;
      delete stage.dataset.reveal;
      const cards = Array.from(stage.querySelectorAll<HTMLElement>(".sk-album-print"));
      cards.forEach((card,index) => {
        const final = getComputedStyle(card).transform;
        animations.push(card.animate([
          { transform:"translate(-50%, -46%) rotate(0deg) scale(.84)",opacity:0 },
          { transform:final,opacity:1 },
        ], { duration:1100,delay:index * 65,easing:"cubic-bezier(.22,.65,.3,1)",fill:"both" }));
      });
      Promise.all(animations.map(animation => animation.finished)).then(finish).catch(() => {});
      observer.disconnect();
    }, {threshold:.2,rootMargin:"0px 0px -35px 0px"});
    stage.dataset.reveal = "pending";
    finishReveal.current = finish;
    observer.observe(stage);
    motion.addEventListener("change",finish);
    return () => {finish();motion.removeEventListener("change",finish);finishReveal.current = () => {};};
  }, []);

  useEffect(() => () => { if (resetClickTimer.current) clearTimeout(resetClickTimer.current); }, []);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    function schedule() {
      clearTimeout(timer);
      if (selected !== null || hovered.current || focused.current || document.hidden || motion.matches || !visible || !autoPlay) return;
      timer = setTimeout(() => {
        setActive(index => (index + 1) % achievements.length);
        schedule();
      }, Math.max(4000, readingUntil.current - performance.now()));
    }
    restart.current = schedule;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    }, { threshold: 0.25 });
    observer.observe(section);
    document.addEventListener("visibilitychange", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      motion.removeEventListener("change", schedule);
      restart.current = () => {};
    };
  }, [selected, achievements.length, autoPlay]);

  function reading(timestamp: number, delay = 12000) {
    readingUntil.current = Math.max(readingUntil.current, timestamp + delay);
    restart.current();
  }

  function move(step: number) { setActive(index => (index + step + achievements.length) % achievements.length); }
  function showRecord(button: HTMLButtonElement) { opener.current = button; setSelected(active); }
  function endSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = swipe.current;
    swipe.current = null;
    if (!start || start.pointer !== event.pointerId) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    suppressClick.current = true;
    move(dx > 0 ? -1 : 1);
    resetClickTimer.current = setTimeout(() => { suppressClick.current = false; }, 0);
  }

  return <section ref={root} className="sk-photo-carousel" aria-labelledby={headingId}
    onPointerEnter={event => { if (event.pointerType !== "touch") { hovered.current = true; restart.current(); } }}
    onPointerLeave={event => { hovered.current = false; reading(event.timeStamp, 8000); }}
    onPointerDownCapture={event => { finishReveal.current(); reading(event.timeStamp, event.pointerType === "touch" ? 20000 : 12000); }}
    onKeyDownCapture={event => { finishReveal.current(); reading(event.timeStamp); }}
    onFocusCapture={() => { focused.current = true; restart.current(); }}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) { focused.current = false; reading(event.timeStamp, 8000); } }}>
    <div className="sk-album-heading"><h2 id={headingId}>{label}</h2><span className="sk-album-count">{String(active + 1).padStart(2,"0")} / {String(achievements.length).padStart(2,"0")}</span></div>
    <div className="sk-album" role="region" aria-roledescription="carousel" aria-label="Photo collection" tabIndex={0} onKeyDown={event => { if (selected !== null) return; if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); } }}>
      <div className="sk-album-stage" onPointerDown={event => { if (event.button === 0) swipe.current = { x: event.clientX, y: event.clientY, pointer: event.pointerId }; }} onPointerUp={endSwipe} onPointerCancel={() => { swipe.current = null; }}>
        {achievements.map((item, index) => {
          let offset = (index - active + achievements.length) % achievements.length;
          if (offset > achievements.length / 2) offset -= achievements.length;
          const distance = Math.abs(offset);
          const style = { "--album-offset": `${offset * (distance === 1 ? 26 : 21)}%`, "--album-offset-mobile": `${offset * (distance === 1 ? 12 : 7)}%`, "--album-rotation": `${offset === 0 ? -1.5 : offset * 6}deg`, "--album-scale": 1 - distance * .1, zIndex: achievements.length - distance, visibility: distance > 2 ? "hidden" : "visible" } as CSSProperties;
          return <button key={item.id} type="button" className="sk-album-print" data-active={offset === 0} style={style} tabIndex={offset === 0 ? 0 : -1} aria-label={offset === 0 ? `View ${item.title} photo details` : `Bring ${item.title} photo forward`} aria-haspopup={offset === 0 ? "dialog" : undefined} onClick={event => { if (suppressClick.current) return; if (index === active) showRecord(event.currentTarget); else setActive(index); }}>
            <span className="sk-album-image"><img src={item.image} alt={item.imageAlt} draggable={false} loading="lazy" style={{ objectPosition: item.photoPosition ?? "center" }} /></span>
            <span className="sk-album-print-footer"><span>{item.label}</span><span>{item.meta}</span></span>
          </button>;
        })}
      </div>
      <div className="sk-album-caption">
        <div key={award.id} className="sk-album-caption-copy" aria-live="off" aria-atomic="true"><p className="sk-album-eyebrow">{award.eyebrow ?? "Photo journal"}</p><h3 className="sk-album-title">{award.title}</h3><p className="sk-album-subtitle">{award.subtitle}</p></div>
        <button type="button" className="sk-album-more" aria-haspopup="dialog" aria-label={`More info about ${award.title}`} onClick={event => showRecord(event.currentTarget)}>More info <span aria-hidden="true">↗</span></button>
      </div>
      <div className="sk-album-controls">
        <button type="button" className="sk-album-arrow" aria-label="Previous photo" onClick={() => move(-1)}><svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="m11 5-5 5 5 5M6 10h10" /></svg></button>
        <div className="sk-album-index" aria-label="Choose a photo">{achievements.map((item, index) => <button key={item.id} type="button" aria-label={`Show ${item.title}`} aria-current={active === index ? "true" : undefined} onClick={() => setActive(index)}><span /></button>)}</div>
        <button type="button" className="sk-album-arrow" aria-label="Next photo" onClick={() => move(1)}><svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="m9 5 5 5-5 5M14 10H4" /></svg></button>
      </div>
    </div>
    {selected !== null && <PhotoRecord item={achievements[selected]} onClose={() => { setSelected(null); requestAnimationFrame(() => opener.current?.focus({ preventScroll: true })); }} />}
  </section>;
}
