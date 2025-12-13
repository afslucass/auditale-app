import Header from "../../components/Header/Header.index";
import FilterBar from "./components/FilterBar/FilterBar.index";
import { Screen } from "./Search.styles";

const STORIES_DATA = [
  {
    id: 0,
    image: "https://picsum.photos/200",
    title: "Story title",
    description:
      "A thrilling cyberpunk adventure through the digital underground",
    category: "Cyberpunk",
    duration: 12,
  },
  {
    id: 1,
    image: "https://picsum.photos/200",
    title: "Story title",
    description:
      "A thrilling cyberpunk adventure through the digital underground",
    category: "Cyberpunk",
    duration: 32,
  },
];

function Search() {
  return (
    <Screen>
      <Header />
      <FilterBar data={STORIES_DATA} />
    </Screen>
  );
}

export default Search;
