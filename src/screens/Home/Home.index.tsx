import { MyText, Screen } from "./Home.styles";
import Header from "../../components/Header/Header.index";
import RecentlyPlayedSection from "./components/RecentlyPlayedSection/RecentlyPlayedSection.index";
import PlanBanner from "../../components/ PlanBanner/PlanBanner.index";
import FilterBar from "./components/FilterBar/FilterBar.index";

const DATA = [
  {
    id: 0,
    image: "https://picsum.photos/200",
    title: "Story title",
    progress: 25,
    category: "Cyberpunk",
  },
  {
    id: 1,
    image: "https://picsum.photos/200",
    title: "Story title",
    progress: 50,
    category: "Cyberpunk",
  },
];

function Home() {
  return (
    <Screen>
      <Header />
      <RecentlyPlayedSection data={DATA} />
      <PlanBanner />
      <FilterBar />
    </Screen>
  );
}

export default Home;
