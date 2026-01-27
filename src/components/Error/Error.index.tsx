import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import {
  Container,
  TextContainer,
  Title,
  Description,
  Bottom,
} from "./Error.styles";
import auditale from "../../../assets/logos/auditale.png";
import Button from "../Button/Button.index";
import { useSystemContext } from "../../contexts/system";

type ErrorProps = {
  message?: string;
  onRetry: () => void;
};

const Error = ({ message, onRetry }: ErrorProps) => {
  const { texts } = useSystemContext();

  const errorMessage = message ?? texts.COMPONENTS.ERROR.MESSAGE;

  return (
    <Container>
      <TextContainer>
        <Title>{texts.COMPONENTS.ERROR.TITLE}</Title>
        <Description>{errorMessage}</Description>
      </TextContainer>
      <Bottom>
        <Button text={texts.COMPONENTS.ERROR.RETRY} onPress={onRetry} />
      </Bottom>
    </Container>
  );
};

export default Error;
