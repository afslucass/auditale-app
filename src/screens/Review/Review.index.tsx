import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header/Header.index";
import { Screen } from "./Review.styles";
import { useSystemContext } from "../../contexts/system";

function Review() {
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
    </Screen>
  );
}

export default Review;
