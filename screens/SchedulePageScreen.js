import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import PressableScale from "../components/PressableScale";
import { CalendarIcon } from "../components/IconSet";
import { formatarDataLonga, parseDataBR } from "../utils/datas";
import { COLORS, SIZES, SPACING, TOUCH, SHADOW } from "../styles/theme";

const IS_WEB = Platform.OS === "web";

export default function SchedulePageScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const [avoidKeyboard, setAvoidKeyboard] = useState(false);

  const sheetHeight = useRef(0);
  const fieldLayouts = useRef({});

  const registerLayout = (key) => (event) => {
    fieldLayouts.current[key] = event.nativeEvent.layout;
  };

  const handleFocus = (key) => () => {
    const layout = fieldLayouts.current[key];
    if (!layout) return;
    const centroNaTela = windowHeight - sheetHeight.current + layout.y + layout.height / 2;
    setAvoidKeyboard(centroNaTela > windowHeight / 2);
  };

  const [title, setTitle] = useState("");
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState(null);
  const [dateText, setDateText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [time, setTime] = useState("");
  const [remindMe, setRemindMe] = useState(false);
  const [erro, setErro] = useState("");

  const handleDateChange = (event, selecionada) => {
    if (Platform.OS !== "ios") setShowPicker(false);
    if (event?.type === "dismissed") return;
    if (selecionada) {
      setDate(selecionada);
      setErro("");
    }
  };

  const handleDateText = (texto) => {
    setDateText(texto);
    const parseada = parseDataBR(texto);
    setDate(parseada);
    if (parseada) setErro("");
  };

  const handleAgendar = () => {
    if (!date) {
      setErro("Escolha a data da conversa.");
      return;
    }

    navigation.navigate("Calendar", {
      novoAgendamento: {
        id: `novo-${Date.now()}`,
        titulo: title.trim() || "Conversa com a equipe pedagógica",
        professor: teacher.trim(),
        assunto: subject.trim(),
        dataISO: date.toISOString(),
        dia: date.getDate(),
        mes: date.getMonth(),
        ano: date.getFullYear(),
        hora: time.trim(),
        lembrete: remindMe,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.overlay}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={avoidKeyboard}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={() => navigation.goBack()}
        accessibilityLabel="Fechar"
      />

      <View
        style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, SPACING.xl) }]}
        onLayout={(event) => {
          sheetHeight.current = event.nativeEvent.layout.height;
        }}
      >
        <View style={styles.grabber} />
        <Text style={styles.title}>Agende uma conversa</Text>

        <TextInput
          style={styles.input}
          onLayout={registerLayout("title")}
          onFocus={handleFocus("title")}
          placeholder="Insira um título"
          placeholderTextColor={COLORS.placeholder}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          onLayout={registerLayout("teacher")}
          onFocus={handleFocus("teacher")}
          placeholder="Adicionar um professor (Opcional)"
          placeholderTextColor={COLORS.placeholder}
          value={teacher}
          onChangeText={setTeacher}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          onLayout={registerLayout("subject")}
          onFocus={handleFocus("subject")}
          placeholder="Escrever o assunto (Opcional)"
          placeholderTextColor={COLORS.placeholder}
          value={subject}
          onChangeText={setSubject}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        {IS_WEB ? (
          <View style={styles.dateFieldRow} onLayout={registerLayout("date")}>
            <TextInput
              style={styles.dateTextInput}
              onFocus={handleFocus("date")}
              placeholder="Data (dd/mm/aaaa)"
              placeholderTextColor={COLORS.placeholder}
              value={dateText}
              onChangeText={handleDateText}
            />
            <CalendarIcon size={20} color={COLORS.textGray} />
          </View>
        ) : (
          <PressableScale
            style={styles.dateFieldRow}
            onPress={() => setShowPicker(true)}
            accessibilityRole="button"
            accessibilityLabel="Escolher a data da conversa"
          >
            <Text style={[styles.dateValue, !date && styles.dateValuePlaceholder]}>
              {date ? formatarDataLonga(date) : "Data"}
            </Text>
            <CalendarIcon size={20} color={date ? COLORS.primary : COLORS.textGray} />
          </PressableScale>
        )}

        {showPicker && !IS_WEB ? (
          <View style={styles.pickerBlock}>
            <DateTimePicker
              value={date ?? new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
            />
            {Platform.OS === "ios" ? (
              <PressableScale
                style={styles.pickerDoneButton}
                onPress={() => {
                  if (!date) setDate(new Date());
                  setShowPicker(false);
                }}
                accessibilityRole="button"
              >
                <Text style={styles.pickerDoneText}>Pronto</Text>
              </PressableScale>
            ) : null}
          </View>
        ) : null}

        <TextInput
          style={styles.input}
          onLayout={registerLayout("time")}
          onFocus={handleFocus("time")}
          placeholder="Horário (Opcional) — ex: 14:30"
          placeholderTextColor={COLORS.placeholder}
          value={time}
          onChangeText={setTime}
        />

        <View style={styles.remindRow}>
          <Text style={styles.remindLabel}>Lembre-me</Text>
          <Switch
            value={remindMe}
            onValueChange={setRemindMe}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <PressableScale
          style={styles.scheduleButton}
          onPress={handleAgendar}
          accessibilityRole="button"
        >
          <Text style={styles.scheduleButtonText}>Agendar</Text>
        </PressableScale>
      </View>
    </KeyboardAvoidingView>
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
    ...SHADOW,
  },
  grabber: {
    alignSelf: "center",
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: SPACING.md,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusMedium,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    minHeight: TOUCH.min,
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: SPACING.sm + 2,
  },
  textArea: {
    minHeight: 90,
  },
  dateFieldRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusMedium,
    paddingHorizontal: SPACING.md,
    minHeight: TOUCH.min,
    marginBottom: SPACING.sm + 2,
  },
  dateTextInput: {
    flex: 1,
    minHeight: TOUCH.min,
    fontSize: 14,
    color: COLORS.textDark,
  },
  dateValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  dateValuePlaceholder: {
    fontWeight: "400",
    color: COLORS.placeholder,
  },
  pickerBlock: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusMedium,
    marginBottom: SPACING.sm + 2,
    paddingBottom: SPACING.xs,
  },
  pickerDoneButton: {
    alignSelf: "center",
    minHeight: TOUCH.min,
    paddingHorizontal: SPACING.xl,
    borderRadius: SIZES.radiusPill,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerDoneText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
  },
  remindRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: TOUCH.min,
    marginBottom: SPACING.md,
  },
  remindLabel: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: "600",
  },
  erro: {
    fontSize: 13,
    color: COLORS.danger,
    fontWeight: "600",
    marginBottom: SPACING.sm,
  },
  scheduleButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusPill,
    minHeight: TOUCH.min + 10,
    alignItems: "center",
    justifyContent: "center",
  },
  scheduleButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
