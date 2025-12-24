import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header/Header.index";
import { ListContainer, Screen } from "./Search.styles";
import { useSystemContext } from "../../contexts/system";
import useGetFilteredStories from "../../hooks/useGetFilteredStories";
import StoryCard from "../../components/StoryCard/StoryCard.index";
import { Difficulty, Gender, StoryWithoutContent } from "../../types/story";
import FilterBar from "../../components/FilterBar/FilterBar.index";
import { mapValueToEnumKey } from "../../helpers/types";
import useHandleFilterBar from "../../hooks/useHandleFilterBar";

const PAGE_SIZE = 6;

function Search() {
  const navigation = useNavigation();
  const { texts } = useSystemContext();

  const [genre, setGenre] = useState(texts.CONSTANTS.GENRES.ALL);
  const [difficulty, setDifficulty] = useState("");
  const [title, setTitle] = useState("");

  const [getStories, { data }] = useGetFilteredStories();
  const { handleChangeInput, handleChangeGenre, handleChangeDifficulty } =
    useHandleFilterBar({
      title,
      genre,
      difficulty,
      setGenre,
      setDifficulty,
      fetchStories: getStories,
      pageSize: PAGE_SIZE,
    });

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Screen>
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
        {(data ?? []).map((item: StoryWithoutContent) => (
          <StoryCard key={item.id} item={item} />
        ))}
      </ListContainer>
    </Screen>
  );
}

export default Search;
