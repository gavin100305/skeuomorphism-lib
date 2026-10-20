"use client";

import { useEffect } from "react";

/** Reveal each group once; keep the document readable without JavaScript. */
export function useScrollReveal() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    function setup() {
      observer?.disconnect();
      elements.forEach(element => element.classList.remove("reveal-ready"));
      if (media.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
      elements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight * .95) element.classList.add("is-visible");
        element.classList.add("reveal-ready");
        observer?.observe(element);
      });
    }
    setup(); media.addEventListener("change", setup);
    return () => { observer?.disconnect(); media.removeEventListener("change", setup); };
  }, []);
}
