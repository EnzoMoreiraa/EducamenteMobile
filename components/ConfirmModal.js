import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import PressableScale from "./PressableScale";
import { COLORS, SIZES, SPACING, TOUCH, SHADOW } from "../styles/theme";

// Modal de confirmação reutilizável (ex.: excluir conta, descartar alterações)
export default function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  destructive = false,
  requirePassword = false,
  password = "",
  onPasswordChange,
  passwordError,
  onConfirm,
  onCancel,
}) {
  const confirmDisabled = requirePassword && password.length === 0;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}

          {requirePassword ? (
            <View style={styles.passwordBlock}>
              <Text style={styles.passwordLabel}>Confirme sua senha</Text>
              <TextInput
                style={styles.passwordInput}
                placeholder="Insira sua senha"
                placeholderTextColor={COLORS.placeholder}
                secureTextEntry
                value={password}
                onChangeText={onPasswordChange}
              />
              {passwordError ? <Text style={styles.passwordError}>{passwordError}</Text> : null}
            </View>
          ) : null}

          <View style={styles.actions}>
            <PressableScale style={styles.cancelButton} onPress={onCancel} accessibilityRole="button">
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </PressableScale>

            <PressableScale
              style={[
                styles.confirmButton,
                destructive && styles.confirmButtonDestructive,
                confirmDisabled && styles.confirmButtonDisabled,
              ]}
              disabled={confirmDisabled}
              onPress={onConfirm}
              accessibilityRole="button"
            >
              <Text style={styles.confirmText}>{confirmLabel}</Text>
            </PressableScale>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.xxl,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLarge,
    padding: SPACING.xl,
    ...SHADOW,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  message: {
    fontSize: 14,
    color: COLORS.textGray,
    lineHeight: 20,
  },
  passwordBlock: {
    marginTop: SPACING.md,
  },
  passwordLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: SPACING.xxs + 2,
  },
  passwordInput: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusMedium,
    paddingHorizontal: SPACING.md,
    minHeight: TOUCH.min,
    fontSize: 15,
    color: COLORS.textDark,
  },
  passwordError: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: SPACING.xxs + 2,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginTop: SPACING.xl,
  },
  cancelButton: {
    flex: 1,
    borderRadius: SIZES.radiusPill,
    minHeight: TOUCH.min,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.2,
    borderColor: COLORS.border,
  },
  cancelText: {
    color: COLORS.textDark,
    fontWeight: "700",
    fontSize: 15,
  },
  confirmButton: {
    flex: 1,
    borderRadius: SIZES.radiusPill,
    minHeight: TOUCH.min,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  confirmButtonDestructive: {
    backgroundColor: COLORS.danger,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
  },
});
