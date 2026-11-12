import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";

// SafeAreaProvider precisa envolver o app inteiro: é ele que fornece os insets
// (notch, barra de status, gesture bar) usados pelas telas e pela BottomTabBar.
export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
