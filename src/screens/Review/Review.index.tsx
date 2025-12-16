import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header/Header.index";
import { Screen, SectionsContainer } from "./Review.styles";
import { useSystemContext } from "../../contexts/system";
import DescriptionBox from "../../components/DescriptionBox/DescriptionBox.index";
import VocabularyCheck from "../../components/VocabularyCheck/VocabularyCheck.index";

export type Caption = {
  id: string;
  text?: string;
  translate?: string;
  time: string;
  type: "CAPTION" | "REVIEW";
  translatedDescription: string;
  learned: Array<{ word: string; translation: string }>;
};

type Props = { route: { params: Caption } };

function Review({
  route: {
    params: { translatedDescription, learned },
  },
}: Props) {
  const navigation = useNavigation();
  console.log(translatedDescription);
  const { texts } = useSystemContext();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Screen>
      <Header
        variant="story"
        onBack={handleGoBack}
        title={"King Arthur"}
        image="https://picsum.photos/200"
      />
      <SectionsContainer>
        <DescriptionBox text={translatedDescription} />
        <VocabularyCheck items={learned} />
      </SectionsContainer>
    </Screen>
  );
}

export default Review;
