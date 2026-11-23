import { View, ViewProps } from "react-native";
import { useSkeuo } from "./theme";
import { styles } from "./styles";
export function SkeuoCard({ style, ...props }: ViewProps) {
  const { colors } = useSkeuo();
  return (
    <View
      {...props}
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.edge },
        style,
      ]}
    />
  );
}
