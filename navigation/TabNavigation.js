import React, { useEffect, useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import HomeScreen from "../screens/Home";
import ChatScreen from "../screens/Chat";
import FeedScreen from "../screens/Feed";
import NoticeScreen from "../screens/Notice";
import ProfileScreen from "../screens/Profile";
import TabBarIcon from "../components/TabBarIcon";
import * as Color from "../constants/Color";
import {
  firstTabIcon,
  secondTabIcon,
  thirdTabIcon,
  fourthTabIcon,
} from "../constants/Icons";

const Tabs = createBottomTabNavigator();

const getHeaderName = (route) =>
  route?.state?.routeNames[route.state.index] || "Home";

export default ({ navigation, route }) => {
  useLayoutEffect(() => {
    // Optional Chaining
    const name = getHeaderName(route);
    navigation.setOptions({
      title: name,
      headerShown: name !== "Chat",
      //headerStyle: {
      //  backgroundColor: name === 'TV' ? 'red' : 'black',
      //},
    });
  }, [route]);
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let tabIcon =
            route.name === "Home"
              ? firstTabIcon
              : route.name === "Chat"
              ? secondTabIcon
              : route.name === "Notice"
              ? thirdTabIcon
              : fourthTabIcon;
          return <TabBarIcon focused={focused} name={tabIcon}></TabBarIcon>;
        },
      })}
      tabBarOptions={{
        style: styles.container,
        showLabel: false,
      }}
    >
      <Tabs.Screen name="Home" component={HomeScreen}></Tabs.Screen>
      <Tabs.Screen name="Chat" component={ChatScreen}></Tabs.Screen>
      <Tabs.Screen name="Feed" component={FeedScreen}></Tabs.Screen>
      <Tabs.Screen name="Notice" component={NoticeScreen}></Tabs.Screen>
      <Tabs.Screen name="Profile" component={ProfileScreen}></Tabs.Screen>
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BG_COLOR,
    borderTopColor: Color.BG_COLOR,
  },
  buttonStyle: {
    marginTop: 100,
  },
});
