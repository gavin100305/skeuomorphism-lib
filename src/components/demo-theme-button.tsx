"use client";
import { useEffect, useState } from "react";
import { SkeuoThemeButton } from "./skeuomorphic/skeuo-theme-button";
import { useThemeToggle } from "./use-theme-toggle";
export function DemoThemeButton({ variant = "key" }: {variant?: "key" | "round"}) {
  const [theme,setTheme]=useState<"light"|"dark">("light");
  const toggle=useThemeToggle();
  useEffect(() => {const root=document.documentElement;const sync=()=>setTheme(root.dataset.theme === "dark" ? "dark" : "light");sync();const observer=new MutationObserver(sync);observer.observe(root,{attributes:true,attributeFilter:["data-theme"]});return()=>observer.disconnect();},[]);
  return <SkeuoThemeButton theme={theme} onThemeChange={() => {void toggle();}} variant={variant}/>;
}
