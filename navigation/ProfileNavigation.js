import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from "../screens/Profile/EditProfile";
import ProfileScreen from "../screens/Profile";
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
    <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
    ></Stack.Screen>
  </Stack.Navigator>
);
