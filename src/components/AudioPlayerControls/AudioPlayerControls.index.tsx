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
import { formatDuration } from "../../helpers/time";
import { usePlayingStoryMetadataContext } from "../../contexts/playing-story-metadata";

const SPEED_OPTIONS = [0.5, 1, 1.25, 1.5, 2];

export default function AudioPlayerControls() {
  const [openSpeedMenu, setOpenSpeedMenu] = useState(false);

  const progress = useProgress(250);
  const { bufferingDuringPlay, playing } = useIsPlaying();

  const { speed, setSpeed, setUsarHasSlidingTimeline } =
    usePlayingStoryMetadataContext();

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

      <SliderBar
        value={sliderValue}
        onTouchStart={() => setUsarHasSlidingTimeline(true)}
        onTouchEnd={() => setUsarHasSlidingTimeline(false)}
        onValueChange={handleSliderChange}
        tapToSeek
      />

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
