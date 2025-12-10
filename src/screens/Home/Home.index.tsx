import { Ionicons } from "@expo/vector-icons";
import { MyText } from "./Home.styles";
import Header from "../../components/Header/Header.index";
import { ScrollView } from "react-native";

function Home() {
  return (
    <ScrollView>
      <Header />
      <MyText>Lorem Ipsumis</MyText>
      <Ionicons name="chevron-down" size={32} color="blue" />
    </ScrollView>
  );
}

export default Home;
