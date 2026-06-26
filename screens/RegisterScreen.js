import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from "react-native";
import { AuthHeader } from "../components/Headers";
import { COLORS, SIZES } from "../styles/theme";

export default function RegisterScreen({ navigation, route }) {
  const role = route?.params?.role ?? "aluno";

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerBlock}>
        <AuthHeader onBack={() => navigation.goBack()} />
        <Text style={styles.title}>Que bom ter você aqui!</Text>
        <Text style={styles.subtitle}>
          Pronto para dar o primeiro passo na sua jornada de autocuidado?
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tabSelector}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.replace("Login", { role })}
          >
            <Text style={styles.tabInactiveText}>Entrar</Text>
          </TouchableOpacity>
          <View style={[styles.tab, styles.tabActive]}>
            <Text style={styles.tabActiveText}>Cadastrar-se</Text>
          </View>
        </View>

        <View style={styles.nameRow}>
          <View style={styles.halfInputBlock}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Enzo"
              placeholderTextColor={COLORS.placeholder}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.halfInputBlock}>
            <Text style={styles.label}>Sobrenome</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Moreira"
              placeholderTextColor={COLORS.placeholder}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
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

        <Text style={styles.label}>Confirme sua senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira sua senha novamente"
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={styles.termsRow}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
        >
          <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
            {acceptedTerms && <Text style={styles.checkboxMark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            Li e estou de acordo com o{" "}
            <Text style={styles.termsLink}>Termo de Uso</Text>
            {" "}e{" "}
            <Text style={styles.termsLink}>Política de Privacidade</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.actionButton}
          onPress={() => navigation.replace("Home")}
        >
          <Text style={styles.actionButtonText}>Entrar</Text>
        </TouchableOpacity>
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
  nameRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfInputBlock: {
    flex: 1,
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
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    marginRight: 10,
    marginTop: 2,
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
  termsText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
  },
  termsLink: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusPill,
    paddingVertical: 16,
    alignItems: "center",
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
