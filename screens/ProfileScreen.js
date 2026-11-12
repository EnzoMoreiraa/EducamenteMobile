import { useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../components/Headers";
import BottomTabBar, { TAB_BAR_HEIGHT } from "../components/BottomTabBar";
import BottomTabBarEducador from "../components/BottomTabBarEducador";
import AnimatedInput from "../components/AnimatedInput";
import ConfirmModal from "../components/ConfirmModal";
import FloatingHomeButton from "../components/FloatingHomeButton";
import PressableScale from "../components/PressableScale";
import Toast from "../components/Toast";
import {
  BellIcon,
  ChevronRightIcon,
  CloseIcon,
  EditIcon,
  HistoryIcon,
  LogoutIcon,
  SaveIcon,
} from "../components/IconSet";
import { COLORS, SIZES, SPACING, TOUCH, SHADOW } from "../styles/theme";
import { API_URL } from "../services/api";
import { getUsuarioLogado, setUsuarioLogado } from "../services/session";
import { isEmailValido, isVazio } from "../utils/validators";

const MENU_ITEMS = [
  {
    key: "CheckinHistory",
    label: "Histórico de Check-in",
    description: "Veja suas respostas anteriores",
    Icon: HistoryIcon,
  },
  {
    key: "Notifications",
    label: "Notificações",
    description: "Lembretes e alertas do app",
    Icon: BellIcon,
  },
];

export default function ProfileScreen({ navigation }) {
  const usuario = getUsuarioLogado();
  const isPedagogo = usuario?.tipo_usuario === "pedagogo";

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(usuario?.nome ?? "");
  const [lastName, setLastName] = useState(usuario?.sobrenome ?? "");
  const [email, setEmail] = useState(usuario?.email ?? "");
  const [fieldErrors, setFieldErrors] = useState({});
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Transição entre "visualizando" e "editando": some, troca, volta
  const anim = useRef(new Animated.Value(1)).current;
  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });

  const trocarModo = (proximoModo) => {
    Animated.timing(anim, { toValue: 0, duration: 140, useNativeDriver: true }).start(() => {
      setEditing(proximoModo);
      Animated.timing(anim, { toValue: 1, duration: 220, useNativeDriver: true }).start();
    });
  };

  const fullName = `${name} ${lastName}`.trim() || "Visitante";
  const roleLabel = isPedagogo ? "Educador" : "Aluno";

  const abrirEdicao = () => {
    setFieldErrors({});
    setSaveError("");
    trocarModo(true);
  };

  const cancelarEdicao = () => {
    setName(usuario?.nome ?? "");
    setLastName(usuario?.sobrenome ?? "");
    setEmail(usuario?.email ?? "");
    setFieldErrors({});
    setSaveError("");
    trocarModo(false);
  };

  const validar = () => {
    const erros = {};
    if (isVazio(name)) erros.name = "Informe seu nome.";
    if (isVazio(lastName)) erros.lastName = "Informe seu sobrenome.";
    if (isVazio(email)) erros.email = "Informe seu e-mail.";
    else if (!isEmailValido(email)) erros.email = "E-mail inválido. Exemplo: nome@escola.com";

    setFieldErrors(erros);
    return Object.keys(erros).length === 0;
  };

  const handleSave = async () => {
    setSaveError("");
    if (!validar() || !usuario?.id_usuario) return;

    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/usuarios/${usuario.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: name.trim(),
          sobrenome: lastName.trim(),
          email: email.trim(),
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSaveError(data.mensagem || "Não foi possível salvar suas alterações.");
        return;
      }

      setUsuarioLogado({
        ...usuario,
        nome: name.trim(),
        sobrenome: lastName.trim(),
        email: email.trim(),
      });
      setToastVisible(true);
      trocarModo(false);
    } catch (erro) {
      setSaveError("Erro de conexão com o servidor.");
    } finally {
      setSaving(false);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setDeletePassword("");
    setDeleteError("");
  };

  const handleDeleteConfirm = async () => {
    if (deleting) return;
    setDeleting(true);
    setDeleteError("");

    try {
      const response = await fetch(`${API_URL}/usuarios/${usuario.id_usuario}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha: deletePassword }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setDeleteError(data.mensagem || "Não foi possível excluir a conta.");
        return;
      }

      closeDeleteModal();
      setUsuarioLogado(null);
      navigation.reset({ index: 0, routes: [{ name: "Splash" }] });
    } catch (erro) {
      setDeleteError("Erro de conexão com o servidor.");
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    navigation.reset({ index: 0, routes: [{ name: "Splash" }] });
  };

  const TabBar = isPedagogo ? BottomTabBarEducador : BottomTabBar;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader
        title="Perfil"
        onBack={() => navigation.goBack()}
        right={
          <PressableScale
            style={styles.headerAction}
            onPress={editing ? cancelarEdicao : abrirEdicao}
            accessibilityRole="button"
            accessibilityLabel={editing ? "Cancelar edição" : "Editar perfil"}
          >
            {editing ? (
              <CloseIcon size={18} color={COLORS.primary} />
            ) : (
              <EditIcon size={18} color={COLORS.primary} />
            )}
            <Text style={styles.headerActionText}>{editing ? "Cancelar" : "Editar"}</Text>
          </PressableScale>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{fullName.charAt(0)}</Text>
          </View>
          <Text style={styles.userName}>{fullName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>{roleLabel}</Text>
          </View>
        </View>

        <Animated.View style={{ opacity: anim, transform: [{ translateY }] }}>
          {editing ? (
            <View style={styles.formCard}>
              <Text style={styles.cardTitle}>Seus dados</Text>

              <View style={styles.nameRow}>
                <AnimatedInput
                  label="Nome"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    setFieldErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  error={fieldErrors.name}
                  containerStyle={styles.halfInputBlock}
                />
                <AnimatedInput
                  label="Sobrenome"
                  value={lastName}
                  onChangeText={(text) => {
                    setLastName(text);
                    setFieldErrors((prev) => ({ ...prev, lastName: undefined }));
                  }}
                  error={fieldErrors.lastName}
                  containerStyle={styles.halfInputBlock}
                />
              </View>

              <AnimatedInput
                label="E-mail"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }}
                error={fieldErrors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={styles.field}
              />

              {saveError ? <Text style={styles.saveError}>{saveError}</Text> : null}

              <PressableScale
                style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                onPress={handleSave}
                disabled={saving}
                accessibilityRole="button"
              >
                <SaveIcon size={18} color={COLORS.white} filled />
                <Text style={styles.saveButtonText}>{saving ? "Salvando..." : "Salvar"}</Text>
              </PressableScale>
            </View>
          ) : (
            <View style={styles.formCard}>
              <Text style={styles.cardTitle}>Seus dados</Text>
              <ReadOnlyField label="Nome" value={name} />
              <ReadOnlyField label="Sobrenome" value={lastName} />
              <ReadOnlyField label="E-mail" value={email} last />
            </View>
          )}
        </Animated.View>

        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <PressableScale
              key={item.key}
              style={[styles.menuRow, index < MENU_ITEMS.length - 1 && styles.menuRowDivider]}
              onPress={() => navigation.navigate(item.key)}
              accessibilityRole="button"
              accessibilityLabel={item.label}
            >
              <View style={styles.menuIcon}>
                <item.Icon size={20} color={COLORS.primary} filled />
              </View>
              <View style={styles.menuTextBlock}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              <ChevronRightIcon size={20} color={COLORS.textGray} />
            </PressableScale>
          ))}
        </View>

        {editing ? (
          <View style={styles.dangerCard}>
            <Text style={styles.dangerTitle}>Excluir conta</Text>
            <Text style={styles.dangerDescription}>
              Essa ação apaga permanentemente sua conta e todos os seus dados. Não pode ser
              desfeita.
            </Text>
            <PressableScale
              style={styles.deleteButton}
              onPress={() => setDeleteModalVisible(true)}
              accessibilityRole="button"
            >
              <Text style={styles.deleteButtonText}>Excluir minha conta</Text>
            </PressableScale>
          </View>
        ) : null}

        <PressableScale
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityRole="button"
        >
          <LogoutIcon size={18} color={COLORS.danger} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </PressableScale>
      </ScrollView>

      <ConfirmModal
        visible={deleteModalVisible}
        title="Excluir conta?"
        message="Essa ação é permanente e não pode ser desfeita. Todos os seus dados de check-in e agendamentos serão apagados."
        confirmLabel={deleting ? "Excluindo..." : "Excluir"}
        cancelLabel="Cancelar"
        destructive
        requirePassword
        password={deletePassword}
        onPasswordChange={setDeletePassword}
        passwordError={deleteError}
        onConfirm={handleDeleteConfirm}
        onCancel={closeDeleteModal}
      />

      <Toast
        visible={toastVisible}
        message="Perfil atualizado com sucesso"
        onHide={() => setToastVisible(false)}
        bottomOffset={TAB_BAR_HEIGHT + SPACING.md}
      />

      <FloatingHomeButton
        navigation={navigation}
        bottomOffset={TAB_BAR_HEIGHT}
        homeRoute={isPedagogo ? "HomeEducador" : "Home"}
      />
      <TabBar navigation={navigation} active="Profile" />
    </SafeAreaView>
  );
}

function ReadOnlyField({ label, value, last }) {
  return (
    <View style={[styles.readOnlyRow, !last && styles.readOnlyDivider]}>
      <Text style={styles.readOnlyLabel}>{label}</Text>
      <Text style={styles.readOnlyValue} numberOfLines={1}>
        {value || "—"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.lg,
    gap: SPACING.lg,
  },
  headerAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xxs + 2,
    minHeight: TOUCH.min,
    paddingHorizontal: SPACING.sm,
    borderRadius: SIZES.radiusPill,
    backgroundColor: COLORS.primarySoft,
  },
  headerActionText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },
  summaryCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLarge,
    paddingVertical: SPACING.xxl - 4,
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
    ...SHADOW,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  avatarLetter: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 24,
  },
  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textDark,
    textAlign: "center",
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.textGray,
    marginTop: 2,
    textAlign: "center",
  },
  roleBadge: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.primarySoft,
    borderRadius: SIZES.radiusPill,
    paddingHorizontal: SPACING.md,
    paddingVertical: 5,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
  },
  formCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLarge,
    padding: SPACING.lg,
    ...SHADOW,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: SPACING.md,
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
  readOnlyRow: {
    paddingVertical: SPACING.sm,
  },
  readOnlyDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  readOnlyLabel: {
    fontSize: 12,
    color: COLORS.textGray,
    marginBottom: 2,
  },
  readOnlyValue: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  saveError: {
    fontSize: 13,
    color: COLORS.danger,
    fontWeight: "600",
    marginBottom: SPACING.sm,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusPill,
    minHeight: TOUCH.min + 6,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
  },
  menuCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLarge,
    ...SHADOW,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    minHeight: TOUCH.min + 20,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  menuRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTextBlock: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  menuDescription: {
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 2,
  },
  dangerCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLarge,
    padding: SPACING.lg,
    ...SHADOW,
  },
  dangerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.danger,
    marginBottom: SPACING.xxs + 2,
  },
  dangerDescription: {
    fontSize: 13,
    color: COLORS.textGray,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  deleteButton: {
    borderRadius: SIZES.radiusPill,
    minHeight: TOUCH.min,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.2,
    borderColor: COLORS.danger,
  },
  deleteButtonText: {
    color: COLORS.danger,
    fontSize: 14,
    fontWeight: "700",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    minHeight: TOUCH.min,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.danger,
  },
});
