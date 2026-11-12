import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../components/Headers";
import BottomTabBarEducador, { TAB_BAR_HEIGHT } from "../components/BottomTabBarEducador";
import FloatingHomeButton from "../components/FloatingHomeButton";
import PressableScale from "../components/PressableScale";
import { ChevronRightIcon, TurmasIcon } from "../components/IconSet";
import { TURMAS, contarPendentes } from "../data/turmasData";
import { COLORS, SIZES, SPACING, SHADOW } from "../styles/theme";

// Lista de turmas com o selo de pendências (alunos em humor de atenção +
// agendamentos aguardando resposta)
export default function TurmasListScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Turmas" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {TURMAS.map((turma) => {
          const pendentes = contarPendentes(turma);

          return (
            <PressableScale
              key={turma.id}
              style={styles.card}
              onPress={() => navigation.navigate("TurmaDetalhe", { turmaId: turma.id })}
              accessibilityRole="button"
              accessibilityLabel={turma.nome}
            >
              <View style={styles.icon}>
                <TurmasIcon size={22} color={COLORS.primary} filled />
              </View>

              <View style={styles.textBlock}>
                <Text style={styles.nome}>{turma.nome}</Text>
                <Text style={styles.meta}>
                  {turma.alunos.length} alunos · {turma.turno}
                </Text>
              </View>

              {pendentes > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{pendentes}</Text>
                </View>
              ) : null}

              <ChevronRightIcon size={20} color={COLORS.textGray} />
            </PressableScale>
          );
        })}

        <Text style={styles.legenda}>
          O número em vermelho soma os alunos que registraram humor de atenção nos últimos dias
          e os agendamentos que ainda aguardam resposta da equipe.
        </Text>
      </ScrollView>

      <FloatingHomeButton
        navigation={navigation}
        bottomOffset={TAB_BAR_HEIGHT}
        homeRoute="HomeEducador"
      />
      <BottomTabBarEducador navigation={navigation} active="TurmasList" />
    </SafeAreaView>
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
    paddingBottom: SPACING.xxl,
    gap: SPACING.sm,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    padding: SPACING.md,
    ...SHADOW,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  textBlock: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textDark,
  },
  meta: {
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 2,
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
  legenda: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textGray,
    marginTop: SPACING.xs,
  },
});
