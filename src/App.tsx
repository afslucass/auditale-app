import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

export default function App() {
  return (
    <MyView>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Ionicons name="chevron-down" size={32} color="blue" />
      <StatusBar style="auto" />
    </MyView>
  );
}

const MyView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
