import MessageComposer from "../components/MessageComposer";
import { COLORS } from "../styles/theme";

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
