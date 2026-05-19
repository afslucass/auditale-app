import { useRef, useCallback, useState, useEffect } from "react";
import { createAudioPlayer, useAudioPlayer, AudioPlayer } from "expo-audio";
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from "react-native-track-player";

import { usePlayingStoryMetadataContext } from "../../../contexts/playing-story-metadata";

interface UseLearnedWordsPlayerProps {
  learnedWords?: any[];
}

type PlayLearnedWordsSectionParams = {
  preventPlayStory: boolean;
};

const audioSource = require("../../../assets/audio/new_words/new_words_section_title_ptbr_1.mp3");

const AUDIO_BASE_URL = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/learned%20words%20audios/`;

const useSimpleLearnedWordsPlayer = ({
  learnedWords,
}: UseLearnedWordsPlayerProps) => {
  const playersRef = useRef<AudioPlayer[]>([]);
  const queueRef = useRef<AudioPlayer[]>([]);
  const currentIndexRef = useRef<number>(0);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);
  const isMountedRef = useRef(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const introPlayer = useAudioPlayer(audioSource);

  const { speed } = usePlayingStoryMetadataContext();
  const playbackRateRef = useRef(speed);

  const applyPlaybackRate = (player: AudioPlayer) => {
    try {
      player.setPlaybackRate(playbackRateRef.current);
    } catch (err) {
      console.warn("Erro ao aplicar playback rate", err);
    }
  };

  useTrackPlayerEvents([Event.PlaybackState], (event) => {
    if (event.state === State.Paused || event.state === State.Playing) {
      pauseAllPlayers();
    }

    if (event.state === State.Stopped || event.state === State.Ended) {
      stopAllPlayers();
    }
  });

  const loadLearnedWordsSection = useCallback(
    async (id: string) => {
      try {
        if (isLoading) return;

        setIsLoading(true);

        const currentReviewWords = learnedWords?.filter(
          (item) => item.review_id === id,
        );

        if (!currentReviewWords?.length) {
          throw new Error("Nenhuma palavra encontrada");
        }

        clearPlayers();

        const loadedPlayers = await Promise.all(
          currentReviewWords.map(async (wordItem) => {
            try {
              const player = createAudioPlayer({
                uri: `${AUDIO_BASE_URL}${wordItem.id}.mp3`,
              });
              applyPlaybackRate(player);

              return player;
            } catch (err) {
              console.warn(err);
              return null;
            }
          }),
        );

        playersRef.current = loadedPlayers.filter(Boolean) as AudioPlayer[];

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    },
    [learnedWords, isLoading],
  );

  const playNextAudio = useCallback(async () => {
    if (!isMountedRef.current) return;

    const currentIndex = currentIndexRef.current;

    if (currentIndex >= queueRef.current.length) {
      setIsPlaying(false);

      try {
        await TrackPlayer.play();
      } catch {}

      return;
    }

    const currentPlayer = queueRef.current[currentIndex];

    if (!currentPlayer) {
      return;
    }

    currentPlayer.seekTo(0);
    applyPlaybackRate(currentPlayer);
    currentPlayer.play();

    const interval = setInterval(() => {
      if (!isMountedRef.current) {
        clearInterval(interval);
        return;
      }

      try {
        const ended =
          currentPlayer.currentTime >= (currentPlayer.duration || 0);

        if (ended) {
          clearInterval(interval);

          currentPlayer.pause();
          currentPlayer.seekTo(0);

          currentIndexRef.current += 1;

          playNextAudio();
        }
      } catch (err) {
        clearInterval(interval);
      }
    }, 150);

    intervalsRef.current.push(interval);
  }, []);

  const playLearnedWordsSection = useCallback(
    async (params?: PlayLearnedWordsSectionParams) => {
      if (isPlaying) return;

      if (!playersRef.current.length) return;

      setIsPlaying(true);

      currentIndexRef.current = 0;

      queueRef.current = [...playersRef.current];

      try {
        await TrackPlayer.pause();

        introPlayer.seekTo(0);
        applyPlaybackRate(introPlayer);
        introPlayer.play();

        const introInterval = setInterval(() => {
          if (!isMountedRef.current) {
            clearInterval(introInterval);
            return;
          }

          try {
            const currentTime = introPlayer.currentTime ?? 0;
            const duration = introPlayer.duration ?? 0;

            const ended = duration > 0 && currentTime >= duration;

            if (ended) {
              clearInterval(introInterval);

              try {
                introPlayer.pause();
                introPlayer.seekTo(0);
              } catch {}

              playNextAudio();
            }
          } catch (err) {
            clearInterval(introInterval);
          }
        }, 150);
        intervalsRef.current.push(introInterval);
      } catch (err) {
        console.error(err);

        setIsPlaying(false);

        if (!params?.preventPlayStory) {
          try {
            await TrackPlayer.play();
          } catch {}
        }
      }
    },
    [introPlayer, isPlaying, playNextAudio],
  );

  const pauseAllPlayers = () => {
    introPlayer.pause();

    playersRef.current.forEach((p) => {
      try {
        p.pause();
      } catch {}
    });

    setIsPlaying(false);
  };

  const stopAllPlayers = () => {
    introPlayer.pause();
    introPlayer.seekTo(0);

    playersRef.current.forEach((p) => {
      try {
        p.pause();
        p.seekTo(0);
      } catch {}
    });

    currentIndexRef.current = 0;

    setIsPlaying(false);
  };

  const clearPlayers = () => {
    playersRef.current.forEach((p) => {
      try {
        p.remove();
      } catch {}
    });

    playersRef.current = [];
  };

  const clearAllIntervals = () => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
  };

  useEffect(() => {
    playbackRateRef.current = speed;

    try {
      introPlayer.setPlaybackRate(speed);
    } catch {}

    playersRef.current.forEach((player) => {
      try {
        player.setPlaybackRate(speed);
      } catch {}
    });
  }, [speed, introPlayer, playersRef]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      clearAllIntervals();

      try {
        introPlayer.pause();
      } catch {}

      clearPlayers();
    };
  }, []);

  return {
    loadLearnedWordsSection,
    playLearnedWordsSection,

    stopPlayback: stopAllPlayers,

    isPlaying,
    isLoading,

    hasPlayers: playersRef.current.length > 0,

    clearPlayers,
  };
};

export default useSimpleLearnedWordsPlayer;
