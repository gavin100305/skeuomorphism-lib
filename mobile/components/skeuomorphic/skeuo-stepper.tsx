import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { valueRange } from "./skeuo-value-range";
import { useFeedback, useSkeuo } from "./theme";

export type SkeuoStepperProps = {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  formatValue?: (value: number) => string;
};

export function SkeuoStepper({
  label, value, onValueChange, min = 0, max = 99, step = 1, disabled = false,
  formatValue = (number) => String(number).padStart(number >= 0 ? 2 : 0, "0"),
}: SkeuoStepperProps) {
  const { colors: c, dark } = useSkeuo();
  const feedback = useFeedback();
  const range = valueRange(min, max, step);
  const current = range.clamp(value);
  const screen = dark
    ? { top: "#839e8d", bottom: "#b0c4b4", ink: "#15271d", edge: "#4f695b" }
    : { top: "#d7c9a7", bottom: "#f2e8ce", ink: "#28241a", edge: "#a18e67" };
  const highlight = dark ? "#ffffff25" : "#fff";
  const keys = [
    { name: "Decrease", sign: "−", next: range.move(current, -1), colors: [c.raised, c.surface] as const, base: c.base, ink: c.ink },
    { name: "Increase", sign: "+", next: range.move(current, 1), colors: [dark ? "#bbcec2" : "#487b68", c.accent] as const, base: dark ? "#4d6558" : "#213c32", ink: c.accentInk },
  ];

  function key(item: typeof keys[number]) {
    const unavailable = disabled || item.next === current;
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${item.name} ${label}`}
        accessibilityState={{ disabled: unavailable }}
        aria-disabled={unavailable}
        disabled={unavailable}
        onPress={() => { feedback(); onValueChange(item.next); }}
        style={({ pressed }) => [styles.key, {
          borderColor: c.edge,
          backgroundColor: item.base,
          opacity: unavailable ? 0.45 : 1,
          transform: [{ translateY: pressed ? 2 : 0 }],
          boxShadow: pressed ? "0 1px 2px #0002" : "0 2px 4px #0003",
        }]}
      >
        <LinearGradient colors={item.colors} style={styles.keyFace}>
          <Text style={[styles.sign, { color: item.ink }]}>{item.sign}</Text>
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <View style={[styles.panel, { backgroundColor: c.surface, borderColor: c.edge, boxShadow: `0 3px ${c.base}, 0 6px 10px #00000017` }]}>
      <Text style={[styles.title, { color: c.ink }]}>{label}</Text>
      <View style={[styles.tray, { backgroundColor: c.well, borderColor: c.edge, boxShadow: `inset 0 3px 5px #00000024, 0 1px ${highlight}` }]}>
        {key(keys[0])}
        <View style={[styles.counter, { borderColor: screen.edge, backgroundColor: screen.edge, boxShadow: `0 1px ${highlight}` }]}>
          <LinearGradient colors={[screen.top, screen.bottom]} style={styles.screen}>
            <View pointerEvents="none" style={[StyleSheet.absoluteFill, { borderRadius: 5, boxShadow: "inset 0 4px 6px #15110952, inset 0 -1px #ffffff70" }]} />
            <Text accessibilityLiveRegion="polite" aria-live="polite" style={[styles.readout, { color: screen.ink }]}>{formatValue(current)}</Text>
          </LinearGradient>
        </View>
        {key(keys[1])}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { width: "100%", maxWidth: 320, alignSelf: "center", alignItems: "center", padding: 16, gap: 14, borderWidth: 1, borderRadius: 15 },
  title: { fontSize: 19, fontWeight: "600" },
  tray: { width: "100%", flexDirection: "row", gap: 6, padding: 6, borderWidth: 1, borderRadius: 11 },
  key: { width: 48, minHeight: 48, padding: 1, paddingBottom: 5, borderWidth: 1, borderRadius: 8 },
  keyFace: { flex: 1, borderRadius: 6, alignItems: "center", justifyContent: "center", boxShadow: "inset 0 1px #ffffff60" },
  sign: { fontSize: 23, fontWeight: "600" },
  counter: { flex: 1, minWidth: 0, padding: 2, borderWidth: 1, borderRadius: 7 },
  screen: { flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 5, paddingHorizontal: 4 },
  readout: { fontSize: 22, fontWeight: "600", fontVariant: ["tabular-nums"], textAlign: "center" },
});
