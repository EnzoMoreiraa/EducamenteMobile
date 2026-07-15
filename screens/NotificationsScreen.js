import { useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { ScreenHeader } from "../components/Headers";
import { COLORS, SIZES, SHADOW } from "../styles/theme";

// Preferências de notificação — futuramente persistidas no back-end (RF09)
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
    <View style={styles.container}>
      <ScreenHeader title="Notificações" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.card}>
          {PREFERENCES_CONFIG.map((item, index) => (
            <View
              key={item.key}
              style={[
                styles.row,
                index < PREFERENCES_CONFIG.length - 1 && styles.rowDivider,
              ]}
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
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: 8,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLarge,
    ...SHADOW,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  rowTextBlock: {
    flex: 1,
    marginRight: 12,
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
