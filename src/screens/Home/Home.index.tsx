import { useEffect, useState } from "react";

import { Text, Screen, ListContainer } from "./Home.styles";
import Header from "../../components/Header/Header.index";
import RecentlyPlayedSection from "./components/RecentlyPlayedSection/RecentlyPlayedSection.index";
import PlanBanner from "../../components/PlanBanner/PlanBanner.index";
import GenresSection from "./components/GenresSection/GenresSection.index";
import { COLORS } from "../../constants/colors/colors";
import FilterBar from "../../components/FilterBar/FilterBar.index";
import StoryCard from "../../components/StoryCard/StoryCard.index";
import { Gender, StoryWithoutContent } from "../../types/story";
import { useSystemContext } from "../../contexts/system";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import useHandleFilterBar from "../../hooks/useHandleFilterBar";
import useGetStories from "../../hooks/useGetFilteredStories";
import useHandleLastReadingStories from "../../hooks/useHandleLastReadingStories";

const STORY_PAGE_SIZE = 3;

function Home() {
  const { texts } = useSystemContext();
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const [genre, setGenre] = useState(texts.CONSTANTS.GENRES.ALL);
  const [difficulty, setDifficulty] = useState("");

  const { fetchStories, loadMore, applyFilters, stories, error } =
    useGetStories({
      initialPageSize: STORY_PAGE_SIZE,
    });
  const { getLastReadingStories, data: lastReadingStories } =
    useHandleLastReadingStories();
  const { handleChangeGenre, handleChangeDifficulty } = useHandleFilterBar({
    genre,
    difficulty,
    setGenre,
    setDifficulty,
    applyFilters,
  });

  const handleFocusInput = () => {
    navigation.navigate("Search");
  };

  const handlePressStory = (id: string, title: string) => {
    navigation.navigate("Story", {
      id,
      title,
    });
  };

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    if (isFocused) {
      getLastReadingStories();
    }
  }, [isFocused]);

  if (error) {
    return <Text>error</Text>;
  }

  return (
    <Screen>
      <Header />
      <RecentlyPlayedSection data={lastReadingStories} />
      <PlanBanner />
      <FilterBar
        onFocus={handleFocusInput}
        selectedGenre={genre}
        selectedDifficulty={difficulty}
        onChangeGenre={handleChangeGenre}
        onChangeDifficulty={handleChangeDifficulty}
      />
      <ListContainer>
        {(stories ?? []).map((item: StoryWithoutContent) => (
          <StoryCard onPress={handlePressStory} key={item.id} item={item} />
        ))}
      </ListContainer>
      <GenresSection
        data={[
          {
            id: "1",
            title: texts.CONSTANTS.GENRES.SCI_FI,
            gradient: [COLORS.PURPLE, COLORS.PURPLE_2],
            icon: "rocket",
            onPress: () =>
              navigation.navigate("Search", { genre: Gender.SCI_FI }),
          },
          {
            id: "2",
            title: texts.CONSTANTS.GENRES.MYSTERIUM,
            gradient: [COLORS.PINK, COLORS.PINK_2],
            icon: "car-sport",
            onPress: () =>
              navigation.navigate("Search", { genre: Gender.MYSTERIUM }),
          },
          {
            id: "3",
            title: texts.CONSTANTS.GENRES.ROMANCE,
            gradient: [COLORS.RED, COLORS.RED_2],
            icon: "heart-outline",
            onPress: () =>
              navigation.navigate("Search", { genre: Gender.ROMANCE }),
          },
        ]}
      />
    </Screen>
  );
}

export default Home;
