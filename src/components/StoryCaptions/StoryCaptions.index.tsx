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
import { Caption } from "../../types/story";

type Props = {
  captions: Caption[];
  onPressReview: (data: Caption) => void;
};

export default function StoryCaptions({ captions, onPressReview }: Props) {
  const { texts } = useSystemContext();
  const [activeIndex, setActiveIndex] = useState(0);

  const renderCaption = (caption: Caption, index: number) => {
    const isHighlighted = index === activeIndex;
    if (caption.type === "CAPTION") {
      return (
        <CaptionItem
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
      <Scroll nestedScrollEnabled keyboardShouldPersistTaps="handled">
        {captions.map((caption, index) => renderCaption(caption, index))}
      </Scroll>
    </Container>
  );
}
