import { useEffect, useId, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from "react-native-svg";
import { useFeedback, useSkeuo } from "./theme";

export type ProgressRing = {
  id: string;
  label: string;
  value: number;
  max: number;
  unit?: string;
  color?: string;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const formatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const sweep = Easing.bezier(0.18, 0.72, 0.23, 1);

export function SkeuoProgressRings({
  items,
  title = "Daily goals",
  animate = true,
}: {
  items: ProgressRing[];
  title?: string;
  animate?: boolean;
}) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const { colors: c, dark } = useSkeuo();
  const feedback = useFeedback();
  const [selectedId, setSelectedId] = useState(items[0]?.id);
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    let active = true;
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduceMotion);
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (active) setReduceMotion(enabled);
    }, () => {
      if (active) setReduceMotion(true);
    });
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);

  const palette = [c.accent, "#7f9b8c", "#a67749"];
  const rings = items.map((item, index) => {
    const value = Number.isFinite(item.value) ? item.value : 0;
    const max = Number.isFinite(item.max) && item.max > 0 ? item.max : 0;
    const percent = max ? Math.min(100, Math.max(0, value / max * 100)) : 0;
    return { ...item, value, max, percent, color: item.color ?? palette[index % palette.length] };
  });
  const selected = rings.find((ring) => ring.id === selectedId) ?? rings[0];
  if (!selected) return null;

  const spacing = Math.min(23, 56 / Math.max(1, rings.length - 1));
  const thickness = Math.min(14, spacing * 0.65);
  const motion = animate ? reduceMotion : true;
  const highlight = dark ? "#ffffff1e" : "#fff";
  const shadow = dark ? "#00000099" : "#00000017";

  function select(next: string) {
    if (next === selected?.id) return;
    feedback();
    setSelectedId(next);
  }

  return (
    <View
      onLayout={({ nativeEvent }) => setWide(nativeEvent.layout.width >= 500)}
      style={[styles.panel, {
        backgroundColor: c.surface,
        borderColor: c.edge,
        boxShadow: `0 4px ${c.base}, 0 5px ${c.edge}, 0 13px 23px ${shadow}`,
      }]}
    >
      <View pointerEvents="none" style={styles.panelFace}>
        <LinearGradient
          colors={[c.raised, c.surface]}
          start={{ x: 0.15, y: 0 }}
          end={{ x: 0.85, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={[StyleSheet.absoluteFill, { boxShadow: `inset 0 2px ${highlight}` }]} />
      </View>
      <Text accessibilityRole="header" style={[styles.title, { color: c.ink }]}>{title}</Text>
      <View style={[styles.layout, wide && styles.wideLayout]}>
        <View style={styles.dial} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
          <Svg width="100%" height="100%" viewBox="0 0 240 240" accessible={false}>
            <Defs>
              <SvgGradient id={`${id}-groove`} x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop stopColor={dark ? "#050505" : "#94948f"} />
                <Stop offset="55%" stopColor={c.base} />
                <Stop offset="100%" stopColor={c.well} />
              </SvgGradient>
              <SvgGradient id={`${id}-floor`} x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop stopColor={c.base} />
                <Stop offset="100%" stopColor={c.well} />
              </SvgGradient>
              <SvgGradient id={`${id}-bevel`} x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop stopColor="#000" stopOpacity={0.42} />
                <Stop offset="52%" stopColor="#000" stopOpacity={0.22} />
                <Stop offset="100%" stopColor="#fff" stopOpacity={0.24} />
              </SvgGradient>
              <SvgGradient id={`${id}-shine`} x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop stopColor="#000" stopOpacity={0.16} />
                <Stop offset="48%" stopColor="#fff" stopOpacity={0.05} />
                <Stop offset="83%" stopColor="#fff" stopOpacity={0.32} />
                <Stop offset="100%" stopColor="#fff" stopOpacity={0.44} />
              </SvgGradient>
            </Defs>
            {rings.map((ring, index) => {
              const radius = 104 - index * spacing;
              return (
                <RingArc
                  key={ring.id}
                  color={ring.color}
                  paintId={id}
                  arcShadow={dark ? "#000b" : "#0004"}
                  highlight={highlight}
                  radius={radius}
                  thickness={thickness}
                  spacing={spacing}
                  percent={ring.percent}
                  delay={Math.min(index, 5) * 85}
                  reduceMotion={motion}
                  onPress={() => select(ring.id)}
                />
              );
            })}
          </Svg>
          <View pointerEvents="none" style={styles.readout}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.percent, { color: c.ink }]}>
              {formatter.format(selected.percent)}%
            </Text>
            <Text numberOfLines={1} style={[styles.centerLabel, { color: c.muted }]}>{selected.label}</Text>
          </View>
        </View>
        <View style={[styles.legend, wide && styles.wideLegend]}>
          {rings.map((ring) => {
            const active = selected.id === ring.id;
            const value = `${formatter.format(ring.value)} / ${formatter.format(ring.max)}${ring.unit ? ` ${ring.unit}` : ""}`;
            return (
              <Pressable
                key={ring.id}
                accessibilityRole="button"
                accessibilityLabel={`${ring.label}, ${value}, ${formatter.format(ring.percent)}% complete`}
                accessibilityState={{ selected: active }}
                aria-pressed={active}
                onPress={() => select(ring.id)}
                style={({ pressed }) => [styles.row, {
                  borderColor: active || pressed ? c.edge : "transparent",
                  backgroundColor: active || pressed ? c.well : "transparent",
                  boxShadow: active ? `inset 0 2px 4px ${shadow}, 0 1px ${highlight}` : undefined,
                }]}
              >
                <View style={[styles.dot, { backgroundColor: ring.color }]} />
                <Text style={[styles.label, { color: c.ink }]}>{ring.label}</Text>
                <Text style={[styles.value, { color: c.muted }]}>{value}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function RingArc({
  color, paintId, highlight, arcShadow, radius, thickness, spacing, percent, delay, reduceMotion, onPress,
}: {
  color: string;
  paintId: string;
  highlight: string;
  arcShadow: string;
  radius: number;
  thickness: number;
  spacing: number;
  percent: number;
  delay: number;
  reduceMotion: boolean | null;
  onPress: () => void;
}) {
  const [entry] = useState(() => new Animated.Value(0));
  useEffect(() => {
    if (reduceMotion !== false) return;
    const animation = Animated.timing(entry, {
      toValue: 1,
      duration: 820,
      delay,
      easing: sweep,
      useNativeDriver: false,
      isInteraction: false,
    });
    animation.start();
    return () => animation.stop();
  }, [delay, entry, reduceMotion]);

  const length = 2 * Math.PI * radius;
  const offset = reduceMotion === false
    ? entry.interpolate({ inputRange: [0, 1], outputRange: [length, length * (1 - percent / 100)] })
    : length * (1 - percent / 100);
  const opacity = reduceMotion === false
    ? entry.interpolate({ inputRange: [0, 0.12, 1], outputRange: [0, 1, 1] })
    : 1;

  const paint = (layer: string) => `url(#${paintId}-${layer})`;
  const arcLayers = [
    { stroke: arcShadow, cx: 118.4, width: thickness },
    { stroke: color, cx: 120, width: thickness },
    { stroke: paint("bevel"), cx: 120, width: thickness },
    { stroke: paint("shine"), cx: 120.7, width: thickness * .76 },
  ];

  return (
    <>
      <Circle cx={120} cy={121.2} r={radius} strokeWidth={thickness * 1.4} stroke={highlight} fill="none" />
      <Circle cx={120} cy={120} r={radius} strokeWidth={thickness * 1.3} stroke={paint("groove")} fill="none" />
      <Circle cx={120} cy={121.1} r={radius} strokeWidth={thickness * .94} stroke={paint("floor")} fill="none" />
      {percent > 0 && reduceMotion !== null && arcLayers.map(({ stroke, cx, width }, layer) => (
        <AnimatedCircle
          key={layer}
          cx={cx} cy={120} r={radius} fill="none" stroke={stroke}
          strokeWidth={width} strokeLinecap="round" strokeDasharray={[length, length]}
          strokeDashoffset={offset} opacity={opacity} rotation={-90} originX={120} originY={120}
        />
      ))}
      <Circle
        cx={120} cy={120} r={radius} strokeWidth={spacing} stroke="transparent"
        fill="none" onPress={onPress}
      />
    </>
  );
}

const styles = StyleSheet.create({
  panel: { width: "100%", maxWidth: 720, alignSelf: "center", padding: 18, borderWidth: 1, borderRadius: 15, gap: 12 },
  panelFace: { ...StyleSheet.absoluteFillObject, borderRadius: 14, overflow: "hidden" },
  title: { fontSize: 20, fontWeight: "600" },
  layout: { alignItems: "center", gap: 12 },
  wideLayout: { flexDirection: "row", gap: 20 },
  dial: { width: "100%", maxWidth: 240, aspectRatio: 1, alignItems: "center", justifyContent: "center" },
  readout: { position: "absolute", width: "33%", alignItems: "center", gap: 2 },
  percent: { fontSize: 30, fontWeight: "700", fontVariant: ["tabular-nums"], letterSpacing: -1, width: "100%", textAlign: "center" },
  centerLabel: { fontSize: 11, maxWidth: "100%" },
  legend: { width: "100%", gap: 3 },
  wideLegend: { flex: 1, width: "auto" },
  row: { minHeight: 44, flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 8, borderWidth: 1 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  label: { flex: 1, fontSize: 13 },
  value: { fontSize: 11, fontVariant: ["tabular-nums"], textAlign: "right", maxWidth: "48%" },
});
