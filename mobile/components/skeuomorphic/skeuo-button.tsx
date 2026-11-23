import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { LinearGradient } from "expo-linear-gradient";
import { useSkeuo, useFeedback } from "./theme";
import { styles } from "./styles";
import type { ButtonProps } from "./types";
export function SkeuoButton({
  children,
  onPress,
  disabled = false,
  variant = "default",
  accessibilityLabel,
}: ButtonProps) {
  const { colors } = useSkeuo();
  const feedback = useFeedback();
  const accent = variant === "accent";
  const [focused, setFocused] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  return (
    <Button
      variant="ghost"
      className="p-0 h-auto"
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={() => {
        feedback();
        onPress();
      }}
      style={StyleSheet.flatten([
        styles.button,
        {
          opacity: disabled ? 0.45 : 1,
          borderColor: focused ? colors.accent : colors.edge,
          backgroundColor: colors.base,
          borderBottomWidth: pressed ? 1 : 4,
          transform: [{ translateY: pressed ? 3 : 0 }],
        },
      ])}
    >
      <LinearGradient
        colors={
          accent
            ? [colors.accent, colors.accent]
            : [colors.raised, colors.surface]
        }
        style={[styles.face, { alignSelf: "stretch" }]}
      >
        {typeof children === "string" ? (
          <Text
            style={{
              color: accent ? colors.accentInk : colors.ink,
              fontSize: 16,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </LinearGradient>
    </Button>
  );
}
