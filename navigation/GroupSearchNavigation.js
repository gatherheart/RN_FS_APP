import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as Color from "../constants/Color";
import GroupSearch from "../screens/Group/GroupSearch/GroupSearch";
import FirstCategory from "../screens/Group/GroupSearch/FirstCategory";
import SecondCategory from "../screens/Group/GroupSearch/SecondCategory";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Color.BG_COLOR,
        borderBottomColor: Color.BG_COLOR,
        shadowColor: Color.BG_COLOR,
        borderWidth: 0,
      },
      headerBackTitleVisible: false,
      headerShown: true,
    }}
  >
    <Stack.Screen
      name="FirstCategory"
      component={FirstCategory}
      options={{ title: "My home" }}
    ></Stack.Screen>
    <Stack.Screen
      name="SecondCategory"
      component={SecondCategory}
      options={{ title: "My home" }}
    ></Stack.Screen>
    <Stack.Screen name="GroupSearch" component={GroupSearch}></Stack.Screen>
  </Stack.Navigator>
);
