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
import { Story } from "../../types/story";

export type StoryCardParams = {
  item: Story;
  onPress?: () => void;
};

export default function StoryCard({ item, onPress }: StoryCardParams) {
  const { texts } = useSystemContext();
  return (
    <CardContainer onPress={onPress}>
      <StoryImage source={{ uri: item.thumbnail }} />
      <InfoContainer>
        <StoryTitle>{item.title}</StoryTitle>
        <Description>{item.description}</Description>
        <Row>
          <Tag>
            <TagText>{item.category}</TagText>
          </Tag>
          <DurationText>
            {item.duration} {texts.CONSTANTS.TIME.LABEL.MIN}
          </DurationText>
        </Row>
      </InfoContainer>
    </CardContainer>
  );
}
