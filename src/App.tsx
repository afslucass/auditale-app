import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import TrackPlayer, { Capability } from "react-native-track-player";
import { NavigationContainer } from "@react-navigation/native";

import RootStack from "./screens/RootStack.index";
import { SystemProvider } from "./contexts/system";
import { AuthProvider } from "./contexts/auth";

export default function App() {
  useEffect(() => {
    const configureAudio = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [Capability.Play, Capability.Pause, Capability.SeekTo],
        android: { audioOffload: true },
        progressUpdateEventInterval: 0.25,
      });
    };
    configureAudio();
  });

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
