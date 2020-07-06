import React from "react";
import Title from "./Title";
import styled from "styled-components/native";
import { View } from "react-native";

const Container = styled.View``;

const List = ({ children }) => {
  return (
    <View style={{ borderWidth: 1 }}>
      <Container>{children}</Container>
    </View>
  );
};

export default List;
