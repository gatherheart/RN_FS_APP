import React from "react";
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import * as Color from "../constants/Color";
import FirstCategory from "../screens/Group/GroupSearch/FirstCategory";
import SecondCategory from "../screens/Group/GroupSearch/SecondCategory";
import GroupSearch from "../screens/Group/GroupSearch";
import { TouchableOpacity } from "react-native";
import Loader from "../components/common/Loader";
import Icon from "../components/common/CustomIcon";
import GroupTextSearch from "../screens/Group/GroupSearch/GroupTextSearch";

const Stack = createStackNavigator();

export default ({ navigation, route }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Color.BG_COLOR,
          borderBottomColor: Color.BG_COLOR,
          shadowColor: Color.BG_COLOR,
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="FirstCategory"
        component={FirstCategory}
        options={{
          title: "My home",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="SecondCategory"
        component={SecondCategory}
        options={{
          title: "My home",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="GroupSearch"
        component={GroupSearch}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="GroupTextSearch"
        component={GroupTextSearch}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
