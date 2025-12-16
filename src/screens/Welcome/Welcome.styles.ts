import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";
import { getFont } from "../../helpers/getFont";

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BACKGROUND};
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const LogoContainer = styled.View`
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  color: ${COLORS.WHITE};
  font-size: 32px;
  margin-top: 12px;
`;

export const Subtitle = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  font-size: 16px;
  margin-bottom: 32px;
`;

export const Greeting = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  font-size: 16px;
  align-self: flex-start;
  margin-bottom: 12px;
`;

export const GoogleButton = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  background-color: ${COLORS.WHITE};
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
`;

export const GoogleButtonText = styled.Text`
  color: #000;
  font-weight: 500;
`;

export const OrText = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  font-size: 14px;
  color: ${COLORS.WHITESMOKE};
  margin: 20px 0px;
`;

export const GuestButton = styled.TouchableOpacity``;

export const GuestButtonText = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  font-size: 14px;
  color: ${COLORS.WHITE};
`;
