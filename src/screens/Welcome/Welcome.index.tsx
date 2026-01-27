import React, { useEffect } from "react";
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
  GoogleImage,
} from "./Welcome.styles";
import { useSystemContext } from "../../contexts/system";
import { Image, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";

import auditale from "../../../assets/logos/auditale.png";
import useSignIn from "../../hooks/useSignIn";

WebBrowser.maybeCompleteAuthSession();

export default function Welcome() {
  const { texts } = useSystemContext();
  const [signIn, { error }] = useSignIn();

  const handleSignInButtonPress = async () => {
    await signIn();
  };

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  if (error) {
    return <Text>Deu ruim no sign in</Text>;
  }

  return (
    <Container>
      <LogoContainer>
        <Image source={auditale} />
      </LogoContainer>
      <Title>{texts.SCREENS.WELCOME.TITLE}</Title>
      <Subtitle>{texts.SCREENS.WELCOME.SUBTITLE}</Subtitle>
      <Greeting>{texts.SCREENS.WELCOME.GREETING}</Greeting>
      <GoogleButton onPress={handleSignInButtonPress}>
        <GoogleButtonText>
          {texts.SCREENS.WELCOME.CONTINUE_WITH}
        </GoogleButtonText>
        <GoogleImage />
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
