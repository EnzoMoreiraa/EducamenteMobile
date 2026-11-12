import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import AutocuidadoScreen from "../screens/AutocuidadoScreen";
import CheckinDiarioScreen from "../screens/CheckinDiarioScreen";
import CalendarPageScreen from "../screens/CalendarPageScreen";
import SchedulePageScreen from "../screens/SchedulePageScreen";
import ChatScreen from "../screens/ChatScreen";
import AnonimoScreen from "../screens/AnonimoScreen";
import IdentificadaScreen from "../screens/IdentificadaScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CheckinHistoryScreen from "../screens/CheckinHistoryScreen";
import NotificationsScreen from "../screens/NotificationsScreen";

import HomeEducadorScreen from "../screens/HomeEducadorScreen";
import TurmasListScreen from "../screens/TurmasListScreen";
import TurmaDetalheScreen from "../screens/TurmaDetalheScreen";
import AlunoDetalheScreen from "../screens/AlunoDetalheScreen";
import AgendamentosEducadorScreen from "../screens/AgendamentosEducadorScreen";
import MensagensEducadorScreen from "../screens/MensagensEducadorScreen";

const Stack = createNativeStackNavigator();

// Fluxo confirmado:
//
// Splash -> Login/Register -> Home (aluno) | HomeEducador (pedagogo)
//
// Depois do login bem-sucedido, Login e Register chamam
// `rotaInicialPorTipo(tipo_usuario)` (utils/validators.js), que devolve
// "HomeEducador" quando tipo_usuario === "pedagogo" e "Home" no caso do aluno.
// É por isso que as duas Homes convivem no mesmo stack: o perfil do usuário é
// que decide qual delas abre.
//
// App do aluno:
//   Home -> Calendar | Chat | Autocuidado | Profile | CheckinDiario
//   Calendar -> SchedulePage (modal "+")
//   Chat (hub) -> Anonimo (RF07) | Identificada (RF06)
//   Profile -> CheckinHistory | Notifications  (a edição de dados é inline)
//
// Portal pedagógico:
//   HomeEducador -> TurmasList | AgendamentosEducador | MensagensEducador | Profile
//   TurmasList -> TurmaDetalhe -> AlunoDetalhe
//
// Profile é compartilhado pelos dois perfis: a tela escolhe a barra inferior
// (aluno ou educador) a partir do tipo_usuario da sessão.
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Autocuidado" component={AutocuidadoScreen} />
        <Stack.Screen name="CheckinDiario" component={CheckinDiarioScreen} />
        <Stack.Screen name="Calendar" component={CalendarPageScreen} />
        <Stack.Screen
          name="SchedulePage"
          component={SchedulePageScreen}
          options={{ presentation: "transparentModal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Anonimo" component={AnonimoScreen} />
        <Stack.Screen name="Identificada" component={IdentificadaScreen} />

        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CheckinHistory" component={CheckinHistoryScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />

        <Stack.Screen name="HomeEducador" component={HomeEducadorScreen} />
        <Stack.Screen name="TurmasList" component={TurmasListScreen} />
        <Stack.Screen name="TurmaDetalhe" component={TurmaDetalheScreen} />
        <Stack.Screen name="AlunoDetalhe" component={AlunoDetalheScreen} />
        <Stack.Screen name="AgendamentosEducador" component={AgendamentosEducadorScreen} />
        <Stack.Screen name="MensagensEducador" component={MensagensEducadorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
