import React from "react";
import MainStack from "../../navigation/MainNavigation";
import { userIsLoggedIn, useLogIn, useLogOut } from "../../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { View, TouchableOpacity, Text } from "react-native";
import AuthNavigation from "../../navigation/AuthNavigation";

// Wrapper which is for braches between loggedIn User or not
export default () => {
  const isLoggedIn = userIsLoggedIn();
  console.log(isLoggedIn);
  const logIn = useLogIn();
  const logOut = useLogOut();

  return isLoggedIn ? (
    <NavigationContainer>
      <MainStack></MainStack>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
};
