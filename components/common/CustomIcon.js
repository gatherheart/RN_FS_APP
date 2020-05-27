import React from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { ACTIVE_COLOR, INACTIVE_COLOR } from "../../constants/Color";
import { Platform } from "react-native";

const Icon = function ({ name, size = 20, color, isCustom = false, style }) {
  return (
    <Ionicons
      size={size}
      name={Platform.OS === "ios" ? "ios-" + name : "md-" + name}
      color={color || ACTIVE_COLOR}
      style={style}
    ></Ionicons>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
