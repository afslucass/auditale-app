import React, { PropsWithChildren, useContext, useState } from "react";

export enum PlayingStoryScreen {
  STORY = "STORY",
  REVIEW = "REVIEW",
}

export type PlayingStoryMetadata = {
  screen: PlayingStoryScreen;
  index: number | null;
  lastReviewId: string | null;
};

export type PlayingStoryMetadataContextTypes = {
  metadata: PlayingStoryMetadata;
  setMetadata: (value: PlayingStoryMetadata) => void;
  preventGoToReview: boolean;
  setPreventGoToReview: (value: boolean) => void;
  usarHasSlidingTimeline: boolean;
  setUsarHasSlidingTimeline: (value: boolean) => void;
  speed: number;
  setSpeed: (value: number) => void;
};

const PlayingStoryMetadataContext =
  React.createContext<PlayingStoryMetadataContextTypes>(
    {} as PlayingStoryMetadataContextTypes,
  );

export const PlayingStoryMetadataProvider = ({
  children,
}: PropsWithChildren) => {
  const [metadata, setMetadata] = useState<PlayingStoryMetadata>({
    index: null,
    screen: PlayingStoryScreen.STORY,
    lastReviewId: null,
  });
  const [preventGoToReview, setPreventGoToReview] = useState<boolean>(false);
  const [usarHasSlidingTimeline, setUsarHasSlidingTimeline] =
    useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);

  return (
    <PlayingStoryMetadataContext.Provider
      value={{
        metadata,
        setMetadata,
        preventGoToReview,
        setPreventGoToReview,
        usarHasSlidingTimeline,
        setUsarHasSlidingTimeline,
        speed,
        setSpeed,
      }}
    >
      {children}
    </PlayingStoryMetadataContext.Provider>
  );
};

export const usePlayingStoryMetadataContext = () =>
  useContext(PlayingStoryMetadataContext);
