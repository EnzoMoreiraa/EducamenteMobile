import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { ScreenHeader } from "../components/Headers";
import { COLORS, SIZES, SHADOW } from "../styles/theme";

// Hub de entrada do canal de comunicação — escolha entre mensagem anônima (RF07)
// ou identificada (RF06) antes de abrir o formulário
export default function ChatScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Envie uma mensagem" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.optionCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Anonimo")}
        >
          <View style={styles.optionIconWrapper}>
            {/* Ícone real "secret 1" (balões de fala + cadeado) ainda não exportado do Figma */}
            <Image
              source={require("../assets/images/placeholder.png")}
              style={styles.optionIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.optionFooter}>
            <Text style={styles.optionFooterText}>Mensagem Anônima</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Identificada")}
        >
          <View style={styles.optionIconWrapper}>
            {/* Ícone real "private 1" (casa com pessoas) ainda não exportado do Figma */}
            <Image
              source={require("../assets/images/placeholder.png")}
              style={styles.optionIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.optionFooter}>
            <Text style={styles.optionFooterText}>Mensagem Identificada</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: 24,
    gap: 40,
    alignItems: "center",
  },
  optionCard: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: SIZES.radiusLarge,
    overflow: "hidden",
    ...SHADOW,
  },
  optionIconWrapper: {
    height: 232,
    alignItems: "center",
    justifyContent: "center",
  },
  optionIcon: {
    width: 180,
    height: 180,
  },
  optionFooter: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    alignItems: "center",
  },
  optionFooterText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
