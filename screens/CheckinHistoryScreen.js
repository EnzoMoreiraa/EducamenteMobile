import { StyleSheet, Text, View, ScrollView } from "react-native";
import { ScreenHeader } from "../components/Headers";
import { COLORS, SIZES, SHADOW } from "../styles/theme";

// Histórico mockado — futuramente virá da entidade Checkin_Emocional do back-end.
// Hoje o check-in é só a escala de humor; futuramente será um questionário completo (RF04).
const HISTORY = [
  { id: "1", date: "12 de Julho, 2026", label: "Me sinto bem", color: COLORS.moodHappy },
  { id: "2", date: "11 de Julho, 2026", label: "Me sinto neutro", color: COLORS.moodNeutral },
  { id: "3", date: "10 de Julho, 2026", label: "Me sinto mal", color: COLORS.moodSad },
  { id: "4", date: "9 de Julho, 2026", label: "Me sinto muito bem", color: COLORS.moodHappy },
  { id: "5", date: "8 de Julho, 2026", label: "Me sinto neutro", color: COLORS.moodNeutral },
  { id: "6", date: "7 de Julho, 2026", label: "Me sinto muito mal", color: COLORS.moodVeryBad },
];

export default function CheckinHistoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Histórico de Check-in" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {HISTORY.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <View style={[styles.moodDot, { backgroundColor: item.color }]} />
            <View style={styles.historyTextBlock}>
              <Text style={styles.historyLabel}>{item.label}</Text>
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
    paddingBottom: 24,
    gap: 12,
  },
  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    padding: 16,
    ...SHADOW,
  },
  moodDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 14,
  },
  historyTextBlock: {
    flex: 1,
  },
  historyLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  historyDate: {
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 2,
  },
});
