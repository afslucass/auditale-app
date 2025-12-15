import { Platform } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

import { getFont } from "../../../../helpers/getFont";
import { COLORS } from "../../../../constants/colors/colors";

export const Background = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  width: 100%;
  padding: 20px;
  padding-top: ${Platform.select({ android: "54px", ios: "74px" })};
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
`;

export const IconContainer = styled.TouchableOpacity`
  height: 48px;
  aspect-ratio: 1;
  padding: 12px;
  border-radius: 100px;
  background-color: ${COLORS.WHITE_TRANSPARENT};
`;

export const Header = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  font-size: 18px;
  color: ${COLORS.WHITE};
  margin-top: 8px;
`;

export const Row = styled.View`
  margin-top: 12px;
  flex-direction: row;
  gap: 16px;
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 12px;
`;
