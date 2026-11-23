import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import * as Haptics from "expo-haptics";

export const themes = {
  light: {
    background: "#ffffff",
    surface: "#f5f5f2",
    raised: "#fafaf8",
    well: "#e9e9e5",
    edge: "#d1d1cb",
    base: "#d9d9d3",
    ink: "#202020",
    muted: "#686863",
    accent: "#365e50",
    accentInk: "#ffffff",
  },
  dark: {
    background: "#000000",
    surface: "#191919",
    raised: "#252525",
    well: "#111111",
    edge: "#3b3b39",
    base: "#080808",
    ink: "#efefeb",
    muted: "#aaaAA5",
    accent: "#9ab5a6",
    accentInk: "#14251c",
  },
};
const Context = createContext({
  colors: themes.light,
  dark: false,
  haptics: false,
});
export function SkeuoProvider({
  children,
  appearance = "system",
  haptics = false,
}: {
  children: React.ReactNode;
  appearance?: "light" | "dark" | "system";
  haptics?: boolean;
}) {
  const system = useColorScheme();
  const dark = (appearance === "system" ? system : appearance) === "dark";
  return (
    <Context.Provider
      value={{ colors: dark ? themes.dark : themes.light, dark, haptics }}
    >
      {children}
    </Context.Provider>
  );
}
export const useSkeuo = () => useContext(Context);
export function useFeedback() {
  const { haptics } = useSkeuo();
  return () => {
    if (haptics) void Haptics.selectionAsync().catch(() => {});
  };
}
