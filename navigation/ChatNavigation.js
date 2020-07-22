import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import * as Color from "../constants/Color";
import ChatScreen from "../screens/Chat/ChatContainer";
import ChatListScreen from "../screens/ChatList";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Linking } from "react-native";
import GroupTestPage from "../screens/Group/GroupTestPage";

const Stack = createStackNavigator();
const ChatStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />
    </DrawerContentScrollView>
  );
}
const ChatDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 30 },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerPosition="right"
    >
      <Drawer.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="GroupTestPagee"
        component={GroupTestPage}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export const ChatStackNav = () => {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerTintColor: Color.TINT_COLOR,
        headerBackTitleVisible: false,
        headerShown: false,
      }}
      navigationOptions={() => {
        return {
          tabBarVisible: false,
        };
      }}
    >
      <ChatStack.Screen
        name="ChatDrawer"
        component={ChatDrawer}
      ></ChatStack.Screen>
    </ChatStack.Navigator>
  );
};
