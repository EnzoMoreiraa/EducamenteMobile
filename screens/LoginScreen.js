import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from "react-native";
import { AuthHeader } from "../components/Headers";
import { COLORS, SIZES } from "../styles/theme";

export default function LoginScreen({ navigation, route }) {
  const role = route?.params?.role ?? "aluno";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepConnected, setKeepConnected] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.headerBlock}>
        <AuthHeader onBack={() => navigation.goBack()} />
        <Text style={styles.title}>Que bom te ver de novo!</Text>
        <Text style={styles.subtitle}>
          Pronto para mais um passo na sua jornada de autocuidado?
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tabSelector}>
          <View style={[styles.tab, styles.tabActive]}>
            <Text style={styles.tabActiveText}>Entrar</Text>
          </View>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.replace("Register", { role })}
          >
            <Text style={styles.tabInactiveText}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu e-mail"
          placeholderTextColor={COLORS.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira sua senha"
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setKeepConnected(!keepConnected)}
          >
            <View style={[styles.checkbox, keepConnected && styles.checkboxChecked]}>
              {keepConnected && <Text style={styles.checkboxMark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Manter conectado</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.actionButton}
          onPress={() => navigation.replace("Home")}
        >
          <Text style={styles.actionButtonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Ou continue com</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require("../assets/gmail-logo.png")} style={styles.socialIcon} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require("../assets/apple-logo.png")} style={styles.socialIcon} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require("../assets/microsoft-logo.png")} style={styles.socialIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerBlock: {
    backgroundColor: COLORS.primary,
    paddingBottom: 32,
    borderBottomLeftRadius: SIZES.radiusLarge,
    borderBottomRightRadius: SIZES.radiusLarge,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.white,
    paddingHorizontal: SIZES.paddingScreen,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    paddingHorizontal: SIZES.paddingScreen,
    marginTop: 6,
  },
  formContainer: {
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: 24,
    paddingBottom: 40,
  },
  tabSelector: {
    flexDirection: "row",
    backgroundColor: "#E4E1DC",
    borderRadius: SIZES.radiusPill,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: SIZES.radiusPill,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: COLORS.white,
  },
  tabActiveText: {
    fontWeight: "700",
    color: COLORS.textDark,
  },
  tabInactiveText: {
    color: COLORS.textGray,
    fontWeight: "600",
  },
  label: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMedium,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 18,
    color: COLORS.textDark,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  checkboxMark: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
  },
  checkboxLabel: {
    fontSize: 13,
    color: COLORS.textDark,
  },
  forgotPassword: {
    fontSize: 13,
    color: COLORS.textDark,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusPill,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: 10,
    color: COLORS.textGray,
    fontSize: 13,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  socialButton: {
    width: 64,
    height: 48,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    width: 26,
    height: 26,
  },
});
