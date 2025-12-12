import { LinearGradient } from "expo-linear-gradient";

import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";
import { getFont } from "../../helpers/getFont";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 0px 20px;
`;

export const Gradient = styled(LinearGradient)`
  width: 100%;
  padding: 0px 20px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-radius: 14px;
`;

export const LeftSection = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  font-size: 14px;
`;

export const Subtitle = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  color: ${COLORS.WHITE};
  font-size: 12px;
  margin-top: 4px;
`;

export const UpgradeButton = styled.TouchableOpacity`
  background-color: ${COLORS.WHITE};
  padding: 8px 18px;
  border-radius: 12px;
  margin-left: 14px;
`;

export const UpgradeButtonText = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.RED};
  font-size: 14px;
`;
