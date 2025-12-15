import React, { useState } from "react";

import {
  Container,
  ListContainer,
  RecommendedText,
  SelectRow,
} from "./FilterBar.styles";
import SearchInput from "../../../../components/SearchInput/SearchInput.index";
import FiltersRow from "../../../../components/FiltersRow/FiltersRow.index";
import SelectDropdown from "../../../../components/SelectDropdown/SelectDropdown.index";
import { useSystemContext } from "../../../../contexts/system";
import StoryCard, {
  StoryCardType,
} from "../../../../components/StoryCard/StoryCard.index";
import { useNavigation } from "@react-navigation/native";

export type FilterBarParams = {
  data: StoryCardType[];
};

const FilterBar = ({ data = [] }: FilterBarParams) => {
  const { texts } = useSystemContext();
  const navigation = useNavigation<any>();

  const [selectedGenre, setSelectedGenre] = useState(
    texts.CONSTANTS.GENRES.ALL
  );
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");

  const genres = [
    texts.CONSTANTS.GENRES.ALL,
    texts.CONSTANTS.GENRES.SCI_FI,
    texts.CONSTANTS.GENRES.ROMANCE,
    texts.CONSTANTS.GENRES.MYSTERIUM,
  ];

  const handlePressInput = () => {
    navigation.navigate("Search");
  };

  const handleStoryPress = (id: string) => {
    navigation.navigate("Story", { id });
  };

  return (
    <Container>
      <SearchInput
        placeholder={texts.SCREENS.HOME.FILTER_BAR.INPUT}
        onPress={handlePressInput}
      />
      <FiltersRow
        list={genres}
        onChangeSelected={setSelectedGenre}
        selected={selectedGenre}
      />
      <SelectRow>
        <SelectDropdown
          label={texts.SCREENS.HOME.FILTER_BAR.DURATION}
          value={duration}
          onChange={setDuration}
          options={["Short", "Medium", "Long"]}
        />
        <SelectDropdown
          label={texts.SCREENS.HOME.FILTER_BAR.DIFFICULTY}
          value={difficulty}
          onChange={setDifficulty}
          options={["Beginner", "Intermediate", "Advanced"]}
        />
      </SelectRow>
      <RecommendedText>{texts.SCREENS.HOME.FILTER_BAR.TITLE}</RecommendedText>
      <ListContainer>
        {data.map((item) => (
          <StoryCard
            key={item.id}
            item={item}
            onPress={() => handleStoryPress(item.id)}
          />
        ))}
      </ListContainer>
    </Container>
  );
};

export default FilterBar;
