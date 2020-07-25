import React, { useEffect, useLayoutEffect, useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import HomeScreen from "../screens/Home";
import ChatListScreen from "../screens/ChatList/ChatListContainer";
import FeedStack from "../navigation/FeedNavigation";
import NoticeScreen from "../screens/Notice";
import ProfileStack from "../navigation/ProfileNavigation";
import TabBarIcon from "../components/common/TabBarIcon";
import * as Color from "../constants/Color";
import Icon from "../components/common/CustomIcon";
import Loader from "../components/common/Loader";
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
  const [headerBtnLoading, setHeaderBtnLoading] = useState(false);

  const headerBtnPress = () => {
    setHeaderBtnLoading((prevState) => !prevState);
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => setHeaderBtnLoading((prevState) => !prevState),
        },
      ],
      { cancelable: false }
    );
  };
  useLayoutEffect(() => {
    // Optional Chaining
    const name = getHeaderName(route);
    navigation.setOptions({
      title: name,
      headerShown: false,
      //headerStyle: {
      //  backgroundColor: name === 'TV' ? 'red' : 'black',
      //},
    });
  }, [route]);

  useEffect(() => {
    navigation.setOptions({
      headerRight:
        route?.state?.index || route?.name != "Tabs"
          ? null
          : () => (
              <TouchableOpacity
                onPress={headerBtnPress}
                title="Refresh"
                color="#fff"
                style={{ marginRight: 20 }}
              >
                {headerBtnLoading ? (
                  <Loader size={"small"}></Loader>
                ) : (
                  <Icon name={"refresh"} size={24}></Icon>
                )}
              </TouchableOpacity>
            ),
    });
  }, [headerBtnLoading, route]);
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let tabIcon =
            route.name === "Home"
              ? firstTabIcon
              : route.name === "ChatList"
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
      <Tabs.Screen name="ChatList" component={ChatListScreen}></Tabs.Screen>
      <Tabs.Screen name="Notice" component={NoticeScreen}></Tabs.Screen>
      <Tabs.Screen name="ProfileStack" component={ProfileStack}></Tabs.Screen>
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
