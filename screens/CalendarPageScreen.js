import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../components/Headers";
import BottomTabBar, { TAB_BAR_HEIGHT } from "../components/BottomTabBar";
import FloatingHomeButton from "../components/FloatingHomeButton";
import PressableScale from "../components/PressableScale";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "../components/IconSet";
import { formatarDataCurta, MESES } from "../utils/datas";
import { COLORS, SIZES, SPACING, TOUCH, SHADOW, SHADOW_FLOATING } from "../styles/theme";

const WEEK_DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const APPOINTMENTS = [
  {
    id: "1",
    color: COLORS.primary,
    day: 2,
    time: "Qui., 2 de Maio, 9:00",
    title: "Conversa com a equipe pedagógica",
    subtitle: "Definir assunto (Opcional)",
  },
  {
    id: "2",
    color: COLORS.moodVeryBad,
    day: 24,
    time: "Sex., 24 de Maio, 11:00",
    title: "Conversa com a professora Rafaela",
    subtitle: "Ajuda na escrita do referencial teórico...",
  },
];

const DAYS_WITH_DOTS = {
  3: 2,
  8: 1,
  10: 3,
  15: 2,
  17: 1,
  22: 3,
  23: 1,
  29: 3,
  31: 3,
};

export default function CalendarPageScreen({ navigation, route }) {
  const [monthIndex, setMonthIndex] = useState(4);
  const [selectedDay, setSelectedDay] = useState(2);
  const [extras, setExtras] = useState([]);

  const novoAgendamento = route?.params?.novoAgendamento;
  useEffect(() => {
    if (!novoAgendamento) return;
    setExtras((atuais) =>
      atuais.some((item) => item.id === novoAgendamento.id)
        ? atuais
        : [...atuais, novoAgendamento]
    );
    setMonthIndex(novoAgendamento.mes);
    setSelectedDay(novoAgendamento.dia);
    navigation.setParams({ novoAgendamento: undefined });
  }, [novoAgendamento, navigation]);

  const agendamentos = [
    ...APPOINTMENTS,
    ...extras.map((item) => ({
      id: item.id,
      color: COLORS.primary,
      time: `${formatarDataCurta(new Date(item.dataISO))}${item.hora ? `, ${item.hora}` : ""}`,
      title: item.titulo,
      subtitle:
        item.assunto || (item.professor ? `Com ${item.professor}` : "Assunto a definir"),
    })),
  ];

  const calendarGrid = [
    [31, 30, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 1, 2],
  ];
  const fadedDays = [31, 30, 1, 2];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Agendar conversa" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.calendarCard}>
          <View style={styles.monthHeader}>
            <PressableScale
              style={styles.monthArrowButton}
              onPress={() => setMonthIndex((m) => Math.max(0, m - 1))}
              accessibilityRole="button"
              accessibilityLabel="Mês anterior"
            >
              <ChevronLeftIcon size={18} color={COLORS.textDark} />
            </PressableScale>

            <View style={styles.monthLabelBlock}>
              <Text style={styles.monthLabel}>{MESES[monthIndex]}</Text>
              <Text style={styles.yearLabel}>2026</Text>
            </View>

            <PressableScale
              style={styles.monthArrowButton}
              onPress={() => setMonthIndex((m) => Math.min(11, m + 1))}
              accessibilityRole="button"
              accessibilityLabel="Próximo mês"
            >
              <ChevronRightIcon size={18} color={COLORS.textDark} />
            </PressableScale>
          </View>

          <View style={styles.weekDaysRow}>
            {WEEK_DAYS.map((day) => (
              <Text key={day} style={styles.weekDayLabel}>
                {day}
              </Text>
            ))}
          </View>

          {calendarGrid.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.weekRow}>
              {week.map((day, dayIndex) => {
                const isFaded =
                  (weekIndex === 0 && fadedDays.includes(day) && dayIndex < 4) ||
                  (weekIndex === calendarGrid.length - 1 && (dayIndex === 5 || dayIndex === 6));
                const isSelected = !isFaded && day === selectedDay;
                const dots = !isFaded ? DAYS_WITH_DOTS[day] : null;

                return (
                  <PressableScale
                    key={`${weekIndex}-${dayIndex}`}
                    style={styles.dayCell}
                    disabled={isFaded}
                    onPress={() => setSelectedDay(day)}
                    accessibilityRole="button"
                    accessibilityLabel={`Dia ${day}`}
                  >
                    <View style={[styles.dayNumberWrapper, isSelected && styles.dayNumberSelected]}>
                      <Text
                        style={[
                          styles.dayNumber,
                          isFaded && styles.dayNumberFaded,
                          isSelected && styles.dayNumberTextSelected,
                        ]}
                      >
                        {day}
                      </Text>
                    </View>
                    {dots ? (
                      <View style={styles.dotsRow}>
                        {Array.from({ length: dots }).map((_, i) => (
                          <View key={i} style={styles.dot} />
                        ))}
                      </View>
                    ) : null}
                  </PressableScale>
                );
              })}
            </View>
          ))}
        </View>

        <View style={styles.appointmentsList}>
          {agendamentos.map((item) => (
            <View key={item.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeaderRow}>
                <View style={[styles.appointmentDot, { backgroundColor: item.color }]} />
                <Text style={styles.appointmentTime}>{item.time}</Text>
              </View>
              <Text style={styles.appointmentTitle}>{item.title}</Text>
              <Text style={styles.appointmentSubtitle}>{item.subtitle}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <FloatingHomeButton navigation={navigation} bottomOffset={TAB_BAR_HEIGHT} />

      <PressableScale
        style={styles.fab}
        onPress={() => navigation.navigate("SchedulePage")}
        accessibilityRole="button"
        accessibilityLabel="Agendar nova conversa"
      >
        <PlusIcon size={26} color={COLORS.white} />
      </PressableScale>
      <BottomTabBar navigation={navigation} active="Calendar" />
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
  },
  calendarCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    padding: SPACING.md,
    ...SHADOW,
    marginBottom: SPACING.lg,
  },
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },
  monthArrowButton: {
    width: TOUCH.min,
    height: TOUCH.min,
    borderRadius: TOUCH.min / 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  monthLabelBlock: {
    alignItems: "center",
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  yearLabel: {
    fontSize: 11,
    color: COLORS.textGray,
  },
  weekDaysRow: {
    flexDirection: "row",
    marginBottom: SPACING.xxs + 2,
  },
  weekDayLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 11,
    color: COLORS.textGray,
  },
  weekRow: {
    flexDirection: "row",
  },
  dayCell: {
    flex: 1,
    minHeight: TOUCH.min,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xxs,
  },
  dayNumberWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  dayNumberSelected: {
    backgroundColor: COLORS.accent,
  },
  dayNumber: {
    fontSize: 13,
    color: COLORS.textDark,
  },
  dayNumberFaded: {
    color: "#C9C5BF",
  },
  dayNumberTextSelected: {
    color: COLORS.white,
    fontWeight: "700",
  },
  dotsRow: {
    flexDirection: "row",
    marginTop: 2,
    gap: 2,
    height: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
  appointmentsList: {
    gap: SPACING.sm + 2,
  },
  appointmentCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    padding: SPACING.md,
    ...SHADOW,
  },
  appointmentHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xxs + 2,
  },
  appointmentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.xs,
  },
  appointmentTime: {
    fontSize: 12,
    color: COLORS.textGray,
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 2,
  },
  appointmentSubtitle: {
    fontSize: 13,
    color: COLORS.textGray,
  },
  fab: {
    position: "absolute",
    right: SIZES.paddingScreen,
    bottom: TAB_BAR_HEIGHT + SPACING.md,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOW_FLOATING,
  },
});
