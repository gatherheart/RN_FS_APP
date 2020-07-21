import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import * as Color from "../constants/Color";
import ChatScreen from "../screens/Chat";
import ChatListScreen from "../screens/ChatList";

const Stack = createStackNavigator();
const ChatStack = createStackNavigator();

const ChatNav = () => {
  <ChatStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Color.BG_COLOR,
        borderBottomColor: Color.BG_COLOR,
        shadowColor: Color.BG_COLOR,
      },
      headerTintColor: Color.TINT_COLOR,
      headerBackTitleVisible: false,
      headerShown: false,
    }}
  >
    <ChatStack.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
    ></ChatStack.Screen>
  </ChatStack.Navigator>;
};

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Color.BG_COLOR,
        borderBottomColor: Color.BG_COLOR,
        shadowColor: Color.BG_COLOR,
      },
      headerTintColor: Color.TINT_COLOR,
      headerBackTitleVisible: false,
      headerShown: false,
    }}
  >
    <Stack.Screen name="ChatList" component={ChatListScreen}></Stack.Screen>
    <Stack.Screen name="ChatStack" component={ChatNav}></Stack.Screen>
  </Stack.Navigator>
);
