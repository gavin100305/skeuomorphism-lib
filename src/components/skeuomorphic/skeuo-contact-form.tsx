"use client";
import "./styles/skeuo-contact-form.css";

import { useEffect, useId, useRef, useState } from "react";
import { SkeuoButton as Button } from "./skeuo-button";
import { SkeuoInput as Input, SkeuoTextarea as Textarea } from "./skeuo-input";
import { SkeuoIcon as Icon } from "./skeuo-icons";
export type ContactValues = { name: string; email: string; message: string };
/** Portfolio dual-tone contact panel; submission belongs to the consumer. */
export type SkeuoContactFormProps = {
  onSend: (values: ContactValues) => Promise<void>;
  labels?: Partial<{ name: string; email: string; message: string; namePlaceholder: string; emailPlaceholder: string; messagePlaceholder: string; send: string; sending: string; sent: string; success: string; error: string; idle: string }>;
};
export function SkeuoContactForm({ onSend, labels }: SkeuoContactFormProps) {
  const copy = {name:"Name",email:"Email",message:"Message",namePlaceholder:"Your name",emailPlaceholder:"you@example.com",messagePlaceholder:"What would you like to work on?",send:"Send message",sending:"Sending…",sent:"Message sent",success:"Your message is on its way.",error:"Couldn’t send. Please try again.",idle:"Let’s make something together.",...labels};
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  return <form data-sk-root="" className="sk-contact" aria-busy={state === "sending"} onSubmit={async e => {
    e.preventDefault(); if (state === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    clearTimeout(timer.current); setState("sending");
    try { await onSend({ name: String(data.get("name")), email: String(data.get("email")), message: String(data.get("message")) }); form.reset(); setState("success"); timer.current = setTimeout(() => setState("idle"), 3500); }
    catch { setState("error"); }
  }}><div className="sk-contact-fields"><label htmlFor={`${id}-name`}>{copy.name}<Input id={`${id}-name`} name="name" required autoComplete="name" placeholder={copy.namePlaceholder} disabled={state === "sending"} /></label><label htmlFor={`${id}-email`}>{copy.email}<Input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder={copy.emailPlaceholder} disabled={state === "sending"} /></label><label className="sk-contact-message" htmlFor={`${id}-message`}>{copy.message}<Textarea id={`${id}-message`} name="message" required placeholder={copy.messagePlaceholder} disabled={state === "sending"} /></label></div><div className="sk-contact-actions"><Button variant="primary" type="submit" loading={state === "sending"}>{state === "success" ? copy.sent : state === "sending" ? copy.sending : copy.send}<Icon name={state === "success" ? "check" : "diagonal"} size={16} /></Button><p role="status">{state === "success" ? copy.success : state === "error" ? copy.error : copy.idle}</p></div></form>;
}
