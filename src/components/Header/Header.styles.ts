import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { getFont } from "../../helpers/getFont";
import { COLORS } from "../../constants/colors/colors";

export const Background = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  width: 100%;
  padding: 20px;
  padding-top: 74px;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TextContainer = styled.View`
  margin-top: 8px;
  gap: 2px;
`;

export const Title = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.WHITE};
`;

export const Subtitle = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  font-size: 14px;
  color: ${COLORS.WHITE};
`;

export const AvatarContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${COLORS.BACKGROUND};
  align-items: center;
  justify-content: center;
`;

export const AvatarText = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  font-size: 16px;
`;
