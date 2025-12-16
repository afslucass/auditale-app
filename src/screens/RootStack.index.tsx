import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Home/Home.index";
import Search from "./Search/Search.index";
import Story from "./Story/Story.index";
import Review from "./Review/Review.index";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Story: undefined;
  Review: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen name="Review" component={Review} />
    </Stack.Navigator>
  );
};

export default RootStack;
