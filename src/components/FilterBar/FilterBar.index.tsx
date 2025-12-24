import React, { useState } from "react";

import { Container, SelectRow } from "./FilterBar.styles";
import { useSystemContext } from "../../contexts/system";
import SearchInput from "../SearchInput/SearchInput.index";
import FiltersRow from "../FiltersRow/FiltersRow.index";
import SelectDropdown from "../SelectDropdown/SelectDropdown.index";

export type FilterBarParams = {
  onEndEditing?: () => void;
  onChangeText?: (value: string) => void;
  selectedGenre: string;
  selectedDifficulty: string;
  onChangeGenre: (value: string) => void;
  onChangeDifficulty: (value: string) => void;
  onFocus?: () => void;
  autoFocus?: boolean;
};

const FilterBar = ({
  onEndEditing,
  onChangeText,
  selectedGenre,
  selectedDifficulty,
  onChangeGenre,
  onChangeDifficulty,
  onFocus,
  autoFocus,
}: FilterBarParams) => {
  const { texts } = useSystemContext();
  const genres = [
    texts.CONSTANTS.GENRES.ALL,
    texts.CONSTANTS.GENRES.SCI_FI,
    texts.CONSTANTS.GENRES.ROMANCE,
    texts.CONSTANTS.GENRES.MYSTERIUM,
  ];
  const difficulty = [
    texts.CONSTANTS.DIFFICULTY.BEGINNER,
    texts.CONSTANTS.DIFFICULTY.INTERMEDIATE,
    texts.CONSTANTS.DIFFICULTY.ADVANCED,
  ];

  return (
    <Container>
      <SearchInput
        onFocus={onFocus}
        autoFocus={autoFocus}
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
          options={difficulty}
        />
      </SelectRow>
    </Container>
  );
};

export default FilterBar;
