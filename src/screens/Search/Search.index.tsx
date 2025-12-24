import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header/Header.index";
import FilterBar from "./components/FilterBar/FilterBar.index";
import { ListContainer, Screen } from "./Search.styles";
import { useSystemContext } from "../../contexts/system";
import useGetFilteredStories from "../../hooks/useGetFilteredStories";
import StoryCard from "../../components/StoryCard/StoryCard.index";
import { Difficulty, Gender, StoryWithoutContent } from "../../types/story";
import { useState } from "react";

const PAGE_SIZE = 6;

function Search() {
  const navigation = useNavigation();
  const { texts } = useSystemContext();

  const [genre, setGenre] = useState(texts.CONSTANTS.GENRES.ALL);
  const [difficulty, setDifficulty] = useState("");
  const [title, setTitle] = useState("");

  const genres = [
    texts.CONSTANTS.GENRES.ALL,
    texts.CONSTANTS.GENRES.SCI_FI,
    texts.CONSTANTS.GENRES.ROMANCE,
    texts.CONSTANTS.GENRES.MYSTERIUM,
  ];

  const [getStories, { data, error, loading }] = useGetFilteredStories();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getValueInEnum = (value: string, keys: any) =>
    (Object.keys(keys) as any[]).find((key: string) => keys[key] === value);

  const handleChangeInput = () => {
    let genreKey = getValueInEnum(genre, texts.CONSTANTS.GENRES);
    if (genreKey === "ALL") {
      genreKey = undefined;
    }
    let difficultyKey = getValueInEnum(difficulty, texts.CONSTANTS.DIFFICULTY);
    getStories(
      PAGE_SIZE,
      title,
      genreKey as Gender,
      difficultyKey as Difficulty,
      null
    );
  };

  const handleChangeGenre = (value: string) => {
    setGenre(value);
    let genreKey = getValueInEnum(value, texts.CONSTANTS.GENRES);
    if (genreKey === "ALL") {
      genreKey = undefined;
    }
    let difficultyKey = getValueInEnum(difficulty, texts.CONSTANTS.DIFFICULTY);
    getStories(
      PAGE_SIZE,
      title,
      genreKey as Gender,
      difficultyKey as Difficulty,
      null
    );
  };

  const handleChangeDifficulty = (value: string) => {
    setDifficulty(value);
    let genreKey = getValueInEnum(genre, texts.CONSTANTS.GENRES);
    if (genreKey === "ALL") {
      genreKey = undefined;
    }
    let difficultyKey = getValueInEnum(value, texts.CONSTANTS.DIFFICULTY);
    getStories(
      PAGE_SIZE,
      title,
      genreKey as Gender,
      difficultyKey as Difficulty,
      null
    );
  };

  return (
    <Screen>
      <Header
        variant="simple-back-button"
        onBack={handleGoBack}
        title={texts.SCREENS.SEARCH.SCREEN_TITLE}
      />
      <FilterBar
        genres={genres}
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
