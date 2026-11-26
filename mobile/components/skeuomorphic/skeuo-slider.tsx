import { createElement, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
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
  const { colors: c, dark } = useSkeuo();
  const feedback = useFeedback();
  const [focused, setFocused] = useState(false);
  const progress = Math.min(1, Math.max(0, (value - minimumValue) / (maximumValue - minimumValue || 1)));
  const position = `${progress * 100}%` as const;
  const keyEdge = dark ? "#484946" : "#c6c7c1";
  const keyBase = dark ? "#101110" : "#d0d1ca";
  const highlight = dark ? "#ffffff1e" : "#fff";
  const shadow = dark ? "#00000099" : "#00000017";

  return (
    <View style={{ gap: 12, opacity: disabled ? 0.5 : 1 }}>
      <View style={styles.header}>
        <Text style={{ color: c.ink, fontSize: 14 }}>{label}</Text>
        <Text style={{ color: c.muted, fontSize: 12, fontVariant: ["tabular-nums"] }}>{value}</Text>
      </View>
      <View style={[
        styles.housing,
        {
          borderColor: focused && !disabled ? c.accent : c.edge,
          backgroundColor: c.base,
          boxShadow: `0 5px ${c.base}, 0 6px ${c.edge}, 0 12px 15px ${shadow}`,
        },
      ]}>
        <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={StyleSheet.absoluteFill}>
          <LinearGradient colors={[c.raised, c.base]} start={{ x: 0.21, y: 0 }} end={{ x: 0.79, y: 1 }} style={styles.housingFace} />
          <View style={[styles.housingFace, { boxShadow: `inset 0 2px ${highlight}, inset 2px 0 2px ${highlight}, inset 0 -3px ${c.base}` }]} />
          <View style={[styles.recess, {
            borderColor: c.edge, backgroundColor: c.well,
            boxShadow: `inset 0 5px 8px ${shadow}, inset 2px 1px 3px ${shadow}, 0 1px ${highlight}`,
          }]} />
          <View style={[styles.track, {
            borderColor: keyEdge, backgroundColor: c.well,
            boxShadow: `inset 0 3px 4px #00000070, 0 1px ${highlight}`,
          }]}>
            <View style={{ height: "100%", width: position, backgroundColor: c.accent, boxShadow: "inset 0 2px 3px #00000030" }} />
          </View>
          <View style={styles.thumbTravel}>
            <View style={[styles.thumb, {
              left: position, borderColor: keyEdge, backgroundColor: c.base,
              boxShadow: `0 4px ${keyBase}, 0 5px ${keyEdge}, 0 8px 7px #00000060`,
            }]}>
              <LinearGradient colors={[c.raised, c.base]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.thumbFace} />
              <View style={[styles.ridges, { boxShadow: `inset 0 2px ${highlight}, inset 0 -3px ${c.base}` }]}>
                {[4, 12, 20].map((left) => (
                  <View key={left} style={[styles.ridge, { left, borderLeftColor: c.edge, borderRightColor: highlight }]} />
                ))}
              </View>
            </View>
          </View>
          <View style={styles.ticks}>
            {Array.from({ length: 21 }, (_, i) => (
              <View key={i} style={{ height: i % 5 === 0 ? 7 : 3, width: 1, backgroundColor: c.edge }} />
            ))}
          </View>
        </View>
        {/* The platform input owns gestures and accessibility. The housing paints its value. */}
        {Platform.OS === "web" ? createElement("input", {
          type: "range",
          dir: "ltr",
          "aria-label": label,
          min: minimumValue,
          max: maximumValue,
          step: step || "any",
          value,
          disabled,
          onChange: (event) => onValueChange(Number(event.currentTarget.value)),
          onPointerUp: feedback,
          onFocus: () => setFocused(true),
          onBlur: () => setFocused(false),
          style: { width: "100%", height: 54, margin: 0, opacity: 0, cursor: disabled ? "not-allowed" : "grab" },
        }) : (
          <Slider
            accessibilityLabel={label}
            value={value}
            onValueChange={onValueChange}
            onSlidingComplete={feedback}
            minimumValue={minimumValue}
            maximumValue={maximumValue}
            step={step}
            disabled={disabled}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
            thumbTintColor="transparent"
            tapToSeek
            style={styles.nativeInput}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  housing: { height: 68, borderWidth: 1, borderRadius: 11, paddingHorizontal: 18 },
  housingFace: { ...StyleSheet.absoluteFillObject, borderRadius: 10 },
  recess: { position: "absolute", top: 7, bottom: 19, left: 8, right: 8, borderWidth: 1, borderRadius: 6 },
  track: { position: "absolute", top: 25, left: 20, right: 20, height: 8, borderWidth: 1, borderRadius: 5, overflow: "hidden" },
  thumbTravel: { position: "absolute", top: 13, left: 29, right: 29, height: 29 },
  thumb: { position: "absolute", width: 23, height: 29, marginLeft: -11.5, borderWidth: 1, borderRadius: 5 },
  thumbFace: { ...StyleSheet.absoluteFillObject, borderRadius: 4 },
  ridges: { ...StyleSheet.absoluteFillObject, overflow: "hidden", borderRadius: 4 },
  ridge: { position: "absolute", top: 0, bottom: 0, width: 2, borderLeftWidth: 1, borderRightWidth: 1 },
  ticks: { position: "absolute", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", left: 22, right: 22, bottom: 6 },
  nativeInput: { height: 54, width: "100%" },
});
