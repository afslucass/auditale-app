import { Platform } from "react-native";

export type Fonts = "Nunito-Regular" | "Nunito-Bold";

export const getFont = (fontName: Fonts) => {
  if (fontName === "Nunito-Bold") {
    return Platform.select({
      android: "Nunito_700Bold",
      ios: "Nunito-Bold",
    });
  }

  if (fontName === "Nunito-Regular") {
    return Platform.select({
      android: "Nunito_400Regular",
      ios: "Nunito-Regular",
    });
  }
};
