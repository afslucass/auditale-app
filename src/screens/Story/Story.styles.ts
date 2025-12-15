import styled from "styled-components/native";
import { getFont } from "../../helpers/getFont";
import { COLORS } from "../../constants/colors/colors";

export const Screen = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 32 },
})`
  background-color: ${COLORS.BACKGROUND};
`;

export const MyView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const MyText = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  font-size: 24px;
`;

export const SectionsContainer = styled.View`
  padding: 0px 20px;
  padding-top: 20px;
`;
