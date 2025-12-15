import React, { useState } from "react";
import { Modal, TouchableOpacity } from "react-native";

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
  ProgressContainer,
  ProgressBackground,
  ProgressFill,
  DropdownOverlay,
  DropdownContainer,
  DropdownItem,
  DropdownText,
  TimeRow,
} from "./AudioPlayerControls.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors/colors";

type Props = {
  progress: number; // 0 a 1
  currentTime: string;
  totalTime: string;
};

const SPEED_OPTIONS = ["0.5x", "1x", "1.25x", "1.5x", "2x"];

export default function AudioPlayerControls({
  progress,
  currentTime,
  totalTime,
}: Props) {
  const [speed, setSpeed] = useState("1x");
  const [isPlaying, setIsPlaying] = useState(true);
  const [openSpeed, setOpenSpeed] = useState(false);

  return (
    <Container>
      <ControlsRow>
        <ControlButton>
          <Ionicons name="play-back" size={24} color={COLORS.WHITE} />
        </ControlButton>
        <PlayButton onPress={() => setIsPlaying(!isPlaying)}>
          <Ionicons
            name={isPlaying ? "play" : "pause"}
            size={24}
            color={COLORS.WHITE}
          />
        </PlayButton>
        <ControlButton>
          <Ionicons name="play-forward" size={24} color={COLORS.WHITE} />
        </ControlButton>
      </ControlsRow>

      <TimeRow>
        <SpeedRow>
          <SpeedLabel>Speed:</SpeedLabel>
          <SpeedButton onPress={() => setOpenSpeed(true)}>
            <SpeedText>{speed}</SpeedText>
          </SpeedButton>
        </SpeedRow>
        <TimeText>
          {currentTime} / {totalTime}
        </TimeText>
      </TimeRow>

      <ProgressContainer>
        <ProgressBackground>
          <ProgressFill progress={progress} />
        </ProgressBackground>
      </ProgressContainer>

      <Modal transparent visible={openSpeed} animationType="fade">
        <DropdownOverlay onPress={() => setOpenSpeed(false)}>
          <DropdownContainer>
            {SPEED_OPTIONS.map((item) => (
              <DropdownItem
                key={item}
                onPress={() => {
                  setSpeed(item);
                  setOpenSpeed(false);
                }}
              >
                <DropdownText>{item}</DropdownText>
              </DropdownItem>
            ))}
          </DropdownContainer>
        </DropdownOverlay>
      </Modal>
    </Container>
  );
}
