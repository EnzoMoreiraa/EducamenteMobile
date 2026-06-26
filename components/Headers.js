import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { COLORS } from "../styles/theme";

// Header verde usado em telas de autenticação (Login/Register)
export function AuthHeader({ onBack }) {
  return (
    <View style={styles.authHeaderContainer}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Image source={require("../../assets/back-icon.png")} style={styles.backIcon} />
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
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
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
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  circleBackButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  circleBackArrow: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: "700",
  },
  screenHeaderTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
  },
});
