"use client";

import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { Icon } from "../icons";
import "./sidebar.css";

type SidebarContextValue = {
  open: boolean;
  mobileOpen: boolean;
  isMobile: boolean;
  toggle: () => void;
  closeMobile: () => void;
  desktopId: string;
  mobileId: string;
};
const SidebarContext = createContext<SidebarContextValue | null>(null);
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Sidebar components must be inside SidebarProvider.");
  return context;
}

type SidebarProviderProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  width?: number;
  className?: string;
  collapsible?: boolean;
};

/** The layout owns the sidebar column, so content always uses the remaining width. */
export function SidebarProvider({ children, defaultOpen = true, open: controlledOpen, onOpenChange, width = 248, className = "", collapsible = true }: SidebarProviderProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const id = useId();
  const open = collapsible ? (controlledOpen ?? internalOpen) : true;
  useEffect(() => {
    const media = window.matchMedia("(max-width: 899px)");
    function update() { setIsMobile(media.matches); setMobileOpen(false); }
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  function setOpen(next: boolean) {
    if (!collapsible) return;
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }
  function toggle() { if (isMobile) setMobileOpen(v => !v); else setOpen(!open); }
  useEffect(() => {
    let focusTimer: ReturnType<typeof setTimeout> | undefined;
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isMobile) setMobileOpen(true); else setOpen(true);
        clearTimeout(focusTimer);
        focusTimer = setTimeout(() => {
          document.getElementById(`${id}-${isMobile ? "mobile" : "desktop"}`)?.querySelector<HTMLInputElement>('input[type="search"]')?.focus();
        }, 80);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => { window.removeEventListener("keydown", onKeyDown); clearTimeout(focusTimer); };
  });
  return <SidebarContext.Provider value={{ open, mobileOpen, isMobile, toggle, closeMobile: () => setMobileOpen(false), desktopId: `${id}-desktop`, mobileId: `${id}-mobile` }}>
    <div className={`library-sidebar-layout ${className}`} data-sidebar-open={open} style={{ "--sidebar-width": `${width}px` } as CSSProperties}>{children}</div>
  </SidebarContext.Provider>;
}

/** Desktop navigation occupies a real grid column; mobile navigation is a modal drawer. */
export function Sidebar({ children, label = "Documentation navigation" }: { children: ReactNode; label?: string }) {
  const { open, mobileOpen, isMobile, closeMobile, desktopId, mobileId } = useSidebar();
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (mobileOpen && isMobile) {
      if (!element.open) element.showModal();
      frame = requestAnimationFrame(() => { element.dataset.expanded = "true"; });
    } else if (element.open) {
      element.dataset.expanded = "false";
      if (!isMobile) element.close(); else timer = setTimeout(() => element.close(), 220);
    }
    return () => { cancelAnimationFrame(frame); clearTimeout(timer); };
  }, [mobileOpen, isMobile]);
  useEffect(() => {
    if (!mobileOpen || !isMobile) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = originalOverflow; };
  }, [mobileOpen, isMobile]);
  return <>
    <aside id={desktopId} className="library-sidebar-desktop" aria-label={label} aria-hidden={!open || isMobile} inert={!open || isMobile}><div className="library-sidebar-inner">{children}</div></aside>
    <dialog ref={dialog} id={mobileId} className="library-sidebar-dialog" aria-labelledby={titleId} onCancel={event => { event.preventDefault(); closeMobile(); }} onClose={closeMobile} onClick={event => {
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeMobile();
    }}><div className="library-drawer-heading"><span id={titleId}>Browse documentation</span><button type="button" onClick={closeMobile} aria-label="Close navigation"><Icon name="close" size={18} /></button></div><div className="library-sidebar-inner">{children}</div></dialog>
  </>;
}

export function SidebarTrigger({ className = "", onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, mobileOpen, isMobile, toggle, desktopId, mobileId } = useSidebar();
  return <button {...props} type="button" className={`library-sidebar-trigger ${className}`} aria-label={isMobile ? "Browse documentation" : open ? "Close sidebar" : "Open sidebar"} aria-expanded={isMobile ? mobileOpen : open} aria-controls={isMobile ? mobileId : desktopId} onClick={event => { onClick?.(event); if (!event.defaultPrevented) toggle(); }}><Icon name="panel" size={19} /></button>;
}

export function SidebarInset({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`library-sidebar-inset ${className}`}>{children}</div>;
}
