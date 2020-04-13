import React from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { ACTIVE_COLOR, INACTIVE_COLOR } from "../constants/Color";

const TabBarIcon = function ({ name, focused }) {
  return (
    <Ionicons
      size={26}
      name={name}
      color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
    ></Ionicons>
  );
};

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default TabBarIcon;
