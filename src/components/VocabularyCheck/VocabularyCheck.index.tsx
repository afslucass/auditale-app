import React from "react";
import { ScrollView } from "react-native";
import {
  Container,
  Title,
  Card,
  Word,
  Meaning,
} from "./VocabularyCheck.styles";
import { COLORS } from "../../constants/colors/colors";
import { useSystemContext } from "../../contexts/system";
import { NewWords } from "../../types/story";

type Props = {
  items: NewWords[];
};

export default function VocabularyCheck({ items }: Props) {
  const { texts } = useSystemContext();

  return (
    <Container colors={[COLORS.BLUE, COLORS.DARK_BLUE]}>
      <Title>{texts.COMPONENTS.VOCABULARY_CHECK.TITLE}</Title>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        {items?.map((item) => (
          <Card key={item.word}>
            <Word>{item.word}</Word>
            <Meaning>{item.translate[0].text}</Meaning>
          </Card>
        ))}
      </ScrollView>
    </Container>
  );
}
