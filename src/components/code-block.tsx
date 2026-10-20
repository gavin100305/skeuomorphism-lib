"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";
export function CodeBlock({ code, name = "Example", compact = false }: { code: string; name?: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const tokens = code.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\/\/[^\n]*|\b(?:import|from|export|function|return|const|let|async|await|if|throw|new|type|interface|true|false|null)\b|\b[A-Z][A-Za-z]*\b|[<>{}();=])/g);
  return <div className={`doc-code ${compact ? "compact" : ""}`}><div className="doc-code-toolbar"><span>{name}</span><button type="button" aria-label={`Copy ${name}`} onClick={async () => { try { await navigator.clipboard.writeText(code); setCopied(true); clearTimeout(timer.current); timer.current = setTimeout(() => setCopied(false), 1800); } catch {} }}><Icon name={copied ? "check" : "copy"} size={14} /><span aria-live="polite">{copied ? "Copied" : "Copy"}</span></button></div><pre tabIndex={0} aria-label={name}><code>{tokens.map((token,index) => <span key={index} className={/^['"]/.test(token) ? "syntax-string" : /^\/\//.test(token) ? "syntax-punctuation" : /^(import|from|export|function|return|const|let|async|await|if|throw|new|type|interface|true|false|null)$/.test(token) ? "syntax-keyword" : /^[A-Z][A-Za-z]*$/.test(token) ? "syntax-component" : /^[<>{}();=]$/.test(token) ? "syntax-punctuation" : undefined}>{token}</span>)}</code></pre></div>;
}
