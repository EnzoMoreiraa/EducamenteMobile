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
        <Image source={require("../assets/backButton.png")} style={styles.circleBackIcon} resizeMode="contain" />
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
    alignItems: "center",
    justifyContent: "center",
  },
  circleBackIcon: {
    width: 48,
    height: 48,
  },
  screenHeaderTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: -0.2,
  },
});
