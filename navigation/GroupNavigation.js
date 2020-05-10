import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GroupScreen from "../screens/Group";
import GroupDrawer from "../screens/Group/GroupDrawer";
import { useRoute } from "@react-navigation/native";
import { ThemeContext } from "styled-components";

DrawerNavigatorConfig = {
  drawerPosition: "right",
  drawerType: "slide",
  drawerWidth: 100,
};

const Drawer = createDrawerNavigator();

export default () => {
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
        name="Group"
        component={GroupScreen}
        initialParams={route.params}
      />
      <Drawer.Screen name="GroupDrawer" component={GroupDrawer} />
    </Drawer.Navigator>
  );
};
