import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";

export const Screen = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 32 },
})`
  background-color: ${COLORS.BACKGROUND};
`;
