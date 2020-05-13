import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import GroupScreen from "../screens/Group";
import GroupDrawer from "../screens/Group/GroupDrawer";
import { useRoute } from "@react-navigation/native";
import { ThemeContext } from "styled-components";
import GroupWriteVote from "../screens/Group/GroupVote/WriteVote";
import GroupReadVote from "../screens/Group/GroupVote/ReadVote";

DrawerNavigatorConfig = {
  drawerPosition: "right",
  drawerType: "slide",
  drawerWidth: 100,
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default () => {
  const route = useRoute();
  const themeContext = React.useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Group"
      screenOptions={({ route, navigation }) => {
        return {
          gestureEnabled: true,
          headerShown: false,
        };
      }}
    >
      <Stack.Screen
        name="GroupDrawer"
        component={DrawerNav}
        initialParams={route.params}
      />
      <Stack.Screen name="GroupWriteVote" component={GroupWriteVote} />
      <Stack.Screen name="GroupReadVote" component={GroupReadVote} />
    </Stack.Navigator>
  );
};

/**
 *  Drawer Navigation in Group in page
 *
 */
const DrawerNav = () => {
  const route = useRoute();
  const themeContext = React.useContext(ThemeContext);
  return (
    <Drawer.Navigator
      initialRouteName="Group"
      drawerContentOptions={{
        activeTintColor: themeContext.lightGreenColor,
        itemStyle: { marginVertical: 10 },
      }}
      screenOptions={({ route, navigation }) => {
        return {
          gestureEnabled: true,
          headerShown: false,
        };
      }}
      drawerPosition="right"
    >
      <Drawer.Screen
        name="GroupDrawerMain"
        component={GroupScreen}
        initialParams={route.params}
      />
      <Drawer.Screen name="GroupDrawerSecond" component={GroupDrawer} />
    </Drawer.Navigator>
  );
};
