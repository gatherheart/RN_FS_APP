import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GroupScreen from "../screens/Group";
import GroupDrawer from "../screens/Group/GroupDrawer";
import { useRoute } from "@react-navigation/native";

DrawerNavigatorConfig = {
  drawerPosition: "right",
  drawerType: "slide",
  drawerWidth: 100,
};

const Drawer = createDrawerNavigator();

export default () => {
  const route = useRoute();
  return (
    <Drawer.Navigator
      initialRouteName="Group"
      screenOptions={({ route, navigation }) => {
        return {
          gestureEnabled: false,
          headerShown: false,
        };
      }}
      drawerPosition="right"
    >
      <Drawer.Screen
        name="Group"
        component={GroupScreen}
        initialParams={route.params}
      />
      <Drawer.Screen name="GroupDrawer" component={GroupDrawer} />
    </Drawer.Navigator>
  );
};
