import { useState } from "react";
import StoriesService from "../infra/services/stories";
import { mapValueToEnumKey } from "../helpers/types";
import { useSystemContext } from "../contexts/system";
import { Difficulty, Gender } from "../types/story";
import { UseGetStoriesReturn } from "./useGetFilteredStories";

type useHandleFilterBarProps = {
  title?: string;
  genre: string;
  setGenre: (value: string) => void;
  difficulty: string;
  setDifficulty: (value: string) => void;
  applyFilters: UseGetStoriesReturn["applyFilters"];
};

type useHandleFilterBarReturnType = {
  handleChangeGenre: (value: string) => void;
  handleChangeDifficulty: (value: string) => void;
  handleChangeInput: () => void;
};

const useHandleFilterBar = ({
  title,
  genre,
  setGenre,
  difficulty,
  setDifficulty,
  applyFilters,
}: useHandleFilterBarProps): useHandleFilterBarReturnType => {
  const { texts } = useSystemContext();

  const handleChangeInput = () => {
    let genreKey = mapValueToEnumKey(genre, texts.CONSTANTS.GENRES);
    if (genreKey === "ALL") {
      genreKey = null;
    }
    let difficultyKey = mapValueToEnumKey(
      difficulty,
      texts.CONSTANTS.DIFFICULTY,
    );
    applyFilters({
      title,
      difficulty: difficultyKey as Difficulty,
      gender: genreKey as Gender,
    });
  };

  const handleChangeGenre = (value: string) => {
    setGenre(value);
    let genreKey = mapValueToEnumKey(value, texts.CONSTANTS.GENRES);
    if (genreKey === "ALL") {
      genreKey = null;
    }
    let difficultyKey = mapValueToEnumKey(
      difficulty,
      texts.CONSTANTS.DIFFICULTY,
    );
    applyFilters({
      title,
      difficulty: difficultyKey as Difficulty,
      gender: genreKey as Gender,
    });
  };

  const handleChangeDifficulty = (value: string) => {
    setDifficulty(value);
    let genreKey = mapValueToEnumKey(genre, texts.CONSTANTS.GENRES);
    if (genreKey === "ALL") {
      genreKey = undefined;
    }
    let difficultyKey = mapValueToEnumKey(value, texts.CONSTANTS.DIFFICULTY);
    applyFilters({
      title,
      difficulty: difficultyKey as Difficulty,
      gender: genreKey as Gender,
    });
  };

  return { handleChangeGenre, handleChangeDifficulty, handleChangeInput };
};

export default useHandleFilterBar;
