import { useEffect, useMemo, useState } from "react";
import { Caption, CaptionType, LearnedWords } from "../../../types/story";
import { parseDurationToSeconds } from "../../../helpers/time";
import TrackPlayer, { Event } from "react-native-track-player";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  PlayingStoryScreen,
  usePlayingStoryMetadataContext,
} from "../../../contexts/playing-story-metadata";
import StoriesService from "../../../infra/services/stories";

import useLearnedWordsPlayer from "./useLearnedWordsPlayer";

type CaptionWithRange = Caption & {
  start: number;
  end: number;
};

type useCaptionSyncParams = {
  id: string;
  captions?: Caption[] | null;
};

const useCaptionSync = ({ id, captions }: useCaptionSyncParams) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [learnedWords, setLearnedWords] = useState<LearnedWords[] | null>(null);

  const navigation = useNavigation<any>();

  const route = useRoute();

  const {
    usarHasSlidingTimeline,
    preventGoToReview,
    setPreventGoToReview,
    metadata,
    setMetadata,
  } = usePlayingStoryMetadataContext();
  const { loadLearnedWordsSection, playLearnedWordsSection } =
    useLearnedWordsPlayer({ learnedWords } as any);

  const timeline = useMemo((): undefined | CaptionWithRange[] => {
    return captions?.map((caption, index) => {
      const start = parseDurationToSeconds(caption.time);
      const next = captions[index + 1];

      return {
        ...caption,
        start,
        end: next ? parseDurationToSeconds(next.time) : Infinity,
      };
    });
  }, [captions]);

  const getActiveCaptionIndex = (
    captions: CaptionWithRange[],
    position: number,
  ) => {
    return captions.findIndex((c) => position >= c.start && position < c.end);
  };

  useEffect(() => {
    if (timeline) {
      const sub = TrackPlayer.addEventListener(
        Event.PlaybackProgressUpdated,
        async ({ position }) => {
          const index = getActiveCaptionIndex(timeline, position);
          if (index !== activeIndex && index !== -1) {
            if (captions && captions[index].type === CaptionType.REVIEW) {
              if (metadata.screen !== PlayingStoryScreen.REVIEW) {
                setMetadata({
                  screen: PlayingStoryScreen.REVIEW,
                  index,
                  lastReviewId: captions[index].id,
                });
              }
              return;
            }
            if (metadata.screen !== PlayingStoryScreen.STORY) {
              setPreventGoToReview(false);
              setMetadata({
                screen: PlayingStoryScreen.STORY,
                index,
                lastReviewId: metadata.lastReviewId,
              });
            }

            setActiveIndex(index);
          }
        },
      );
      return () => sub.remove();
    }
  }, [timeline, activeIndex]);

  useEffect(() => {
    if (!captions || !metadata.index) return;
    if (
      !usarHasSlidingTimeline &&
      !preventGoToReview &&
      metadata.screen === PlayingStoryScreen.REVIEW
    ) {
      navigation.navigate("Review", {
        id,
        caption: captions[metadata.index],
      });
      if (!usarHasSlidingTimeline) {
        loadLearnedWordsSection(captions[metadata.index].id);
      }
      return;
    }
    if (metadata.screen === PlayingStoryScreen.STORY) {
      navigation.popTo("Story", route.params);
      if (!usarHasSlidingTimeline) {
        playLearnedWordsSection();
      }
    }
  }, [metadata]);

  useEffect(() => {
    if (preventGoToReview) {
      navigation.popTo("Story", route.params);
    }
  }, [preventGoToReview]);

  useEffect(() => {
    StoriesService.getLearnedWordsByStory(id).then((value) =>
      setLearnedWords(value as any),
    );
  }, [id]);

  return { activeIndex };
};

export default useCaptionSync;
