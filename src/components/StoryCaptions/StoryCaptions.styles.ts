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

export const CaptionItem = styled.View<{
  highlighted?: boolean;
  highlightedAsReview?: boolean;
}>`
  padding: 6px 8px;
  border-radius: 12px;
  margin-bottom: ${({ highlightedAsReview }) => {
    if (highlightedAsReview) return 32;
    return 8;
  }};
  background-color: ${({ highlighted, highlightedAsReview }) => {
    if (highlightedAsReview) return COLORS.BLUE;
    if (highlighted) return COLORS.CYAN;
    return COLORS.TRANSPARENT;
  }};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

export const CaptionText = styled.Text`
  flex: 1;
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  font-size: 14px;
  line-height: 20px;
`;
