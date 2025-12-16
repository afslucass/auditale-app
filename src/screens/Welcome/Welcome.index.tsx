import React from "react";
import {
  Container,
  LogoContainer,
  Title,
  Subtitle,
  Greeting,
  GoogleButton,
  GoogleButtonText,
  OrText,
  GuestButton,
  GuestButtonText,
} from "./Welcome.styles";
import { useSystemContext } from "../../contexts/system";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors/colors";
import { Image } from "react-native";

import auditale from "../../../assets/logos/auditale.png";

export default function Welcome() {
  const { texts } = useSystemContext();
  return (
    <Container>
      <LogoContainer>
        <Image source={auditale} />
      </LogoContainer>
      <Title>{texts.SCREENS.WELCOME.TITLE}</Title>
      <Subtitle>{texts.SCREENS.WELCOME.SUBTITLE}</Subtitle>
      <Greeting>{texts.SCREENS.WELCOME.GREETING}</Greeting>
      <GoogleButton>
        <GoogleButtonText>
          {texts.SCREENS.WELCOME.CONTINUE_WITH}
        </GoogleButtonText>
        <Ionicons name="logo-google" size={24} color={COLORS.RED} />
      </GoogleButton>
      <OrText>or</OrText>
      <GuestButton>
        <GuestButtonText>
          {texts.SCREENS.WELCOME.CONTINUE_WITHOUT_LOGIN}
        </GuestButtonText>
      </GuestButton>
    </Container>
  );
}
