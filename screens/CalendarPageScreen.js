import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { ScreenHeader } from "../components/Headers";
import BottomTabBar from "../components/BottomTabBar";
import { COLORS, SIZES, SHADOW } from "../styles/theme";

const WEEK_DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

// Dados de exemplo — virão da entidade "Agendamento" no back-end (relacionada a Aluno + Pedagogo)
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

// Dias do mês com indicadores de quantidade de agendamentos (bolinhas), como no print
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

export default function CalendarPageScreen({ navigation }) {
  const [monthIndex, setMonthIndex] = useState(4); // Maio
  const [selectedDay, setSelectedDay] = useState(2);

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  // Layout fixo de exemplo replicando o print (Maio/2026 começando na quarta)
  const calendarGrid = [
    [31, 30, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 1, 2],
  ];
  const fadedDays = [31, 30, 1, 2]; // dias do mês anterior/seguinte exibidos em cinza

  return (
    <View style={styles.container}>
      <ScreenHeader title="Agendar conversa" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.calendarCard}>
          <View style={styles.monthHeader}>
            <TouchableOpacity
              style={styles.monthArrowButton}
              onPress={() => setMonthIndex((m) => Math.max(0, m - 1))}
            >
              <Text style={styles.monthArrowText}>{"\u2039"}</Text>
            </TouchableOpacity>
            <View style={styles.monthLabelBlock}>
              <Text style={styles.monthLabel}>{monthNames[monthIndex]}</Text>
              <Text style={styles.yearLabel}>2026</Text>
            </View>
            <TouchableOpacity
              style={styles.monthArrowButton}
              onPress={() => setMonthIndex((m) => Math.min(11, m + 1))}
            >
              <Text style={styles.monthArrowText}>{"\u203a"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysRow}>
            {WEEK_DAYS.map((day) => (
              <Text key={day} style={styles.weekDayLabel}>{day}</Text>
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
                  <TouchableOpacity
                    key={`${weekIndex}-${dayIndex}`}
                    style={styles.dayCell}
                    disabled={isFaded}
                    onPress={() => setSelectedDay(day)}
                  >
                    <View style={[styles.dayNumberWrapper, isSelected && styles.dayNumberSelected]}>
                      <Text style={[styles.dayNumber, isFaded && styles.dayNumberFaded, isSelected && styles.dayNumberTextSelected]}>
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
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <View style={styles.appointmentsList}>
          {APPOINTMENTS.map((item) => (
            <View key={item.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeaderRow}>
                <View style={[styles.appointmentDot, { backgroundColor: item.color }]} />
                <Text style={styles.appointmentTime}>{item.time}</Text>
                <Text style={styles.appointmentMore}>•••</Text>
              </View>
              <Text style={styles.appointmentTitle}>{item.title}</Text>
              <Text style={styles.appointmentSubtitle}>
                {item.subtitle}{" "}
                {item.subtitle.endsWith("...") && (
                  <Text style={styles.viewMore}>View more</Text>
                )}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("SchedulePage")}
      >
        <Text style={styles.fabPlus}>+</Text>
      </TouchableOpacity>

      <BottomTabBar navigation={navigation} active="Calendar" />
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
  },
  calendarCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    padding: 16,
    ...SHADOW,
    marginBottom: 20,
  },
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  monthArrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  monthArrowText: {
    fontSize: 16,
    color: COLORS.textDark,
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
    marginBottom: 6,
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
    alignItems: "center",
    paddingVertical: 4,
  },
  dayNumberWrapper: {
    width: 26,
    height: 26,
    borderRadius: 13,
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
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
  appointmentsList: {
    gap: 14,
  },
  appointmentCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    padding: 16,
    ...SHADOW,
  },
  appointmentHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  appointmentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  appointmentTime: {
    fontSize: 12,
    color: COLORS.textGray,
    flex: 1,
  },
  appointmentMore: {
    fontSize: 14,
    color: COLORS.textGray,
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
  viewMore: {
    color: COLORS.accent,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    bottom: 90,
    alignSelf: "center",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOW,
  },
  fabPlus: {
    fontSize: 28,
    color: COLORS.white,
    fontWeight: "300",
  },
});
