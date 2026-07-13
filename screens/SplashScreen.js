import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from "react-native";
import { COLORS, SIZES } from "../styles/theme";

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <Text style={styles.title}>EducaMente</Text>

      <View style={styles.middleSection}>
        <Image
          source={require("../assets/educamente-logo.gif")}
          style={styles.mainLogo}
          resizeMode="contain"
        />

        <View style={styles.sloganContainer}>
          <Text style={styles.sloganYellow}>Mentes Saudáveis</Text>
          <Text style={styles.sloganWhite}>Futuro Brilhante</Text>
        </View>
      </View>

      <View style={styles.buttonsSection}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: 64,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.white,
    textAlign: "center",
  },
  middleSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainLogo: {
    width: 180,
    height: 180,
    marginBottom: 32,
  },
  sloganContainer: {
    alignItems: "center",
  },
  sloganYellow: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.accent,
    textAlign: "center",
  },
  sloganWhite: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.white,
    textAlign: "center",
  },
  buttonsSection: {
    width: "100%",
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
