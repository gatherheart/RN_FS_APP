import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text, Alert } from "react-native";
import Tabs from "./TabNavigation";
import GroupScreen from "../screens/Group";
import GroupSearchNav from "./GroupSearchNavigation";
import GroupCreateScreen from "../screens/Group/GroupCreate";
import ChatScreen from "../screens/Chat";
import * as Color from "../constants/Color";
import Icon from "../components/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => {
        console.log(route);
        console.log(route?.state?.index);
        return {
          gestureEnabled: true,
          cardOverlayEnabled: true,
          headerBackTitleVisible: false,
          headerRight: route?.state?.index
            ? null
            : () => (
                <TouchableOpacity
                  onPress={() => alert("This is a button!")}
                  title="Info"
                  color="#fff"
                  style={{ marginRight: 20 }}
                >
                  <Icon name={"refresh"} size={24}></Icon>
                </TouchableOpacity>
              ),
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
