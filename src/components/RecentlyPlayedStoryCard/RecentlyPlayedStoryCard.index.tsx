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
import { LastReadingStory } from "../../types/story";
import { mapValueToEnumKey } from "../../helpers/types";
import { useSystemContext } from "../../contexts/system";

export type RecentlyPlayedStoryCardParams = {
  item: LastReadingStory;
};

export default function RecentlyPlayedStoryCard({
  item,
}: RecentlyPlayedStoryCardParams) {
  const { texts } = useSystemContext();

  const progress = (item.time_user_left / item.duration) * 100;

  return (
    <CardContainer>
      <StoryImage source={{ uri: getStoryThumbnailImageUrl(item.story_id) }} />

      <InfoContainer>
        <StoryTitle>{item.title}</StoryTitle>

        <ProgressRow>
          <ProgressBarBackground>
            <ProgressBarFill style={{ width: `${progress}%` }} />
          </ProgressBarBackground>
          <ProgressText>{progress}%</ProgressText>
        </ProgressRow>

        <Tag>
          <TagText>{texts.CONSTANTS.GENRES[item.gender]}</TagText>
        </Tag>
      </InfoContainer>
    </CardContainer>
  );
}
