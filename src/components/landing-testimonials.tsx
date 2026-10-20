"use client";
import Link from "next/link";

import { SkeuoTestimonialCarousel as TestimonialCarousel } from "./skeuomorphic/skeuo-testimonial-carousel";

const quotes = [
  { quote: "The difference is in the details you notice after the first click.", initials: "01", role: "Designer’s perspective" },
  { quote: "Familiar controls. Just enough character to make them feel like yours.", initials: "02", role: "Developer’s perspective" },
  { quote: "A good interface should feel as considered as the thing it helps you make.", initials: "03", role: "Maker’s perspective" },
  { quote: "The kind of button you find yourself pressing one more time.", initials: "04", role: "A small interaction" },
];
export function Testimonials() {
  return <section className="testimonials-section" aria-label="Testimonial component preview">
    <div className="section-shell testimonial-heading" data-reveal><div><span className="eyebrow">WORDS WITH A LITTLE WEIGHT</span><h2>Good words.<br />A proper place for them.</h2></div><div><p>A testimonial component in motion.<br />Sample copy, ready for your real feedback.</p><Link href="/docs/testimonial-carousel" className="landing-doc-link">Testimonial carousel docs ↗</Link></div></div>
    <div data-reveal><TestimonialCarousel items={quotes.map(item => ({ id: item.initials, quote: item.quote, author: item.role, role: "Sample testimonial", initials: item.initials }))} /></div>
  </section>;
}
