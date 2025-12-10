import styled from "styled-components/native";
import { getFont } from "../../helpers/getFont";

export const MyView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const MyText = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  font-size: 24px;
`;
