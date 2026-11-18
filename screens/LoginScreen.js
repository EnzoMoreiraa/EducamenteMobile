import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthHeader } from "../components/Headers";
import AnimatedInput from "../components/AnimatedInput";
import AuthTabSelector from "../components/AuthTabSelector";
import BackgroundPattern from "../components/BackgroundPattern";
import PressableScale from "../components/PressableScale";
import { CheckIcon } from "../components/IconSet";
import { COLORS, SIZES, SPACING, TOUCH } from "../styles/theme";
import { API_URL } from "../services/api";
import { setUsuarioLogado } from "../services/session";
import { isEmailValido, isVazio, rotaInicialPorTipo } from "../utils/validators";

export default function LoginScreen({ navigation, route }) {
  const role = route?.params?.role ?? "aluno";
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepConnected, setKeepConnected] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const slide = useRef(new Animated.Value(-28)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slide, { toValue: 0, useNativeDriver: true, friction: 9, tension: 80 }),
      Animated.timing(fade, { toValue: 1, duration: 260, useNativeDriver: true }),
    ]).start();
  }, [fade, slide]);

  const goToRegister = () => {
    Animated.parallel([
      Animated.timing(slide, { toValue: -32, duration: 170, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 0, duration: 170, useNativeDriver: true }),
    ]).start(() => navigation.replace("Register", { role }));
  };

  const validar = () => {
    const erros = {};
    if (isVazio(email)) erros.email = "Informe seu e-mail.";
    else if (!isEmailValido(email)) erros.email = "E-mail inválido. Exemplo: nome@escola.com";
    if (isVazio(password)) erros.password = "Informe sua senha.";

    setFieldErrors(erros);
    return Object.keys(erros).length === 0;
  };

  const handleLogin = async () => {
    setError("");
    if (!validar()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), senha: password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.mensagem || "Não foi possível entrar.");
        return;
      }

      setUsuarioLogado(data.usuario);
      navigation.replace(rotaInicialPorTipo(data.usuario?.tipo_usuario));
    } catch (erro) {
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerBlock, { paddingTop: insets.top + SPACING.xs }]}>
        <BackgroundPattern height={220} />
        <AuthHeader onBack={() => navigation.goBack()} />
        <Text style={styles.title}>Que bom te ver de novo!</Text>
        <Text style={styles.subtitle}>
          Pronto para mais um passo na sua jornada de autocuidado?
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.formContainer, { paddingBottom: insets.bottom + SPACING.huge }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AuthTabSelector activeIndex={0} onChange={goToRegister} />

          <Animated.View style={{ opacity: fade, transform: [{ translateX: slide }] }}>
            <AnimatedInput
              label="E-mail"
              placeholder="Insira seu e-mail"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
              }}
              error={fieldErrors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={styles.field}
            />

            <AnimatedInput
              label="Senha"
              placeholder="Insira sua senha"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }}
              error={fieldErrors.password}
              secureTextEntry
              containerStyle={styles.field}
            />

            <View style={styles.row}>
              <PressableScale
                style={styles.checkboxRow}
                onPress={() => setKeepConnected(!keepConnected)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: keepConnected }}
              >
                <View style={[styles.checkbox, keepConnected && styles.checkboxChecked]}>
                  {keepConnected ? <CheckIcon size={12} color={COLORS.white} /> : null}
                </View>
                <Text style={styles.checkboxLabel}>Manter conectado</Text>
              </PressableScale>

              <PressableScale style={styles.forgotButton}>
                <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
              </PressableScale>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <PressableScale
              style={[styles.actionButton, loading && styles.actionButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
              accessibilityRole="button"
            >
              <Text style={styles.actionButtonText}>{loading ? "Entrando..." : "Entrar"}</Text>
            </PressableScale>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Ou continue com</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <PressableScale style={styles.socialButton} accessibilityLabel="Entrar com Google">
                <Image source={require("../assets/gmail-logo.png")} style={styles.socialIcon} resizeMode="contain" />
              </PressableScale>
              <PressableScale style={styles.socialButton} accessibilityLabel="Entrar com Apple">
                <Image source={require("../assets/apple-logo.png")} style={styles.socialIcon} resizeMode="contain" />
              </PressableScale>
              <PressableScale style={styles.socialButton} accessibilityLabel="Entrar com Microsoft">
                <Image source={require("../assets/microsoft-logo.png")} style={styles.socialIcon} resizeMode="contain" />
              </PressableScale>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  headerBlock: {
    backgroundColor: COLORS.primary,
    paddingBottom: SPACING.xxl,
    borderBottomLeftRadius: SIZES.radiusLarge,
    borderBottomRightRadius: SIZES.radiusLarge,
    overflow: "hidden",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.white,
    paddingHorizontal: SIZES.paddingScreen,
    marginTop: SPACING.lg,
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.85)",
    paddingHorizontal: SIZES.paddingScreen,
    marginTop: SPACING.xxs + 2,
    lineHeight: 20,
  },
  formContainer: {
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: SPACING.xl,
  },
  field: {
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: SPACING.xs,
    marginBottom: SPACING.lg,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: TOUCH.min,
    paddingRight: SPACING.xs,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    marginRight: SPACING.xs,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  checkboxLabel: {
    fontSize: 13,
    color: COLORS.textDark,
  },
  forgotButton: {
    minHeight: TOUCH.min,
    justifyContent: "center",
  },
  forgotPassword: {
    fontSize: 13,
    color: COLORS.textDark,
    fontWeight: "600",
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    marginBottom: SPACING.sm,
    textAlign: "center",
    fontWeight: "600",
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusPill,
    minHeight: TOUCH.min + 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.xl,
  },
  actionButtonDisabled: {
    opacity: 0.7,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: SPACING.xs,
    color: COLORS.textGray,
    fontSize: 13,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING.md,
  },
  socialButton: {
    width: 68,
    height: TOUCH.min + 4,
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
