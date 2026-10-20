import type { ReactNode } from "react";
/** The portfolio access badge, with caller-provided content. */
export function IDCard({ name, role, portrait, code = "ID / 01", heading = "MEMBER ACCESS" }: { name: string; role: string; portrait: ReactNode; code?: string; heading?: string }) {
  return <article className="sk-id-card"><div className="sk-id-slot" /><div className="sk-id-heading"><span>{code}</span><span>{heading}</span></div><div className="sk-id-portrait">{portrait}</div><h3>{name}</h3><div className="sk-id-meta"><span>{role}</span><span className="sk-id-bars" aria-hidden="true" /></div></article>;
}
