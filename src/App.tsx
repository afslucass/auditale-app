import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import styled from "styled-components/native";
import { getFont } from "./helpers/getFont";

export default function App() {
  return (
    <MyView>
      <MyText>Lorem Ipsumis</MyText>
      <Ionicons name="chevron-down" size={32} color="blue" />
      <StatusBar style="auto" />
    </MyView>
  );
}

const MyView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const MyText = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  font-size: 24px;
`;
