import React from "react";
import {
  Title,
  Subtitle,
  AvatarContainer,
  AvatarText,
  Background,
  Row,
  TextContainer,
} from "./Header.styles";
import { View } from "react-native";
import { COLORS } from "../../constants/colors/colors";
import { TEXTS } from "../../constants/texts/texts";

export default function Header() {
  return (
    <Background colors={[COLORS.DARK_BLUE, COLORS.BLUE]}>
      <Row>
        <Title>{TEXTS.COMPONENTS.HEADER.MAIN.TITLE}</Title>
        <AvatarContainer>
          <AvatarText>L</AvatarText>
        </AvatarContainer>
      </Row>
      <TextContainer>
        <Subtitle>{TEXTS.COMPONENTS.HEADER.MAIN.SUBTITLE_1}</Subtitle>
        <Subtitle>{TEXTS.COMPONENTS.HEADER.MAIN.SUBTITLE_2}</Subtitle>
      </TextContainer>
    </Background>
  );
}
