"use client";
import { useEffect, useRef, useState } from "react";
import { playButtonSound, playKnobTurnSound } from "@/lib/button-sound";
import { SOUND_KEY } from "@/components/button-sound-effects";
export function PhonePreview({ slug, framed }: { slug: string; framed: boolean }) {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sendTheme = () => {
      const root = document.documentElement;
      const dark =
        root.classList.contains("dark") || root.dataset.theme === "dark";
      iframe.current?.contentWindow?.postMessage(
        { type: "skeuo-theme", dark },
        window.location.origin,
      );
    };
    const receive = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframe.current?.contentWindow
      )
        return;
      if (event.data?.type === "skeuo-ready") {
        clearInterval(handshake);
        setReady(true);
        sendTheme();
      }
      if (
        event.data?.type === "skeuo-sound" &&
        localStorage.getItem(SOUND_KEY) !== "off"
      )
        playButtonSound("down");
      if (
        event.data?.type === "skeuo-knob-sound" &&
        slug === "rotary-knob" &&
        localStorage.getItem(SOUND_KEY) !== "off"
      ) {
        void playKnobTurnSound(event.data.direction === "anticlockwise" ? "anticlockwise" : "clockwise")?.catch(() => {});
      }
    };
    const observer = new MutationObserver(sendTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    window.addEventListener("message", receive);
    sendTheme();
    const handshake = setInterval(() => {
      iframe.current?.contentWindow?.postMessage(
        { type: "skeuo-ping" },
        window.location.origin,
      );
      sendTheme();
    }, 300);
    return () => {
      clearInterval(handshake);
      observer.disconnect();
      window.removeEventListener("message", receive);
    };
  }, [slug]);
  return (
    <div className={framed ? "native-phone" : "native-inline-preview"}>
      {framed && <div className="native-phone-top" aria-hidden="true"><i /></div>}
      <div className="native-phone-screen">
        {!ready && (
          <div className="native-preview-loading" role="status">
            Loading native preview…
          </div>
        )}
        <iframe
          key={slug}
          ref={iframe}
          title={`Interactive ${slug} React Native preview`}
          src={`/native-preview/index.html?embed=1&item=${encodeURIComponent(slug)}`}
          loading="lazy"
          onLoad={() =>
            iframe.current?.contentWindow?.postMessage(
              {
                type: "skeuo-theme",
                dark: document.documentElement.classList.contains("dark"),
              },
              window.location.origin,
            )
          }
        />
      </div>
      {framed && <div className="native-phone-home" aria-hidden="true"><i /></div>}
    </div>
  );
}
