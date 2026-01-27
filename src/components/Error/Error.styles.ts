import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";
import { getFont } from "../../helpers/getFont";

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BACKGROUND};
  padding: 24px;
`;

export const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  line-height: 22px;
  font-size: 18px;
`;

export const Description = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  color: ${COLORS.WHITE};
  line-height: 22px;
  font-size: 14px;
`;

export const Bottom = styled.View`
  padding-bottom: 12px;
`;
