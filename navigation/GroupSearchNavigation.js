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
      },
      headerTintColor: Color.TINT_COLOR,
      headerBackTitleVisible: false,
      headerShown: false,
    }}
  >
    <Stack.Screen name="FirstCategory" component={FirstCategory}></Stack.Screen>
    <Stack.Screen
      name="SecondCategory"
      component={SecondCategory}
    ></Stack.Screen>
    <Stack.Screen name="GroupSearch" component={GroupSearch}></Stack.Screen>
  </Stack.Navigator>
);
