import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { RED_COLOR, BG_COLOR } from "../constants/Color";
import styled from "styled-components";

/*
const Container = styled.View`
  flex: 1;
  background-color: ${BG_COLOR};
  justify-content: center;
`;
*/

const Loader = function ({ size = "large" }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={RED_COLOR} size={size}></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    justifyContent: "center",
  },
});

export default Loader;
