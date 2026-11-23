import { Text, View } from "react-native";
import { SkeuoButton } from "./skeuo-button";
import { useSkeuo } from "./theme";
export function SkeuoKeyButton({
  label,
  symbol = "⌘",
  onPress,
  disabled = false,
}: {
  label: string;
  symbol?: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const { colors: c } = useSkeuo();
  return (
    <SkeuoButton
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={label}
    >
      <View style={{ gap: 12, minWidth: 44, alignItems: "center", padding: 8 }}>
        <Text style={{ color: c.ink, fontSize: 32 }}>{symbol}</Text>
        <Text style={{ color: c.muted, fontSize: 11 }}>{label}</Text>
      </View>
    </SkeuoButton>
  );
}
