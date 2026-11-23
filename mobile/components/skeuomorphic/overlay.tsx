import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSkeuo } from "./theme";
import { styles } from "./styles";
import type { OverlayProps } from "./types";
import { SkeuoButton } from "./skeuo-button";
export function Overlay({
  open,
  onOpenChange,
  title,
  children,
  sheet = false,
}: OverlayProps & { sheet?: boolean }) {
  const { colors } = useSkeuo();
  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={() => onOpenChange(false)}
    >
      <View
        style={[
          styles.overlay,
          { justifyContent: sheet ? "flex-end" : "center" },
        ]}
      >
        <Pressable
          accessibilityLabel="Dismiss"
          accessibilityRole="button"
          style={StyleSheet.absoluteFill}
          onPress={() => onOpenChange(false)}
        />
        <View
          accessibilityViewIsModal
          style={[
            styles.panel,
            {
              backgroundColor: colors.surface,
              borderColor: colors.edge,
              borderBottomLeftRadius: sheet ? 0 : 20,
              borderBottomRightRadius: sheet ? 0 : 20,
            },
          ]}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.stack}
          >
            <Text
              accessibilityRole="header"
              style={{ color: colors.ink, fontSize: 24, fontWeight: "600" }}
            >
              {title}
            </Text>
            {children}
            <SkeuoButton onPress={() => onOpenChange(false)}>Close</SkeuoButton>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
