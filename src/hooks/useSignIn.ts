import { useState } from "react";
import * as WebBrowser from "expo-web-browser";

import { supabase } from "../infra/setup/supabase";
import { expo } from "../../app.json";

type useGetStoriesReturnType = [
  () => Promise<void>,
  { success: any; error: boolean }
];

const BASE_DEEPLINK = `${expo.scheme}://`;

const useSignIn = (): useGetStoriesReturnType => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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

  const fetch = async () => {
    try {
      const res = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: BASE_DEEPLINK,
          queryParams: { prompt: "consent" },
          skipBrowserRedirect: true,
        },
      });

      const googleOAuthUrl = res.data.url;
      if (!googleOAuthUrl) {
        setError(true);
        return;
      }

      const result = await WebBrowser.openAuthSessionAsync(
        googleOAuthUrl,
        BASE_DEEPLINK,
        { showInRecents: true }
      );

      if (result && result.type === "success") {
        const params = extractParamsFromUrl(result.url);
        if (params.access_token && params.refresh_token) {
          await supabase.auth.setSession({
            access_token: params.access_token,
            refresh_token: params.refresh_token,
          });
          setSuccess(true);
          return;
        }
      }
      setError(true);
    } catch {
      setError(true);
    }
  };

  return [fetch, { success, error }];
};

export default useSignIn;
