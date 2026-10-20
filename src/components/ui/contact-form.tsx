"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "./button";
import { Input, Textarea } from "./input";
import { Icon } from "../icons";
export type ContactValues = { name: string; email: string; message: string };
/** Portfolio dual-tone contact panel; submission belongs to the consumer. */
export function ContactForm({ onSend }: { onSend: (values: ContactValues) => Promise<void> }) {
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  return <form className="sk-contact" aria-busy={state === "sending"} onSubmit={async e => {
    e.preventDefault(); if (state === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    clearTimeout(timer.current); setState("sending");
    try { await onSend({ name: String(data.get("name")), email: String(data.get("email")), message: String(data.get("message")) }); form.reset(); setState("success"); timer.current = setTimeout(() => setState("idle"), 3500); }
    catch { setState("error"); }
  }}><div className="sk-contact-fields"><label htmlFor={`${id}-name`}>Name<Input id={`${id}-name`} name="name" required autoComplete="name" placeholder="Your name" disabled={state === "sending"} /></label><label htmlFor={`${id}-email`}>Email<Input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder="you@example.com" disabled={state === "sending"} /></label><label className="sk-contact-message" htmlFor={`${id}-message`}>Message<Textarea id={`${id}-message`} name="message" required placeholder="What would you like to work on?" disabled={state === "sending"} /></label></div><div className="sk-contact-actions"><Button variant="primary" type="submit" loading={state === "sending"}>{state === "success" ? "Message sent" : state === "sending" ? "Sending…" : "Send message"}<Icon name={state === "success" ? "check" : "diagonal"} size={16} /></Button><p role="status">{state === "success" ? "Your message is on its way." : state === "error" ? "Couldn’t send. Please try again." : "Let’s make something together."}</p></div></form>;
}
