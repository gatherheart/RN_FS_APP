import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as Color from "../constants/Color";
import FeedContainer from "../screens/Feed";
import Post from "../screens/Post";
import GroupStack from "../navigation/GroupNavigation";

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
    <Stack.Screen name="Feed" component={FeedContainer}></Stack.Screen>
    <Stack.Screen name="Post" component={Post}></Stack.Screen>
    <Stack.Screen name="Group" component={GroupStack}></Stack.Screen>
  </Stack.Navigator>
);
