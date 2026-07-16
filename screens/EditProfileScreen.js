import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { ScreenHeader } from "../components/Headers";
import ConfirmModal from "../components/ConfirmModal";
import { COLORS, SIZES, SHADOW } from "../styles/theme";
import { API_URL } from "../services/api";
import { getUsuarioLogado, setUsuarioLogado } from "../services/session";

export default function EditProfileScreen({ navigation }) {
  const usuario = getUsuarioLogado();
  const [name, setName] = useState(usuario?.nome ?? "");
  const [lastName, setLastName] = useState(usuario?.sobrenome ?? "");
  const [email, setEmail] = useState(usuario?.email ?? "");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios/${usuario.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: name, sobrenome: lastName, email }),
      });

      if (response.ok) {
        setUsuarioLogado({ ...usuario, nome: name, sobrenome: lastName, email });
      }
    } catch (erro) {
      // segue sem bloquear a navegação — o usuário pode tentar salvar de novo depois
    }

    navigation.goBack();
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
      const data = await response.json();

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

  return (
    <View style={styles.container}>
      <ScreenHeader title="Editar perfil" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{name.charAt(0)}</Text>
          </View>
        </View>

        <View style={styles.formCard}>
          <View style={styles.nameRow}>
            <View style={styles.halfInputBlock}>
              <Text style={styles.label}>Nome</Text>
              <TextInput style={styles.input} value={name} onChangeText={setName} />
            </View>
            <View style={styles.halfInputBlock}>
              <Text style={styles.label}>Sobrenome</Text>
              <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
            </View>
          </View>

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.saveButton} activeOpacity={0.85} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar alterações</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dangerCard}>
          <Text style={styles.dangerTitle}>Excluir conta</Text>
          <Text style={styles.dangerDescription}>
            Essa ação apaga permanentemente sua conta e todos os seus dados. Não pode ser desfeita.
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            activeOpacity={0.85}
            onPress={() => setDeleteModalVisible(true)}
          >
            <Text style={styles.deleteButtonText}>Excluir minha conta</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 8,
    paddingBottom: 32,
    gap: 20,
  },
  avatarWrapper: {
    alignItems: "center",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 26,
  },
  formCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLarge,
    padding: 20,
    ...SHADOW,
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
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusMedium,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    marginBottom: 18,
    color: COLORS.textDark,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusPill,
    paddingVertical: 15,
    alignItems: "center",
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
  },
  dangerCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLarge,
    padding: 20,
    ...SHADOW,
  },
  dangerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#C0392B",
    marginBottom: 6,
  },
  dangerDescription: {
    fontSize: 13,
    color: COLORS.textGray,
    lineHeight: 18,
    marginBottom: 16,
  },
  deleteButton: {
    borderRadius: SIZES.radiusPill,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1.2,
    borderColor: "#C0392B",
  },
  deleteButtonText: {
    color: "#C0392B",
    fontSize: 14,
    fontWeight: "700",
  },
});
