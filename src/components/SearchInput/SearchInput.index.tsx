import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { SearchContainer, SearchIcon, Input } from "./SearchInput.styles";
import { COLORS } from "../../constants/colors/colors";

export type SearchInputParams = {
  autoFocus?: boolean;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onPress?: () => void;
  onEndEditing?: () => void;
};

const SearchInput = ({
  autoFocus = false,
  onFocus,
  onPress,
  onChangeText,
  onEndEditing,
  placeholder,
}: SearchInputParams) => {
  return (
    <SearchContainer>
      <SearchIcon>
        <Ionicons name="search" size={20} color={COLORS.LIGHT_GRAY} />
      </SearchIcon>
      <Input
        autoFocus={autoFocus}
        onEndEditing={onEndEditing}
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
