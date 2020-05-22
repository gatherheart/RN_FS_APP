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

export default ({
  headerStyle,
  title = "",
  rightButton,
  rightButtonIcon = "",
  rightButtonText = "",
}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <>
      <View
        style={{
          height: StatusHeight,
          backgroundColor: "white",
        }}
      />
      <View
        style={{
          top: StatusHeight,
          ...styles.header,
          ...headerStyle,
          position: "absolute",
          borderWidth: 1,
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
            rightButton();
          }}
          title="goBack"
          style={{ marginRight: 20 }}
        >
          <Title>{rightButtonText}</Title>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: WIDTH,
    height: HeaderHeight,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
});
