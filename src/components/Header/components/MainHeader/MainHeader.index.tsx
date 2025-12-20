import React from "react";
import {
  Title,
  Subtitle,
  AvatarContainer,
  AvatarText,
  Background,
  Row,
  TextContainer,
  AvatarImage,
} from "./MainHeader.styles";
import { useSystemContext } from "../../../../contexts/system";
import { COLORS } from "../../../../constants/colors/colors";
import { useAuthContext } from "../../../../contexts/auth";

export default function MainHeader() {
  const { texts } = useSystemContext();
  const { profile } = useAuthContext();

  const hasProfileImage = profile?.avatar_url;

  return (
    <Background colors={[COLORS.DARK_BLUE, COLORS.BLUE]}>
      <Row>
        <Title>{texts.COMPONENTS.HEADER.MAIN.TITLE}</Title>
        <AvatarContainer>
          {hasProfileImage ? (
            <AvatarImage source={{ uri: profile.avatar_url }} />
          ) : (
            <AvatarText>L</AvatarText>
          )}
        </AvatarContainer>
      </Row>
      <TextContainer>
        <Subtitle>{texts.COMPONENTS.HEADER.MAIN.SUBTITLE_1}</Subtitle>
        <Subtitle>{texts.COMPONENTS.HEADER.MAIN.SUBTITLE_2}</Subtitle>
      </TextContainer>
    </Background>
  );
}
