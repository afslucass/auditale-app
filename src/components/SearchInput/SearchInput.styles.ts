import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";
import { getFont } from "../../helpers/getFont";

export const SearchContainer = styled.View`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${COLORS.GRAY};
  background-color: ${COLORS.GRAY_2};
  flex-direction: row;
  align-items: center;
  padding: 0 14px;
`;

export const SearchIcon = styled.View`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.TextInput`
  font-family: ${getFont("Nunito-Regular")};
  flex: 1;
  color: ${COLORS.LIGHT_GRAY};
  font-size: 14px;
  margin-left: 8px;
`;
