import React, { createContext, useContext, useState } from "react";
import { AsyncStorage } from "react-native";
import { AppLoading } from "expo";

// Create Context That is regarding to authorization,
// which can accessed all the children
export const AuthContext = createContext();

// Make a Component that provide context regarding to authorization
export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
  // Context Variable to Check Logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);

  // Context Functions regarding to authorization
  const logUserIn = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Return context variable
export const userIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

// Return context function
export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};

// Return context function
export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};
