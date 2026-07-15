import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { ScreenHeader } from "../components/Headers";
import BottomTabBar from "../components/BottomTabBar";
import { COLORS, SIZES, SHADOW } from "../styles/theme";

// Dados do usuário logado — viriam do estado de autenticação/back-end futuramente
const user = {
  name: "Enzo Moreira",
  email: "enzo.moreira@aluno.senac.br",
  role: "Aluno",
};

const MENU_ITEMS = [
  {
    key: "EditProfile",
    label: "Editar perfil",
    description: "Nome, e-mail, senha e dados da conta",
  },
  {
    key: "CheckinHistory",
    label: "Histórico de Check-in",
    description: "Veja suas respostas anteriores",
  },
  {
    key: "Notifications",
    label: "Notificações",
    description: "Lembretes e alertas do app",
  },
];

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Perfil" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{user.name.charAt(0)}</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>{user.role}</Text>
          </View>
        </View>

        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.menuRow,
                index < MENU_ITEMS.length - 1 && styles.menuRowDivider,
              ]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(item.key)}
            >
              <View style={styles.menuTextBlock}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              <Text style={styles.chevron}>{"›"}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: "Splash" }] })}
        >
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomTabBar navigation={navigation} active="Profile" />
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
    paddingBottom: 16,
    gap: 20,
  },
  summaryCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLarge,
    paddingVertical: 28,
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
    marginBottom: 12,
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
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.textGray,
    marginTop: 2,
  },
  roleBadge: {
    marginTop: 12,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusPill,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
  },
  menuCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLarge,
    ...SHADOW,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
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
  chevron: {
    fontSize: 22,
    color: COLORS.textGray,
    marginLeft: 8,
  },
  logoutButton: {
    alignItems: "center",
    paddingVertical: 14,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#C0392B",
  },
});
