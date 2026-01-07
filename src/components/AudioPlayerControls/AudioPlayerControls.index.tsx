import React, { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Modal } from "react-native";
import TrackPlayer, {
  State,
  useIsPlaying,
  useProgress,
} from "react-native-track-player";

import {
  Container,
  ControlsRow,
  ControlButton,
  PlayButton,
  SpeedRow,
  SpeedLabel,
  SpeedButton,
  SpeedText,
  TimeText,
  DropdownOverlay,
  DropdownContainer,
  DropdownItem,
  DropdownText,
  TimeRow,
  SliderBar,
} from "./AudioPlayerControls.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors/colors";
import { Story } from "../../types/story";
import { formatDuration } from "../../helpers/time";

type Props = {
  story: Story | null;
};

const SPEED_OPTIONS = [0.5, 1, 1.25, 1.5, 2];

export default function AudioPlayerControls({ story }: Props) {
  const [speed, setSpeed] = useState(1);
  const [openSpeedMenu, setOpenSpeedMenu] = useState(false);

  const progress = useProgress(250);
  const { bufferingDuringPlay, playing } = useIsPlaying();

  async function safeSeekTo(time: number) {
    // 1️⃣ Garante decoder ativo
    if (!playing) {
      await TrackPlayer.play();
    }

    // 2️⃣ Seek seguro
    await TrackPlayer.seekTo(time);

    if (!playing) {
      await TrackPlayer.pause();
    }
  }

  const handleSliderChange = async (value: number) => {
    const time = (value * 100 * progress.duration) / 100;
    await safeSeekTo(time);
  };

  const handleBackButtonPress = async () => {
    await safeSeekTo(progress.position - 10);
  };

  const handleForwardButtonPress = async () => {
    await safeSeekTo(progress.position + 10);
  };

  const handlePlayPauseButtonPress = async () => {
    if (bufferingDuringPlay) return;

    const { state } = await TrackPlayer.getPlaybackState();
    if (state !== State.Playing) {
      await TrackPlayer.play();
      return;
    }
    await TrackPlayer.pause();
  };

  useEffect(() => {
    if (story) {
      const configureTrack = async () => {
        const track = {
          url: story!.audio,
          title: story!.title,
          artist: "Auditale",
          genre: story!.description,
          artwork: "https://picsum.photos/200",
          duration: 530,
        };
        await TrackPlayer.add([track]);
        TrackPlayer.play();
      };
      configureTrack();
    }
  }, [story]);

  useEffect(() => {
    TrackPlayer.setRate(speed);
  }, [speed]);

  const sliderValue = (progress.position * 100) / progress.duration / 100;

  return (
    <Container>
      <ControlsRow>
        <ControlButton onPress={handleBackButtonPress}>
          <Ionicons name="play-back" size={24} color={COLORS.WHITE} />
        </ControlButton>
        <PlayButton onPress={handlePlayPauseButtonPress}>
          {bufferingDuringPlay ? (
            <ActivityIndicator color={COLORS.WHITE} />
          ) : (
            <Ionicons
              name={playing ? "pause" : "play"}
              size={24}
              color={COLORS.WHITE}
            />
          )}
        </PlayButton>
        <ControlButton onPress={handleForwardButtonPress}>
          <Ionicons name="play-forward" size={24} color={COLORS.WHITE} />
        </ControlButton>
      </ControlsRow>

      <TimeRow>
        <SpeedRow>
          <SpeedLabel>Speed:</SpeedLabel>
          <SpeedButton onPress={() => setOpenSpeedMenu(true)}>
            <SpeedText>{speed}x</SpeedText>
          </SpeedButton>
        </SpeedRow>
        <TimeText>
          {formatDuration(progress.position)} /{" "}
          {formatDuration(progress.duration)}
        </TimeText>
      </TimeRow>

      <SliderBar
        value={sliderValue}
        onValueChange={handleSliderChange}
        tapToSeek
      />

      <Modal transparent visible={openSpeedMenu} animationType="fade">
        <DropdownOverlay onPress={() => setOpenSpeedMenu(false)}>
          <DropdownContainer>
            {SPEED_OPTIONS.map((item) => (
              <DropdownItem
                key={item}
                onPress={() => {
                  setSpeed(item);
                  setOpenSpeedMenu(false);
                }}
              >
                <DropdownText>{item}x</DropdownText>
              </DropdownItem>
            ))}
          </DropdownContainer>
        </DropdownOverlay>
      </Modal>
    </Container>
  );
}
