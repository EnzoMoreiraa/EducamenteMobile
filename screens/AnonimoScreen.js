import MessageComposer from "../components/MessageComposer";
import { COLORS } from "../styles/theme";

// Canal anônimo de apoio e denúncia (RF07)
export default function AnonimoScreen({ navigation }) {
  return (
    <MessageComposer
      title="Mensagem anônima"
      caption="Sua mensagem será enviada para a equipe pedagógica de forma anônima"
      accent={COLORS.anonimo}
      navigation={navigation}
      onBack={() => navigation.goBack()}
      onSubmit={() => navigation.navigate("Home")}
    />
  );
}
