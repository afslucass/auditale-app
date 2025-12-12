import React from "react";

import {
  FiltersRowContainer,
  GenreButton,
  GenreText,
} from "./FiltersRow.styles";

export type FiltersRowParams = {
  list: string[];
  onChangeSelected: (selected: string) => void;
  selected: string;
};

const FiltersRow = ({ list, onChangeSelected, selected }: FiltersRowParams) => {
  return (
    <FiltersRowContainer horizontal showsHorizontalScrollIndicator={false}>
      {list.map((item) => (
        <GenreButton
          key={item}
          isActive={selected === item}
          onPress={() => onChangeSelected(item)}
        >
          <GenreText isActive={selected === item}>{item}</GenreText>
        </GenreButton>
      ))}
    </FiltersRowContainer>
  );
};

export default FiltersRow;
