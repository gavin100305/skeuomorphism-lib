"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";
import { SkeuoButton as Button } from "./skeuomorphic/skeuo-button";

const example = `import { SkeuoButton } from "@/components/ui/skeuo-button";

export function SaveButton() {
  return (
    <SkeuoButton variant="primary">
      Save to collection
    </SkeuoButton>
  );
}`;

function HighlightedCode() {
  const tokens = example.split(/("[^"\n]*"|\b(?:import|from|export|function|return)\b|\b(?:Button|SaveButton)\b|\bvariant\b|[<>{}\/();=])/g);
  return <pre className="highlighted-code"><code>{tokens.map((token, i) => {
    const kind = token.startsWith('"') ? "string" : /^(import|from|export|function|return)$/.test(token) ? "keyword" : /^(Button|SaveButton)$/.test(token) ? "component" : token === "variant" ? "attribute" : /^[<>{}\/();=]$/.test(token) ? "punctuation" : "plain";
    return <span className={`syntax-${kind}`} key={i}>{token}</span>;
  })}</code></pre>;
}
export function CodeExample() {
  const [code, setCode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => { clearTimeout(timer.current); clearTimeout(copyTimer.current); }, []);
  function save() {
    clearTimeout(timer.current); setSaved(true);
    timer.current = setTimeout(() => setSaved(false), 2400);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(example); setCopied(true); clearTimeout(copyTimer.current); copyTimer.current = setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); }
  }
  return <div className="code-example" data-reveal>
    <div className="example-toolbar"><div className="example-tabs" aria-label="Example display"><button aria-pressed={!code} onClick={() => setCode(false)}><Icon name="layers" size={13} />Preview</button><button aria-pressed={code} onClick={() => setCode(true)}><Icon name="code" size={14} />Code</button></div><span className="mono">button.tsx</span></div>
    <div className={`example-content ${code ? "show-code" : ""}`}>
      {code ? <div className="code-enter" key="code"><HighlightedCode /></div> : <div className={`save-demo ${saved ? "is-saved" : ""}`} key="preview"><div className="save-stack"><span className="save-sheet sheet-one" /><span className="save-sheet sheet-two" /><span className="save-sheet sheet-main"><Icon name={saved ? "check" : "layers"} size={31} /></span></div><Button variant="primary" onClick={save}><Icon name={saved ? "check" : "plus"} size={16} />{saved ? "Added to collection" : "Save to collection"}</Button><span className="example-hint" aria-live="polite">{saved ? "There. A satisfying little detail." : "Try it. There’s a little more to a press."}</span></div>}
    </div>
    <div className="example-bottom"><a href="/docs/button" className="landing-doc-link">Button documentation</a><button onClick={copy}><Icon name={copied ? "check" : "copy"} size={14} />{copied ? "Copied" : "Copy example"}</button></div>
  </div>;
}
