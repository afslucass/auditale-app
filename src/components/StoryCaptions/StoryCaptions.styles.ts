import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";
import { getFont } from "../../helpers/getFont";

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: { paddingVertical: 160 },
})``;

export const Container = styled.View`
  width: 100%;
  height: 360px;
  background-color: ${COLORS.GRAY};
  border-radius: 14px;
  padding: 0px 12px;
`;

export const CaptionItem = styled.View<{ highlighted?: boolean }>`
  padding: 6px 8px;
  border-radius: 12px;
  margin-bottom: 8px;
  background-color: ${({ highlighted }) =>
    highlighted ? COLORS.CYAN : "transparent"};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

export const CaptionText = styled.Text<{ highlighted?: boolean }>`
  flex: 1;
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  font-size: 14px;
  line-height: 20px;
`;
