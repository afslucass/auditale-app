import React from "react";

import MainHeader from "./components/MainHeader/MainHeader.index";
import SimpleHeaderWithBackButton from "./components/SimpleHeaderWithBackButton/SimpleHeaderWithBackButton.index";
import StoryHeader from "./components/StoryHeader/StoryHeader.index";

export type HeaderParams = {
  variant?: "main" | "simple-back-button" | "story";
  onBack?: () => void;
  title?: string;
  image?: string;
};

export default function Header({
  variant,
  onBack,
  title,
  image,
}: HeaderParams) {
  if (variant === "simple-back-button") {
    return <SimpleHeaderWithBackButton onBack={onBack} title={title} />;
  }
  if (variant === "story") {
    return <StoryHeader onBack={onBack} title={title} image={image} />;
  }
  return <MainHeader />;
}
