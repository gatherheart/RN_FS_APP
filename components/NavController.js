import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { userIsLoggedIn, useLogIn, useLogOut } from "../context/AuthContext";

// Wrapper which is for braches between loggedIn User or not
export default () => {
  const isLoggedIn = userIsLoggedIn();
  console.log(isLoggedIn);
  const logIn = useLogIn();
  const logOut = useLogOut();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoggedIn ? (
        <TouchableOpacity onPress={logOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={logIn}>
          <Text>Log in</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
