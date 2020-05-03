import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import GroupPrenster from "./GroupPresenter";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ({
  navigation,
  route: {
    params: { id, groupName },
  },
}) => {
  return (
    <GroupPrenster
      navigation={navigation}
      id={id}
      groupName={groupName}
    ></GroupPrenster>
  );
};
