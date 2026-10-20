import type { HTMLAttributes } from "react";
export function Surface({ variant = "raised", className = "", ...props }: HTMLAttributes<HTMLDivElement> & { variant?: "raised" | "recessed" }) {
  return <div className={`sk-surface sk-surface-${variant} ${className}`} {...props} />;
}
