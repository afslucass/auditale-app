import React from "react";

import MainHeader from "./components/MainHeader/MainHeader.index";
import SimpleHeaderWithBackButton from "./components/SimpleHeaderWithBackButton/SimpleHeaderWithBackButton.index";

export type HeaderParams = {
  variant?: "main" | "simple-back-button";
  onBack?: () => void;
  title?: string;
};

export default function Header({ variant, onBack, title }: HeaderParams) {
  if (variant === "simple-back-button") {
    return <SimpleHeaderWithBackButton onBack={onBack} title={title} />;
  }
  return <MainHeader />;
}
