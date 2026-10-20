"use client";
import "./styles/skeuo-project-card.css";

import type { ReactNode } from "react";
import { SkeuoIcon as Icon } from "./skeuo-icons";
export type SkeuoProjectCardProps = { title: string; number?: string; image?: string; imageAlt?: string; children?: ReactNode; onOpen?: () => void };
/** Extracted from the portfolio's ProjectPrintFace and layered print frame. */
export function SkeuoProjectCard({ title, number = "01", image, imageAlt = "", children, onOpen }: SkeuoProjectCardProps) {
  const content = <><span className="sk-project-handle"><span>{number}</span><strong>{title}</strong>{onOpen && <Icon name="diagonal" size={14} />}</span><span className="sk-project-image">{image ? <img src={image} alt={imageAlt} draggable={false} /> : children}</span></>;
  return onOpen ? <button data-sk-root="" type="button" className="sk-project-card" onClick={onOpen} aria-label={`Explore ${title}`}>{content}</button> : <article data-sk-root="" className="sk-project-card">{content}</article>;
}
