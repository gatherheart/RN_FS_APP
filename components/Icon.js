import React from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { ACTIVE_COLOR, INACTIVE_COLOR } from "../constants/Color";
import { Platform } from "react-native";

const TabBarIcon = function ({ name, size = 20 }) {
  return (
    <Ionicons
      size={size}
      name={Platform.OS === "ios" ? "ios-" + name : "md-" + name}
      color={ACTIVE_COLOR}
    ></Ionicons>
  );
};

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TabBarIcon;
