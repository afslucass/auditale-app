import React from "react";
import {
  SectionContainer,
  SectionTitle,
  ListContainer,
} from "./RecentlyPlayedSection.styles";
import RecentlyPlayedStoryCard from "../../../../components/RecentlyPlayedStoryCard/RecentlyPlayedStoryCard.index";
import { useSystemContext } from "../../../../contexts/system";
import { LastReadingStory } from "../../../../types/story";

export type RecentlyPlayedSectionParams = {
  data: LastReadingStory[];
};

const MAX_SHOW_LAST_STORIES = 3;

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
        {data.slice(0, MAX_SHOW_LAST_STORIES).map((item) => (
          <RecentlyPlayedStoryCard key={item.story_id} item={item} />
        ))}
      </ListContainer>
    </SectionContainer>
  );
}
