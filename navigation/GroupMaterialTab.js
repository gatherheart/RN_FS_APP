import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import GroupSchool from "../screens/Group/GroupSearch/GroupSearch";
import GroupUnified from "../screens/Group/GroupSearch/GroupSearch";
import * as Color from "../constants/Color";
const Tab = createMaterialTopTabNavigator();

const GroupMaterialTab = ({ route, navigation }) => {
  return (
    <Tab.Navigator
      navigationOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
      tabBarOptions={{
        style: {
          backgroundColor: "white",
          borderColor: "white",
          shadowColor: "transparent",
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        },
        tabStyle: {
          height: 45,
          width: 100,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
          borderColor: "white",
          shadowColor: "white",
          alignItems: "flex-start",
        },
        indicatorStyle: { backgroundColor: "white" },
      }}
    >
      <Tab.Screen
        name="GroupSchool"
        component={GroupSchool}
        initialParams={route.params}
      />
      <Tab.Screen
        name="GroupUnified"
        component={GroupUnified}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
};

export default GroupMaterialTab;
