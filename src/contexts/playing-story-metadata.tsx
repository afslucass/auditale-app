import React, { PropsWithChildren, useContext, useMemo, useState } from "react";

import { TEXTS as ptbr } from "../constants/texts/ptbr";
import { Language } from "../types/global";

export enum PlayingStoryScreen {
  STORY = "STORY",
  REVIEW = "REVIEW",
}

export type PlayingStoryMetadata = {
  screen: PlayingStoryScreen;
  index: number | null;
};

export type PlayingStoryMetadataContextTypes = {
  metadata: PlayingStoryMetadata;
  setMetadata: (value: PlayingStoryMetadata) => void;
  preventGoToReview: boolean;
  setPreventGoToReview: (value: boolean) => void;
  usarHasSlidingTimeline: boolean;
  setUsarHasSlidingTimeline: (value: boolean) => void;
};

const PlayingStoryMetadataContext =
  React.createContext<PlayingStoryMetadataContextTypes>(
    {} as PlayingStoryMetadataContextTypes
  );

export const PlayingStoryMetadataProvider = ({
  children,
}: PropsWithChildren) => {
  const [metadata, setMetadata] = useState<PlayingStoryMetadata>({
    index: null,
    screen: PlayingStoryScreen.STORY,
  });
  const [preventGoToReview, setPreventGoToReview] = useState<boolean>(false);
  const [usarHasSlidingTimeline, setUsarHasSlidingTimeline] =
    useState<boolean>(false);

  return (
    <PlayingStoryMetadataContext.Provider
      value={{
        metadata,
        setMetadata,
        preventGoToReview,
        setPreventGoToReview,
        usarHasSlidingTimeline,
        setUsarHasSlidingTimeline,
      }}
    >
      {children}
    </PlayingStoryMetadataContext.Provider>
  );
};

export const usePlayingStoryMetadataContext = () =>
  useContext(PlayingStoryMetadataContext);
