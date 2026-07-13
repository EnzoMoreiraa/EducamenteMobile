import MessageComposer from "../components/MessageComposer";

// Canal anônimo de apoio e denúncia (RF07)
export default function AnonimoScreen({ navigation }) {
  return (
    <MessageComposer
      title="Mensagem anônima"
      caption="Sua mensagem será enviada para a aquipe pedagógica de forma anônima"
      onBack={() => navigation.goBack()}
      onSubmit={() => navigation.navigate("Home")}
    />
  );
}
