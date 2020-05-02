import React, { useState, useEffect } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Tabs from "./TabNavigation";
import GroupScreen from "../screens/Group";
import GroupSearchNav from "./GroupSearchNavigation";
import GroupCreateScreen from "../screens/Group/GroupCreate";
import ChatScreen from "../screens/Chat";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => {
        return {
          gestureEnabled: true,
          cardOverlayEnabled: true,
          headerBackTitleVisible: false,
          headerTransitionPreset: "fade-in-place",
          headerMode: "screen",
          headerShown: route.name === "GroupSearchNav" ? false : true,
        };
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs}></Stack.Screen>
      <Stack.Screen name="Group" component={GroupScreen}></Stack.Screen>
      <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
      <Stack.Screen
        name="GroupSearchNav"
        component={GroupSearchNav}
        options={{
          title: "Group Search",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="GroupCreate"
        component={GroupCreateScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
