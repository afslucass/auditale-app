import { MyText, Screen } from "./Home.styles";
import Header from "../../components/Header/Header.index";
import RecentlyPlayedSection from "./components/RecentlyPlayedSection/RecentlyPlayedSection.index";
import PlanBanner from "../../components/PlanBanner/PlanBanner.index";
import FilterBar from "./components/FilterBar/FilterBar.index";
import GenresSection from "./components/GenresSection/GenresSection.index";
import { COLORS } from "../../constants/colors/colors";

const RECENTLY_STORIES_DATA = [
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

const STORIES_DATA = [
  {
    id: "0",
    image: "https://picsum.photos/200",
    title: "Story title",
    description:
      "A thrilling cyberpunk adventure through the digital underground",
    category: "Cyberpunk",
    duration: 12,
  },
  {
    id: "1",
    image: "https://picsum.photos/200",
    title: "Story title",
    description:
      "A thrilling cyberpunk adventure through the digital underground",
    category: "Cyberpunk",
    duration: 32,
  },
];

function Home() {
  return (
    <Screen>
      <Header />
      <RecentlyPlayedSection data={RECENTLY_STORIES_DATA} />
      <PlanBanner />
      <FilterBar data={STORIES_DATA} />
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
            icon: "car-sport",
          },
          {
            id: "3",
            title: "Romance",
            storiesCount: 24,
            gradient: [COLORS.RED, COLORS.RED_2],
            icon: "heart-outline",
          },
        ]}
      />
    </Screen>
  );
}

export default Home;
