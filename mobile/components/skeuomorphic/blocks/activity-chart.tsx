import React from "react";
import { Text, View } from "react-native";
import { useSkeuo } from "../theme";
export function ActivityChart({
  values = [35, 62, 48, 88, 54, 72, 42],
  label = "Hours this week",
}: {
  values?: number[];
  label?: string;
}) {
  const { colors: c } = useSkeuo();
  return (
    <View style={{ gap: 14 }}>
      <View
        accessibilityRole="image"
        accessibilityLabel={`${label}: ${values.join(", ")}`}
        style={{
          height: 140,
          flexDirection: "row",
          gap: 10,
          alignItems: "flex-end",
        }}
      >
        {values.map((value, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: "100%",
              justifyContent: "flex-end",
              gap: 7,
            }}
          >
            <View
              style={{
                height: (Math.max(2, Math.min(100, value)) +
                  "%") as `${number}%`,
                backgroundColor: i === 3 ? c.accent : c.edge,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderWidth: 1,
                borderColor: c.base,
              }}
            />
          </View>
        ))}
      </View>
      <View style={{ flexDirection: "row" }}>
        {values.map((_, i) => (
          <Text
            key={i}
            style={{
              flex: 1,
              textAlign: "center",
              color: c.muted,
              fontSize: 10,
            }}
          >
            {["M", "T", "W", "T", "F", "S", "S"][i % 7]}
          </Text>
        ))}
      </View>
    </View>
  );
}
