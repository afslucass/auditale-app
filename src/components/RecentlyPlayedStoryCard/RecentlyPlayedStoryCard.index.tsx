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
import { getStoryThumbnailImageUrl } from "../../helpers/story";

export type RecentlyPlayedStoryCardType = {
  id: string;
  image: string;
  title: string;
  progress: number;
  gender: string;
};

export type RecentlyPlayedStoryCardParams = {
  item: RecentlyPlayedStoryCardType;
};

export default function RecentlyPlayedStoryCard({
  item,
}: RecentlyPlayedStoryCardParams) {
  return (
    <CardContainer>
      <StoryImage source={{ uri: getStoryThumbnailImageUrl(item.id) }} />

      <InfoContainer>
        <StoryTitle>{item.title}</StoryTitle>

        <ProgressRow>
          <ProgressBarBackground>
            <ProgressBarFill style={{ width: `${item.progress}%` }} />
          </ProgressBarBackground>
          <ProgressText>{item.progress}%</ProgressText>
        </ProgressRow>

        <Tag>
          <TagText>{item.gender}</TagText>
        </Tag>
      </InfoContainer>
    </CardContainer>
  );
}
