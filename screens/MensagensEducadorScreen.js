import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../components/Headers";
import BottomTabBarEducador, { TAB_BAR_HEIGHT } from "../components/BottomTabBarEducador";
import FloatingHomeButton from "../components/FloatingHomeButton";
import PressableScale from "../components/PressableScale";
import { MaskIcon, UserIcon } from "../components/IconSet";
import { MENSAGENS } from "../data/turmasData";
import { COLORS, SIZES, SPACING, TOUCH, SHADOW } from "../styles/theme";

const FILTROS = [
  { key: "todas", label: "Todas" },
  { key: "anonima", label: "Anônimas" },
  { key: "identificada", label: "Identificadas" },
];

const STATUS_LABEL = {
  pendente: { label: "Não lida", color: COLORS.danger, tint: COLORS.dangerSoft },
  lida: { label: "Lida", color: COLORS.textGray, tint: COLORS.background },
  em_analise: { label: "Em análise", color: COLORS.warning, tint: COLORS.warningSoft },
  respondida: { label: "Respondida", color: COLORS.success, tint: COLORS.primarySoft },
  resolvido: { label: "Resolvida", color: COLORS.success, tint: COLORS.primarySoft },
};

export default function MensagensEducadorScreen({ navigation }) {
  const [filtro, setFiltro] = useState("todas");

  const mensagens =
    filtro === "todas" ? MENSAGENS : MENSAGENS.filter((item) => item.tipo === filtro);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Mensagens" onBack={() => navigation.goBack()} />

      <View style={styles.filtrosRow}>
        {FILTROS.map((item) => (
          <PressableScale
            key={item.key}
            style={[styles.filtro, filtro === item.key && styles.filtroAtivo]}
            onPress={() => setFiltro(item.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: filtro === item.key }}
          >
            <Text style={[styles.filtroText, filtro === item.key && styles.filtroTextAtivo]}>
              {item.label}
            </Text>
          </PressableScale>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {mensagens.map((mensagem) => {
          const anonima = mensagem.tipo === "anonima";
          const status = STATUS_LABEL[mensagem.status] ?? STATUS_LABEL.pendente;
          const cor = anonima ? COLORS.anonimo : COLORS.primary;

          return (
            <View key={mensagem.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.icon,
                    { backgroundColor: anonima ? COLORS.anonimoSoft : COLORS.primarySoft },
                  ]}
                >
                  {anonima ? (
                    <MaskIcon size={22} color={cor} />
                  ) : (
                    <UserIcon size={22} color={cor} />
                  )}
                </View>

                <View style={styles.cardHeaderText}>
                  <Text style={[styles.autor, { color: cor }]}>
                    {anonima ? "Aluno Anônimo" : mensagem.alunoNome}
                  </Text>
                  <Text style={styles.meta}>
                    {mensagem.turma} · {mensagem.data} às {mensagem.hora}
                  </Text>
                </View>

                <View style={[styles.statusChip, { backgroundColor: status.tint }]}>
                  <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                </View>
              </View>

              {mensagem.titulo ? <Text style={styles.titulo}>{mensagem.titulo}</Text> : null}
              <Text style={styles.conteudo}>{mensagem.conteudo}</Text>

              {anonima ? (
                <Text style={styles.avisoAnonimo}>
                  Canal anônimo: não é possível identificar quem enviou nem responder
                  diretamente.
                </Text>
              ) : null}
            </View>
          );
        })}
      </ScrollView>

      <FloatingHomeButton
        navigation={navigation}
        bottomOffset={TAB_BAR_HEIGHT}
        homeRoute="HomeEducador"
      />
      <BottomTabBarEducador navigation={navigation} active="MensagensEducador" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  filtrosRow: {
    flexDirection: "row",
    gap: SPACING.xs,
    paddingHorizontal: SIZES.paddingScreen,
    paddingBottom: SPACING.sm,
  },
  filtro: {
    minHeight: TOUCH.min - 8,
    paddingHorizontal: SPACING.md,
    borderRadius: SIZES.radiusPill,
    backgroundColor: COLORS.cardBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  filtroAtivo: {
    backgroundColor: COLORS.primary,
  },
  filtroText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textGray,
  },
  filtroTextAtivo: {
    color: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: SIZES.paddingScreen,
    paddingBottom: SPACING.xxl,
    gap: SPACING.sm,
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
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeaderText: {
    flex: 1,
  },
  autor: {
    fontSize: 15,
    fontWeight: "800",
  },
  meta: {
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 1,
  },
  statusChip: {
    borderRadius: SIZES.radiusPill,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 5,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "800",
  },
  titulo: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textDark,
    marginTop: SPACING.sm,
  },
  conteudo: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textDark,
    marginTop: SPACING.xxs + 2,
  },
  avisoAnonimo: {
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.textGray,
    marginTop: SPACING.sm,
    fontStyle: "italic",
  },
});
