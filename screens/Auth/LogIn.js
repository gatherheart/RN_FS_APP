import React from "react";
import styled from "styled-components";
import { useLogIn } from "../../context/AuthContext";
import { TouchableOpacity } from "react-native";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const login = useLogIn();
  return (
    <View>
      <TouchableOpacity onPress={login}>
        <Text>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};
