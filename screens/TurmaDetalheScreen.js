import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../components/Headers";
import BottomTabBarEducador, { TAB_BAR_HEIGHT } from "../components/BottomTabBarEducador";
import FloatingHomeButton from "../components/FloatingHomeButton";
import PressableScale from "../components/PressableScale";
import { AlertIcon, ChevronRightIcon } from "../components/IconSet";
import { alunoPrecisaAtencao, getTurmaById, humorInfo } from "../data/turmasData";
import { COLORS, SIZES, SPACING, SHADOW } from "../styles/theme";

export default function TurmaDetalheScreen({ navigation, route }) {
  const turma = getTurmaById(route?.params?.turmaId);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title={turma.nome} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          {turma.curso} · {turma.turno} · {turma.alunos.length} alunos
        </Text>

        {turma.alunos.map((aluno) => {
          const humor = humorInfo(aluno.ultimoCheckin?.humor);
          const atencao = alunoPrecisaAtencao(aluno);

          return (
            <PressableScale
              key={aluno.id}
              style={styles.card}
              onPress={() => navigation.navigate("AlunoDetalhe", { alunoId: aluno.id })}
              accessibilityRole="button"
              accessibilityLabel={`${aluno.nome} ${aluno.sobrenome}`}
            >
              <View style={[styles.avatar, atencao && styles.avatarAtencao]}>
                <Text style={styles.avatarLetter}>{aluno.nome.charAt(0)}</Text>
              </View>

              <View style={styles.textBlock}>
                <Text style={styles.nome}>
                  {aluno.nome} {aluno.sobrenome}
                </Text>
                <View style={styles.humorRow}>
                  <View style={[styles.humorDot, { backgroundColor: humor.color }]} />
                  <Text style={styles.humorLabel}>{humor.label}</Text>
                  <Text style={styles.humorData}>· {aluno.ultimoCheckin?.data}</Text>
                </View>
              </View>

              {atencao ? <AlertIcon size={20} color={COLORS.danger} filled /> : null}
              <ChevronRightIcon size={20} color={COLORS.textGray} />
            </PressableScale>
          );
        })}
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
  subtitle: {
    fontSize: 13,
    color: COLORS.textGray,
    marginBottom: SPACING.xxs,
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
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarAtencao: {
    backgroundColor: COLORS.danger,
  },
  avatarLetter: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 17,
  },
  textBlock: {
    flex: 1,
  },
  nome: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  humorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xxs + 2,
    marginTop: 3,
  },
  humorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  humorLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  humorData: {
    fontSize: 12,
    color: COLORS.textGray,
  },
});
