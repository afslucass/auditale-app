import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  CaptionItem,
  CaptionText,
  Scroll,
} from "./StoryCaptions.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors/colors";
import { LayoutChangeEvent, ScrollView } from "react-native";

export type Caption = {
  id: string;
  text: string;
  highlighted?: boolean;
};

type Props = {
  captions: Caption[];
};

export default function StoryCaptions({ captions }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const layoutsRef = useRef<Record<number, { y: number; height: number }>>({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (captions.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev < captions.length - 1 ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, [captions.length]);

  useEffect(() => {
    const layout = layoutsRef.current[activeIndex];

    if (layout && scrollRef.current) {
      const centerOffset = 175; // metade de 350px

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

  return (
    <Container>
      <Scroll
        ref={scrollRef}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
      >
        {captions.map((caption, index) => {
          const isHighlighted = index === activeIndex;
          return (
            <CaptionItem
              collapsable={false}
              key={caption.id}
              highlighted={isHighlighted}
              onLayout={handleLayout(index)}
            >
              <CaptionText highlighted={isHighlighted}>
                {caption.text}
              </CaptionText>
              <Ionicons
                name="swap-horizontal-outline"
                size={24}
                color={COLORS.WHITE}
              />
            </CaptionItem>
          );
        })}
      </Scroll>
    </Container>
  );
}
