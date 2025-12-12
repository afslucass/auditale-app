import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";
import { getFont } from "../../helpers/getFont";

export const SelectButton = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${COLORS.GRAY};
  background-color: ${COLORS.GRAY_2};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SelectButtonText = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  color: ${COLORS.WHITE};
  font-size: 15px;
`;

export const ArrowIcon = styled.View`
  margin-left: 8px;
  align-items: center;
  justify-content: center;
`;

/* Modal */

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.45);
  justify-content: center;
  padding: 24px;
`;

export const ModalContent = styled.View`
  background-color: ${COLORS.GRAY_2};
  padding: 20px;
  border-radius: 12px;
`;

export const ModalTitle = styled.Text`
  font-family: ${getFont("Nunito-Bold")};
  color: ${COLORS.WHITE};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 14px;
`;

export const OptionButton = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 10px;
  background-color: ${COLORS.GRAY};
  margin-bottom: 8px;
`;

export const OptionText = styled.Text`
  font-family: ${getFont("Nunito-Regular")};
  color: ${COLORS.WHITE};
  font-size: 16px;
`;
