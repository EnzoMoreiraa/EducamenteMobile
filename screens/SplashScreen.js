import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import PressableScale from "../components/PressableScale";
import { COLORS, SIZES, SPACING, TOUCH } from "../styles/theme";

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <Text style={styles.title}>EducaMente</Text>

        <View style={styles.middleSection}>
          <Image
            source={require("../assets/educamente-logo.gif")}
            style={styles.mainLogo}
            contentFit="contain"
            autoplay
          />

          <View style={styles.sloganContainer}>
            <Text style={styles.sloganYellow}>Mentes Saudáveis</Text>
            <Text style={styles.sloganWhite}>Futuro Brilhante</Text>
          </View>
        </View>

        <View style={styles.buttonsSection}>
          <PressableScale
            style={styles.button}
            onPress={() => navigation.navigate("Login", { role: "aluno" })}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Sou aluno</Text>
          </PressableScale>

          <PressableScale
            style={styles.button}
            onPress={() => navigation.navigate("Login", { role: "educador" })}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Sou Educador</Text>
          </PressableScale>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: SPACING.huge,
    paddingBottom: SPACING.huge,
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
    marginBottom: SPACING.xxl,
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
    gap: SPACING.md,
  },
  button: {
    backgroundColor: COLORS.accent,
    width: "100%",
    minHeight: TOUCH.min + 10,
    borderRadius: SIZES.radiusPill,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
