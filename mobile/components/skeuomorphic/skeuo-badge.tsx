import { Text, View } from "react-native";
import { useSkeuo } from "./theme";
import { styles } from "./styles";
export function SkeuoBadge({ children }: { children: string }) {
  const { colors } = useSkeuo();
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.well, borderColor: colors.edge },
      ]}
    >
      <Text style={{ color: colors.ink, fontSize: 13, fontWeight: "600" }}>
        {children}
      </Text>
    </View>
  );
}
