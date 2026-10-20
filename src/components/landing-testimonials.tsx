"use client";

import { Icon } from "./icons";

const quotes = [
  { quote: "The difference is in the details you notice after the first click.", initials: "01", role: "Designer’s perspective" },
  { quote: "Familiar controls. Just enough character to make them feel like yours.", initials: "02", role: "Developer’s perspective" },
  { quote: "A good interface should feel as considered as the thing it helps you make.", initials: "03", role: "Maker’s perspective" },
  { quote: "The kind of button you find yourself pressing one more time.", initials: "04", role: "A small interaction" },
];
export function Testimonials() {
  return <section className="testimonials-section" aria-label="Testimonial component preview">
    <div className="section-shell testimonial-heading" data-reveal><div><span className="eyebrow">WORDS WITH A LITTLE WEIGHT</span><h2>Good words.<br />A proper place for them.</h2></div><div><p>A testimonial component in motion.<br />Sample copy, ready for your real feedback.</p></div></div>
    <div className="testimonial-viewport" data-reveal tabIndex={0} aria-label="Auto-scrolling sample testimonials; focus to pause">
      <div className="testimonial-track">{[0, 1].map(copy => <div className={`testimonial-group ${copy ? "duplicate" : ""}`} key={copy} aria-hidden={copy === 1 ? true : undefined}>{quotes.map(q => <figure className="testimonial-card" key={q.initials}><div className="quote-engraving"><Icon name="quote" size={25} /><span>EXAMPLE {q.initials}</span></div><blockquote>{q.quote}</blockquote><figcaption><span className="testimonial-monogram">{q.initials}</span><span><strong>{q.role}</strong><span>Sample testimonial</span></span></figcaption></figure>)}</div>)}</div>
    </div>
  </section>;
}
