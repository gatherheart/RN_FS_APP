import React from "react";
import MainStack from "../navigation/MainNavigation";
import { userIsLoggedIn, useLogIn, useLogOut } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

// Wrapper which is for braches between loggedIn User or not
export default () => {
  const isLoggedIn = userIsLoggedIn();
  console.log(isLoggedIn);
  const logIn = useLogIn();
  const logOut = useLogOut();
  return (
    <NavigationContainer>
      <MainStack></MainStack>
    </NavigationContainer>
  );
};
