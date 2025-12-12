import { MyText, Screen } from "./Home.styles";
import Header from "../../components/Header/Header.index";
import RecentlyPlayedSection from "./components/RecentlyPlayedSection/RecentlyPlayedSection.index";
import PlanBanner from "../../components/ PlanBanner/PlanBanner.index";
import FilterBar from "./components/FilterBar/FilterBar.index";
import GenresSection from "./components/GenresSection/GenresSection.index";
import { COLORS } from "../../constants/colors/colors";

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
      <FilterBar data={DATA} />
      <GenresSection
        data={[
          {
            id: "1",
            title: "Sci-fi",
            storiesCount: 24,
            gradient: [COLORS.PURPLE, COLORS.PURPLE_2],
            icon: "rocket",
          },
          {
            id: "2",
            title: "Action",
            storiesCount: 24,
            gradient: [COLORS.PINK, COLORS.PINK_2],
            icon: "rocket",
          },
          {
            id: "3",
            title: "Romance",
            storiesCount: 24,
            gradient: [COLORS.RED, COLORS.RED_2],
            icon: "rocket",
          },
        ]}
      />
    </Screen>
  );
}

export default Home;
