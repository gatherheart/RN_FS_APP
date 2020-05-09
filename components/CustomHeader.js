import React, { useEffect, useContext } from "react";
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { HeaderHeight, StatusHeight, UnderHeader } from "../utils/HeaderHeight";
import Icon from "./Icon";
import { ThemeContext } from "styled-components";
import { useNavigation } from "@react-navigation/native";

const { width: WIDTH, height } = Dimensions.get("screen");

export default ({ headerPosition, headerOpacity }) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <>
      <Animated.View
        style={{
          height: UnderHeader,
          backgroundColor: "white",
          opacity: headerOpacity,
        }}
      />
      <Animated.View
        style={{
          transform: [{ translateY: headerPosition }],
          opacity: headerOpacity,
          ...styles.header,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          title="goBack"
          style={{ marginHorizontal: 20 }}
        >
          <Icon
            name={"arrow-back"}
            color={themeContext.lightGreenColor}
            size={30}
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
          title="goBack"
          style={{ marginHorizontal: 20 }}
        >
          <Icon
            name={"menu"}
            color={themeContext.lightGreenColor}
            size={30}
          ></Icon>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    position: "absolute",
    width: WIDTH,
    height: StatusHeight * 1.15,
    top: UnderHeader,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
});
