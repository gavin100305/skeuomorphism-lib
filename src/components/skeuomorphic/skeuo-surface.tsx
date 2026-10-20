import "./styles/skeuo-surface.css";
import type { HTMLAttributes } from "react";
export function SkeuoSurface({ variant = "raised", className = "", ...props }: HTMLAttributes<HTMLDivElement> & { variant?: "raised" | "recessed" }) {
  return <div data-sk-root="" className={`sk-surface sk-surface-${variant} ${className}`} {...props} />;
}
