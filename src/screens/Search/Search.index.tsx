import { useCallback, useRef, useState } from "react";
import { ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header/Header.index";
import { ListContainer, Screen } from "./Search.styles";
import { useSystemContext } from "../../contexts/system";
import StoryCard from "../../components/StoryCard/StoryCard.index";
import { StoryWithoutContent } from "../../types/story";
import FilterBar from "../../components/FilterBar/FilterBar.index";
import useHandleFilterBar from "../../hooks/useHandleFilterBar";
import useGetStories from "../../hooks/useGetFilteredStories";

const STORY_PAGE_SIZE = 6;

function Search() {
  const navigation = useNavigation();
  const { texts } = useSystemContext();

  const scrollViewRef = useRef<ScrollView>(null);

  const [genre, setGenre] = useState(texts.CONSTANTS.GENRES.ALL);
  const [difficulty, setDifficulty] = useState("");
  const [title, setTitle] = useState("");

  const {
    loadMore,
    applyFilters,
    refresh,
    stories,
    error,
    loading,
    loadingMore,
    hasMore,
  } = useGetStories({
    initialPageSize: STORY_PAGE_SIZE,
  });
  const { handleChangeInput, handleChangeGenre, handleChangeDifficulty } =
    useHandleFilterBar({
      title,
      genre,
      difficulty,
      setGenre,
      setDifficulty,
      applyFilters,
    });

  const handleScroll = useCallback(
    (event: any) => {
      const { layoutMeasurement, contentOffset, contentSize } =
        event.nativeEvent;
      const paddingToBottom = 100;
      const isCloseToBottomValue =
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;

      if (isCloseToBottomValue && hasMore && !loadingMore && !loading) {
        loadMore();
      }
    },
    [hasMore, loadingMore, loading, loadMore],
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <Screen ref={scrollViewRef} onScroll={handleScroll}>
      <Header
        variant="simple-back-button"
        onBack={handleGoBack}
        title={texts.SCREENS.SEARCH.SCREEN_TITLE}
      />
      <FilterBar
        autoFocus
        selectedGenre={genre}
        selectedDifficulty={difficulty}
        onChangeGenre={handleChangeGenre}
        onChangeDifficulty={handleChangeDifficulty}
        onChangeText={setTitle}
        onEndEditing={handleChangeInput}
      />
      <ListContainer>
        {stories.map((item: StoryWithoutContent) => (
          <StoryCard key={item.id} item={item} onPress={() => null} />
        ))}
      </ListContainer>
    </Screen>
  );
}

export default Search;
