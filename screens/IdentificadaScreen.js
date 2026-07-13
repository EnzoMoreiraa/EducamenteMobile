import MessageComposer from "../components/MessageComposer";

// Canal de comunicação identificado aluno → coordenação (RF06)
export default function IdentificadaScreen({ navigation }) {
  return (
    <MessageComposer
      title="Mensagem identificada"
      caption="Sua mensagem será enviada para a aquipe pedagógica de forma identificada"
      onBack={() => navigation.goBack()}
      onSubmit={() => navigation.navigate("Home")}
    />
  );
}
