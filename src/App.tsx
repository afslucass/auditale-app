import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import RootStack from "./screens/RootStack.index";
import { SystemProvider } from "./contexts/system";
import { AuthProvider } from "./contexts/auth";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SystemProvider>
          <StatusBar style="light" />
          <RootStack />
        </SystemProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
