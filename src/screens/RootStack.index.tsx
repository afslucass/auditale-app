import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Header from "../components/Header/Header.index";

import Home from "./Home/Home.index";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default RootStack;
