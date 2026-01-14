import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header/Header.index";
import { Screen, SectionsContainer } from "./Story.styles";
import StoryCaptions from "../../components/StoryCaptions/StoryCaptions.index";
import AudioPlayerControls from "../../components/AudioPlayerControls/AudioPlayerControls.index";
import useGetStoryDetails from "../../hooks/useGetStoryDetails";
import { useEffect } from "react";
import { Text } from "react-native";
import { Caption } from "../../types/story";
import TrackPlayer from "react-native-track-player";

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
    navigation.navigate("Review", {
      caption: params,
    });
  };

  useEffect(() => {
    getStoryDetails(id);
  }, []);

  useEffect(() => {
    if (data) {
      const configureTrack = async () => {
        const storyTrack = {
          id: data!.id,
          url: data!.audio,
          title: data!.title,
          artist: "Auditale",
          genre: data!.description,
          artwork: "https://picsum.photos/200",
          duration: 530,
        };

        await TrackPlayer.add([storyTrack]);
        await TrackPlayer.play();
      };
      configureTrack();
    }
  }, [data]);

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
        <AudioPlayerControls />
      </SectionsContainer>
    </Screen>
  );
}

export default Story;
