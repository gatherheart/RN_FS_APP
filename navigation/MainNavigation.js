import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text, Alert, TouchableOpacity } from "react-native";
import Tabs from "./TabNavigation";
import GroupScreen from "../screens/Group";
import GroupSearchNav from "./GroupSearchNavigation";
import GroupCreateScreen from "../screens/Group/GroupCreate";
import ChatScreen from "../screens/Chat";
import * as Color from "../constants/Color";
import Loader from "../components/Loader";
import Icon from "../components/Icon";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => {
        console.log(route.name);
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
        options={{ title: "Group Search" }}
      ></Stack.Screen>
      <Stack.Screen
        name="GroupCreate"
        component={GroupCreateScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
