import { StyleSheet, Text, View } from "react-native";
import { BackIcon } from "./IconSet";
import PressableScale from "./PressableScale";
import { COLORS, SIZES, SPACING, TOUCH, SHADOW } from "../styles/theme";

// Header verde usado em telas de autenticação (Login/Register)
export function AuthHeader({ onBack }) {
  return (
    <View style={styles.authHeaderContainer}>
      <PressableScale
        onPress={onBack}
        style={styles.backButton}
        accessibilityRole="button"
        accessibilityLabel="Voltar"
      >
        <BackIcon size={22} color={COLORS.white} />
      </PressableScale>
    </View>
  );
}

// Header simples usado em telas de conteúdo (Autocuidado, Check-in, Perfil...).
// `right` aceita um nó opcional alinhado à direita — por exemplo, o botão
// "Editar" do Perfil.
export function ScreenHeader({ title, onBack, right }) {
  return (
    <View style={styles.screenHeaderContainer}>
      <PressableScale
        onPress={onBack}
        style={styles.circleBackButton}
        accessibilityRole="button"
        accessibilityLabel="Voltar"
      >
        <BackIcon size={22} color={COLORS.primary} />
      </PressableScale>

      <Text style={styles.screenHeaderTitle} numberOfLines={1}>
        {title}
      </Text>

      {right ? <View style={styles.rightSlot}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  authHeaderContainer: {
    paddingTop: SPACING.xs,
    paddingHorizontal: SIZES.paddingScreen,
  },
  backButton: {
    width: TOUCH.min + 2,
    height: TOUCH.min + 2,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  screenHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  circleBackButton: {
    width: TOUCH.min,
    height: TOUCH.min,
    borderRadius: TOUCH.min / 2,
    backgroundColor: COLORS.cardBackground,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOW,
  },
  screenHeaderTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: -0.2,
  },
  rightSlot: {
    marginLeft: "auto",
  },
});
