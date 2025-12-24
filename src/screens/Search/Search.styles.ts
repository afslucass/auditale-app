import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";

export const Screen = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
})`
  background-color: ${COLORS.BACKGROUND};
`;

export const ListContainer = styled.View`
  width: 100%;
  padding: 0px 20px;
  margin-top: 30px;
  gap: 18px;
`;
