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

const Stack = createNativeStackNavigator();

// Fluxo confirmado:
// Splash -> Login/Register -> Home -> (Calendar | Chat | Home | Autocuidado | Profile)
// Calendar -> SchedulePage (modal "+")
// Home (card Check-in) -> CheckinDiario
//
// Chat e Profile ainda não têm protótipo enviado — adicionados como placeholders
// para a bottom bar não quebrar a navegação. Substituir quando as telas chegarem.
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
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
        {/* Placeholders — telas ainda não recebidas */}
        <Stack.Screen name="Chat" component={PlaceholderScreen} />
        <Stack.Screen name="Profile" component={PlaceholderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Tela temporária simples, só para a bottom bar funcionar antes do Figma das demais telas
function PlaceholderScreen() {
  return null;
}
