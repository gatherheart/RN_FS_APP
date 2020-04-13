import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./TabNavigation";
import GroupScreen from "../screens/Group";
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
    <Stack.Screen name="Groups" component={GroupScreen}></Stack.Screen>
  </Stack.Navigator>
);
