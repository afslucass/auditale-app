import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import RootStack from "./screens/RootStack.index";
import { SystemProvider } from "./contexts/system";

export default function App() {
  return (
    <NavigationContainer>
      <SystemProvider>
        <StatusBar style="light" />
        <RootStack />
      </SystemProvider>
    </NavigationContainer>
  );
}
