import { useEffect, useMemo, useState } from "react";
import { Caption, CaptionType } from "../../../types/story";
import { parseDurationToSeconds } from "../../../helpers/time";
import TrackPlayer, { Event } from "react-native-track-player";

type CaptionWithRange = Caption & {
  start: number;
  end: number;
};

type useCaptionSyncParams = {
  captions?: Caption[] | null;
};

const useCaptionSync = ({ captions }: useCaptionSyncParams) => {
  const [activeIndex, setActiveIndex] = useState(0);

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
              setActiveIndex(index - 1);
              return;
            }
            setActiveIndex(index);
          }
        }
      );
      return () => sub.remove();
    }
  }, [timeline, activeIndex]);

  return { activeIndex };
};

export default useCaptionSync;
