import type { CSSProperties } from "react";
import "./template-thumbnail.css";

export function TemplateThumbnail({ name }: { name: string }) {
  const style = {
    "--template-preview-light": `url("/template-previews/${name}-light.webp")`,
    "--template-preview-dark": `url("/template-previews/${name}-dark.webp")`,
  } as CSSProperties;

  return <div className="template-thumbnail" aria-hidden="true" style={style} />;
}
