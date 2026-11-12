import { useEffect, useRef, useState } from "react";
import {
  Animated,
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
import TermsModal from "../components/TermsModal";
import { CheckIcon } from "../components/IconSet";
import { COLORS, SIZES, SPACING, TOUCH } from "../styles/theme";
import { API_URL } from "../services/api";
import { setUsuarioLogado } from "../services/session";
import { isEmailValido, isVazio, rotaInicialPorTipo } from "../utils/validators";

const SENHA_MINIMA = 6;

export default function RegisterScreen({ navigation, route }) {
  const role = route?.params?.role ?? "aluno";
  const tipoUsuario = role === "educador" ? "pedagogo" : "aluno";
  const insets = useSafeAreaInsets();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [legalDoc, setLegalDoc] = useState(null); // "termos" | "privacidade" | null

  // Entrada do formulário: vem da direita (é a aba da direita do seletor)
  const slide = useRef(new Animated.Value(28)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slide, { toValue: 0, useNativeDriver: true, friction: 9, tension: 80 }),
      Animated.timing(fade, { toValue: 1, duration: 260, useNativeDriver: true }),
    ]).start();
  }, [fade, slide]);

  const goToLogin = () => {
    Animated.parallel([
      Animated.timing(slide, { toValue: 32, duration: 170, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 0, duration: 170, useNativeDriver: true }),
    ]).start(() => navigation.replace("Login", { role }));
  };

  const limparErro = (campo) => {
    if (fieldErrors[campo]) setFieldErrors((prev) => ({ ...prev, [campo]: undefined }));
  };

  // Cada falha acende o campo correspondente em vermelho com a mensagem própria
  const validar = () => {
    const erros = {};

    if (isVazio(name)) erros.name = "Informe seu nome.";
    if (isVazio(lastName)) erros.lastName = "Informe seu sobrenome.";

    if (isVazio(email)) erros.email = "Informe seu e-mail.";
    else if (!isEmailValido(email)) erros.email = "E-mail inválido. Exemplo: nome@escola.com";

    if (isVazio(password)) erros.password = "Crie uma senha.";
    else if (password.length < SENHA_MINIMA) {
      erros.password = `A senha precisa ter pelo menos ${SENHA_MINIMA} caracteres.`;
    }

    if (isVazio(confirmPassword)) erros.confirmPassword = "Confirme sua senha.";
    else if (password !== confirmPassword) erros.confirmPassword = "As senhas não são iguais.";

    if (!acceptedTerms) {
      erros.terms = "É preciso aceitar o Termo de Uso e a Política de Privacidade.";
    }

    setFieldErrors(erros);
    return Object.keys(erros).length === 0;
  };

  const handleRegister = async () => {
    setError("");
    if (!validar()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: name.trim(),
          sobrenome: lastName.trim(),
          email: email.trim(),
          senha: password,
          tipo_usuario: tipoUsuario,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        // E-mail duplicado volta do back-end como 409 — mostra no campo certo
        if (response.status === 409) {
          setFieldErrors((prev) => ({ ...prev, email: data.mensagem }));
        } else {
          setError(data.mensagem || "Não foi possível criar a conta.");
        }
        return;
      }

      setUsuarioLogado({
        id_usuario: data.id_usuario,
        nome: name.trim(),
        sobrenome: lastName.trim(),
        email: email.trim(),
        tipo_usuario: tipoUsuario,
      });
      navigation.replace(rotaInicialPorTipo(tipoUsuario));
    } catch (erro) {
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const aceitarNoModal = () => {
    setAcceptedTerms(true);
    limparErro("terms");
    setLegalDoc(null);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerBlock, { paddingTop: insets.top + SPACING.xs }]}>
        <BackgroundPattern height={220} />
        <AuthHeader onBack={() => navigation.goBack()} />
        <Text style={styles.title}>Que bom ter você aqui!</Text>
        <Text style={styles.subtitle}>
          Pronto para dar o primeiro passo na sua jornada de autocuidado?
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
          <AuthTabSelector activeIndex={1} onChange={goToLogin} />

          <Animated.View style={{ opacity: fade, transform: [{ translateX: slide }] }}>
            <View style={styles.nameRow}>
              <AnimatedInput
                label="Nome"
                placeholder="Ex.: Enzo"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  limparErro("name");
                }}
                error={fieldErrors.name}
                containerStyle={styles.halfInputBlock}
              />
              <AnimatedInput
                label="Sobrenome"
                placeholder="Ex.: Moreira"
                value={lastName}
                onChangeText={(text) => {
                  setLastName(text);
                  limparErro("lastName");
                }}
                error={fieldErrors.lastName}
                containerStyle={styles.halfInputBlock}
              />
            </View>

            <AnimatedInput
              label="E-mail"
              placeholder="Insira seu e-mail"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                limparErro("email");
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
                limparErro("password");
              }}
              error={fieldErrors.password}
              secureTextEntry
              containerStyle={styles.field}
            />

            <AnimatedInput
              label="Confirme sua senha"
              placeholder="Insira sua senha novamente"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                limparErro("confirmPassword");
              }}
              error={fieldErrors.confirmPassword}
              secureTextEntry
              containerStyle={styles.field}
            />

            <View style={styles.termsBlock}>
              <PressableScale
                style={styles.termsRow}
                onPress={() => {
                  setAcceptedTerms((current) => !current);
                  limparErro("terms");
                }}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: acceptedTerms }}
              >
                <View
                  style={[
                    styles.checkbox,
                    acceptedTerms && styles.checkboxChecked,
                    fieldErrors.terms && styles.checkboxError,
                  ]}
                >
                  {acceptedTerms ? <CheckIcon size={12} color={COLORS.white} /> : null}
                </View>
                <Text style={styles.termsText}>
                  Li e estou de acordo com o Termo de Uso e a Política de Privacidade
                </Text>
              </PressableScale>

              <View style={styles.termsLinksRow}>
                <PressableScale style={styles.linkButton} onPress={() => setLegalDoc("termos")}>
                  <Text style={styles.termsLink}>Ler o Termo de Uso</Text>
                </PressableScale>
                <PressableScale style={styles.linkButton} onPress={() => setLegalDoc("privacidade")}>
                  <Text style={styles.termsLink}>Ler a Política de Privacidade</Text>
                </PressableScale>
              </View>

              {fieldErrors.terms ? <Text style={styles.fieldError}>{fieldErrors.terms}</Text> : null}
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <PressableScale
              style={[styles.actionButton, loading && styles.actionButtonDisabled]}
              onPress={handleRegister}
              disabled={loading}
              accessibilityRole="button"
            >
              <Text style={styles.actionButtonText}>
                {loading ? "Criando conta..." : "Criar conta"}
              </Text>
            </PressableScale>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TermsModal
        visible={legalDoc !== null}
        doc={legalDoc ?? "termos"}
        onAccept={aceitarNoModal}
        onClose={() => setLegalDoc(null)}
      />
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
  nameRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  halfInputBlock: {
    flex: 1,
    marginBottom: SPACING.md,
  },
  field: {
    marginBottom: SPACING.md,
  },
  termsBlock: {
    marginBottom: SPACING.lg,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: TOUCH.min,
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
  checkboxError: {
    borderColor: COLORS.danger,
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
  },
  termsLinksRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
    marginLeft: 28,
  },
  linkButton: {
    minHeight: TOUCH.min - 8,
    justifyContent: "center",
  },
  termsLink: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 13,
    textDecorationLine: "underline",
  },
  fieldError: {
    fontSize: 12,
    color: COLORS.danger,
    fontWeight: "600",
    marginTop: SPACING.xxs,
    marginLeft: 28,
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
  },
  actionButtonDisabled: {
    opacity: 0.7,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
