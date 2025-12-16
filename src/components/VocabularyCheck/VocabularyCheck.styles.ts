import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";
import { getFont } from "../../helpers/getFont";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  background-color: ${COLORS.BLUE};
  border-radius: 14px;
  padding: 16px;
`;

export const Title = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  margin-bottom: 12px;
  font-size: 16px;
`;

export const Card = styled.View`
  background-color: ${COLORS.WHITE_TRANSPARENT_2};
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 12px;
`;

export const Word = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  font-size: 16px;
  margin-bottom: 4px;
`;

export const Meaning = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  color: ${COLORS.WHITESMOKE};
  font-size: 14px;
`;
