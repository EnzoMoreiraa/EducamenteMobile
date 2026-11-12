import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "./Headers";
import FloatingHomeButton, { TRIGGER_HEIGHT } from "./FloatingHomeButton";
import PressableScale from "./PressableScale";
import Toast from "./Toast";
import { COLORS, SIZES, SPACING, TOUCH, SHADOW } from "../styles/theme";

// Formulário compartilhado por AnonimoScreen e IdentificadaScreen (RF06/RF07).
// É de propósito curto: título opcional, espaço pra escrever e o botão de
// enviar. Nada de barra de ferramentas ou aviso — a tela tem que acolher,
// não parecer um formulário a preencher.
export default function MessageComposer({
  title,
  caption,
  accent = COLORS.primary,
  navigation,
  onBack,
  onSubmit,
}) {
  const [messageTitle, setMessageTitle] = useState("");
  const [message, setMessage] = useState("");
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = () => {
    if (message.trim().length === 0) {
      setErro("Escreva sua mensagem antes de enviar.");
      return;
    }
    setErro("");
    setEnviado(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenHeader title={title} onBack={onBack} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          <View style={styles.titleInputRow}>
            <TextInput
              style={styles.titleInput}
              placeholder="Título (Opcional)"
              placeholderTextColor={COLORS.textGray}
              value={messageTitle}
              onChangeText={setMessageTitle}
            />
            <Image
              source={require("../assets/images/textEdit/pencilEdit.png")}
              style={styles.pencilIcon}
              resizeMode="contain"
            />
          </View>

          <View style={styles.editorCard}>
            <Text style={styles.editorPrompt}>Conte o que precisar</Text>
            <TextInput
              style={styles.editorInput}
              placeholder="Digite aqui"
              placeholderTextColor={COLORS.placeholder}
              value={message}
              onChangeText={(text) => {
                setMessage(text);
                if (erro) setErro("");
              }}
              multiline
              textAlignVertical="top"
            />
          </View>

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          <PressableScale
            style={[styles.submitButton, { backgroundColor: accent }]}
            onPress={handleSubmit}
            accessibilityRole="button"
          >
            <Text style={styles.submitButtonText}>Enviar</Text>
          </PressableScale>

          <Text style={styles.caption}>{caption}</Text>
        </View>
      </KeyboardAvoidingView>

      <Toast
        visible={enviado}
        message="Mensagem enviada para a equipe pedagógica"
        onHide={() => {
          setEnviado(false);
          onSubmit?.();
        }}
      />

      {navigation ? <FloatingHomeButton navigation={navigation} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: SPACING.xs,
  },
  titleInputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMedium,
    paddingHorizontal: SPACING.md,
    minHeight: TOUCH.min + 6,
    ...SHADOW,
    marginBottom: SPACING.md,
  },
  titleInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
    paddingVertical: SPACING.sm,
  },
  pencilIcon: {
    width: 20,
    height: 20,
    marginLeft: SPACING.xs,
  },
  editorCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    paddingVertical: SPACING.lg,
    overflow: "hidden",
    ...SHADOW,
  },
  editorPrompt: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textBrown,
    paddingHorizontal: SPACING.lg,
  },
  editorInput: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textDark,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xs,
  },
  erro: {
    fontSize: 13,
    color: COLORS.danger,
    fontWeight: "600",
    marginTop: SPACING.sm,
    textAlign: "center",
  },
  submitButton: {
    borderRadius: SIZES.radiusPill,
    minHeight: TOUCH.min + 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.md,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },
  caption: {
    fontSize: 11,
    color: COLORS.textGray,
    textAlign: "center",
    fontWeight: "600",
    marginTop: SPACING.sm,
    // reserva a faixa de toque do FloatingHomeButton
    marginBottom: SPACING.md + TRIGGER_HEIGHT,
  },
});
