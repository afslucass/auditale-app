import React, { useState } from "react";

import { Container, SelectRow } from "./FilterBar.styles";
import SearchInput from "../../../../components/SearchInput/SearchInput.index";
import FiltersRow from "../../../../components/FiltersRow/FiltersRow.index";
import SelectDropdown from "../../../../components/SelectDropdown/SelectDropdown.index";
import { useSystemContext } from "../../../../contexts/system";

export type FilterBarParams = {
  onEndEditing: () => void;
  onChangeText: (value: string) => void;
  genres: string[];
  selectedGenre: string;
  selectedDifficulty: string;
  onChangeGenre: (value: string) => void;
  onChangeDifficulty: (value: string) => void;
};

const FilterBar = ({
  onEndEditing,
  onChangeText,
  genres,
  selectedGenre,
  selectedDifficulty,
  onChangeGenre,
  onChangeDifficulty,
}: FilterBarParams) => {
  const { texts } = useSystemContext();

  return (
    <Container>
      <SearchInput
        autoFocus
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        placeholder={texts.SCREENS.HOME.FILTER_BAR.INPUT}
      />
      <FiltersRow
        list={genres}
        onChangeSelected={onChangeGenre}
        selected={selectedGenre}
      />
      <SelectRow>
        <SelectDropdown
          label={texts.SCREENS.HOME.FILTER_BAR.DIFFICULTY}
          value={selectedDifficulty}
          onChange={onChangeDifficulty}
          options={[
            texts.CONSTANTS.DIFFICULTY.BEGINNER,
            texts.CONSTANTS.DIFFICULTY.INTERMEDIATE,
            texts.CONSTANTS.DIFFICULTY.ADVANCED,
          ]}
        />
      </SelectRow>
    </Container>
  );
};

export default FilterBar;
