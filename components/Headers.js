import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES } from "../styles/theme";

// Header verde usado em telas de autenticação (Login/Register)
export function AuthHeader({ onBack }) {
  return (
    <View style={styles.authHeaderContainer}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Image source={require("../assets/back-icon.png")} style={styles.backIcon} />
      </TouchableOpacity>
    </View>
  );
}

// Header simples usado em telas de conteúdo (Autocuidado, Check-in, Agendar conversa)
export function ScreenHeader({ title, onBack }) {
  return (
    <View style={styles.screenHeaderContainer}>
      <TouchableOpacity onPress={onBack} style={styles.circleBackButton}>
        <Text style={styles.circleBackArrow}>{"\u2039"}</Text>
      </TouchableOpacity>
      <Text style={styles.screenHeaderTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  authHeaderContainer: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 46,
    height: 46,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
  screenHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 14,
  },
  circleBackButton: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radiusPill,
    borderWidth: 1.2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  circleBackArrow: {
    fontSize: 22,
    color: COLORS.primary,
    fontWeight: "700",
  },
  screenHeaderTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: -0.2,
  },
});
