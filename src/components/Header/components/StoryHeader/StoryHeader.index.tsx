import React from "react";
import {
  IconContainer,
  Header,
  Background,
  Row,
  Image,
} from "./StoryHeader.styles";
import { useSystemContext } from "../../../../contexts/system";
import { COLORS } from "../../../../constants/colors/colors";
import { Ionicons } from "@expo/vector-icons";

type StoryHeaderParams = {
  title?: string;
  image?: string;
  onBack?: () => void;
};

export default function StoryHeader({
  title,
  onBack,
  image,
}: StoryHeaderParams) {
  const { texts } = useSystemContext();

  return (
    <Background colors={[COLORS.DARK_BLUE, COLORS.BLUE]}>
      <IconContainer onPress={onBack}>
        <Ionicons name="arrow-back" color={COLORS.WHITE} size={24} />
      </IconContainer>
      <Row>
        <Image source={{ uri: image }} />
        <Header>{title}</Header>
      </Row>
    </Background>
  );
}
