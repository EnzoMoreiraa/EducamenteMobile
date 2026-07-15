import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS, SIZES, SHADOW } from "../styles/theme";

// Modal de confirmação reutilizável (ex.: excluir conta, descartar alterações)
export default function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  destructive = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} activeOpacity={0.8} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, destructive && styles.confirmButtonDestructive]}
              activeOpacity={0.85}
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
  confirmText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
  },
});
