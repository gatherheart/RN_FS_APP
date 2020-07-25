import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NoticeHeader from "../../components/Notice/NoticeHeader";
import { HeaderHeight } from "../../utils/HeaderHeight";
import { BG_COLOR } from "../../constants/Color";
import SwipeViewList from "./SwipeViewList";
export default ({ navigation }) => {
  return (
    <>
      <NoticeHeader></NoticeHeader>
      <View style={styles.container}>
        <View style={styles.switchContainer}></View>
        <SwipeViewList />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: HeaderHeight,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  switch: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 2,
    paddingVertical: 10,
    width: Dimensions.get("window").width / 3,
  },
});
