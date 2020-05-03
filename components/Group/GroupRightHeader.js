import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components/native";
import { TouchableOpacity, Text } from "react-native";

const HeaderRightBtn = styled.View`
  flex-direction: row;
`;

const GroupRightHeader = ({ leftClick, rightClick }) => (
  <HeaderRightBtn>
    <TouchableOpacity onPress={leftClick}>
      <Text>On</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={rightClick}>
      <Text>Off</Text>
    </TouchableOpacity>
  </HeaderRightBtn>
);

GroupRightHeader.proptypes = {
  leftClick: Proptypes.func.isRequired,
  rightClick: Proptypes.func.isRequired,
};

export default GroupRightHeader;
