import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../components/Headers";
import FloatingHomeButton, { TRIGGER_HEIGHT } from "../components/FloatingHomeButton";
import { HistoryIcon } from "../components/IconSet";
import { getCheckins, HUMORES } from "../services/checkins";
import { formatarDataLonga } from "../utils/datas";
import { COLORS, SIZES, SPACING, SHADOW } from "../styles/theme";

export default function CheckinHistoryScreen({ navigation }) {
  const [historico] = useState(getCheckins);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenHeader title="Histórico de Check-in" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.introCard}>
          <HistoryIcon size={22} color={COLORS.primary} filled />
          <Text style={styles.introText}>
            Olhar seus registros ao longo dos dias ajuda a perceber padrões que passam
            despercebidos no dia a dia.
          </Text>
        </View>

        {historico.map((item) => {
          const humor = HUMORES[item.humor];
          return (
            <View key={item.id} style={styles.historyCard}>
              <View style={[styles.moodDot, { backgroundColor: humor.color }]} />
              <View style={styles.historyTextBlock}>
                <Text style={styles.historyLabel}>{humor.label}</Text>
                <Text style={styles.historyDate}>{formatarDataLonga(item.data)}</Text>
              </View>
            </View>
          );
        })}
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
    gap: SPACING.sm,
  },
  introCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.primarySoft,
    borderRadius: SIZES.radiusMedium,
    padding: SPACING.md,
    marginBottom: SPACING.xxs,
  },
  introText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textBrown,
  },
  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    padding: SPACING.md,
    ...SHADOW,
  },
  moodDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: SPACING.sm + 2,
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
