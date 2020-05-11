import React from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { ACTIVE_COLOR, INACTIVE_COLOR } from "../constants/Color";
import { Platform } from "react-native";

const CustumIcon = function ({ name, size = 20, color }) {
  return (
    <Ionicons
      size={size}
      name={Platform.OS === "ios" ? "ios-" + name : "md-" + name}
      color={color || ACTIVE_COLOR}
    ></Ionicons>
  );
};

CustumIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CustumIcon;
