import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header/Header.index";
import { Screen, SectionsContainer } from "./Story.styles";
import { useSystemContext } from "../../contexts/system";
import StoryCaptions from "../../components/StoryCaptions/StoryCaptions.index";
import { story } from "./MOCK";
import AudioPlayerControls from "../../components/AudioPlayerControls/AudioPlayerControls.index";

function Story() {
  const navigation = useNavigation();
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
        <StoryCaptions captions={story} />
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
