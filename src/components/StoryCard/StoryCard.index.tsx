import React from "react";
import {
  CardContainer,
  StoryImage,
  InfoContainer,
  StoryTitle,
  ProgressBarBackground,
  ProgressBarFill,
  ProgressRow,
  ProgressText,
  Tag,
  TagText,
} from "./StoryCard.styles";

export type StoryCardType = {
  id: number;
  image: string;
  title: string;
  progress: number;
  category: string;
};

export type StoryCardParams = {
  item: StoryCardType;
};

export default function StoryCard({ item }: StoryCardParams) {
  return (
    <CardContainer>
      <StoryImage source={{ uri: item.image }} />

      <InfoContainer>
        <StoryTitle>{item.title}</StoryTitle>

        <ProgressRow>
          <ProgressBarBackground>
            <ProgressBarFill style={{ width: `${item.progress}%` }} />
          </ProgressBarBackground>
          <ProgressText>{item.progress}%</ProgressText>
        </ProgressRow>

        <Tag>
          <TagText>{item.category}</TagText>
        </Tag>
      </InfoContainer>
    </CardContainer>
  );
}
