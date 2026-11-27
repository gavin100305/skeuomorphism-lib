import { useEffect, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Platform, StyleSheet, Text, View } from "react-native";
import * as Checkbox from "@rn-primitives/checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { useFeedback, useSkeuo } from "./theme";
import { styles } from "./styles";
import type { ToggleProps } from "./types";
import { SkeuoText } from "./skeuo-text";

const flipEasing = Easing.bezier(0.32, 0, 0.22, 1);

export function SkeuoCheckbox({
  label,
  checked,
  onCheckedChange,
  disabled,
}: ToggleProps) {
  const feedback = useFeedback();
  const [pressed, setPressed] = useState(false);
  return (
    <Checkbox.Root
      accessibilityLabel={label}
      checked={checked}
      disabled={disabled}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onCheckedChange={(v) => {
        feedback();
        onCheckedChange(v);
      }}
      style={StyleSheet.flatten([
        styles.row,
        styles.touch,
        { opacity: disabled ? 0.45 : 1 },
      ])}
    >
      <FlipTile checked={checked} pressed={pressed && !disabled} />
      <View style={styles.label}>
        <SkeuoText>{label}</SkeuoText>
      </View>
    </Checkbox.Root>
  );
}

function FlipTile({ checked, pressed }: { checked: boolean; pressed: boolean }) {
  const { colors, dark } = useSkeuo();
  const [reduceMotion, setReduceMotion] = useState(true);
  const [turn] = useState(() => new Animated.Value(checked ? 1 : 0));

  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (active) setReduceMotion(enabled);
    }).catch(() => {});
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduceMotion);
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const toValue = checked ? 1 : 0;
    if (reduceMotion) {
      turn.setValue(toValue);
      return;
    }
    const flip = Animated.timing(turn, {
      toValue,
      duration: 320,
      easing: flipEasing,
      useNativeDriver: Platform.OS !== "web",
    });
    flip.start();
    return () => flip.stop();
  }, [checked, reduceMotion, turn]);

  const cavityShadow = pressed
    ? "inset 0 5px 6px #07110a, inset 2px 0 4px #07110acd, 0 1px #c5d4bb3d"
    : "inset 0 3px 5px #07110ae6, inset 2px 0 3px #07110a99, 0 1px #c5d4bb55";

  return (
    <View aria-hidden pointerEvents="none" style={tileStyles.housing}>
      <LinearGradient
        colors={dark ? ["#718578", "#3f5448", "#25352d"] : ["#a5b4a0", "#637b68", "#3a4e40"]}
        locations={[0, 0.36, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tileStyles.rim}
      />
      <LinearGradient
        colors={["#14271c", "#2a4032", "#4b6250"]}
        locations={[0, 0.63, 1]}
        style={[tileStyles.cavity, { boxShadow: cavityShadow }]}
      />
      {[false, true].map((backFace) => (
        <Animated.View key={String(backFace)} style={[tileStyles.tile, {
          backgroundColor: backFace ? "#182f23" : dark ? colors.base : "#81735d",
          opacity: turn.interpolate({
            inputRange: [0, 0.499, 0.501, 1],
            outputRange: backFace ? [0, 0, 1, 1] : [1, 1, 0, 0],
          }),
          transform: [
            { translateY: pressed ? 1.5 : 0 },
            { perspective: 120 },
            { rotateX: turn.interpolate({
              inputRange: [0, 1],
              outputRange: backFace ? ["-180deg", "0deg"] : ["0deg", "180deg"],
            }) },
          ],
        }]}>
          <LinearGradient
            colors={["#ffffff55", "#ffffff0c", "#00000030"]}
            locations={[0, 0.42, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={[tileStyles.face, {
              backgroundColor: backFace ? colors.accent : dark ? colors.raised : "#eee4d3",
              borderColor: backFace ? "#14291e" : dark ? colors.edge : "#807766",
            }]}
          >
            {backFace ? (
              <Text style={[tileStyles.checkmark, { color: colors.accentInk }]}>✓</Text>
            ) : (
              <View style={[tileStyles.dash, { backgroundColor: dark ? colors.muted : "#6a5c49" }]} />
            )}
          </LinearGradient>
        </Animated.View>
      ))}
      <LinearGradient colors={pinColors} locations={pinStops} style={[tileStyles.pin, tileStyles.leftPin]} />
      <LinearGradient colors={pinColors} locations={pinStops} style={[tileStyles.pin, tileStyles.rightPin]} />
    </View>
  );
}

const pinColors = ["#f5ebd6", "#c1b49c", "#736957"] as const;
const pinStops = [0, 0.35, 1] as const;

const tileStyles = StyleSheet.create({
  housing: {
    width: 38,
    height: 38,
    flexShrink: 0,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#394a3d",
    backgroundColor: "#4b604e",
    boxShadow: "0 2px #33463a, 0 3px #203329, 0 5px 7px #14241959",
  },
  rim: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    boxShadow: "inset 0 1px #f6ffedbd, inset 1px 0 #d9e7ce69, inset 0 -2px 2px #15251eb3",
  },
  cavity: {
    position: "absolute", top: 3, right: 3, bottom: 3, left: 3,
    borderRadius: 7, borderWidth: 1, borderColor: "#243a2d",
  },
  tile: {
    position: "absolute", top: 5, left: 5, width: 26, height: 26,
    borderRadius: 5, backfaceVisibility: "hidden", boxShadow: "1px 2px 3px #08120ccd",
  },
  face: {
    flex: 1, marginBottom: 2, borderRadius: 5, borderWidth: 1, alignItems: "center", justifyContent: "center",
    boxShadow: "inset 0 1px #ffffff8c, inset 1px 0 #ffffff36, inset 0 -1px 2px #00000030",
  },
  dash: { width: 10, height: 2, borderRadius: 1, boxShadow: "inset 0 1px #30271b7a, 0 1px #ffffff8c" },
  checkmark: { fontSize: 18, fontWeight: "700", lineHeight: 21, includeFontPadding: false },
  pin: {
    position: "absolute", top: 14, width: 5, height: 8, borderWidth: 1, borderRadius: 2,
    borderColor: "#645c4f", boxShadow: "inset 0 1px #fff6d99e, 0 1px 2px #10180ed9",
  },
  leftPin: { left: 0 },
  rightPin: { right: 0 },
});
