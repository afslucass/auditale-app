import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import {
  Container,
  Title,
  Card,
  CardIcon,
  CardContent,
  CardTitle,
  CardSubtitle,
} from "./GenresSection.styles";
import { useSystemContext } from "../../../../contexts/system";
import { COLORS } from "../../../../constants/colors/colors";

export type RecommendedItem = {
  id: string;
  title: string;
  storiesCount: number;
  gradient: string[];
  icon: string;
};

type Props = {
  data: RecommendedItem[];
};

export default function GenresSection({ data }: Props) {
  const { texts } = useSystemContext();

  return (
    <Container>
      <Title>{texts.SCREENS.HOME.GENRES_SECTION.TITLE}</Title>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Card colors={item.gradient}>
              <CardIcon
                name={item.icon as any}
                size={24}
                color={COLORS.WHITE}
              />
              <CardContent>
                <CardTitle>{item.title}</CardTitle>
                <CardSubtitle>
                  {item.storiesCount}{" "}
                  {texts.SCREENS.HOME.GENRES_SECTION.STORIES_LABEL}
                </CardSubtitle>
              </CardContent>
            </Card>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}
