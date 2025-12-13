import React from "react";
import {
  Title,
  Subtitle,
  AvatarContainer,
  AvatarText,
  Background,
  Row,
  TextContainer,
} from "./MainHeader.styles";
import { useSystemContext } from "../../../../contexts/system";
import { COLORS } from "../../../../constants/colors/colors";

export default function MainHeader() {
  const { texts } = useSystemContext();

  return (
    <Background colors={[COLORS.DARK_BLUE, COLORS.BLUE]}>
      <Row>
        <Title>{texts.COMPONENTS.HEADER.MAIN.TITLE}</Title>
        <AvatarContainer>
          <AvatarText>L</AvatarText>
        </AvatarContainer>
      </Row>
      <TextContainer>
        <Subtitle>{texts.COMPONENTS.HEADER.MAIN.SUBTITLE_1}</Subtitle>
        <Subtitle>{texts.COMPONENTS.HEADER.MAIN.SUBTITLE_2}</Subtitle>
      </TextContainer>
    </Background>
  );
}
