import { StyleSheet, Text, View } from "react-native";
import * as Checkbox from "@rn-primitives/checkbox";
import { useSkeuo, useFeedback } from "./theme";
import { styles } from "./styles";
import type { ToggleProps } from "./types";
import { SkeuoText } from "./skeuo-text";
export function SkeuoCheckbox({
  label,
  checked,
  onCheckedChange,
  disabled,
}: ToggleProps) {
  const { colors } = useSkeuo();
  const feedback = useFeedback();
  return (
    <Checkbox.Root
      accessibilityLabel={label}
      checked={checked}
      disabled={disabled}
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
      <View
        style={[
          styles.check,
          {
            backgroundColor: checked ? colors.accent : colors.well,
            borderColor: colors.edge,
          },
        ]}
      >
        <Checkbox.Indicator>
          <Text style={{ color: colors.accentInk, fontWeight: "700" }}>✓</Text>
        </Checkbox.Indicator>
      </View>
      <View style={styles.label}>
        <SkeuoText>{label}</SkeuoText>
      </View>
    </Checkbox.Root>
  );
}
