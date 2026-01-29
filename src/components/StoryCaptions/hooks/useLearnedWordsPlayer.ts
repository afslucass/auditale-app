import { useRef, useCallback, useState } from "react";
import { createAudioPlayer, useAudioPlayer } from "expo-audio";
import TrackPlayer from "react-native-track-player";

interface UseLearnedWordsPlayerProps {
  learnedWords?: any[];
}

const audioSource = require("../../../assets/audio/new_words/new_words_section_title_ptbr_1.mp3");

const AUDIO_BASE_URL =
  "https://erfcqkqqqsglmwjgodbl.supabase.co/storage/v1/object/public/learned%20words%20audios/";

const useSimpleLearnedWordsPlayer = ({
  learnedWords,
}: UseLearnedWordsPlayerProps) => {
  const playersRef = useRef<ReturnType<typeof createAudioPlayer>[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const player = useAudioPlayer(audioSource);

  // Carrega os áudios das palavras
  const loadLearnedWordsSection = useCallback(
    async (id: string) => {
      try {
        if (isLoading) return;
        setIsLoading(true);

        if (!learnedWords || learnedWords.length === 0) {
          throw new Error("Nenhuma palavra aprendida disponível");
        }

        // Filtra palavras da revisão
        const currentReviewWords = learnedWords.filter(
          (item) => item.review_id === id,
        );

        if (currentReviewWords.length === 0) {
          throw new Error("Nenhuma palavra encontrada para esta revisão");
        }

        // Limpa players anteriores
        playersRef.current.forEach((p) => {
          try {
            p.remove();
          } catch {}
        });
        playersRef.current = [];

        // Cria novos players
        const newPlayers = await Promise.all(
          currentReviewWords.map(async (wordItem) => {
            try {
              const player = createAudioPlayer({
                uri: `${AUDIO_BASE_URL}${wordItem.id}.mp3`,
              });

              // Aguarda carregamento
              await new Promise<void>((resolve) => {
                const checkLoaded = () => {
                  if (player.isLoaded) {
                    resolve();
                  } else {
                    setTimeout(checkLoaded, 50);
                  }
                };
                checkLoaded();
              });

              return player;
            } catch (err) {
              console.warn(`Erro ao criar player para ${wordItem.word}:`, err);
              return null;
            }
          }),
        );

        // Filtra players nulos
        const validPlayers = newPlayers.filter((p) => p !== null);

        if (validPlayers.length === 0) {
          throw new Error("Nenhum áudio carregado com sucesso");
        }

        playersRef.current = validPlayers;
        setIsLoading(false);

        return {
          success: true,
          count: validPlayers.length,
          total: currentReviewWords.length,
        };
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    },
    [learnedWords],
  );

  // Inicia a reprodução
  const playLearnedWordsSection = useCallback(async () => {
    if (isPlaying || playersRef.current.length === 0) return;

    try {
      setIsPlaying(true);

      // Pausa música de fundo
      await TrackPlayer.pause();

      // Toca áudio de introdução
      player.seekTo(0);
      player.play();

      // Aguarda introdução
      await new Promise((resolve) =>
        setTimeout(resolve, player.duration * 1000),
      );

      // Toca cada palavra em sequência
      for (const audioPlayer of playersRef.current) {
        audioPlayer.seekTo(0);
        audioPlayer.play();

        await new Promise((resolve) =>
          setTimeout(resolve, (audioPlayer.duration || 2) * 1000),
        );

        audioPlayer.pause();
        audioPlayer.seekTo(0);
      }

      // Retoma música de fundo
      await TrackPlayer.play();
      setIsPlaying(false);
    } catch (error) {
      console.error("Erro na reprodução:", error);
      setIsPlaying(false);
      try {
        await TrackPlayer.play();
      } catch {}
    }
  }, [isPlaying, player]);

  // Para a reprodução
  const stopPlayback = useCallback(async () => {
    setIsPlaying(false);

    // Pausa todos os players
    playersRef.current.forEach((p) => {
      try {
        p.pause();
        p.seekTo(0);
      } catch {}
    });

    // Retoma música de fundo
    try {
      await TrackPlayer.play();
    } catch {}
  }, []);

  // Limpa recursos
  const clearPlayers = useCallback(() => {
    playersRef.current.forEach((p) => {
      try {
        p.remove();
      } catch {}
    });
    playersRef.current = [];
  }, []);

  return {
    // Carregamento
    loadLearnedWordsSection,

    // Reprodução
    playLearnedWordsSection,
    stopPlayback,

    // Estado
    isPlaying,
    isLoading,
    hasPlayers: playersRef.current.length > 0,

    // Limpeza
    clearPlayers,
  };
};

export default useSimpleLearnedWordsPlayer;
