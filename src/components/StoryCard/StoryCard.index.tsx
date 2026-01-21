import React from "react";
import {
  CardContainer,
  StoryImage,
  InfoContainer,
  StoryTitle,
  Description,
  Row,
  Tag,
  TagText,
  DurationText,
} from "./StoryCard.styles";
import { useSystemContext } from "../../contexts/system";
import { StoryWithoutContent } from "../../types/story";
import { getStoryThumbnailImageUrl } from "../../helpers/story";

export type StoryCardParams = {
  item: StoryWithoutContent;
  onPress: (id: string, title: string, thumbnail: string) => void;
};

export default function StoryCard({ item, onPress }: StoryCardParams) {
  const { texts } = useSystemContext();

  return (
    <CardContainer onPress={() => onPress(item.id, item.title, item.thumbnail)}>
      <StoryImage source={{ uri: getStoryThumbnailImageUrl(item.id) }} />
      <InfoContainer>
        <StoryTitle>{item.title}</StoryTitle>
        <Description>{item.description}</Description>
        <Row>
          <Tag>
            <TagText>{item.gender}</TagText>
          </Tag>
          <DurationText>
            {item.duration} {texts.CONSTANTS.TIME.LABEL.MIN}
          </DurationText>
        </Row>
      </InfoContainer>
    </CardContainer>
  );
}
