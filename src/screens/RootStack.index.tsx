import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Home/Home.index";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default RootStack;
