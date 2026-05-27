import { useEffect, useMemo, useRef, useState } from "react";
import { Caption, CaptionType } from "../../../types/story";
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

type UseCaptionSyncParams = {
  id: string;
  title: string;
  captions?: Caption[] | null;
};

const useCaptionSync = ({ id, title, captions }: UseCaptionSyncParams) => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const [activeIndex, setActiveIndex] = useState(0);

  // ======================================================
  // REFS
  // ======================================================

  const activeIndexRef = useRef(0);

  const reviewTransitionRef = useRef(false);

  const mountedRef = useRef(true);

  // ======================================================
  // CONTEXT
  // ======================================================

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
    useLearnedWordsPlayer({
      learnedWords,
    } as any);

  // ======================================================
  // TIMELINE
  // ======================================================

  const timeline = useMemo((): CaptionWithRange[] | undefined => {
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

  // ======================================================
  // HELPERS
  // ======================================================

  const updateActiveIndex = (value: number) => {
    activeIndexRef.current = value;
    setActiveIndex(value);
  };

  const getActiveCaptionIndex = (
    timeline: CaptionWithRange[],
    position: number,
  ) => {
    return timeline.findIndex((c) => position >= c.start && position < c.end);
  };

  // ======================================================
  // PLAYBACK SYNC
  // ======================================================

  useEffect(() => {
    if (!timeline?.length) return;

    const playbackUpdateListener = TrackPlayer.addEventListener(
      Event.PlaybackProgressUpdated,
      async ({ position }) => {
        if (!mountedRef.current) return;

        const index = getActiveCaptionIndex(timeline, position);

        if (index === -1) return;

        // evita processamento duplicado
        if (index === activeIndexRef.current) return;

        updateActiveIndex(index);

        const currentCaption = captions?.[index];

        if (!currentCaption) return;

        // ======================================================
        // REVIEW
        // ======================================================

        if (currentCaption.type === CaptionType.REVIEW) {
          if (reviewTransitionRef.current) return;

          reviewTransitionRef.current = true;

          try {
            if (metadata.screen !== PlayingStoryScreen.REVIEW) {
              if (!usarHasSlidingTimeline) {
                loadLearnedWordsSection(currentCaption.id);
              }

              setMetadata({
                screen: PlayingStoryScreen.REVIEW,
                index,
                lastReviewId: currentCaption.id,
              });
            }
          } finally {
            reviewTransitionRef.current = false;
          }

          return;
        }

        // ======================================================
        // SAIU DA REVIEW
        // ======================================================

        const previousCaption = captions?.[index - 1];

        if (previousCaption?.type === CaptionType.REVIEW) {
          if (!usarHasSlidingTimeline) {
            playLearnedWordsSection();
          }
        }

        // ======================================================
        // STORY
        // ======================================================

        if (metadata.screen !== PlayingStoryScreen.STORY) {
          setPreventGoToReview(false);

          setMetadata({
            screen: PlayingStoryScreen.STORY,
            index,
            lastReviewId: metadata.lastReviewId,
          });
        }
      },
    );

    const playbackEndedListener = TrackPlayer.addEventListener(
      Event.PlaybackQueueEnded,
      async () => {
        if (!usarHasSlidingTimeline) {
          playLearnedWordsSection({
            preventPlayStory: true,
          });

          await TrackPlayer.seekTo(0);

          navigation.popTo("Story", route.params as any);
        }
      },
    );

    return () => {
      playbackUpdateListener.remove();
      playbackEndedListener.remove();
    };
  }, [timeline]);

  // ======================================================
  // NAVIGATION
  // ======================================================

  useEffect(() => {
    if (!captions) return;

    if (metadata.index === undefined || metadata.index === null) {
      return;
    }

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
      navigation.popTo("Story", route.params as any);
    }
  }, [metadata]);

  // ======================================================
  // FORCE RETURN TO STORY
  // ======================================================

  useEffect(() => {
    if (!preventGoToReview) return;

    navigation.popTo("Story", route.params as any);

    setPreventGoToReview(false);
  }, [preventGoToReview]);

  // ======================================================
  // LOAD LEARNED WORDS
  // ======================================================

  useEffect(() => {
    StoriesService.getLearnedWordsByStory(id).then((value) => {
      if (!mountedRef.current) return;

      setLearnedWords(value as any);
    });
  }, [id]);

  // ======================================================
  // CLEANUP
  // ======================================================

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // ======================================================
  // SEEK SYNC HELPERS
  // ======================================================

  const syncCaptionWithPosition = (position: number) => {
    if (!timeline?.length) return;

    const index = getActiveCaptionIndex(timeline, position);

    if (index === -1) return;

    updateActiveIndex(index);
  };

  return {
    activeIndex,
    syncCaptionWithPosition,
  };
};

export default useCaptionSync;
