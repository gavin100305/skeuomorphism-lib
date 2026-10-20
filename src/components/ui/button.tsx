import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary";
  square?: boolean;
};

/** A raised control with a physical pressed state. */
export function Button({ variant = "default", square = false, className = "", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={`tactile ${variant === "primary" ? "primary" : ""} ${square ? "square" : ""} ${className}`} {...props} />;
}
