import React from "react";
import {
  SectionContainer,
  SectionTitle,
  ListContainer,
} from "./RecentlyPlayedSection.styles";
import StoryCard, {
  StoryCardType,
} from "../../../../components/StoryCard/StoryCard.index";
import { useSystemContext } from "../../../../contexts/system";

export type RecentlyPlayedSectionParams = {
  data: StoryCardType[];
};

export default function RecentlyPlayedSection({
  data = [],
}: RecentlyPlayedSectionParams) {
  const { texts } = useSystemContext();

  return (
    <SectionContainer>
      <SectionTitle>
        {texts.SCREENS.HOME.RECENTLY_PLAYED_SECTION.TITLE}
      </SectionTitle>
      <ListContainer>
        {data.map((item) => (
          <StoryCard key={item.id} item={item} />
        ))}
      </ListContainer>
    </SectionContainer>
  );
}
