import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Home/Home.index";
import Search from "./Search/Search.index";
import Story, { StoryParams } from "./Story/Story.index";
import Review, { ReviewParams } from "./Review/Review.index";
import Welcome from "./Welcome/Welcome.index";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Story: StoryParams["route"]["params"];
  Review: ReviewParams["route"]["params"];
  Welcome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

export default RootStack;
