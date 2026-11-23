import React from "react";
import { Text, View } from "react-native";
import { SkeuoCard } from "../skeuo-card";
import { useSkeuo } from "../theme";
export function SummaryCard({
  label = "Total balance",
  value = "₹42,860",
  detail = "+8.2% this month",
}: {
  label?: string;
  value?: string;
  detail?: string;
}) {
  const { colors: c } = useSkeuo();
  return (
    <SkeuoCard style={{ padding: 22, gap: 14 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: c.muted, fontSize: 13 }}>{label}</Text>
        <View
          style={{
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: c.accent,
            marginTop: 5,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 42,
          fontWeight: "300",
          letterSpacing: -2,
          color: c.ink,
          fontVariant: ["tabular-nums"],
        }}
      >
        {value}
      </Text>
      <View
        style={{ borderTopWidth: 1, borderTopColor: c.edge, paddingTop: 12 }}
      >
        <Text style={{ color: c.accent, fontSize: 12 }}>{detail}</Text>
      </View>
    </SkeuoCard>
  );
}
