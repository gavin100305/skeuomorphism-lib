import { Icon } from "../icons";
export type Testimonial = { id: string; quote: string; author: string; role: string; initials: string };
export function TestimonialCarousel({ items, label = "Testimonials" }: { items: Testimonial[]; label?: string }) {
  return <div className="testimonial-viewport" tabIndex={0} aria-label={`${label}; focus to pause`}><div className="testimonial-track">{[0,1].map(copy => <div className={`testimonial-group ${copy ? "duplicate" : ""}`} key={copy} aria-hidden={copy === 1 ? true : undefined}>{items.map(item => <figure className="testimonial-card" key={item.id}><div className="quote-engraving"><Icon name="quote" size={25} /><span>{item.role}</span></div><blockquote>{item.quote}</blockquote><figcaption><span className="testimonial-monogram">{item.initials}</span><span><strong>{item.author}</strong><span>{item.role}</span></span></figcaption></figure>)}</div>)}</div></div>;
}
