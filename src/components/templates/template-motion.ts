"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useTemplateMotion() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!scope.current) return;
    const media = gsap.matchMedia();

    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".tpl-reveal", scope.current).forEach((element) => {
        gsap.fromTo(element, { y: 42, opacity: 0.3 }, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      const story = scope.current?.querySelector<HTMLElement>(".day-story");
      const storyTitle = scope.current?.querySelector<HTMLElement>(".day-story-copy");
      if (story && storyTitle) {
        ScrollTrigger.create({
          trigger: story,
          pin: storyTitle,
          pinSpacing: false,
          start: "top 118px",
          end: "bottom bottom",
        });
      }

      gsap.utils.toArray<HTMLElement>(".reel-stack-card", scope.current).forEach((card) => {
        gsap.fromTo(card, { scale: 0.92, opacity: 0.65 }, {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top 88%", end: "top 26%", scrub: 0.6 },
        });
      });
    });

    return () => media.revert();
  }, { scope });

  return scope;
}
