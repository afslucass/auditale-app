import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header/Header.index";
import { Screen, SectionsContainer } from "./Review.styles";
import DescriptionBox from "../../components/DescriptionBox/DescriptionBox.index";
import VocabularyCheck from "../../components/VocabularyCheck/VocabularyCheck.index";
import { Caption } from "../../types/story";

export type ReviewParams = { route: { params: Caption } };

function Review({
  route: {
    params: { translate, newWords },
  },
}: ReviewParams) {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (!translate || !newWords) {
    return null;
  }

  return (
    <Screen>
      <Header
        variant="story"
        onBack={handleGoBack}
        title={"King Arthur"}
        image="https://picsum.photos/200"
      />
      <SectionsContainer>
        <DescriptionBox text={translate[0].text} />
        <VocabularyCheck items={newWords} />
      </SectionsContainer>
    </Screen>
  );
}

export default Review;
