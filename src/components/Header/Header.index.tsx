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
import { useSystemContext } from "../../contexts/system";

export default function Header() {
  const { language } = useSystemContext();

  return (
    <Background colors={[COLORS.DARK_BLUE, COLORS.BLUE]}>
      <Row>
        <Title>{language.COMPONENTS.HEADER.MAIN.TITLE}</Title>
        <AvatarContainer>
          <AvatarText>L</AvatarText>
        </AvatarContainer>
      </Row>
      <TextContainer>
        <Subtitle>{language.COMPONENTS.HEADER.MAIN.SUBTITLE_1}</Subtitle>
        <Subtitle>{language.COMPONENTS.HEADER.MAIN.SUBTITLE_2}</Subtitle>
      </TextContainer>
    </Background>
  );
}
