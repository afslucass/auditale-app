import { useEffect } from "react";

import { Text, Screen } from "./Home.styles";
import Header from "../../components/Header/Header.index";
import RecentlyPlayedSection from "./components/RecentlyPlayedSection/RecentlyPlayedSection.index";
import PlanBanner from "../../components/PlanBanner/PlanBanner.index";
import FilterBar from "./components/FilterBar/FilterBar.index";
import GenresSection from "./components/GenresSection/GenresSection.index";
import { COLORS } from "../../constants/colors/colors";
import useGetStories from "../../hooks/useGetStories";

const STORY_LIMIT = 3;

function Home() {
  const [getStories, { data, loading, error }] = useGetStories();

  useEffect(() => {
    getStories(STORY_LIMIT);
  }, []);

  if (loading) {
    return <Text>loading</Text>;
  }

  if (error) {
    return <Text>error</Text>;
  }

  return (
    <Screen>
      <Header />
      <RecentlyPlayedSection data={data} />
      <PlanBanner />
      <FilterBar data={data} />
      <GenresSection
        data={[
          {
            id: "1",
            title: "Sci-fi",
            storiesCount: 24,
            gradient: [COLORS.PURPLE, COLORS.PURPLE_2],
            icon: "rocket",
          },
          {
            id: "2",
            title: "Action",
            storiesCount: 24,
            gradient: [COLORS.PINK, COLORS.PINK_2],
            icon: "car-sport",
          },
          {
            id: "3",
            title: "Romance",
            storiesCount: 24,
            gradient: [COLORS.RED, COLORS.RED_2],
            icon: "heart-outline",
          },
        ]}
      />
    </Screen>
  );
}

export default Home;
