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
} from "./RecentlyPlayedStoryCard.styles";

export type RecentlyPlayedStoryCardType = {
  id: number;
  image: string;
  title: string;
  progress: number;
  category: string;
};

export type RecentlyPlayedStoryCardParams = {
  item: RecentlyPlayedStoryCardType;
};

export default function RecentlyPlayedStoryCard({
  item,
}: RecentlyPlayedStoryCardParams) {
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
