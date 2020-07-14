import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as Color from "../constants/Color";
import AuthHome from "../screens/Auth/AuthHome";
import Confirm from "../screens/Auth/Confirm";
import LogIn from "../screens/Auth/LogIn";
import SignUp from "../screens/Auth/SignUp";
import TermOfUse from "../screens/Auth/TermOfUse";
import SelectSchool from "../screens/Group/GroupCreate/SelectSchool";
import SelectCollege from "../screens/Group/GroupCreate/SelectCollege";
import SelectMajor from "../screens/Group/GroupCreate/SelectMajor";

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
    <Stack.Screen name="TermOfUse" component={TermOfUse}></Stack.Screen>
    <Stack.Screen
      name="SelectSchool"
      component={SelectSchool}
      initialParams={{ from: "AuthHome" }}
    ></Stack.Screen>
    <Stack.Screen name="SelectCollege" component={SelectCollege}></Stack.Screen>
    <Stack.Screen name="SelectMajor" component={SelectMajor}></Stack.Screen>
  </Stack.Navigator>
);
