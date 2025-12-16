import React from "react";
import { ScrollView } from "react-native";
import { Container, Title, DescriptionText } from "./DescriptionBox.styles";
import { useSystemContext } from "../../contexts/system";

type Props = {
  text: string;
  maxHeight?: number;
};

export default function DescriptionBox({ text, maxHeight = 220 }: Props) {
  const { texts } = useSystemContext();
  return (
    <Container maxHeight={maxHeight}>
      <Title>{texts.COMPONENTS.DESCRIPTION_BOX.TITLE}</Title>
      <ScrollView showsVerticalScrollIndicator nestedScrollEnabled>
        <DescriptionText>{text}</DescriptionText>
      </ScrollView>
    </Container>
  );
}
