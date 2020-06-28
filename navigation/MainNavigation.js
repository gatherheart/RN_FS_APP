import React, { useState, useEffect } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Tabs from "./TabNavigation";
import GroupScreen from "./GroupNavigation";
import GroupSearchNav from "./GroupSearchNavigation";
import GroupCreateScreen1 from "../screens/Group/GroupCreate/GroupCreate1";
import GroupCreateScreen2 from "../screens/Group/GroupCreate/GroupCreate2";
import GroupCreateScreen3 from "../screens/Group/GroupCreate/GroupCreate3";

import ChatScreen from "../screens/Chat";
import Schedule from "../screens/Home/Schedule";
import SelectSchool from "../screens/Group/GroupCreate/SelectSchool";
import GroupCreateContainer from "../screens/Group/GroupCreate/GroupCreateContainer";
import SelectField from "../screens/Group/GroupCreate/SelectField";
import SelectArea from "../screens/Group/GroupCreate/SelectArea";
import SelectCollege from "../screens/Group/GroupCreate/SelectCollege";
import SelectMajor from "../screens/Group/GroupCreate/SelectMajor";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => {
        return {
          gestureEnabled: true,
          headerBackTitleVisible: false,
          headerShown: false,
        };
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs}></Stack.Screen>
      <Stack.Screen
        name="GroupNav"
        component={GroupScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
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
        name="GroupCreateContainer"
        component={GroupCreateContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="GroupCreate1"
        component={GroupCreateScreen1}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="GroupCreate2"
        component={GroupCreateScreen2}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="GroupCreate3"
        component={GroupCreateScreen3}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="SelectSchool"
        component={SelectSchool}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="SelectField"
        component={SelectField}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="SelectArea"
        component={SelectArea}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="SelectCollege"
        component={SelectCollege}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="SelectMajor"
        component={SelectMajor}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
      <Stack.Screen name="Schedule" component={Schedule}></Stack.Screen>
    </Stack.Navigator>
  );
};
