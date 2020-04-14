import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as Color from "../constants/Color";
import AuthHome from "../screens/Auth/AuthHome";
import Confirm from "../screens/Auth/Confirm";
import LogIn from "../screens/Auth/LogIn";
import SignUp from "../screens/Auth/SignUp";

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
    <Stack.Screen name="AuthHome" component={AuthHome}></Stack.Screen>
    <Stack.Screen name="Confirm" component={Confirm}></Stack.Screen>
    <Stack.Screen name="LogIn" component={LogIn}></Stack.Screen>
    <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
  </Stack.Navigator>
);
