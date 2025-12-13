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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const IconContainer = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 100px;
  background-color: ${COLORS.WHITE_TRANSPARENT};
`;

export const Invisible = styled.View`
  width: 40px;
  height: 40px;
`;

export const Header = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  font-size: 18px;
  color: ${COLORS.WHITE};
`;
