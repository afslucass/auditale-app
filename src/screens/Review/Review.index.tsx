import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header/Header.index";
import { Screen, SectionsContainer } from "./Review.styles";
import DescriptionBox from "../../components/DescriptionBox/DescriptionBox.index";
import VocabularyCheck from "../../components/VocabularyCheck/VocabularyCheck.index";
import { Caption } from "../../types/story";
import AudioPlayerControls from "../../components/AudioPlayerControls/AudioPlayerControls.index";
import { usePlayingStoryMetadataContext } from "../../contexts/playing-story-metadata";
import { getStoryThumbnailImageUrl } from "../../helpers/story";

export type ReviewParams = {
  route: { params: { id: string; caption: Caption } };
};

function Review({
  route: {
    params: {
      id: storyId,
      caption: { id: captionId, translate },
    },
  },
}: ReviewParams) {
  const navigation = useNavigation();
  const { setPreventGoToReview, learnedWords } =
    usePlayingStoryMetadataContext();

  const learnedWordsFromThisChapter = learnedWords?.filter(
    (word) => word.review_id === captionId,
  );

  const handleGoBack = () => {
    setPreventGoToReview(true);
  };

  if (!translate || !learnedWordsFromThisChapter) {
    return null;
  }

  return (
    <Screen>
      <Header
        variant="story"
        onBack={handleGoBack}
        title={"King Arthur"}
        image={getStoryThumbnailImageUrl(storyId)}
      />
      <SectionsContainer>
        <AudioPlayerControls />
        <DescriptionBox text={translate[0].text} />
        <VocabularyCheck items={learnedWordsFromThisChapter} />
      </SectionsContainer>
    </Screen>
  );
}

export default Review;
