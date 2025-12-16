import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";
import { getFont } from "../../helpers/getFont";

export const Container = styled.View<{ maxHeight: number }>`
  background-color: ${COLORS.GRAY};
  border-radius: 14px;
  padding: 16px;
  max-height: ${({ maxHeight }) => maxHeight};
`;

export const Title = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  margin-bottom: 8px;
  font-size: 16px;
`;

export const DescriptionText = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  color: ${COLORS.WHITE};
  line-height: 22px;
  font-size: 14px;
`;
