import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Text } from "react-native";

const HeaderRightBtn = styled.View`
  flex-direction: row;
`;

export default ({}) => (
  <HeaderRightBtn>
    <TouchableOpacity>
      <Text>On</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text>Off</Text>
    </TouchableOpacity>
  </HeaderRightBtn>
);
