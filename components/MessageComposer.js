import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { ScreenHeader } from "./Headers";
import { COLORS, SIZES, SHADOW } from "../styles/theme";

// Ferramentas de formatação do editor — mockadas (sem ação real ainda, RF06/RF07)
const ALIGN_LIST_TOOLS = [
  require("../assets/images/textEdit/textLeft.png"),
  require("../assets/images/textEdit/textCenter.png"),
  require("../assets/images/textEdit/textRight.png"),
  require("../assets/images/textEdit/listNum.png"),
  require("../assets/images/textEdit/listPoint.png"),
];
const FORMAT_TOOLS = [
  require("../assets/images/textEdit/caps.png"),
  require("../assets/images/textEdit/markText.png"),
  require("../assets/images/textEdit/bold.png"),
  require("../assets/images/textEdit/italic.png"),
  require("../assets/images/textEdit/underline.png"),
  require("../assets/images/textEdit/strikethrough.png"),
];
const ATTACH_TOOLS = [
  require("../assets/images/textEdit/addLink.png"),
  require("../assets/images/textEdit/addImage.png"),
];

// Formulário compartilhado por AnonimoScreen e IdentificadaScreen (RF06/RF07)
export default function MessageComposer({ title, caption, onBack, onSubmit }) {
  const [messageTitle, setMessageTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <View style={styles.container}>
      <ScreenHeader title={title} onBack={onBack} />

      <View style={styles.content}>
        <View style={styles.titleInputRow}>
          <TextInput
            style={styles.titleInput}
            placeholder="Título (Opcional)"
            placeholderTextColor={COLORS.textDark}
            value={messageTitle}
            onChangeText={setMessageTitle}
          />
          <Image source={require("../assets/images/textEdit/pencilEdit.png")} style={styles.pencilIcon} resizeMode="contain" />
        </View>

        <View style={styles.editorCard}>
          <View style={styles.toolbarRow}>
            <TouchableOpacity style={styles.categoriesButton}>
              <Text style={styles.categoriesText}>Categorias</Text>
              <Text style={styles.caret}>⌄</Text>
            </TouchableOpacity>
            {ALIGN_LIST_TOOLS.map((icon, i) => (
              <Image key={`align-${i}`} source={icon} style={styles.toolIcon} resizeMode="contain" />
            ))}
          </View>

          <View style={styles.toolbarRow}>
            {FORMAT_TOOLS.map((icon, i) => (
              <Image key={`format-${i}`} source={icon} style={styles.toolIcon} resizeMode="contain" />
            ))}
            {ATTACH_TOOLS.map((icon, i) => (
              <Image key={`attach-${i}`} source={icon} style={styles.toolIcon} resizeMode="contain" />
            ))}
          </View>

          <Text style={styles.editorPrompt}>Conte o que precisar</Text>
          <TextInput
            style={styles.editorInput}
            placeholder="Digite aqui"
            placeholderTextColor="rgba(0,0,0,0.4)"
            value={message}
            onChangeText={setMessage}
            multiline
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity activeOpacity={0.85} style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.caption}>{caption}</Text>
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
    flex: 1,
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: 8,
  },
  titleInputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...SHADOW,
    marginBottom: 16,
  },
  titleInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  pencilIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  editorCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    overflow: "hidden",
    ...SHADOW,
  },
  toolbarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  categoriesButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginRight: 4,
  },
  categoriesText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
  },
  caret: {
    fontSize: 14,
    color: "#475569",
  },
  toolIcon: {
    width: 18,
    height: 18,
  },
  editorPrompt: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  editorInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textDark,
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 16,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusPill,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "600",
  },
  caption: {
    fontSize: 11,
    color: "#494949",
    textAlign: "center",
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 16,
  },
});
