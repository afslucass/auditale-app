import React from "react";
import {
  SectionContainer,
  SectionTitle,
  ListContainer,
} from "./RecentlyPlayedSection.styles";
import RecentlyPlayedStoryCard, {
  RecentlyPlayedStoryCardType,
} from "../../../../components/RecentlyPlayedStoryCard/RecentlyPlayedStoryCard.index";
import { useSystemContext } from "../../../../contexts/system";

export type RecentlyPlayedSectionParams = {
  data: RecentlyPlayedStoryCardType[];
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
          <RecentlyPlayedStoryCard key={item.id} item={item} />
        ))}
      </ListContainer>
    </SectionContainer>
  );
}
