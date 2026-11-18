import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../components/Headers";
import BottomTabBarEducador, { TAB_BAR_HEIGHT } from "../components/BottomTabBarEducador";
import FloatingHomeButton from "../components/FloatingHomeButton";
import PressableScale from "../components/PressableScale";
import Toast from "../components/Toast";
import { CheckIcon, ClockIcon, CloseIcon } from "../components/IconSet";
import { getAgendamentos } from "../data/turmasData";
import { COLORS, SIZES, SPACING, TOUCH, SHADOW } from "../styles/theme";

const STATUS = {
  pendente: { label: "Aguardando resposta", color: COLORS.warning, tint: COLORS.warningSoft },
  confirmado: { label: "Confirmado", color: COLORS.success, tint: COLORS.primarySoft },
  recusado: { label: "Recusado", color: COLORS.danger, tint: COLORS.dangerSoft },
};

export default function AgendamentosEducadorScreen({ navigation }) {
  const [agendamentos, setAgendamentos] = useState(() => getAgendamentos());
  const [toast, setToast] = useState("");

  const responder = (id, novoStatus) => {
    setAgendamentos((atuais) =>
      atuais.map((item) => (item.id === id ? { ...item, status: novoStatus } : item))
    );
    setToast(novoStatus === "confirmado" ? "Agendamento confirmado" : "Agendamento recusado");
  };

  const pendentes = agendamentos.filter((item) => item.status === "pendente");
  const respondidos = agendamentos.filter((item) => item.status !== "pendente");

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Agendamentos" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>
          Aguardando resposta ({pendentes.length})
        </Text>

        {pendentes.length === 0 ? (
          <Text style={styles.vazio}>Nenhum agendamento aguardando resposta.</Text>
        ) : (
          pendentes.map((item) => (
            <Card key={item.id} agendamento={item} onResponder={responder} />
          ))
        )}

        <Text style={styles.sectionTitle}>Já respondidos</Text>
        {respondidos.length === 0 ? (
          <Text style={styles.vazio}>Nada por aqui ainda.</Text>
        ) : (
          respondidos.map((item) => (
            <Card key={item.id} agendamento={item} onResponder={responder} />
          ))
        )}
      </ScrollView>

      <Toast
        visible={toast !== ""}
        message={toast}
        onHide={() => setToast("")}
        bottomOffset={TAB_BAR_HEIGHT + SPACING.md}
      />

      <FloatingHomeButton
        navigation={navigation}
        bottomOffset={TAB_BAR_HEIGHT}
        homeRoute="HomeEducador"
      />
      <BottomTabBarEducador navigation={navigation} active="AgendamentosEducador" />
    </SafeAreaView>
  );
}

function Card({ agendamento, onResponder }) {
  const status = STATUS[agendamento.status] ?? STATUS.pendente;
  const isPendente = agendamento.status === "pendente";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLetter}>{agendamento.alunoNome.charAt(0)}</Text>
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.alunoNome}>{agendamento.alunoNome}</Text>
          <Text style={styles.turma}>{agendamento.turmaNome}</Text>
        </View>
        <View style={[styles.statusChip, { backgroundColor: status.tint }]}>
          <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>

      <Text style={styles.motivo}>{agendamento.motivo}</Text>

      <View style={styles.horarioRow}>
        <ClockIcon size={16} color={COLORS.textGray} />
        <Text style={styles.horario}>
          {agendamento.data} às {agendamento.hora}
        </Text>
      </View>

      {isPendente ? (
        <View style={styles.actions}>
          <PressableScale
            style={styles.recusarButton}
            onPress={() => onResponder(agendamento.id, "recusado")}
            accessibilityRole="button"
            accessibilityLabel="Recusar agendamento"
          >
            <CloseIcon size={16} color={COLORS.danger} />
            <Text style={styles.recusarText}>Recusar</Text>
          </PressableScale>

          <PressableScale
            style={styles.confirmarButton}
            onPress={() => onResponder(agendamento.id, "confirmado")}
            accessibilityRole="button"
            accessibilityLabel="Confirmar agendamento"
          >
            <CheckIcon size={16} color={COLORS.white} />
            <Text style={styles.confirmarText}>Confirmar</Text>
          </PressableScale>
        </View>
      ) : null}
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
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.textBrown,
    marginTop: SPACING.xs,
  },
  vazio: {
    fontSize: 13,
    color: COLORS.textGray,
    paddingVertical: SPACING.xs,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    padding: SPACING.md,
    ...SHADOW,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
  cardHeaderText: {
    flex: 1,
  },
  alunoNome: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  turma: {
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 1,
  },
  statusChip: {
    borderRadius: SIZES.radiusPill,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 5,
    maxWidth: 120,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "800",
    textAlign: "center",
  },
  motivo: {
    fontSize: 14,
    color: COLORS.textDark,
    marginTop: SPACING.sm,
    lineHeight: 20,
  },
  horarioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xxs + 2,
    marginTop: SPACING.xs,
  },
  horario: {
    fontSize: 12,
    color: COLORS.textGray,
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  recusarButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xxs + 2,
    minHeight: TOUCH.min,
    borderRadius: SIZES.radiusPill,
    borderWidth: 1.2,
    borderColor: COLORS.danger,
  },
  recusarText: {
    color: COLORS.danger,
    fontWeight: "700",
    fontSize: 14,
  },
  confirmarButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xxs + 2,
    minHeight: TOUCH.min,
    borderRadius: SIZES.radiusPill,
    backgroundColor: COLORS.primary,
  },
  confirmarText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },
});
