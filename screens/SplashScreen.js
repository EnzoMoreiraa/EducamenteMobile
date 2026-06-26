import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from "react-native";
import { COLORS, SIZES } from "../styles/theme";

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <Text style={styles.title}>EducaMente</Text>

      <Image
        source={require("../../assets/educamente-logo.gif")}
        style={styles.mainLogo}
        resizeMode="contain"
      />

      <View style={styles.sloganContainer}>
        <Text style={styles.sloganYellow}>Mentes Saudáveis</Text>
        <Text style={styles.sloganWhite}>Futuro Brilhante</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() => navigation.navigate("Login", { role: "aluno" })}
      >
        <Text style={styles.buttonText}>Sou aluno</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() => navigation.navigate("Login", { role: "educador" })}
      >
        <Text style={styles.buttonText}>Sou Educador</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SIZES.paddingScreen,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 24,
  },
  mainLogo: {
    width: 150,
    height: 150,
    marginBottom: 32,
  },
  sloganContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  sloganYellow: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.accent,
  },
  sloganWhite: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.accent,
    width: "100%",
    paddingVertical: 16,
    borderRadius: SIZES.radiusPill,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
