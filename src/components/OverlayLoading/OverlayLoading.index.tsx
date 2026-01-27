import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { Container, LogoContainer } from "./OverlayLoading.styles";
import auditale from "../../../assets/logos/auditale.png";

const OverlayLoading = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.bezier(0.4, 0, 0.2, 1), // Easing suave
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }),
      ]),
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [scaleValue]);

  return (
    <Container>
      <LogoContainer>
        <Animated.Image
          source={auditale}
          style={{
            transform: [{ scale: scaleValue }],
            width: 120,
            height: 120,
          }}
          resizeMode="contain"
        />
      </LogoContainer>
    </Container>
  );
};

export default OverlayLoading;
