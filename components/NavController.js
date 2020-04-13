import React from "react";
import { Text } from "react-native";
import { useIsLoggedIn } from "../context/AuthContext";

// Wrapper which is for braches between loggedIn User or not
export default () => {
  const isLoggedIn = useIsLoggedIn();
  console.log(isLoggedIn);
  return <Text>NavControlelr</Text>;
};
