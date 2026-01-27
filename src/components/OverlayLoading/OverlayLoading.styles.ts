import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";
import { getFont } from "../../helpers/getFont";

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BACKGROUND};
  align-items: center;
  justify-content: center;
  padding: 24px;
  opacity: 1;
`;

export const LogoContainer = styled.View`
  margin-bottom: 24px;
`;
