import { Modal, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { COLORS, SIZES, SHADOW } from "../styles/theme";

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
            <TouchableOpacity style={styles.cancelButton} activeOpacity={0.8} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                destructive && styles.confirmButtonDestructive,
                confirmDisabled && styles.confirmButtonDisabled,
              ]}
              activeOpacity={0.85}
              disabled={confirmDisabled}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>{confirmLabel}</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 32,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLarge,
    padding: 24,
    ...SHADOW,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: COLORS.textGray,
    lineHeight: 20,
  },
  passwordBlock: {
    marginTop: 16,
  },
  passwordLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 6,
  },
  passwordInput: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusMedium,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: COLORS.textDark,
  },
  passwordError: {
    fontSize: 12,
    color: "#C0392B",
    marginTop: 6,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    borderRadius: SIZES.radiusPill,
    paddingVertical: 14,
    alignItems: "center",
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
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  confirmButtonDestructive: {
    backgroundColor: "#C0392B",
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
