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
} from "./Welcome.styles";
import { useSystemContext } from "../../contexts/system";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors/colors";
import { Image } from "react-native";
import * as WebBrowser from "expo-web-browser";

import auditale from "../../../assets/logos/auditale.png";
import { expo } from "../../../app.json";
import { supabase } from "../../infra/setup/supabase";

WebBrowser.maybeCompleteAuthSession();

export default function Welcome() {
  const { texts } = useSystemContext();

  function extractParamsFromUrl(url: string) {
    const parsedUrl = new URL(url);
    const hash = parsedUrl.hash.substring(1);
    const params = new URLSearchParams(hash);

    return {
      access_token: params.get("access_token"),
      expires_in: parseInt(params.get("expires_in") || "0"),
      refresh_token: params.get("refresh_token"),
      token_type: params.get("token_type"),
      provider_token: params.get("provider_token"),
      code: params.get("code"),
    };
  }

  const handleSignInButtonPress = async () => {
    const res = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${expo.scheme}://`,
        queryParams: { prompt: "consent" },
        skipBrowserRedirect: true,
      },
    });

    const googleOAuthUrl = res.data.url;

    if (!googleOAuthUrl) {
      console.error("no oauth url found!");
      return;
    }

    const result = await WebBrowser.openAuthSessionAsync(
      googleOAuthUrl,
      `${expo.scheme}://`,
      { showInRecents: true }
    ).catch((err) => {
      console.error("onSignInButtonPress - openAuthSessionAsync - error", {
        err,
      });
      console.log(err);
    });
    console.debug("onSignInButtonPress - openAuthSessionAsync - result", {
      result,
    });
    if (result && result.type === "success") {
      console.debug("onSignInButtonPress - openAuthSessionAsync - success");
      const params = extractParamsFromUrl(result.url);
      console.debug("onSignInButtonPress - openAuthSessionAsync - success", {
        params,
      });
      if (params.access_token && params.refresh_token) {
        console.debug("onSignInButtonPress - setSession");
        const { data, error } = await supabase.auth.setSession({
          access_token: params.access_token,
          refresh_token: params.refresh_token,
        });
        console.debug("onSignInButtonPress - setSession - success", {
          data,
          error,
        });
        return;
      } else {
        console.error("onSignInButtonPress - setSession - failed");
      }
    } else {
      console.error("onSignInButtonPress - openAuthSessionAsync - failed");
    }
  };

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

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
