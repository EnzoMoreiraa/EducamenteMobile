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
