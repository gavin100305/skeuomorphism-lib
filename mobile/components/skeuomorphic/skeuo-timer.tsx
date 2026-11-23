import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { useSkeuo } from "./theme";
import { SkeuoButton } from "./skeuo-button";
export function SkeuoTimer({
  minutes = 25,
  onComplete,
}: {
  minutes?: number;
  onComplete?: () => void;
}) {
  const { colors: c } = useSkeuo();
  const duration = Math.max(1, minutes) * 60;
  const [remaining, setRemaining] = useState(duration);
  const [running, setRunning] = useState(false);
  const deadline = useRef(0);
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      const next = Math.max(
        0,
        Math.ceil((deadline.current - Date.now()) / 1000),
      );
      setRemaining(next);
      if (next === 0) {
        setRunning(false);
        onComplete?.();
      }
    }, 250);
    return () => clearInterval(timer);
  }, [running, onComplete]);
  return (
    <View style={{ gap: 20, alignItems: "center" }}>
      <View
        style={{
          width: 220,
          height: 220,
          borderRadius: 110,
          borderWidth: 12,
          borderColor: c.edge,
          backgroundColor: c.well,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: c.muted, fontSize: 11, letterSpacing: 2 }}>
          FOCUS SESSION
        </Text>
        <Text
          accessibilityLabel={`${Math.floor(remaining / 60)} minutes ${remaining % 60} seconds remaining`}
          style={{
            fontSize: 48,
            fontVariant: ["tabular-nums"],
            fontWeight: "300",
            color: c.ink,
            letterSpacing: -2,
          }}
        >
          {String(Math.floor(remaining / 60)).padStart(2, "0")}:
          {String(remaining % 60).padStart(2, "0")}
        </Text>
        <Text style={{ color: c.muted, fontSize: 12 }}>
          {remaining === 0
            ? "Session complete"
            : running
              ? "One thing at a time."
              : "A little room to think."}
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <SkeuoButton
          variant="accent"
          onPress={() => {
            if (!running) {
              const next = remaining || duration;
              setRemaining(next);
              deadline.current = Date.now() + next * 1000;
            }
            setRunning(!running);
          }}
        >
          {running ? "Pause" : "Start focus"}
        </SkeuoButton>
        <SkeuoButton
          onPress={() => {
            setRunning(false);
            setRemaining(duration);
          }}
        >
          Reset
        </SkeuoButton>
      </View>
    </View>
  );
}
