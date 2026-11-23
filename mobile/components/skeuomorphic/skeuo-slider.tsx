import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { useFeedback, useSkeuo } from "./theme";
export function SkeuoSlider({
  label,
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  disabled = false,
}: {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  disabled?: boolean;
}) {
  const { colors: c } = useSkeuo();
  const feedback = useFeedback();
  return (
    <View style={{ gap: 12, opacity: disabled ? 0.45 : 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: c.ink, fontSize: 14 }}>{label}</Text>
        <Text
          style={{
            color: c.muted,
            fontSize: 12,
            fontVariant: ["tabular-nums"],
          }}
        >
          {value}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: c.edge,
          borderBottomWidth: 3,
          borderRadius: 10,
          paddingHorizontal: 9,
          backgroundColor: c.surface,
        }}
      >
        <Slider
          accessibilityLabel={label}
          value={value}
          onValueChange={onValueChange}
          onSlidingComplete={feedback}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={step}
          disabled={disabled}
          minimumTrackTintColor={c.accent}
          maximumTrackTintColor={c.edge}
          thumbTintColor={c.raised}
          style={{ height: 46, width: "100%" }}
        />
        <View
          accessible={false}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            paddingBottom: 8,
          }}
        >
          {Array.from({ length: 21 }, (_, i) => (
            <View
              key={i}
              style={{
                height: i % 5 === 0 ? 7 : 4,
                width: 1,
                backgroundColor: c.edge,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
