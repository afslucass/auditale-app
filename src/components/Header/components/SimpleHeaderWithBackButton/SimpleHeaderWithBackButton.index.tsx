import React from "react";
import {
  IconContainer,
  Header,
  Invisible,
  Background,
} from "./SimpleHeaderWithBackButton.styles";
import { useSystemContext } from "../../../../contexts/system";
import { COLORS } from "../../../../constants/colors/colors";
import { Ionicons } from "@expo/vector-icons";

type SimpleHeaderWithBackButtonParams = {
  title?: string;
  onBack?: () => void;
};

export default function SimpleHeaderWithBackButton({
  title,
  onBack,
}: SimpleHeaderWithBackButtonParams) {
  const { texts } = useSystemContext();

  return (
    <Background colors={[COLORS.DARK_BLUE, COLORS.BLUE]}>
      <IconContainer onPress={onBack}>
        <Ionicons name="arrow-back" color={COLORS.WHITE} size={24} />
      </IconContainer>
      <Header>{title}</Header>
      <Invisible />
    </Background>
  );
}
