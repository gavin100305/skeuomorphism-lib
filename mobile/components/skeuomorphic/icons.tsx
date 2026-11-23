import { Text } from "react-native";
/** Simple line symbols keep the portable controls independent of an icon package. Hosts may pass their own icons. */
export function SkeuoGlyph({
  name,
  color = "#686863",
  size = 21,
}: {
  name: string;
  color?: string;
  size?: number;
}) {
  const symbols: Record<string, string> = {
    home: "⌂",
    transactions: "⇄",
    analysis: "▥",
    profile: "○",
    focus: "◷",
    habits: "✓",
    journal: "≡",
    settings: "⚙",
    activity: "↗",
    goals: "◎",
    saved: "▱",
    add: "+",
    arrow: "↗",
    back: "‹",
    next: "›",
    play: "▶",
    pause: "Ⅱ",
    sound: "♪",
  };
  return (
    <Text
      accessible={false}
      style={{
        color,
        fontSize: size,
        lineHeight: size + 4,
        textAlign: "center",
      }}
    >
      {symbols[name] ?? "◇"}
    </Text>
  );
}
