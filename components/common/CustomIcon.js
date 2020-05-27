import React from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { ACTIVE_COLOR, INACTIVE_COLOR } from "../../constants/Color";
import { Platform } from "react-native";

const CustomIcon = function ({
  name,
  size = 20,
  color,
  isCustom = false,
  style,
}) {
  return (
    <Ionicons
      size={size}
      name={Platform.OS === "ios" ? "ios-" + name : "md-" + name}
      color={color || ACTIVE_COLOR}
      style={style}
    ></Ionicons>
  );
};

CustomIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CustomIcon;
