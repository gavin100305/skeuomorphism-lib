import React from "react";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFeedback, useSkeuo } from "./theme";
import { SkeuoGlyph } from "./icons";
import { SkeuoDockBar, type DockBarProps } from "./skeuo-dock-bar";

export type { BottomBarItem } from "./skeuo-dock-bar";
export type BottomBarVariant = "dock" | "keys" | "rail" | "pill";
export function SkeuoBottomBar({
  items,
  value,
  onValueChange,
  variant = "dock",
  bottomInset = 0,
}: DockBarProps & { variant?: BottomBarVariant }) {
  if (variant === "dock") {
    return <SkeuoDockBar {...{ items, value, onValueChange, bottomInset }} />;
  }
  return <LabeledBottomBar {...{ items, value, onValueChange, variant, bottomInset }} />;
}

function LabeledBottomBar({
  items,
  value,
  onValueChange,
  variant,
  bottomInset = 0,
}: DockBarProps & { variant: Exclude<BottomBarVariant, "dock"> }) {
  const { colors: c } = useSkeuo();
  const feedback = useFeedback();
  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel="Bottom navigation"
      style={{
        paddingBottom: Math.max(8, bottomInset),
        paddingTop: 12,
        paddingHorizontal: variant === "rail" ? 0 : 12,
        backgroundColor: c.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: variant === "keys" ? 8 : 2,
          padding: variant === "pill" ? 5 : 0,
          borderWidth: variant === "pill" ? 1 : 0,
          borderColor: c.edge,
          borderRadius: variant === "pill" ? 32 : 16,
          backgroundColor: variant === "keys" ? c.background : c.well,
        }}
      >
        {items.map((item) => {
          const active = item.value === value;
          return (
            <Pressable
              key={item.value}
              accessibilityRole="tab"
              aria-selected={active}
              aria-disabled={!!item.disabled}
              accessibilityLabel={item.label}
              accessibilityState={{
                selected: active,
                disabled: !!item.disabled,
              }}
              disabled={item.disabled}
              onPress={() => {
                feedback();
                onValueChange(item.value);
              }}
              style={({ pressed }) => ({
                flex: 1,
                minHeight: 60,
                borderRadius: variant === "pill" ? 26 : 10,
                borderWidth: variant === "keys" ? 1 : 0,
                borderBottomWidth:
                  variant === "keys"
                    ? pressed
                      ? 1
                      : 4
                    : active && variant === "rail"
                      ? 3
                      : 1,
                borderColor: active && variant === "rail" ? c.accent : c.edge,
                backgroundColor: active
                  ? c.raised
                  : variant === "keys"
                    ? c.surface
                    : "transparent",
                opacity: item.disabled ? 0.4 : 1,
                transform: [{ translateY: pressed ? 2 : 0 }],
                overflow: "hidden",
              })}
            >
              <LinearGradient
                colors={active ? [c.raised, c.surface] : [c.well, c.well]}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 8,
                  gap: 3,
                }}
              >
                {item.icon ?? (
                  <SkeuoGlyph
                    name={item.value}
                    color={active ? c.accent : c.muted}
                  />
                )}
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 10,
                    fontWeight: active ? "700" : "500",
                    color: active ? c.ink : c.muted,
                  }}
                >
                  {item.label}
                </Text>
              </LinearGradient>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
