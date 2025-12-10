import { Ionicons } from "@expo/vector-icons";
import { MyText, MyView } from "./Home.styles";

function Home() {
  return (
    <MyView>
      <MyText>Lorem Ipsumis</MyText>
      <Ionicons name="chevron-down" size={32} color="blue" />
    </MyView>
  );
}

export default Home;
