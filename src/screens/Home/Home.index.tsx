import { useEffect, useState } from "react";

import { Text, Screen, ListContainer } from "./Home.styles";
import Header from "../../components/Header/Header.index";
import RecentlyPlayedSection from "./components/RecentlyPlayedSection/RecentlyPlayedSection.index";
import PlanBanner from "../../components/PlanBanner/PlanBanner.index";
import GenresSection from "./components/GenresSection/GenresSection.index";
import { COLORS } from "../../constants/colors/colors";
import FilterBar from "../../components/FilterBar/FilterBar.index";
import StoryCard from "../../components/StoryCard/StoryCard.index";
import { Difficulty, Gender, StoryWithoutContent } from "../../types/story";
import useGetFilteredStories from "../../hooks/useGetFilteredStories";
import { useSystemContext } from "../../contexts/system";
import { useNavigation } from "@react-navigation/native";
import { mapValueToEnumKey } from "../../helpers/types";
import useHandleFilterBar from "../../hooks/useHandleFilterBar";

const STORY_LIMIT = 3;

function Home() {
  const { texts } = useSystemContext();
  const navigation = useNavigation<any>();

  const [genre, setGenre] = useState(texts.CONSTANTS.GENRES.ALL);
  const [difficulty, setDifficulty] = useState("");

  const [getStories, { data, error }] = useGetFilteredStories();
  const { handleChangeGenre, handleChangeDifficulty } = useHandleFilterBar({
    genre,
    difficulty,
    setGenre,
    setDifficulty,
    fetchStories: getStories,
    pageSize: STORY_LIMIT,
  });

  const handleFocusInput = () => {
    navigation.navigate("Search");
  };

  useEffect(() => {
    getStories(STORY_LIMIT, null, null, null, null);
  }, []);

  if (error) {
    return <Text>error</Text>;
  }

  return (
    <Screen>
      <Header />
      <RecentlyPlayedSection data={data} />
      <PlanBanner />
      <FilterBar
        onFocus={handleFocusInput}
        selectedGenre={genre}
        selectedDifficulty={difficulty}
        onChangeGenre={handleChangeGenre}
        onChangeDifficulty={handleChangeDifficulty}
      />
      <ListContainer>
        {(data ?? []).map((item: StoryWithoutContent) => (
          <StoryCard key={item.id} item={item} />
        ))}
      </ListContainer>
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
