import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "@/components/ui/collection.css";
import "@/components/ui/control-refinements.css";
import { ButtonSoundEffects } from "@/components/button-sound-effects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skeumorphism — Interfaces you can almost feel",
  description: "Tactile React components. Thoughtful depth, physical details, and interfaces with a little more feeling.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">{`try{var t=localStorage.getItem('skeumorphism-theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch{}`}</Script>
        <ButtonSoundEffects />
        {children}
      </body>
    </html>
  );
}
