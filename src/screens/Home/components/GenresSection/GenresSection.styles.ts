import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../../../constants/colors/colors";
import { Ionicons } from "@expo/vector-icons";
import { getFont } from "../../../../helpers/getFont";

export const Container = styled.View`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 32px;
  padding-left: 20px;
`;

export const Title = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  font-size: 18px;
  margin-bottom: 20px;
`;

export const Card = styled(LinearGradient).attrs(() => ({
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
}))<{ colors: string[] }>`
  width: 140px;
  height: 180px;
  border-radius: 16px;
  padding: 14px;
  margin-right: 12px;
  justify-content: space-between;
`;

export const CardIcon = styled(Ionicons)``;

export const CardContent = styled.View``;

export const CardTitle = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  font-size: 16px;
`;

export const CardSubtitle = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  color: ${COLORS.WHITE};
  font-size: 12px;
  margin-top: 2px;
`;
