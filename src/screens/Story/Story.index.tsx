import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header/Header.index";
import { Screen, SectionsContainer } from "./Story.styles";
import StoryCaptions from "../../components/StoryCaptions/StoryCaptions.index";
import AudioPlayerControls from "../../components/AudioPlayerControls/AudioPlayerControls.index";
import useGetStoryDetails from "../../hooks/useGetStoryDetails";
import { useEffect } from "react";
import { Caption } from "../../types/story";
import TrackPlayer from "react-native-track-player";
import { usePlayingStoryMetadataContext } from "../../contexts/playing-story-metadata";
import { getStoryThumbnailImageUrl } from "../../helpers/story";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading.index";
import Error from "../../components/Error/Error.index";

export type StoryParams = {
  route: { params: { id: string; title: string } };
};

function Story({
  route: {
    params: { id, title },
  },
}: StoryParams) {
  const navigation = useNavigation<any>();

  const [getStoryDetails, { data, loading, error }] = useGetStoryDetails();
  const { speed } = usePlayingStoryMetadataContext();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleReviewPress = (params: Caption) => {
    navigation.navigate("Review", {
      id,
      caption: params,
    });
  };

  const handleRetryButton = () => {
    getStoryDetails(id);
  };

  useEffect(() => {
    getStoryDetails(id);
  }, []);

  useEffect(() => {
    if (data) {
      const configureTrack = async () => {
        await TrackPlayer.reset();
        const storyTrack = {
          id: data!.id,
          url: data!.audio,
          title: data!.title,
          artist: "Auditale",
          genre: data!.description,
          artwork: getStoryThumbnailImageUrl(data!.id),
          duration: 530,
        };

        await TrackPlayer.add([storyTrack]);
        await TrackPlayer.play();
      };
      configureTrack();
    }
  }, [data]);

  useEffect(() => {
    TrackPlayer.setRate(speed);
  }, [speed]);

  if (loading) {
    return <OverlayLoading />;
  }

  if (error) {
    return <Error onRetry={handleRetryButton} />;
  }

  return (
    <Screen>
      <Header
        variant="story"
        onBack={handleGoBack}
        title={title}
        image={getStoryThumbnailImageUrl(id)}
      />
      <SectionsContainer>
        <StoryCaptions
          id={id}
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
