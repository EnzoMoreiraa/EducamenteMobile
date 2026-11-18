import MessageComposer from "../components/MessageComposer";
import { COLORS } from "../styles/theme";

export default function IdentificadaScreen({ navigation }) {
  return (
    <MessageComposer
      title="Mensagem identificada"
      caption="Sua mensagem será enviada para a equipe pedagógica de forma identificada"
      accent={COLORS.primary}
      navigation={navigation}
      onBack={() => navigation.goBack()}
      onSubmit={() => navigation.navigate("Home")}
    />
  );
}
