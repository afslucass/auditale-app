import { useState } from "react";
import StoriesService from "../infra/services/stories";
import { mapValueToEnumKey } from "../helpers/types";
import { useSystemContext } from "../contexts/system";
import { Difficulty, Gender } from "../types/story";

type useHandleFilterBarProps = {
  title?: string;
  genre: string;
  setGenre: (value: string) => void;
  difficulty: string;
  setDifficulty: (value: string) => void;
  fetchStories: (
    pageSize: number,
    title?: string | null,
    gender?: Gender | null,
    difficulty?: Difficulty | null,
    currentCreatedAtLastItem?: string | null
  ) => Promise<void>;
  pageSize: number;
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
  fetchStories,
  pageSize,
}: useHandleFilterBarProps): useHandleFilterBarReturnType => {
  const { texts } = useSystemContext();

  const handleChangeInput = () => {
    let genreKey = mapValueToEnumKey(genre, texts.CONSTANTS.GENRES);
    if (genreKey === "ALL") {
      genreKey = undefined;
    }
    let difficultyKey = mapValueToEnumKey(
      difficulty,
      texts.CONSTANTS.DIFFICULTY
    );
    fetchStories(
      pageSize,
      title,
      genreKey as Gender,
      difficultyKey as Difficulty,
      null
    );
  };

  const handleChangeGenre = (value: string) => {
    setGenre(value);
    let genreKey = mapValueToEnumKey(value, texts.CONSTANTS.GENRES);
    if (genreKey === "ALL") {
      genreKey = undefined;
    }
    let difficultyKey = mapValueToEnumKey(
      difficulty,
      texts.CONSTANTS.DIFFICULTY
    );
    fetchStories(
      pageSize,
      title,
      genreKey as Gender,
      difficultyKey as Difficulty,
      null
    );
  };

  const handleChangeDifficulty = (value: string) => {
    setDifficulty(value);
    let genreKey = mapValueToEnumKey(genre, texts.CONSTANTS.GENRES);
    if (genreKey === "ALL") {
      genreKey = undefined;
    }
    let difficultyKey = mapValueToEnumKey(value, texts.CONSTANTS.DIFFICULTY);
    fetchStories(
      pageSize,
      title,
      genreKey as Gender,
      difficultyKey as Difficulty,
      null
    );
  };

  return { handleChangeGenre, handleChangeDifficulty, handleChangeInput };
};

export default useHandleFilterBar;
