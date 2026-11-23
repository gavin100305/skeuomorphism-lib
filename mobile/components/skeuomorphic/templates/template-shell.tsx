import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSkeuo } from "../theme";
import {
  SkeuoBottomBar,
  type BottomBarItem,
  type BottomBarVariant,
} from "../skeuo-bottom-bar";
export function TemplateShell({
  name,
  subtitle,
  children,
  items,
  value,
  onValueChange,
  variant = "dock",
  action,
}: {
  name: string;
  subtitle: string;
  children: React.ReactNode;
  items: BottomBarItem[];
  value: string;
  onValueChange: (value: string) => void;
  variant?: BottomBarVariant;
  action?: React.ReactNode;
}) {
  const { colors: c } = useSkeuo();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ flex: 1, backgroundColor: c.background, paddingTop: insets.top }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 22,
          paddingTop: 18,
          paddingBottom: 18,
        }}
      >
        <View style={{ gap: 3 }}>
          <Text
            style={{
              color: c.ink,
              fontSize: 20,
              fontWeight: "700",
              letterSpacing: -0.6,
            }}
          >
            {name}
            <Text style={{ color: c.accent }}>.</Text>
          </Text>
          <Text style={{ color: c.muted, fontSize: 10 }}>{subtitle}</Text>
        </View>
        {action ?? (
          <View
            style={{
              height: 34,
              width: 34,
              borderRadius: 17,
              backgroundColor: c.well,
              borderWidth: 1,
              borderColor: c.edge,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: c.muted, fontSize: 11 }}>AM</Text>
          </View>
        )}
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 22,
          paddingBottom: 24,
          gap: 24,
        }}
      >
        {children}
      </ScrollView>
      <SkeuoBottomBar
        items={items}
        value={value}
        onValueChange={onValueChange}
        variant={variant}
        bottomInset={insets.bottom}
      />
    </View>
  );
}
export function SectionHeading({
  title,
  detail,
}: {
  title: string;
  detail?: string;
}) {
  const { colors: c } = useSkeuo();
  return (
    <View style={{ gap: 7 }}>
      <Text
        accessibilityRole="header"
        style={{
          fontSize: 29,
          fontWeight: "500",
          color: c.ink,
          letterSpacing: -1,
        }}
      >
        {title}
      </Text>
      {detail && (
        <Text style={{ color: c.muted, fontSize: 13, lineHeight: 20 }}>
          {detail}
        </Text>
      )}
    </View>
  );
}
