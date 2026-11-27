import "./global.css";
import React, { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  SkeuoProvider,
  useSkeuo,
  SkeuoButton,
} from "./components/skeuomorphic";
import { NativeDemo } from "./preview/demos";
import { PocketTemplate } from "./components/skeuomorphic/templates/pocket";
import { StillTemplate } from "./components/skeuomorphic/templates/still";
import { DaybookTemplate } from "./components/skeuomorphic/templates/daybook";
import allNativeItems from "./catalog.json";
import unlisted from "./unlisted.json";
const catalog = allNativeItems.filter((item) => !unlisted.includes(item.slug));

export default function App() {
  const initial =
    Platform.OS === "web" ? new URLSearchParams(window.location.search) : null;
  const [slug, setSlug] = useState(initial?.get("item") ?? "pocket");
  const [appearance, setAppearance] = useState<"light" | "dark">("light");
  const embedded = Platform.OS === "web" && initial?.get("embed") === "1";
  const inline = embedded && initial?.get("surface") === "1";
  const measuredHeight = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const receive = (event: MessageEvent) => {
      if (
        event.source !== window.parent ||
        event.origin !== window.location.origin
      )
        return;
      if (event.data?.type === "skeuo-ping") {
        if (measuredHeight.current !== undefined) {
          window.parent.postMessage({ type: "skeuo-preview-height", height: measuredHeight.current }, window.location.origin);
        }
        window.parent.postMessage({ type: "skeuo-ready" }, window.location.origin);
      }
      if (event.data?.type === "skeuo-theme")
        setAppearance(event.data.dark ? "dark" : "light");
    };
    window.addEventListener("message", receive);
    window.parent.postMessage({ type: "skeuo-ready" }, window.location.origin);
    return () => window.removeEventListener("message", receive);
  }, []);
  return (
    <SafeAreaProvider>
      <SkeuoProvider
        appearance={appearance}
        onSound={
          embedded
            ? () =>
                window.parent.postMessage(
                  { type: "skeuo-sound" },
                  window.location.origin,
                )
            : undefined
        }
      >
        <StatusBar style={appearance === "dark" ? "light" : "dark"} />
        <Preview slug={slug} onHeight={inline ? (height) => {
          measuredHeight.current = height;
          window.parent.postMessage({ type: "skeuo-preview-height", height }, window.location.origin);
        } : undefined} />
        {!embedded && (
          <View style={{ position: "absolute", top: 4, right: 4 }}>
            <SkeuoButton
              onPress={() => {
                const next =
                  (catalog.findIndex((x) => x.slug === slug) + 1) %
                  catalog.length;
                setSlug(catalog[next].slug);
              }}
            >
              Next example
            </SkeuoButton>
            <SkeuoButton
              onPress={() =>
                setAppearance(appearance === "light" ? "dark" : "light")
              }
            >
              Theme
            </SkeuoButton>
          </View>
        )}
      </SkeuoProvider>
    </SafeAreaProvider>
  );
}
const previewPadding = 24;

function Preview({ slug, onHeight }: { slug: string; onHeight?: (height: number) => void }) {
  const { colors: c } = useSkeuo();
  if (slug === "pocket") return <PocketTemplate />;
  if (slug === "still") return <StillTemplate />;
  if (slug === "daybook") return <DaybookTemplate />;
  return (
    <View style={{ flex: 1, backgroundColor: onHeight ? c.surface : c.background }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: previewPadding,
          justifyContent: "center",
        }}
      >
        <View onLayout={onHeight ? ({ nativeEvent }) => {
          onHeight(Math.ceil(nativeEvent.layout.height + previewPadding * 2));
        } : undefined}>
          <NativeDemo slug={slug} />
        </View>
      </ScrollView>
    </View>
  );
}
