import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as Color from "../constants/Color";
import ChatScreen from "../screens/Chat";
import GroupScreen from "../screens/Group/Group";

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
    <Stack.Screen name="Group" component={GroupScreen}></Stack.Screen>
    <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
  </Stack.Navigator>
);
