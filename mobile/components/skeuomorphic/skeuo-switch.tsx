import { StyleSheet, View } from "react-native";
import * as Switch from "@rn-primitives/switch";
import { useSkeuo, useFeedback } from "./theme";
import { styles } from "./styles";
import type { ToggleProps } from "./types";
import { SkeuoText } from "./skeuo-text";
export function SkeuoSwitch({
  label,
  checked,
  onCheckedChange,
  disabled,
}: ToggleProps) {
  const { colors } = useSkeuo();
  const feedback = useFeedback();
  return (
    <View style={styles.row}>
      <View style={styles.label}>
        <SkeuoText>{label}</SkeuoText>
      </View>
      <Switch.Root
        accessibilityLabel={label}
        checked={checked}
        disabled={disabled}
        onCheckedChange={(v) => {
          feedback();
          onCheckedChange(v);
        }}
        style={StyleSheet.flatten([
          styles.track,
          {
            backgroundColor: checked ? colors.accent : colors.well,
            borderColor: colors.edge,
            opacity: disabled ? 0.45 : 1,
          },
        ])}
      >
        <Switch.Thumb
          style={StyleSheet.flatten([
            styles.thumb,
            {
              backgroundColor: colors.raised,
              transform: [{ translateX: checked ? 20 : 0 }],
            },
          ])}
        />
      </Switch.Root>
    </View>
  );
}
