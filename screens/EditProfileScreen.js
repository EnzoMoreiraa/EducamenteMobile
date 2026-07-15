import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { ScreenHeader } from "../components/Headers";
import ConfirmModal from "../components/ConfirmModal";
import { COLORS, SIZES, SHADOW } from "../styles/theme";

export default function EditProfileScreen({ navigation }) {
  // Dados pré-carregados do usuário — viriam do back-end (GET /alunos/:id) futuramente
  const [name, setName] = useState("Enzo");
  const [lastName, setLastName] = useState("Moreira");
  const [email, setEmail] = useState("enzo.moreira@aluno.senac.br");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleSave = () => {
    // futuramente: PUT /alunos/:id no back-end
    navigation.goBack();
  };

  const handleDeleteConfirm = () => {
    // futuramente: DELETE /alunos/:id no back-end
    setDeleteModalVisible(false);
    navigation.reset({ index: 0, routes: [{ name: "Splash" }] });
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
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        destructive
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModalVisible(false)}
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
