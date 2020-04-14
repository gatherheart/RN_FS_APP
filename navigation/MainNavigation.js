import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./TabNavigation";
import GroupStack from "./GroupNavigation";
import GroupSearchScreen from "../screens/Group/GroupSearch";
import GroupCreateScreen from "../screens/Group/GroupCreate";
import * as Color from "../constants/Color";

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
    }}
  >
    <Stack.Screen name="Tabs" component={Tabs}></Stack.Screen>
    <Stack.Screen name="GroupStack" component={GroupStack}></Stack.Screen>
    <Stack.Screen
      name="GroupSearch"
      component={GroupSearchScreen}
    ></Stack.Screen>
    <Stack.Screen
      name="GroupCreate"
      component={GroupCreateScreen}
    ></Stack.Screen>
  </Stack.Navigator>
);
