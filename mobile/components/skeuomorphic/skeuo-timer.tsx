import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Platform, StyleSheet, Text, View, type GestureResponderEvent } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { G, Line, Path } from "react-native-svg";
import { SkeuoButton } from "./skeuo-button";
import { useFeedback, useSkeuo } from "./theme";

const clampSeconds = (seconds: number) => Math.max(60, Math.min(3600, seconds));
const dialSize = 178;
const keyboardSteps: Record<string, number> = {
  ArrowRight: 60, ArrowUp: 60, ArrowLeft: -60, ArrowDown: -60,
  PageUp: 300, PageDown: -300,
};

export function SkeuoTimer({
  minutes = 25,
  onComplete,
}: {
  minutes?: number;
  onComplete?: () => void;
}) {
  const { colors: c, dark } = useSkeuo();
  const feedback = useFeedback();
  const [duration, setDuration] = useState(() => clampSeconds(Number.isFinite(minutes) ? Math.round(minutes * 60) : 1500));
  const [remaining, setRemaining] = useState(duration);
  const [running, setRunning] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [focused, setFocused] = useState(false);
  const deadline = useRef<number | null>(null);
  const selected = useRef(duration);
  const dial = useRef({ width: dialSize, height: dialSize });
  const drag = useRef<{ centerX: number; centerY: number; angle: number; seconds: number } | null>(null);
  const lastTick = useRef(-Infinity);
  const highlight = dark ? "#ffffff1e" : "#fff";
  const shadow = dark ? "#00000099" : "#00000017";

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      if (deadline.current === null) return;
      const next = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setRemaining(next);
      if (next === 0) {
        deadline.current = null;
        setRunning(false);
        onComplete?.();
      }
    }, 250);
    return () => clearInterval(timer);
  }, [running, onComplete]);

  function selectDuration(seconds: number) {
    const next = clampSeconds(Math.round(seconds / 60) * 60);
    const changed = selected.current !== next;
    selected.current = next;
    deadline.current = null;
    setDuration(next);
    setRemaining(next);
    setRunning(false);
    if (changed && Date.now() - lastTick.current >= 75) {
      lastTick.current = Date.now();
      feedback();
    }
  }

  function isOnRim({ nativeEvent }: GestureResponderEvent) {
    if (nativeEvent.touches.length > 1) return false;
    const { width, height } = dial.current;
    const radius = Math.min(width, height) / 2;
    const distance = Math.hypot(nativeEvent.locationX - width / 2, nativeEvent.locationY - height / 2);
    return distance >= radius - 24 && distance <= radius;
  }

  function startDrag({ nativeEvent }: GestureResponderEvent) {
    const dx = nativeEvent.locationX - dial.current.width / 2;
    const dy = nativeEvent.locationY - dial.current.height / 2;
    drag.current = {
      centerX: nativeEvent.pageX - dx,
      centerY: nativeEvent.pageY - dy,
      angle: Math.atan2(dy, dx) * 180 / Math.PI,
      seconds: selected.current,
    };
    if (deadline.current !== null) {
      setRemaining(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)));
    }
    deadline.current = null;
    setRunning(false);
    setDragging(true);
  }

  function moveDrag({ nativeEvent }: GestureResponderEvent) {
    const current = drag.current;
    if (!current || nativeEvent.touches.length > 1) return;
    const dx = nativeEvent.pageX - current.centerX;
    const dy = nativeEvent.pageY - current.centerY;
    if (Math.hypot(dx, dy) < 12) return;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const delta = ((angle - current.angle + 540) % 360) - 180;
    current.angle = angle;
    current.seconds = clampSeconds(current.seconds + delta * 10);
    // Small movements accumulate before the first whole-minute change.
    if (clampSeconds(Math.round(current.seconds / 60) * 60) !== selected.current) {
      selectDuration(current.seconds);
    }
  }

  function endDrag() {
    drag.current = null;
    setDragging(false);
  }

  function handleKey(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      selectDuration(event.key === "Home" ? 60 : 3600);
    } else if (Object.hasOwn(keyboardSteps, event.key)) {
      event.preventDefault();
      selectDuration(selected.current + keyboardSteps[event.key]);
    }
  }

  function toggleTimer() {
    if (deadline.current !== null) {
      setRemaining(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)));
      deadline.current = null;
      setRunning(false);
    } else {
      const next = remaining || selected.current;
      setRemaining(next);
      deadline.current = Date.now() + next * 1000;
      setRunning(true);
    }
  }

  const durationText = `${Math.floor(duration / 60)} minutes${duration % 60 ? ` ${duration % 60} seconds` : ""}`;
  const displayMinutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const displaySeconds = String(remaining % 60).padStart(2, "0");
  const webDialProps = Platform.OS === "web" ? {
    tabIndex: 0 as const,
    "aria-valuemin": 1,
    "aria-valuemax": 60,
    "aria-valuenow": duration / 60,
    "aria-valuetext": durationText,
    onKeyDown: handleKey,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  } : {};

  return (
    <View style={[styles.card, {
      borderColor: c.edge,
      backgroundColor: c.surface,
      boxShadow: `0 4px ${c.base}, 0 5px ${c.edge}, 0 14px 25px ${shadow}`,
    }]}>
      <LinearGradient
        pointerEvents="none"
        colors={[c.raised, c.surface]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={styles.cardFace}
      />
      <View pointerEvents="none" style={[styles.cardFace, { boxShadow: `inset 0 2px ${highlight}` }]} />
      <Text style={[styles.heading, { color: c.muted }]}>A MOMENT OF FOCUS</Text>
      <View
        {...webDialProps}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel="Focus duration"
        accessibilityHint="Drag the rim to adjust from 1 to 60 minutes"
        accessibilityValue={{ min: 1, max: 60, now: duration / 60, text: durationText }}
        accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
        onAccessibilityAction={({ nativeEvent }) => {
          if (nativeEvent.actionName === "increment") selectDuration(selected.current + 60);
          if (nativeEvent.actionName === "decrement") selectDuration(selected.current - 60);
        }}
        onLayout={({ nativeEvent }) => { dial.current = nativeEvent.layout; }}
        onStartShouldSetResponder={isOnRim}
        onResponderGrant={startDrag}
        onResponderMove={moveDrag}
        onResponderRelease={endDrag}
        onResponderTerminate={endDrag}
        style={[
          styles.dial,
          {
            borderColor: c.edge,
            backgroundColor: c.well,
            boxShadow: `inset 0 2px 4px ${shadow}, 0 1px ${highlight}, 0 3px 5px ${shadow}`,
            ...Platform.select({ web: { touchAction: "none" } }),
          },
        ]}
      >
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <Svg width="100%" height="100%" viewBox="0 0 178 178" accessible={false}>
            <G rotation={duration / 10} originX={89} originY={89}>
              {Array.from({ length: 30 }, (_, index) => (
                <Line
                  key={index}
                  x1={89} x2={89} y1={1} y2={index === 0 ? 11 : 9}
                  rotation={index * 12} originX={89} originY={89}
                  stroke={index === 0 ? c.accent : c.edge}
                  strokeWidth={index === 0 ? 2 : 1.5}
                />
              ))}
            </G>
          </Svg>
          <View style={[
            styles.face,
            {
              borderColor: focused && !dragging ? c.accent : c.edge,
              backgroundColor: c.surface,
              boxShadow: `inset 0 5px 10px ${shadow}, inset 3px 2px 6px ${shadow}, inset 0 -2px 2px ${highlight}, 0 1px ${highlight}`,
            },
          ]}>
            <Text style={[styles.readout, { color: c.ink }]}>
              {displayMinutes}<Text style={{ color: c.muted }}>:</Text>{displaySeconds}
            </Text>
            <Text style={[styles.caption, { color: c.muted }]}>
              {remaining === 0 ? "SESSION COMPLETE" : "TAKE YOUR TIME"}
            </Text>
          </View>
        </View>
      </View>
      <Text style={[styles.hint, { color: c.muted }]}>Drag the rim to set · 1–60 min</Text>
      <View style={styles.actions}>
        <SkeuoButton variant="accent" disabled={dragging} onPress={toggleTimer}>
          <Text style={{ color: c.accentInk, fontSize: 16, fontWeight: "600" }}>{running ? "Pause" : "Start focus"}</Text>
        </SkeuoButton>
        <SkeuoButton accessibilityLabel="Reset focus timer" disabled={dragging} onPress={() => {
          deadline.current = null;
          setRunning(false);
          setRemaining(selected.current);
        }}>
          <Svg width={20} height={20} viewBox="0 0 24 24" accessible={false}>
            <Path d="M3 10a9 9 0 1 1 2 8M3 3v7h7" fill="none" stroke={c.ink} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </SkeuoButton>
      </View>
    </View>
  );
}

const mono = Platform.select({ ios: "Menlo", android: "monospace", web: "monospace" });
const styles = StyleSheet.create({
  card: { width: "100%", maxWidth: 360, alignSelf: "center", alignItems: "center", borderWidth: 1, borderRadius: 15, padding: 20, gap: 12 },
  cardFace: { ...StyleSheet.absoluteFillObject, borderRadius: 14 },
  heading: { alignSelf: "flex-start", fontFamily: mono, fontSize: 10, letterSpacing: 1 },
  dial: { width: "100%", maxWidth: dialSize, aspectRatio: 1, borderWidth: 1, borderRadius: 999 },
  face: { position: "absolute", inset: 9, borderRadius: 999, borderWidth: 1, alignItems: "center", justifyContent: "center", gap: 7 },
  readout: { fontFamily: mono, fontSize: 34, letterSpacing: -2, fontVariant: ["tabular-nums"] },
  caption: { fontFamily: mono, fontSize: 8, letterSpacing: 1.05 },
  hint: { fontSize: 11, textAlign: "center" },
  actions: { flexDirection: "row", justifyContent: "center", gap: 10 },
});
