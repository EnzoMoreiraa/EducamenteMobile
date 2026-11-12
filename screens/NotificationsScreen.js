import { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../components/Headers";
import FloatingHomeButton, { TRIGGER_HEIGHT } from "../components/FloatingHomeButton";
import { BellIcon } from "../components/IconSet";
import { COLORS, SIZES, SPACING, TOUCH, SHADOW } from "../styles/theme";

// Preferências de notificação — futuramente persistidas na tabela
// Preferencia_Notificacao do back-end (RF09)
const PREFERENCES_CONFIG = [
  {
    key: "checkinReminder",
    label: "Lembrete diário de Check-in",
    description: "Um alerta para registrar seu humor todos os dias",
  },
  {
    key: "messages",
    label: "Novas mensagens",
    description: "Respostas da coordenação nos seus canais de mensagem",
  },
  {
    key: "appointments",
    label: "Agendamentos",
    description: "Confirmações e lembretes de conversas marcadas",
  },
  {
    key: "content",
    label: "Novos conteúdos",
    description: "Avisos sobre novos materiais de Autocuidado",
  },
];

export default function NotificationsScreen({ navigation }) {
  const [preferences, setPreferences] = useState({
    checkinReminder: true,
    messages: true,
    appointments: true,
    content: false,
  });

  const toggle = (key) => setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenHeader title="Notificações" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.introCard}>
          <BellIcon size={22} color={COLORS.primary} filled />
          <Text style={styles.introText}>
            Escolha o que faz sentido pra você. Dá pra mudar essas opções quando quiser.
          </Text>
        </View>

        <View style={styles.card}>
          {PREFERENCES_CONFIG.map((item, index) => (
            <View
              key={item.key}
              style={[styles.row, index < PREFERENCES_CONFIG.length - 1 && styles.rowDivider]}
            >
              <View style={styles.rowTextBlock}>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={styles.rowDescription}>{item.description}</Text>
              </View>
              <Switch
                value={preferences[item.key]}
                onValueChange={() => toggle(item.key)}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.white}
                accessibilityLabel={item.label}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <FloatingHomeButton navigation={navigation} />
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
    paddingBottom: SPACING.xxl + TRIGGER_HEIGHT,
    gap: SPACING.md,
  },
  introCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.primarySoft,
    borderRadius: SIZES.radiusMedium,
    padding: SPACING.md,
  },
  introText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textBrown,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLarge,
    ...SHADOW,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: TOUCH.min + 16,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  rowTextBlock: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  rowDescription: {
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 2,
  },
});
