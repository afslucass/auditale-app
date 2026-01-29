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
import { LayoutChangeEvent, ScrollView, TouchableOpacity } from "react-native";
import { useSystemContext } from "../../contexts/system";
import { Caption, CaptionType } from "../../types/story";
import useCaptionSync from "./hooks/useCaptionSync";

type Props = {
  id: string;
  captions?: Caption[] | null;
  onPressReview: (data: Caption) => void;
};

function StoryCaptions({ id, captions, onPressReview }: Props) {
  const { texts } = useSystemContext();
  const scrollRef = useRef<ScrollView>(null);
  const layoutsRef = useRef<Record<number, { y: number; height: number }>>({});

  const { activeIndex } = useCaptionSync({ id, captions });

  const [translatedCaptionId, setTranslatedCaptionId] = useState<string>();

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

    const handleTranslateCaption = (id: string) =>
      setTranslatedCaptionId((prev) => (prev === id ? undefined : id));

    if (caption.type === "CAPTION") {
      const text =
        caption.id === translatedCaptionId
          ? caption.translate?.[0].text
          : caption.text;

      return (
        <CaptionItem
          onLayout={handleLayout(index)}
          collapsable={false}
          key={caption.id}
          highlighted={isHighlighted}
        >
          <CaptionText>{text}</CaptionText>
          <TouchableOpacity onPress={() => handleTranslateCaption(caption.id)}>
            <Ionicons
              name="swap-horizontal-outline"
              size={24}
              color={COLORS.WHITE}
            />
          </TouchableOpacity>
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

export default StoryCaptions;
