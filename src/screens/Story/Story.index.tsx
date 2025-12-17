import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header/Header.index";
import { Screen, SectionsContainer } from "./Story.styles";
import StoryCaptions, {
  Caption,
} from "../../components/StoryCaptions/StoryCaptions.index";
import AudioPlayerControls from "../../components/AudioPlayerControls/AudioPlayerControls.index";
import useGetStoryDetails from "../../hooks/useGetStoryDetails";
import { useEffect } from "react";
import { Text } from "react-native";

export type StoryParams = {
  route: { params: { id: string; title: string; thumbnail: string } };
};

function Story({
  route: {
    params: { id, title, thumbnail },
  },
}: StoryParams) {
  const navigation = useNavigation<any>();

  const [getStoryDetails, { data, loading, error }] = useGetStoryDetails();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleReviewPress = (params: Caption) => {
    navigation.navigate("Review", params);
  };

  useEffect(() => {
    getStoryDetails(id);
  }, []);

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>error</Text>;
  }

  return (
    <Screen>
      <Header
        variant="story"
        onBack={handleGoBack}
        title={title}
        image={thumbnail}
      />
      <SectionsContainer>
        <StoryCaptions
          captions={data?.content ?? ([] as Array<Caption>)}
          onPressReview={handleReviewPress}
        />
      </SectionsContainer>
      <SectionsContainer>
        <AudioPlayerControls
          progress={0.6}
          currentTime="12:00"
          totalTime="24:00"
        />
      </SectionsContainer>
    </Screen>
  );
}

export default Story;
