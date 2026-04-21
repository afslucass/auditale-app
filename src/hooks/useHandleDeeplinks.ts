import { useEffect } from "react";
import * as Linking from "expo-linking";
import { useNavigation, CommonActions } from "@react-navigation/native";

type RouteConfig = {
  [key: string]: {
    screen: string;
    paramsMapper?: (params: Record<string, string>) => any;
  };
};

const routeConfig: RouteConfig = {
  "": { screen: "Home" },
  home: { screen: "Home" },
  search: {
    screen: "Search",
    paramsMapper: (params) => ({ genre: params.genre }),
  },
};

const useHandleDeeplinks = () => {
  const url = Linking.useURL();
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (url) {
      const parsedUrl = Linking.parse(url);
      handleDeepLink(parsedUrl);
    }
  }, [url, navigation]);

  const handleDeepLink = (parsedUrl: Linking.ParsedURL) => {
    const { hostname, queryParams } = parsedUrl;
    const cleanHostname = hostname?.replace(/^\/+/, "") || "";
    const route = routeConfig[cleanHostname];

    if (route) {
      let params = undefined;

      if (route.paramsMapper && queryParams) {
        const convertedParams: Linking.QueryParams = {};
        Object.keys(queryParams).forEach((key) => {
          convertedParams[key] = queryParams[key];
        });
        params = route.paramsMapper(convertedParams as any);
      }

      if (cleanHostname === "") {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: route.screen as any, params }],
          }),
        );
      } else {
        navigation.navigate(route.screen as any, params);
      }
    } else {
      console.warn(`Rota não reconhecida: ${cleanHostname}`);
      navigation.navigate("Home");
    }
  };
};

export default useHandleDeeplinks;
