import styled from "styled-components/native";
import { getFont } from "../../helpers/getFont";
import { COLORS } from "../../constants/colors/colors";

export const CardContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  background-color: ${COLORS.DARK_BLUE_2};
  padding: 12px;
  border-radius: 14px;
  border-width: 1px;
  border-color: ${COLORS.CYAN_2};
`;

export const StoryImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 10px;
`;

export const InfoContainer = styled.View`
  flex: 1;
  margin-left: 12px;
  justify-content: center;
`;

export const StoryTitle = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  font-size: 16px;
  margin-bottom: 8px;
`;

export const ProgressRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const ProgressBarBackground = styled.View`
  flex: 1;
  height: 6px;
  background-color: ${COLORS.DARK_BLUE_3};
  border-radius: 6px;
  margin-right: 8px;
`;

export const ProgressBarFill = styled.View`
  height: 100%;
  background-color: ${COLORS.CYAN};
  border-radius: 6px;
`;

export const ProgressText = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.CYAN};
  font-size: 12px;
`;

export const Tag = styled.View`
  align-self: flex-start;
  padding: 4px 10px;
  background-color: ${COLORS.PINK};
  border-radius: 20px;
`;

export const TagText = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  font-size: 14px;
`;
