import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";
import { getFont } from "../../helpers/getFont";

export const Container = styled.TouchableOpacity`
  width: 100%;
  background-color: ${COLORS.BLUE};
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
`;

export const Text = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  line-height: 22px;
  font-size: 16px;
`;
