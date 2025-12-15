import React from "react";
import {
  Container,
  LeftSection,
  Title,
  Subtitle,
  UpgradeButton,
  UpgradeButtonText,
  Gradient,
} from "./PlanBanner.styles";
import { useSystemContext } from "../../contexts/system";
import { COLORS } from "../../constants/colors/colors";

export default function PlanBanner() {
  const { texts } = useSystemContext();

  return (
    <Container>
      <Gradient
        colors={[COLORS.ORANGE, COLORS.RED]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <LeftSection>
          <Title>{texts.COMPONENTS.PLAN_BANNER.TITLE}</Title>
          <Subtitle>{texts.COMPONENTS.PLAN_BANNER.SUBTITLE}</Subtitle>
        </LeftSection>
        <UpgradeButton activeOpacity={0.5}>
          <UpgradeButtonText>
            {texts.COMPONENTS.PLAN_BANNER.BUTTON}
          </UpgradeButtonText>
        </UpgradeButton>
      </Gradient>
    </Container>
  );
}
