import React, { useEffect, useContext } from "react";
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import { HeaderHeight, StatusHeight, UnderHeader } from "../utils/HeaderHeight";
import Icon from "./CustomIcon";
import { ThemeContext } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

const { width: WIDTH, height } = Dimensions.get("screen");

const Title = styled.Text``;

export default ({ headerStyle, title = "" }) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          height: UnderHeader,
          backgroundColor: "whitee",
        }}
      />
      <View
        style={{
          ...styles.header,
          ...headerStyle,
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
        <Title style={{ fontSize: 15, fontFamily: themeContext.regularFont }}>
          {title}
        </Title>
        <TouchableOpacity
          onPress={() => {
            console.log("Right Header Button");
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: WIDTH,
    height: StatusHeight * 1.15,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
});
