import styled from "styled-components/native";
import { COLORS } from "../../../../constants/colors/colors";
import { getFont } from "../../../../helpers/getFont";

export const SectionContainer = styled.View`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 24px;
  padding: 0px 20px;
`;

export const SectionTitle = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.WHITE};
  margin-bottom: 16px;
`;

export const ListContainer = styled.View`
  gap: 18px;
`;
