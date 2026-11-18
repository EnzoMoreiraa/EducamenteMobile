import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTabBarEducador from "../components/BottomTabBarEducador";
import PressableScale from "../components/PressableScale";
import { AgendaIcon, MensagensIcon, SettingsIcon, TurmasIcon } from "../components/IconSet";
import {
  TURMAS,
  contarAgendamentosPendentes,
  contarAlunos,
  contarMensagensPendentes,
} from "../data/turmasData";
import { COLORS, SIZES, SPACING, SHADOW } from "../styles/theme";
import { getUsuarioLogado } from "../services/session";

export default function HomeEducadorScreen({ navigation }) {
  const usuario = getUsuarioLogado();
  const nome = usuario ? `${usuario.nome} ${usuario.sobrenome ?? ""}`.trim() : "Equipe pedagógica";

  const mensagensPendentes = contarMensagensPendentes();
  const agendamentosPendentes = contarAgendamentosPendentes();

  const atalhos = [
    {
      key: "TurmasList",
      label: "Turmas",
      description: `${TURMAS.length} turmas · ${contarAlunos()} alunos`,
      Icon: TurmasIcon,
      badge: 0,
    },
    {
      key: "AgendamentosEducador",
      label: "Agendamentos",
      description: "Conversas solicitadas",
      Icon: AgendaIcon,
      badge: agendamentosPendentes,
    },
    {
      key: "MensagensEducador",
      label: "Mensagens",
      description: "Canais anônimo e identificado",
      Icon: MensagensIcon,
      badge: mensagensPendentes,
    },
    {
      key: "Profile",
      label: "Configurações",
      description: "Seus dados e a conta",
      Icon: SettingsIcon,
      badge: 0,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.userName} numberOfLines={1}>
            {nome}
          </Text>
          <Text style={styles.subGreeting}>Veja como sua escola está hoje.</Text>

          <View style={styles.statsRow}>
            <Stat value={agendamentosPendentes} label="agendamentos aguardando" />
            <View style={styles.statDivider} />
            <Stat value={mensagensPendentes} label="mensagens não lidas" />
          </View>
        </View>

        <View style={styles.grid}>
          {atalhos.map(({ key, label, description, Icon, badge }) => (
            <PressableScale
              key={key}
              style={styles.gridCard}
              onPress={() => navigation.navigate(key)}
              accessibilityRole="button"
              accessibilityLabel={label}
            >
              <View style={styles.gridCardTop}>
                <View style={styles.gridIcon}>
                  <Icon size={24} color={COLORS.primary} filled />
                </View>
                {badge > 0 ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badge}</Text>
                  </View>
                ) : null}
              </View>
              <Text style={styles.gridLabel}>{label}</Text>
              <Text style={styles.gridDescription}>{description}</Text>
            </PressableScale>
          ))}
        </View>
      </ScrollView>

      <BottomTabBarEducador navigation={navigation} active="HomeEducador" />
    </SafeAreaView>
  );
}

function Stat({ value, label }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.lg,
  },
  header: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: SIZES.radiusLarge,
    borderBottomRightRadius: SIZES.radiusLarge,
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    overflow: "hidden",
  },
  greeting: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
  },
  userName: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.accent,
    letterSpacing: -0.3,
  },
  subGreeting: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: SIZES.radiusMedium,
    padding: SPACING.md,
    marginTop: SPACING.lg,
  },
  stat: {
    flex: 1,
  },
  statDivider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: "rgba(255,255,255,0.2)",
    marginHorizontal: SPACING.sm,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: SPACING.xl,
  },
  gridCard: {
    width: "48%",
    flexGrow: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    padding: SPACING.md,
    minHeight: 130,
    ...SHADOW,
  },
  gridCardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },
  gridIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 6,
    backgroundColor: COLORS.danger,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
  },
  gridLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textDark,
    letterSpacing: -0.2,
  },
  gridDescription: {
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 2,
    lineHeight: 16,
  },
});
