import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";
import { getFont } from "../../helpers/getFont";

export const FiltersRowContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingVertical: 6 },
})`
  width: 100%;
  margin-top: 12px;
`;

export const GenreButton = styled.TouchableOpacity<{ isActive?: boolean }>`
  padding: 8px 16px;
  border-radius: 12px;
  margin-right: 8px;
  background-color: ${({ isActive }) =>
    isActive ? COLORS.CYAN : "transparent"};
  border-width: 1px;
  border-color: ${COLORS.GRAY};
`;

export const GenreText = styled.Text<{ isActive?: boolean }>`
  font-family: ${getFont("Nunito-Regular")};
  color: ${COLORS.WHITE};
  font-size: 14px;
`;
