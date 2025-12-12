import React, { useState } from "react";

import { Container, SelectRow } from "./FilterBar.styles";
import SearchInput from "../../../../components/SearchInput/SearchInput.index";
import FiltersRow from "../../../../components/FiltersRow/FiltersRow.index";
import SelectDropdown from "../../../../components/SelectDropdown/SelectDropdown.index";

const FilterBar = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");

  const genres = ["All Genres", "Sci-Fi", "Romance", "Mysterium"];

  return (
    <Container>
      <SearchInput />
      <FiltersRow
        list={genres}
        onChangeSelected={setSelectedGenre}
        selected={selectedGenre}
      />
      <SelectRow>
        <SelectDropdown
          label="Duration"
          value={duration}
          onChange={setDuration}
          options={["Short", "Medium", "Long"]}
        />
        <SelectDropdown
          label="Difficulty"
          value={difficulty}
          onChange={setDifficulty}
          options={["Beginner", "Intermediate", "Advanced"]}
        />
      </SelectRow>
    </Container>
  );
};

export default FilterBar;
