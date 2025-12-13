import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { SearchContainer, SearchIcon, Input } from "./SearchInput.styles";
import { COLORS } from "../../constants/colors/colors";

export type SearchInputParams = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onPress?: () => void;
};

const SearchInput = ({
  onFocus,
  onPress,
  onChangeText,
  placeholder,
}: SearchInputParams) => {
  return (
    <SearchContainer>
      <SearchIcon>
        <Ionicons name="search" size={20} color={COLORS.LIGHT_GRAY} />
      </SearchIcon>
      <Input
        onFocus={onFocus}
        onPress={onPress}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.LIGHT_GRAY}
      />
    </SearchContainer>
  );
};

export default SearchInput;
