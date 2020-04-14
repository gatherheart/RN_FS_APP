import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./TabNavigation";
import GroupScreen from "../screens/Group";
import GroupSearchScreen from "../screens/Group/GroupSearch";
import GroupCreateScreen from "../screens/Group/GroupCreate";
import ChatScreen from "../screens/Chat";
import * as Color from "../constants/Color";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={({ route, navigation }) => ({
      gestureEnabled: true,
      cardOverlayEnabled: true,
      headerStatusBarHeight:
        navigation.dangerouslyGetState().routes.indexOf(route) > 0
          ? 0
          : undefined,
    })}
  >
    <Stack.Screen name="Tabs" component={Tabs}></Stack.Screen>
    <Stack.Screen name="Group" component={GroupScreen}></Stack.Screen>
    <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
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
