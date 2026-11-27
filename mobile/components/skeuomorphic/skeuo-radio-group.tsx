import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  AccessibilityInfo, Animated, Easing, Platform, Pressable, ScrollView,
  StyleSheet, Text, View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { themes, useFeedback, useSkeuo } from "./theme";
import type { OptionsProps } from "./types";

const rowHeight = 52;
const markerHeight = 22;
const maxListHeight = rowHeight * 6.5;
const slideEasing = Easing.bezier(0.24, 0.78, 0.3, 1);
const directions: Record<string, number> = { ArrowUp: -1, ArrowLeft: -1, ArrowDown: 1, ArrowRight: 1 };

const finishes = {
  light: {
    frame: ["#fcfefc", "#b1bdb5", "#e0e8e2", "#7d8c82"],
    frameEdge: "#748279",
    frameShadow: "0 2px #829086, 0 4px #637168, 0 8px 14px #23352d38",
    panel: ["#f7f9f7", "#e8ede9"],
    panelEdge: "#819087",
    panelShadow: "inset 0 3px 5px #34483b40, inset 2px 0 3px #34483b24, inset 0 -1px #ffffffb8",
    rail: ["#3a4c41", "#53685a", "#718578", "#8fa095"],
    railEnds: ["#18291f38", "#18291f00", "#18291f00", "#18291f1a"],
    divider: "#c7d2ca",
    ink: "#202923",
    selectedInk: "#294f3e",
    selectedSurface: "#d9e7dda0",
    notch: "#33443a",
    glint: "#f7fff5c7",
    marker: ["#aecfbb", "#54836d", "#365e50"],
    markerEdge: "#294b3e",
    markerBase: "#213c32",
  },
  dark: {
    frame: ["#69776e", "#353f39", "#59665d", "#222e27"],
    frameEdge: "#526258",
    frameShadow: "0 2px #26362d, 0 4px #111d16, 0 8px 14px #0000008f",
    panel: ["#28332c", "#1c251f"],
    panelEdge: "#4d6053",
    panelShadow: "inset 0 3px 6px #080e0bb8, inset 2px 0 3px #080e0b66, inset 0 -1px #899d8d40",
    rail: ["#12221a", "#20362a", "#354d40", "#566c5e"],
    railEnds: ["#070e093d", "#070e0900", "#070e0900", "#070e091f"],
    divider: "#47594d",
    ink: "#edf1ed",
    selectedInk: "#b6d1be",
    selectedSurface: "#395447b3",
    notch: "#0c1811",
    glint: "#c9dbc955",
    marker: ["#d6ead9", "#9ab5a6", "#698b78"],
    markerEdge: "#6f8a79",
    markerBase: "#3d5b4c",
  },
} as const;

type RowLayout = { y: number; height: number };

export function SkeuoRadioGroup({ label, value, onValueChange, options }: OptionsProps) {
  const { colors, dark } = useSkeuo();
  const finish = dark ? finishes.dark : finishes.light;
  const customizedAccent = colors.accent !== (dark ? themes.dark : themes.light).accent;
  const feedback = useFeedback();
  const [reduceMotion, setReduceMotion] = useState(true);
  const [position] = useState(() => new Animated.Value(0));
  const [selection, setSelection] = useState<RowLayout>();
  const [viewportHeight, setViewportHeight] = useState(0);
  const layouts = useRef(new Map<string, RowLayout>());
  const scroll = useRef<ScrollView>(null);
  const scrollOffset = useRef(0);
  const previousTarget = useRef<number | null>(null);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedValue = options[selectedIndex]?.value;
  const enabled = options.flatMap((option, index) => option.disabled ? [] : [index]);
  const tabIndex = enabled.includes(selectedIndex) ? selectedIndex : enabled[0];

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

  useLayoutEffect(() => {
    setSelection(selectedValue === undefined ? undefined : layouts.current.get(selectedValue));
  }, [selectedValue]);

  useLayoutEffect(() => {
    if (!selection) {
      previousTarget.current = null;
      return;
    }
    const { y, height } = selection;
    const target = y + (height - markerHeight) / 2;
    const previous = previousTarget.current;
    previousTarget.current = target;
    const offset = scrollOffset.current;
    const outside = viewportHeight > 0 && (y < offset || y + height > offset + viewportHeight);
    if (outside) {
      scroll.current?.scrollTo({ y: Math.max(0, y - (viewportHeight - height) / 2), animated: false });
    }
    if (reduceMotion || previous === null || outside || Math.abs(target - previous) > rowHeight * 3) {
      position.setValue(target);
      return;
    }
    const settle = Animated.timing(position, {
      toValue: target,
      duration: 260,
      easing: slideEasing,
      useNativeDriver: Platform.OS !== "web",
    });
    settle.start();
    return () => settle.stop();
  }, [position, reduceMotion, selection, viewportHeight]);

  function select(index: number) {
    feedback();
    onValueChange(options[index].value);
  }

  function handleKey(event: KeyboardEvent<HTMLElement>, index: number) {
    if (event.key === " ") {
      event.preventDefault();
      select(index);
      return;
    }
    const direction = Object.hasOwn(directions, event.key) ? directions[event.key] : 0;
    if (!direction) return;
    event.preventDefault();
    const next = enabled[(enabled.indexOf(index) + direction + enabled.length) % enabled.length];
    event.currentTarget.parentElement?.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus();
    if (next !== index) select(next);
  }

  if (!options.length) return null;

  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={label} style={[styles.frame, {
      borderColor: finish.frameEdge,
      backgroundColor: finish.frame[1],
      boxShadow: finish.frameShadow,
    }]}>
      <LinearGradient aria-hidden pointerEvents="none" colors={finish.frame} locations={[0, 0.42, 0.72, 1]}
        start={{ x: 0, y: 0 }} end={{ x: 0.85, y: 1 }} style={styles.frameFace} />
      <View style={[styles.panel, { borderColor: finish.panelEdge, backgroundColor: finish.panel[1] }]}>
        <LinearGradient aria-hidden pointerEvents="none" colors={finish.panel} style={StyleSheet.absoluteFillObject} />
        <ScrollView
          ref={scroll}
          nestedScrollEnabled
          scrollEventThrottle={16}
          onScroll={({ nativeEvent }) => { scrollOffset.current = nativeEvent.contentOffset.y; }}
          onLayout={({ nativeEvent }) => setViewportHeight(nativeEvent.layout.height)}
          style={styles.scroll}
        >
          <View style={styles.rows}>
            <LinearGradient
              aria-hidden
              pointerEvents="none"
              colors={finish.rail}
              locations={[0, 0.18, 0.7, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.rail}
            >
              <LinearGradient
                colors={finish.railEnds}
                locations={[0, 0.12, 0.88, 1]}
                style={styles.railShade}
              />
            </LinearGradient>
            {options.map((option, index) => {
              const selected = index === selectedIndex;
              const webProps = Platform.OS === "web" ? {
                tabIndex: index === tabIndex ? 0 as const : -1 as const,
                onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
                  if (!option.disabled) handleKey(event, index);
                },
              } : {};

              return (
                <Pressable
                  {...webProps}
                  key={option.value}
                  accessibilityRole="radio"
                  accessibilityLabel={option.label}
                  aria-checked={selected}
                  aria-disabled={!!option.disabled}
                  accessibilityState={{ checked: selected, disabled: !!option.disabled }}
                  disabled={option.disabled}
                  onPress={() => select(index)}
                  onLayout={({ nativeEvent }) => {
                    const { y, height } = nativeEvent.layout;
                    const last = layouts.current.get(option.value);
                    if (last?.y === y && last.height === height) return;
                    const layout = { y, height };
                    layouts.current.set(option.value, layout);
                    if (selected) setSelection(layout);
                  }}
                  style={({ pressed }) => [styles.row, {
                    opacity: option.disabled ? 0.45 : 1,
                    backgroundColor: pressed ? (dark ? "#dcefe116" : "#345f4815") : "transparent",
                  }]}
                >
                  <View aria-hidden pointerEvents="none" style={[styles.notch, {
                    backgroundColor: finish.notch, boxShadow: `0 1px ${finish.glint}`,
                  }]} />
                  {selected && (
                    <View aria-hidden pointerEvents="none" style={[styles.selection, { backgroundColor: finish.selectedSurface }]} />
                  )}
                  <Text style={[styles.label, {
                    color: selected ? (customizedAccent ? colors.accent : finish.selectedInk) : finish.ink,
                    fontWeight: selected ? "700" : "400",
                  }]}>{option.label}</Text>
                  {index < options.length - 1 && (
                    <View aria-hidden pointerEvents="none" style={[styles.divider, { backgroundColor: finish.divider }]} />
                  )}
                </Pressable>
              );
            })}
            {selectedValue !== undefined && selection && (
              <Animated.View aria-hidden pointerEvents="none" style={[styles.marker, {
                backgroundColor: finish.markerBase,
                borderColor: finish.markerEdge,
                transform: [{ translateY: position }],
              }]}>
                <LinearGradient
                  colors={customizedAccent ? [finish.marker[0], colors.accent, colors.accent] : finish.marker}
                  locations={[0, 0.3, 1]}
                  style={styles.markerFace}
                />
              </Animated.View>
            )}
          </View>
        </ScrollView>
        <View aria-hidden pointerEvents="none" style={[styles.panelBevel, { boxShadow: finish.panelShadow }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: "100%", maxWidth: 420, padding: 5, paddingBottom: 7, borderWidth: 1, borderRadius: 18,
  },
  frameFace: {
    ...StyleSheet.absoluteFillObject, borderRadius: 17,
    boxShadow: "inset 0 1px #f7fff5cc, inset 1px 0 #e0ece591, inset 0 -2px 2px #17291e80",
  },
  panel: { borderRadius: 13, borderWidth: 1, overflow: "hidden" },
  panelBevel: { ...StyleSheet.absoluteFillObject, borderRadius: 12 },
  scroll: { maxHeight: maxListHeight, flexGrow: 0 },
  rows: { paddingVertical: 3 },
  rail: {
    position: "absolute", start: 10, top: 8, bottom: 8,
    width: 25, borderRadius: 13,
  },
  railShade: { ...StyleSheet.absoluteFillObject, borderRadius: 13, boxShadow: "inset 0 1px 2px #13241a36" },
  row: {
    minHeight: rowHeight, flexDirection: "row", alignItems: "center",
    paddingStart: 49, paddingEnd: 12, paddingVertical: 11,
  },
  label: { fontSize: 17, lineHeight: 23, flexShrink: 1 },
  selection: { position: "absolute", start: 43, end: 4, top: 3, bottom: 3, borderRadius: 7 },
  divider: { position: "absolute", start: 46, end: 0, bottom: 0, height: StyleSheet.hairlineWidth },
  notch: { position: "absolute", start: 15, width: 15, height: 2, top: "50%", marginTop: -1 },
  marker: {
    position: "absolute", top: 0, start: 9, width: 27, height: markerHeight,
    borderRadius: 5, borderWidth: 1, padding: 1, paddingBottom: 3,
    boxShadow: "0 2px #20392de0, 0 4px 5px #10251cb3",
  },
  markerFace: {
    flex: 1, borderRadius: 3,
    boxShadow: "inset 0 1px #f1ffefdb, inset 1px 0 #e3ffe478, inset 0 -2px #142d2175",
  },
});
