"use client";
import type { ReactNode } from "react";
import { Icon } from "../icons";
type ProjectCardProps = { title: string; number?: string; image?: string; imageAlt?: string; children?: ReactNode; onOpen?: () => void };
/** Extracted from the portfolio's ProjectPrintFace and layered print frame. */
export function ProjectCard({ title, number = "01", image, imageAlt = "", children, onOpen }: ProjectCardProps) {
  const content = <><span className="sk-project-handle"><span>{number}</span><strong>{title}</strong>{onOpen && <Icon name="diagonal" size={14} />}</span><span className="sk-project-image">{image ? <img src={image} alt={imageAlt} draggable={false} /> : children}</span></>;
  return onOpen ? <button type="button" className="sk-project-card" onClick={onOpen} aria-label={`Explore ${title}`}>{content}</button> : <article className="sk-project-card">{content}</article>;
}
