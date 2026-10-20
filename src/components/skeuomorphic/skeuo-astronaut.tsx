import "./styles/skeuo-astronaut.css";
import type { CSSProperties } from "react";
type SuitPalette = "azure";
type Direction = "up" | "down" | "left" | "right";
const suitColors = { azure: { suit: "#F2F5FA", shade: "#A7B0C0", trim: "#65C8FF", visor: "#16334B" } };
export function SkeuoAstronaut({ palette = "azure", facing = "down", walking = false, remote = false }: {
  palette?: SuitPalette;
  facing?: Direction;
  walking?: boolean;
  remote?: boolean;
}) {
  const colors = suitColors[palette];
  const style = {
    "--sk-astronaut-suit": colors.suit,
    "--sk-astronaut-shade": colors.shade,
    "--sk-astronaut-trim": colors.trim,
    "--sk-astronaut-visor": colors.visor,
  } as CSSProperties;
  return (
    <svg className="sk-astronaut-svg" viewBox="0 0 48 60" width="48" height="60" aria-hidden="true" focusable="false" shapeRendering="crispEdges"
      style={style} data-facing={facing} data-walking={walking} data-remote={remote}>
      <path d="M20 3h8v4h-8z" fill="#ffc875" />
      <path d="M8 20h4v12H8zM36 20h4v12h-4zM6 24h4v4H6zM38 24h4v4h-4z" fill="#111722" />
      <path d="M10 19h5v15h-5zM33 19h5v15h-5z" fill="var(--sk-astronaut-shade)" />
      <path d="M15 7h18v4h5v6h4v15h-4v5h-5v3H15v-3h-5v-5H6V17h4v-6h5z" fill="var(--sk-astronaut-suit)" stroke="#111722" strokeWidth="3" />
      <path d="M16 10h16v3h5v4h3v12h-3v4h-5v3H16v-3h-5v-4H8V17h3v-4h5z" fill="var(--sk-astronaut-shade)" />
      <path d="M16 11h16v3h5v4h3v9h-3v4h-5v2H16v-2h-5v-4H9v-9h2v-4h5z" fill="var(--sk-astronaut-suit)" />
      <path className="astronaut-visor" d="M15 17h18v3h4v8h-4v3H15v-3h-4v-8h4z" fill="var(--sk-astronaut-visor)" stroke="#111722" strokeWidth="2" />
      <path d="M16 19h8v3h-8zM16 24h4v2h-4z" fill="var(--sk-astronaut-trim)" />
      <path d="M20 35h8v8h-8z" fill="#111722" />
      <path d="M17 35h14v9H17z" fill="var(--sk-astronaut-suit)" stroke="#111722" strokeWidth="2" />
      <path d="M20 37h8v4h-8z" fill="var(--sk-astronaut-trim)" />
      <path className="astronaut-arm astronaut-arm-left" d="M14 37h5v10h-5z" fill="var(--sk-astronaut-suit)" stroke="#111722" strokeWidth="2" />
      <path className="astronaut-arm astronaut-arm-right" d="M29 37h5v10h-5z" fill="var(--sk-astronaut-suit)" stroke="#111722" strokeWidth="2" />
      <path className="astronaut-leg astronaut-leg-left" d="M14 47h8v8h-8z" fill="var(--sk-astronaut-suit)" stroke="#111722" strokeWidth="2" />
      <path className="astronaut-leg astronaut-leg-right" d="M26 47h8v8h-8z" fill="var(--sk-astronaut-suit)" stroke="#111722" strokeWidth="2" />
      <path d="M12 53h10v4H12zM26 53h10v4H26z" fill="#111722" />
      <path d="M15 46h4v4h-4zM29 46h4v4h-4z" fill="var(--sk-astronaut-trim)" />
      <path d="M13 13h5v2h-5zM30 13h3v2h-3z" fill="#fff" opacity=".8" />
    </svg>
  );
}
