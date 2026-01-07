import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";
import { getFont } from "../../helpers/getFont";
import Slider from "@react-native-community/slider";

export const Container = styled.View`
  background-color: ${COLORS.DARK_BLUE_2};
  border-radius: 16px;
  padding: 20px;
`;

export const ControlsRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const ControlButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${COLORS.BLUE};
  margin-left: 16px;
  margin-right: 16px;
  justify-content: center;
  align-items: center;
`;

export const PlayButton = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${COLORS.CYAN};
  justify-content: center;
  align-items: center;
`;

export const TimeRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
`;

export const SpeedRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const SpeedLabel = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  font-size: 12px;
  color: ${COLORS.WHITESMOKE};
`;

export const SpeedButton = styled.TouchableOpacity`
  background-color: ${COLORS.BLUE};
  height: 36px;
  width: 70px;
  justify-content: center;
  padding-left: 12px;
  border-radius: 12px;
`;

export const SpeedText = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  font-size: 12px;
  color: ${COLORS.WHITE};
`;

export const TimeText = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  font-size: 12px;
  color: ${COLORS.WHITESMOKE};
`;

export const SliderBar = styled(Slider).attrs({
  minimumValue: 0,
  maximumValue: 1,
  thumbTintColor: COLORS.CYAN,
  minimumTrackTintColor: COLORS.CYAN,
  maximumTrackTintColor: COLORS.DARK_BLUE_3,
})`
  width: 100%;
  height: 40px;
`;

export const DropdownOverlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const DropdownContainer = styled.View`
  background-color: ${COLORS.BACKGROUND};
  border-radius: 14px;
  width: 160px;
  padding: 10px;
`;

export const DropdownItem = styled.TouchableOpacity`
  padding: 12px;
`;

export const DropdownText = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  text-align: center;
`;
