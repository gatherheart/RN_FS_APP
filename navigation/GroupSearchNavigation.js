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
import Loader from "../components/Loader";
import Icon from "../components/Icon";

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
        mode: "modal",
        headerMode: "slide",
        headerShown: () => {
          return route.state?.index ? true : false;
        },
        headerRight: () =>
          route.name === "GroupSearchNav" ? (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              title="Refresh"
              color="#fff"
              style={{ marginRight: 20 }}
            >
              {false ? (
                <Loader size={"small"}></Loader>
              ) : (
                <Icon name={"refresh"} size={24}></Icon>
              )}
            </TouchableOpacity>
          ) : null,
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
    </Stack.Navigator>
  );
};
