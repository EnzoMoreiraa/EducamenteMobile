import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Switch } from "react-native";
import { COLORS, SIZES, SHADOW } from "../styles/theme";

export default function SchedulePageScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [remindMe, setRemindMe] = useState(false);

  return (
    <View style={styles.overlay}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.sheet}>
        <Text style={styles.title}>Agende uma conversa</Text>

        <TextInput
          style={styles.input}
          placeholder="Insira um título"
          placeholderTextColor={COLORS.placeholder}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Adicionar um professor (Opcional)"
          placeholderTextColor={COLORS.placeholder}
          value={teacher}
          onChangeText={setTeacher}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escrever o assunto (Opcional)"
          placeholderTextColor={COLORS.placeholder}
          value={subject}
          onChangeText={setSubject}
          multiline
          numberOfLines={4}
        />

        <View style={styles.dateInputWrapper}>
          <TextInput
            style={styles.dateInput}
            placeholder="Data"
            placeholderTextColor={COLORS.placeholder}
            value={date}
            onChangeText={setDate}
          />
          <Text style={styles.calendarGlyph}>📅</Text>
        </View>

        <View style={styles.remindRow}>
          <Text style={styles.remindLabel}>Lembre-me</Text>
          <Switch
            value={remindMe}
            onValueChange={setRemindMe}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.scheduleButton}
          onPress={() => navigation.navigate("Calendar")}
        >
          <Text style={styles.scheduleButtonText}>Agendar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: SIZES.radiusLarge,
    borderTopRightRadius: SIZES.radiusLarge,
    padding: SIZES.paddingScreen,
    paddingBottom: 36,
    ...SHADOW,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 18,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusMedium,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 14,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  dateInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusMedium,
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  dateInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: COLORS.textDark,
  },
  calendarGlyph: {
    fontSize: 16,
  },
  remindRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  remindLabel: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: "600",
  },
  scheduleButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusPill,
    paddingVertical: 16,
    alignItems: "center",
  },
  scheduleButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
