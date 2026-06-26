import { StyleSheet, Text, View, ScrollView } from "react-native";
import { ScreenHeader } from "../components/Headers";
import BottomTabBar from "../components/BottomTabBar";
import { COLORS, SIZES } from "../styles/theme";

// Conteúdo de exemplo — futuramente virá da entidade "Conteúdos_educativos" do back-end
const content = {
  title: "O Poder do Autogerenciamento Emocional",
  body:
    "Em meio às demandas diárias, pressões acadêmicas e desafios pessoais, aprender a lidar com as próprias emoções torna-se uma habilidade essencial — especialmente na fase da adolescência. O autocuidado emocional e o autogerenciamento não significam ignorar sentimentos difíceis, mas sim reconhecê-los, compreendê-los e responder a eles de forma equilibrada. Desenvolver essa consciência emocional permite tomar decisões mais saudáveis, fortalecer relações e construir uma rotina mais leve e produtiva. Nesse contexto, cuidar da mente deixa de ser um luxo e passa a ser uma necessidade para viver com mais bem-estar e propósito.",
};

export default function AutocuidadoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Autocuidado" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.contentTitle}>{content.title}</Text>
        <Text style={styles.contentBody}>{content.body}</Text>
      </ScrollView>

      <BottomTabBar navigation={navigation} active="Autocuidado" />
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
    paddingTop: 20,
    paddingBottom: 24,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textBrown,
    marginBottom: 18,
  },
  contentBody: {
    fontSize: 15,
    lineHeight: 28,
    color: COLORS.textBrown,
    textAlign: "center",
  },
});
