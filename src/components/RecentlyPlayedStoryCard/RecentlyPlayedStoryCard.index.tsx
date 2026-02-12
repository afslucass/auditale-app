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
import { useNavigation } from "@react-navigation/native";

export type RecentlyPlayedStoryCardParams = {
  item: LastReadingStory;
};

export default function RecentlyPlayedStoryCard({
  item,
}: RecentlyPlayedStoryCardParams) {
  const { texts } = useSystemContext();
  const navigation = useNavigation<any>();

  // const progress = (item.time_user_left / item.duration) * 100;

  const handleRedirectToStory = () => {
    navigation.navigate("Story", { id: item.story_id, title: item.title });
  };

  return (
    <CardContainer onPress={handleRedirectToStory}>
      <StoryImage source={{ uri: getStoryThumbnailImageUrl(item.story_id) }} />

      <InfoContainer>
        <StoryTitle>{item.title}</StoryTitle>

        <ProgressRow>
          {/* <ProgressBarBackground>
            <ProgressBarFill style={{ width: `${progress}%` }} />
          </ProgressBarBackground>
          <ProgressText>{progress}%</ProgressText> */}
        </ProgressRow>

        <Tag>
          <TagText>{texts.CONSTANTS.GENRES[item.gender]}</TagText>
        </Tag>
      </InfoContainer>
    </CardContainer>
  );
}
