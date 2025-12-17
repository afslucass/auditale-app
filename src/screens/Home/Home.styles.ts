import styled from "styled-components/native";
import { getFont } from "../../helpers/getFont";
import { COLORS } from "../../constants/colors/colors";

export const Screen = styled.ScrollView`
  background-color: ${COLORS.BACKGROUND};
`;

export const Text = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  font-size: 24px;
`;
