import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../components/Headers";
import BottomTabBarEducador, { TAB_BAR_HEIGHT } from "../components/BottomTabBarEducador";
import FloatingHomeButton from "../components/FloatingHomeButton";
import { AgendaIcon, AlertIcon, HistoryIcon } from "../components/IconSet";
import { alunoPrecisaAtencao, getAlunoById, humorInfo } from "../data/turmasData";
import { COLORS, SIZES, SPACING, SHADOW } from "../styles/theme";

const STATUS_LABEL = {
  pendente: { label: "Pendente", color: COLORS.warning, tint: COLORS.warningSoft },
  confirmado: { label: "Confirmado", color: COLORS.success, tint: COLORS.primarySoft },
  recusado: { label: "Recusado", color: COLORS.danger, tint: COLORS.dangerSoft },
};

// Ficha do aluno: identificação, histórico de check-ins e agendamentos
export default function AlunoDetalheScreen({ navigation, route }) {
  const aluno = getAlunoById(route?.params?.alunoId);

  if (!aluno) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScreenHeader title="Aluno" onBack={() => navigation.goBack()} />
        <Text style={styles.vazio}>Aluno não encontrado.</Text>
        <BottomTabBarEducador navigation={navigation} active="TurmasList" />
      </SafeAreaView>
    );
  }

  const atencao = alunoPrecisaAtencao(aluno);
  const nomeCompleto = `${aluno.nome} ${aluno.sobrenome}`;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Ficha do aluno" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.perfilCard}>
          <View style={[styles.avatar, atencao && styles.avatarAtencao]}>
            <Text style={styles.avatarLetter}>{aluno.nome.charAt(0)}</Text>
          </View>
          <Text style={styles.nome}>{nomeCompleto}</Text>
          <Text style={styles.email}>{aluno.email}</Text>

          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{aluno.turma.nome}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{aluno.anoEscolar}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{aluno.faixaEtaria}</Text>
            </View>
          </View>
        </View>

        {atencao ? (
          <View style={styles.alertaCard}>
            <AlertIcon size={20} color={COLORS.danger} filled />
            <Text style={styles.alertaText}>
              Os últimos check-ins indicam humor de atenção. Vale procurar {aluno.nome} para uma
              conversa.
            </Text>
          </View>
        ) : null}

        <SectionTitle Icon={HistoryIcon} label="Histórico de check-ins" />
        <View style={styles.card}>
          {aluno.historico.map((registro, index) => {
            const humor = humorInfo(registro.humor);
            return (
              <View
                key={registro.id}
                style={[styles.row, index < aluno.historico.length - 1 && styles.rowDivider]}
              >
                <View style={[styles.humorDot, { backgroundColor: humor.color }]} />
                <View style={styles.rowTextBlock}>
                  <Text style={styles.rowTitle}>{humor.label}</Text>
                  <Text style={styles.rowMeta}>{registro.data}</Text>
                  {registro.nota ? <Text style={styles.rowNota}>“{registro.nota}”</Text> : null}
                </View>
              </View>
            );
          })}
        </View>

        <SectionTitle Icon={AgendaIcon} label="Agendamentos" />
        <View style={styles.card}>
          {aluno.agendamentos.length === 0 ? (
            <Text style={styles.semRegistro}>Nenhuma conversa agendada.</Text>
          ) : (
            aluno.agendamentos.map((agendamento, index) => {
              const status = STATUS_LABEL[agendamento.status] ?? STATUS_LABEL.pendente;
              return (
                <View
                  key={agendamento.id}
                  style={[styles.row, index < aluno.agendamentos.length - 1 && styles.rowDivider]}
                >
                  <View style={styles.rowTextBlock}>
                    <Text style={styles.rowTitle}>{agendamento.motivo}</Text>
                    <Text style={styles.rowMeta}>
                      {agendamento.data} às {agendamento.hora}
                    </Text>
                  </View>
                  <View style={[styles.statusChip, { backgroundColor: status.tint }]}>
                    <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
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

function SectionTitle({ Icon, label }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Icon size={18} color={COLORS.primary} filled />
      <Text style={styles.sectionTitle}>{label}</Text>
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
    paddingBottom: SPACING.xxl,
    gap: SPACING.md,
  },
  vazio: {
    textAlign: "center",
    color: COLORS.textGray,
    marginTop: SPACING.xxl,
  },
  perfilCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLarge,
    padding: SPACING.lg,
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
  avatarAtencao: {
    backgroundColor: COLORS.danger,
  },
  avatarLetter: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 24,
  },
  nome: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textDark,
    textAlign: "center",
  },
  email: {
    fontSize: 13,
    color: COLORS.textGray,
    marginTop: 2,
    textAlign: "center",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: SPACING.xs,
    marginTop: SPACING.sm,
  },
  tag: {
    backgroundColor: COLORS.primarySoft,
    borderRadius: SIZES.radiusPill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 5,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
  },
  alertaCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.dangerSoft,
    borderRadius: SIZES.radiusMedium,
    padding: SPACING.md,
  },
  alertaText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textDark,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.textBrown,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    paddingHorizontal: SPACING.md,
    ...SHADOW,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  humorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  rowTextBlock: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  rowMeta: {
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 2,
  },
  rowNota: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textBrown,
    marginTop: SPACING.xxs + 2,
    fontStyle: "italic",
  },
  statusChip: {
    borderRadius: SIZES.radiusPill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
  },
  semRegistro: {
    fontSize: 13,
    color: COLORS.textGray,
    paddingVertical: SPACING.md,
  },
});
