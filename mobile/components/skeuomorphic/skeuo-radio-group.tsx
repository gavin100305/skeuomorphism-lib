import { Pressable, View } from "react-native";
import { useSkeuo, useFeedback } from "./theme";
import { styles } from "./styles";
import type { OptionsProps } from "./types";
import { SkeuoText } from "./skeuo-text";
export function SkeuoRadioGroup({
  label,
  value,
  onValueChange,
  options,
}: OptionsProps) {
  const { colors } = useSkeuo();
  const feedback = useFeedback();
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={label}
      style={styles.stack}
    >
      {options.map((option) => (
        <Pressable
          key={option.value}
          accessibilityRole="radio"
          aria-checked={value === option.value}
          aria-disabled={!!option.disabled}
          accessibilityLabel={option.label}
          accessibilityState={{
            checked: value === option.value,
            disabled: !!option.disabled,
          }}
          disabled={option.disabled}
          onPress={() => {
            feedback();
            onValueChange(option.value);
          }}
          style={[
            styles.row,
            styles.touch,
            { opacity: option.disabled ? 0.45 : 1 },
          ]}
        >
          <View
            style={[
              styles.check,
              {
                borderRadius: 20,
                borderColor: colors.edge,
                backgroundColor: colors.well,
              },
            ]}
          >
            {value === option.value && (
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: colors.accent,
                }}
              />
            )}
          </View>
          <SkeuoText>{option.label}</SkeuoText>
        </Pressable>
      ))}
    </View>
  );
}
