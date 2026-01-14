import { useEffect, useMemo, useState } from "react";
import { Caption, CaptionType } from "../../../types/story";
import { parseDurationToSeconds } from "../../../helpers/time";
import TrackPlayer, { Event } from "react-native-track-player";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  PlayingStoryScreen,
  usePlayingStoryMetadataContext,
} from "../../../contexts/playing-story-metadata";

type CaptionWithRange = Caption & {
  start: number;
  end: number;
};

type useCaptionSyncParams = {
  captions?: Caption[] | null;
};

const REVIEW_AUDIO_BASE_URL =
  "https://erfcqkqqqsglmwjgodbl.supabase.co/storage/v1/object/public/chapter%20review%20audios/PT_BR/";

const useCaptionSync = ({ captions }: useCaptionSyncParams) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation<any>();
  const route = useRoute();

  const {
    usarHasSlidingTimeline,
    preventGoToReview,
    setPreventGoToReview,
    metadata,
    setMetadata,
  } = usePlayingStoryMetadataContext();

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
    position: number
  ) => {
    return captions.findIndex((c) => position >= c.start && position < c.end);
  };

  useEffect(() => {
    if (timeline) {
      const sub = TrackPlayer.addEventListener(
        Event.PlaybackProgressUpdated,
        ({ position }) => {
          const index = getActiveCaptionIndex(timeline, position);
          if (index !== activeIndex && index !== -1) {
            if (captions && captions[index].type === CaptionType.REVIEW) {
              if (metadata.screen !== PlayingStoryScreen.REVIEW) {
                setMetadata({ screen: PlayingStoryScreen.REVIEW, index });
              }
              return;
            }
            if (metadata.screen !== PlayingStoryScreen.STORY) {
              setPreventGoToReview(false);
              setMetadata({ screen: PlayingStoryScreen.STORY, index });
            }

            setActiveIndex(index);
          }
        }
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

  return { activeIndex };
};

export default useCaptionSync;
