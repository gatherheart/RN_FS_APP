import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ({ navigation }) => {
  return (
    <View>
      <Text>Group</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <Text>Chat Button</Text>
      </TouchableOpacity>
    </View>
  );
};
