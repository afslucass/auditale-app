import React from "react";
import {
  SectionContainer,
  SectionTitle,
  ListContainer,
} from "./RecentlyPlayedSection.styles";
import StoryCard, {
  StoryCardType,
} from "../../../../components/StoryCard/StoryCard.index";

export type RecentlyPlayedSectionParams = {
  data: StoryCardType[];
};

export default function RecentlyPlayedSection({
  data = [],
}: RecentlyPlayedSectionParams) {
  return (
    <SectionContainer>
      <SectionTitle>Recently Played</SectionTitle>
      <ListContainer>
        {data.map((item) => (
          <StoryCard key={item.id} item={item} />
        ))}
      </ListContainer>
    </SectionContainer>
  );
}
