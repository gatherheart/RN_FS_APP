import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./TabNavigation";
import GroupScreen from "../screens/Group";
import GroupSearchNav from "./GroupSearchNavigation";
import GroupCreateScreen from "../screens/Group/GroupCreate";
import ChatScreen from "../screens/Chat";
import * as Color from "../constants/Color";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => {
        return {
          gestureEnabled: true,
          cardOverlayEnabled: true,
          headerBackTitleVisible: !/Group\w+/.test(route.name),
        };
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs}></Stack.Screen>
      <Stack.Screen name="Group" component={GroupScreen}></Stack.Screen>
      <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
      <Stack.Screen
        name="GroupSearchNav"
        component={GroupSearchNav}
      ></Stack.Screen>
      <Stack.Screen
        name="GroupCreate"
        component={GroupCreateScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
