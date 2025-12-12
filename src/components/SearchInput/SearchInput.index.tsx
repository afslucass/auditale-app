import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { SearchContainer, SearchIcon, Input } from "./SearchInput.styles";
import { COLORS } from "../../constants/colors/colors";
import { SelectDropdown } from "../SelectDropdown/SelectDropdown.index";
import { FiltersRow } from "../FiltersRow/FiltersRow.index";

export type SearchInputParams = {
  onChangeText?: (text: string) => void;
};

const SearchInput = ({ onChangeText }: SearchInputParams) => {
  return (
    <SearchContainer>
      <SearchIcon>
        <Ionicons name="search" size={20} color={COLORS.LIGHT_GRAY} />
      </SearchIcon>
      <Input
        onChangeText={onChangeText}
        placeholder="Procurar história"
        placeholderTextColor={COLORS.LIGHT_GRAY}
      />
    </SearchContainer>
  );
};

export default SearchInput;
