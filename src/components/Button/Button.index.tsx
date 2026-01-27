import React from "react";
import { Container, Text } from "./Button.styles";

type ButtonProps = {
  text: string;
  onPress: () => void;
};

const Button = ({ text, onPress }: ButtonProps) => {
  return (
    <Container onPress={onPress}>
      <Text>{text}</Text>
    </Container>
  );
};

export default Button;
