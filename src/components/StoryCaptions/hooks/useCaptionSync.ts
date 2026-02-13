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
  title: string;
  captions?: Caption[] | null;
};

const useCaptionSync = ({ id, title, captions }: useCaptionSyncParams) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navigation = useNavigation<any>();

  const route = useRoute();

  const {
    usarHasSlidingTimeline,
    preventGoToReview,
    setPreventGoToReview,
    metadata,
    setMetadata,
    learnedWords,
    setLearnedWords,
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
      const playbackUpdateListener = TrackPlayer.addEventListener(
        Event.PlaybackProgressUpdated,
        async ({ position }) => {
          const index = getActiveCaptionIndex(timeline, position);
          if (index !== activeIndex && index !== -1) {
            if (captions && captions[index].type === CaptionType.REVIEW) {
              if (metadata.screen !== PlayingStoryScreen.REVIEW) {
                if (!usarHasSlidingTimeline) {
                  loadLearnedWordsSection(captions[index].id);
                }
                setMetadata({
                  screen: PlayingStoryScreen.REVIEW,
                  index,
                  lastReviewId: captions[index].id,
                });
              }
              setActiveIndex(index);
              return;
            }
            if (captions && captions[index - 1].type === CaptionType.REVIEW) {
              if (!usarHasSlidingTimeline) {
                playLearnedWordsSection();
              }
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

      const playbackEndedListener = TrackPlayer.addEventListener(
        Event.PlaybackQueueEnded,
        () => {
          if (!usarHasSlidingTimeline) {
            playLearnedWordsSection({ preventPlayStory: true });
            TrackPlayer.seekTo(0);
            navigation.popTo("Story", route.params);
          }
        },
      );
      return () => {
        playbackUpdateListener.remove();
        playbackEndedListener.remove();
      };
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
        title,
        caption: captions[metadata.index],
      });
      return;
    }
    if (metadata.screen === PlayingStoryScreen.STORY) {
      navigation.popTo("Story", route.params);
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
