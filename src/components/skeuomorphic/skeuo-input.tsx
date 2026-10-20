import "./styles/skeuo-input.css";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
export function SkeuoInput({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input data-sk-root="" className={`sk-input ${className}`} {...props} />;
}
export function SkeuoTextarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea data-sk-root="" className={`sk-input sk-textarea ${className}`} {...props} />;
}
