import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  CaptionItem,
  CaptionText,
  Scroll,
  CaptionItemTouchable,
} from "./StoryCaptions.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors/colors";
import { LayoutChangeEvent, ScrollView } from "react-native";
import { useSystemContext } from "../../contexts/system";
import { Caption, CaptionType } from "../../types/story";
import { useProgress } from "react-native-track-player";
import { parseDurationToSeconds } from "../../helpers/time";

type Props = {
  captions?: Caption[] | null;
  onPressReview: (data: Caption) => void;
};

export default function StoryCaptions({ captions, onPressReview }: Props) {
  const { texts } = useSystemContext();
  const scrollRef = useRef<ScrollView>(null);
  const layoutsRef = useRef<Record<number, { y: number; height: number }>>({});

  const [activeIndex, setActiveIndex] = useState(0);

  const progress = useProgress(200);

  const getActiveCaptionIndex = (
    captions: Caption[],
    position: number
  ): number => {
    let activeIndex = 0;

    for (let i = 0; i < captions.length; i++) {
      const captionTime = parseDurationToSeconds(captions[i].time);

      if (captionTime <= position) {
        activeIndex = i;
      } else {
        break;
      }
    }

    if (captions[activeIndex]?.type === CaptionType.REVIEW) {
      return activeIndex - 1;
    }

    return activeIndex;
  };

  useEffect(() => {
    if (captions) {
      const index = getActiveCaptionIndex(captions, progress.position);

      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  }, [progress, captions]);

  // 🎯 Centraliza caption ativa
  useEffect(() => {
    const layout = layoutsRef.current[activeIndex];

    if (layout && scrollRef.current) {
      const centerOffset = 175; // metade da altura (350px)

      scrollRef.current.scrollTo({
        y: Math.max(layout.y - centerOffset + layout.height / 2, 0),
        animated: true,
      });
    }
  }, [activeIndex]);

  const handleLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    layoutsRef.current[index] = { y, height };
  };

  const renderCaption = (caption: Caption, index: number) => {
    const isHighlighted = index === activeIndex;
    if (caption.type === "CAPTION") {
      return (
        <CaptionItem
          onLayout={handleLayout(index)}
          collapsable={false}
          key={caption.id}
          highlighted={isHighlighted}
        >
          <CaptionText>{caption.text}</CaptionText>
          <Ionicons
            name="swap-horizontal-outline"
            size={24}
            color={COLORS.WHITE}
          />
        </CaptionItem>
      );
    }
    if (caption.type === "REVIEW") {
      return (
        <CaptionItemTouchable
          onLayout={handleLayout(index)}
          onPress={() => onPressReview(caption)}
          key={caption.id}
        >
          <CaptionText>
            {texts.COMPONENTS.STORY_CAPTIONS.REVIEWING_LABEL}
          </CaptionText>
          <Ionicons name="chevron-forward" size={24} color={COLORS.WHITE} />
        </CaptionItemTouchable>
      );
    }
  };

  return (
    <Container>
      <Scroll
        ref={scrollRef}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
      >
        {captions?.map((caption, index) => renderCaption(caption, index))}
      </Scroll>
    </Container>
  );
}
