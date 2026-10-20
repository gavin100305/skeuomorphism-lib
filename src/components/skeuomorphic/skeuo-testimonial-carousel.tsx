import "./styles/skeuo-testimonial-carousel.css";
import { SkeuoIcon as Icon } from "./skeuo-icons";
export type Testimonial = { id: string; quote: string; author: string; role: string; initials: string };
export function SkeuoTestimonialCarousel({ items, label = "Testimonials" }: { items: Testimonial[]; label?: string }) {
  return <div data-sk-root="" className="sk-testimonial-viewport" tabIndex={0} aria-label={`${label}; focus to pause`}><div className="sk-testimonial-track">{[0,1].map(copy => <div className={`sk-testimonial-group ${copy ? "sk-duplicate" : ""}`} key={copy} aria-hidden={copy === 1 ? true : undefined}>{items.map(item => <figure className="sk-testimonial-card" key={item.id}><div className="sk-quote-engraving"><Icon name="quote" size={25} /><span>{item.role}</span></div><blockquote>{item.quote}</blockquote><figcaption><span className="sk-testimonial-monogram">{item.initials}</span><span><strong>{item.author}</strong><span>{item.role}</span></span></figcaption></figure>)}</div>)}</div></div>;
}
