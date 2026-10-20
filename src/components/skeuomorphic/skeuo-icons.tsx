import "./styles/skeuo-icons.css";
import type { CSSProperties } from "react";
export function SkeuoIcon({ name, size = 18, style }: { name: string; size?: number; style?: CSSProperties }) {
  const paths: Record<string, React.ReactNode> = {
    home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />,
    folder: <path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />,
    briefcase: <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 11l7 3h4l7-3M12 12v4M5 7h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />,
    trophy: <path d="M8 3h8v6a4 4 0 0 1-8 0ZM8 5H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4m-4 1v5m-4 3h8m-6-3h4v3h-4Z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></>,
    volume: <><path d="M11 4 6 8H3v8h3l5 4V4ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" /></>,
    muted: <><path d="M11 4 6 8H3v8h3l5 4V4Zm5 5 5 6m0-6-5 6" /></>,
    align: <path d="M4 6h16M4 12h10M4 18h13" />,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    panel: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M9 4v16M5.5 8h1M5.5 11h1" /></>,
    chevron: <path d="m10 7 5 5-5 5" />,
    pause: <><path d="M8 5v14M16 5v14" strokeWidth="3" /></>,
    music: <><path d="M9 18V5l11-2v13M9 9l11-2" /><ellipse cx="6" cy="18" rx="3" ry="2" /><ellipse cx="17" cy="16" rx="3" ry="2" /></>,
    quote: <><path d="M10 5H4v8h4c0 3-1 4-3 5m15-13h-6v8h4c0 3-1 4-3 5" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    up: <path d="M12 19V5M6 11l6-6 6 6" />,
    diagonal: <><path d="M6 18 18 6M6 6h12v12" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
    moon: <path d="M20 14a8 8 0 0 1-10-10A8.5 8.5 0 1 0 20 14Z" />,
    github: <><path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.7-1.6 6.7-7.3A5.7 5.7 0 0 0 19 4a5.3 5.3 0 0 0-.1-4S17.6-.4 14.5 1.6a15.3 15.3 0 0 0-8 0C3.4-.4 2.1 0 2.1 0A5.3 5.3 0 0 0 2 4 5.7 5.7 0 0 0 .3 8c0 5.7 3.4 6.9 6.7 7.3A3.5 3.5 0 0 0 6 18v4" transform="translate(2 1) scale(.88)" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    copy: <><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
    code: <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /></>,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    play: <path d="m9 5 11 7-11 7V5Z" />,
    reset: <><path d="M3 10a9 9 0 1 1 2 8M3 3v7h7" /></>,
    heart: <path d="M20.5 4.5a5.3 5.3 0 0 0-7.5 0L12 5.6l-1.1-1.1a5.3 5.3 0 0 0-7.5 7.5L12 21l8.5-9a5.3 5.3 0 0 0 0-7.5Z" />,
  };
  return <svg className={["arrow", "diagonal", "up"].includes(name) ? "sk-arrow-icon" : undefined} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>{paths[name] || paths.layers}</svg>;
}
