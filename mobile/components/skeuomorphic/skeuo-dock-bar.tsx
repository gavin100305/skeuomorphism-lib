import type { ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { SkeuoGlyph } from "./icons";
import { themes, useFeedback, useSkeuo } from "./theme";

export type BottomBarItem = {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
};

export type DockBarProps = {
  items: BottomBarItem[];
  value: string;
  onValueChange: (value: string) => void;
  bottomInset?: number;
};

const iconPaths: Record<string, string> = {
  home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
  transactions: "M4 8h16m-4-4 4 4-4 4M20 16H4m4-4-4 4 4 4",
  analysis: "M4 4v16h16M9 16v-4m5 4V8m5 8V5",
  profile: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21a8 8 0 0 1 16 0",
};

export function SkeuoDockBar({
  items,
  value,
  onValueChange,
  bottomInset = 0,
}: DockBarProps) {
  const { colors, dark } = useSkeuo();
  const feedback = useFeedback();
  // Use the Section Dock materials with the website’s green accent.
  const edge = dark ? "#484946" : "#c6c7c1";
  const highlight = dark ? "#ffffff1e" : "#fff";
  const shadow = dark ? "#00000099" : "#00000017";
  const keyFace = dark ? "#292a29" : "#f9f9f7";
  const defaults = dark ? themes.dark : themes.light;
  const muted = dark && colors.muted === defaults.muted ? "#92928d" : colors.muted;
  const accent = colors.accent === defaults.accent
    ? dark
      ? { top: "#bbcec2", edge: "#6f8a79", base: "#4d6558" }
      : { top: "#487b68", edge: "#294b3e", base: "#213c32" }
    : { top: colors.accent, edge: colors.accent, base: colors.accent };
  const accentHighlight = dark ? "#ffffff80" : "#ffffff60";
  const accentRecess = dark ? "#00000026" : "#00000040";

  return (
    <View style={{ paddingBottom: Math.max(0, bottomInset), backgroundColor: colors.background }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          accessibilityRole="tablist"
          accessibilityLabel="Bottom navigation"
          style={[
            styles.shell,
            {
              borderColor: edge,
              backgroundColor: colors.surface,
              boxShadow: `0 5px ${colors.base}, 0 6px ${edge}, 0 12px 20px ${shadow}`,
            },
          ]}
        >
          <LinearGradient
            pointerEvents="none"
            colors={[colors.raised, colors.surface]}
            start={gradientStart}
            end={gradientEnd}
            style={styles.shellFace}
          />
          <View
            pointerEvents="none"
            style={[
              styles.shellFace,
              { boxShadow: `inset 0 2px 1px ${highlight}, inset 1px 0 ${highlight}, inset 0 -2px ${colors.base}` },
            ]}
          />
          <View
            style={[
              styles.track,
              {
                borderColor: colors.edge,
                backgroundColor: colors.base,
                boxShadow: `inset 0 5px 9px ${shadow}, inset 2px 0 5px ${shadow}, inset -1px 0 3px ${shadow}, 0 1px ${highlight}`,
              },
            ]}
          >
            {items.map((item) => {
              const active = item.value === value;
              const keyEdge = active ? accent.edge : edge;
              const keyBase = active ? accent.base : colors.base;
              const keyTop = active ? accent.top : keyFace;
              const keyBottom = active ? colors.accent : colors.surface;
              const ink = active ? colors.accentInk : muted;
              const path = Object.hasOwn(iconPaths, item.value) ? iconPaths[item.value] : undefined;

              return (
                <Pressable
                  key={item.value}
                  accessibilityRole="tab"
                  accessibilityLabel={item.label}
                  aria-selected={active}
                  aria-disabled={!!item.disabled}
                  accessibilityState={{ selected: active, disabled: !!item.disabled }}
                  disabled={item.disabled}
                  onPress={() => {
                    feedback();
                    onValueChange(item.value);
                  }}
                  style={({ pressed }) => [
                    styles.key,
                    {
                      borderColor: keyEdge,
                      backgroundColor: keyBottom,
                      boxShadow: pressed
                        ? `0 1px ${keyEdge}`
                        : `0 3px ${keyBase}, 0 4px ${keyEdge}, 0 6px 4px #00000025`,
                      opacity: item.disabled ? 0.4 : 1,
                      transform: [{ translateY: pressed ? 3 : 0 }],
                    },
                  ]}
                >
                  {({ pressed }) => (
                    <>
                      <LinearGradient
                        pointerEvents="none"
                        colors={[keyTop, keyBottom]}
                        start={gradientStart}
                        end={gradientEnd}
                        style={styles.keyFace}
                      />
                      <View
                        pointerEvents="none"
                        style={[
                          styles.keyFace,
                          {
                            boxShadow: pressed
                              ? `inset 0 2px 4px ${shadow}`
                              : `inset 0 2px ${active ? accentHighlight : highlight}, inset 2px 0 2px ${active ? "#ffffff25" : highlight}, inset 0 -3px ${keyBase}`,
                          },
                        ]}
                      />
                      <View
                        pointerEvents="none"
                        style={[
                          styles.keyInset,
                          {
                            borderColor: active ? accentHighlight : `${edge}73`,
                            boxShadow: `inset 0 2px 3px ${active ? accentRecess : shadow}, inset 0 -1px ${active ? accentHighlight : highlight}`,
                          },
                        ]}
                      />
                      <View pointerEvents="none" style={styles.icon}>
                        {item.icon ?? (path ? (
                          <Svg width={24} height={24} viewBox="0 0 24 24" accessible={false}>
                            <Path
                              d={path}
                              fill="none"
                              stroke={ink}
                              strokeWidth={1.6}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </Svg>
                        ) : <SkeuoGlyph name={item.value} color={ink} size={24} />)}
                      </View>
                    </>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const gradientStart = { x: 0.15, y: 0 };
const gradientEnd = { x: 0.85, y: 1 };

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 16,
  },
  shell: { padding: 9, borderWidth: 1, borderRadius: 29 },
  shellFace: { ...StyleSheet.absoluteFillObject, borderRadius: 28 },
  track: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 9,
    paddingHorizontal: 8,
    paddingBottom: 12,
    borderWidth: 1,
    borderRadius: 21,
  },
  key: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
  },
  icon: { zIndex: 1 },
  keyFace: { ...StyleSheet.absoluteFillObject, borderRadius: 11 },
  keyInset: {
    position: "absolute",
    top: 4,
    left: 4,
    right: 4,
    bottom: 5,
    borderWidth: 1,
    borderRadius: 8,
  },
});
