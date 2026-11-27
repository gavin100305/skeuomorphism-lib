import { useRef, useState, type KeyboardEvent } from "react";
import { Platform, StyleSheet, Text, View, type GestureResponderEvent } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Svg, { Circle, G, Line } from "react-native-svg";
import { valueRange } from "./skeuo-value-range";
import { useSkeuo } from "./theme";

type Direction = "clockwise" | "anticlockwise";
export type SkeuoRotaryKnobProps = {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  formatValue?: (value: number) => string;
  onTurnSound?: (direction: Direction) => void | Promise<void>;
};

const sweep = 270;
const ticks = Array.from({ length: 13 }, (_, i) => -135 + i * sweep / 12);
const keys: Record<string, number> = {
  ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 10, PageDown: -10,
};

export function SkeuoRotaryKnob({
  label, value, onValueChange, min = 0, max = 100, step = 1,
  disabled = false, formatValue = String, onTurnSound,
}: SkeuoRotaryKnobProps) {
  const { colors: c, dark, haptics } = useSkeuo();
  const range = valueRange(min, max, step);
  const current = range.clamp(value);
  const span = range.max - range.min;
  const unavailable = disabled || span <= 0;
  const radius = useRef(74);
  const [focused, setFocused] = useState(false);
  const gesture = useRef<{ x: number; y: number; angle: number | null; value: number; emitted: number } | null>(null);
  const previousTick = useRef(-Infinity);
  const rim = dark ? "#4b5d51" : "#8c806a";
  const finish = dark ? "#89978e" : "#d2c8b5";
  const highlight = dark ? "#ffffff25" : "#fff";
  const angle = (span ? (current - range.min) / span : 0) * sweep - 135;

  function commit(next: number, previous: number, timestamp: number) {
    if (unavailable || next === previous) return;
    onValueChange(next);
    if (timestamp - previousTick.current < 80) return;
    previousTick.current = timestamp;
    if (haptics) void Haptics.selectionAsync().catch(() => {});
    try {
      void Promise.resolve(onTurnSound?.(next > previous ? "clockwise" : "anticlockwise")).catch(() => {});
    } catch {
      // Feedback does not prevent adjustment.
    }
  }

  function start({ nativeEvent }: GestureResponderEvent) {
    const x = nativeEvent.locationX - radius.current;
    const y = nativeEvent.locationY - radius.current;
    gesture.current = {
      x: nativeEvent.pageX - x,
      y: nativeEvent.pageY - y,
      angle: Math.hypot(x, y) < 10 ? null : Math.atan2(y, x),
      value: current,
      emitted: current,
    };
  }

  function turn({ nativeEvent, timeStamp }: GestureResponderEvent) {
    const drag = gesture.current;
    if (!drag || nativeEvent.touches.length > 1) return;
    const x = nativeEvent.pageX - drag.x;
    const y = nativeEvent.pageY - drag.y;
    const previous = drag.angle;
    drag.angle = Math.hypot(x, y) < 10 ? null : Math.atan2(y, x);
    if (previous === null || drag.angle === null) return;
    const difference = drag.angle - previous;
    const delta = Math.atan2(Math.sin(difference), Math.cos(difference));
    drag.value = range.clamp(drag.value + delta * span / (sweep * Math.PI / 180));
    const next = range.nearest(drag.value);
    commit(next, drag.emitted, timeStamp);
    drag.emitted = next;
  }

  function end() { gesture.current = null; }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      commit(event.key === "Home" ? range.min : range.max, current, event.timeStamp);
    } else if (Object.hasOwn(keys, event.key)) {
      event.preventDefault();
      commit(range.move(current, keys[event.key]), current, event.timeStamp);
    }
  }

  const readout = formatValue(current);
  const webProps = Platform.OS === "web" ? {
    tabIndex: unavailable ? -1 as const : 0 as const,
    onKeyDown,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    "aria-valuemin": range.min,
    "aria-valuemax": range.max,
    "aria-valuenow": current,
    "aria-valuetext": readout,
    "aria-disabled": unavailable,
  } : {};
  return (
    <View style={[styles.panel, { opacity: unavailable ? 0.55 : 1, borderColor: c.edge, backgroundColor: c.surface, boxShadow: `0 3px ${c.base}, 0 6px 10px #00000017` }]}>
      <Text style={[styles.title, { color: c.ink }]}>{label}</Text>
      <View style={styles.scale}>
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <Svg width="100%" height="100%" viewBox="0 0 200 200" accessible={false}>
            {ticks.map((tick, i) => <Line key={tick} x1={100} x2={100} y1={8} y2={i % 3 === 0 ? 19 : 15}
              rotation={tick} originX={100} originY={100} stroke={c.muted} strokeWidth={2} strokeLinecap="round" />)}
          </Svg>
        </View>
        <Text style={[styles.min, { color: c.muted }]}>{range.min}</Text>
        <Text style={[styles.max, { color: c.muted }]}>{range.max}</Text>
        <View
          {...webProps}
          accessible
          accessibilityRole="adjustable"
          accessibilityLabel={label}
          accessibilityValue={{ min: range.min, max: range.max, now: current, text: readout }}
          accessibilityState={{ disabled: unavailable }}
          accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
          onAccessibilityAction={({ nativeEvent, timeStamp }) => {
            if (nativeEvent.actionName === "increment") commit(range.move(current, 1), current, timeStamp);
            if (nativeEvent.actionName === "decrement") commit(range.move(current, -1), current, timeStamp);
          }}
          onLayout={({ nativeEvent }) => { radius.current = nativeEvent.layout.width / 2; }}
          onStartShouldSetResponder={({ nativeEvent }) => !unavailable && nativeEvent.touches.length <= 1}
          onResponderGrant={start}
          onResponderMove={turn}
          onResponderRelease={end}
          onResponderTerminate={end}
          style={[styles.knob, {
            borderColor: focused ? c.accent : c.edge, backgroundColor: c.base,
            boxShadow: `inset 0 1px ${highlight}, 0 3px ${c.base}, 1px 6px 9px #00000032`,
            ...Platform.select({ web: {
              touchAction: unavailable ? "auto" : "none",
              outlineStyle: "solid" as const,
              outlineWidth: focused ? 2 : 0,
              outlineOffset: 3,
              outlineColor: c.accent,
            } }),
          }]}
        >
          <View pointerEvents="none" style={[styles.disc, { backgroundColor: rim }]}>
            <Svg width="100%" height="100%" viewBox="0 0 100 100" style={StyleSheet.absoluteFill} accessible={false}>
              <G rotation={angle} originX={50} originY={50}>
                <Circle cx={50} cy={50} r={48.5} stroke={highlight} strokeOpacity={0.55} strokeWidth={0.7} fill="none" />
                {Array.from({ length: 60 }, (_, i) => <Line key={i} x1={50} x2={50} y1={2} y2={5.5}
                  rotation={i * 6} originX={50} originY={50} stroke={highlight} strokeOpacity={0.45} strokeWidth={0.8} />)}
              </G>
            </Svg>
            <LinearGradient colors={[finish, rim]} style={styles.face} start={{ x: 0.25, y: 0 }} end={{ x: 0.75, y: 1 }} />
            <View style={[styles.face, { borderWidth: 1, borderColor: "#00000030", boxShadow: "inset 0 4px 6px #15120e55, inset 0 -1px 2px #ffffff65" }]} />
            <View style={[styles.markerOrbit, { transform: [{ rotate: `${angle}deg` }] }]}>
              <View style={[styles.marker, { backgroundColor: dark ? "#d1e8bb" : "#335d49" }]} />
            </View>
          </View>
        </View>
      </View>
      <Text style={[styles.readout, { color: c.ink, backgroundColor: c.well, borderColor: c.edge, boxShadow: `inset 0 2px 4px #00000025, 0 1px ${highlight}` }]}>{readout}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { width: "100%", maxWidth: 320, alignSelf: "center", alignItems: "center", padding: 17, gap: 12, borderWidth: 1, borderRadius: 15 },
  title: { fontSize: 19, fontWeight: "600" },
  scale: { width: "100%", maxWidth: 202, aspectRatio: 1 },
  knob: { position: "absolute", inset: "13%", padding: 4, borderWidth: 1, borderRadius: 999 },
  disc: { flex: 1, borderRadius: 999 },
  face: { position: "absolute", inset: "8%", borderRadius: 999 },
  markerOrbit: { position: "absolute", inset: "8%", alignItems: "center" },
  marker: { width: 4, height: "30%", marginTop: "10%", borderRadius: 3 },
  min: { position: "absolute", bottom: "7%", left: "8%", fontSize: 11 },
  max: { position: "absolute", bottom: "7%", right: "8%", fontSize: 11 },
  readout: { minWidth: 76, textAlign: "center", fontSize: 17, fontWeight: "600", fontVariant: ["tabular-nums"], paddingVertical: 5, paddingHorizontal: 8, borderRadius: 7, borderWidth: 1 },
});
