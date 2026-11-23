import React from "react";
import { Text } from "react-native";
import { useSkeuo } from "./theme";
export function SkeuoText({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  const { colors } = useSkeuo();
  return (
    <Text
      style={{
        color: muted ? colors.muted : colors.ink,
        fontSize: 16,
        lineHeight: 24,
      }}
    >
      {children}
    </Text>
  );
}
