import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import CustomHeader from "../../../components/CustomHeader";
import AnimatedCustomHeader from "../../../components/AnimatedCustomHeader";
const SWIPE_THRESHOLD = 120;

const Container = styled.View`
  flex: 1;
`;
const { width: WIDHT, height: HEIGHT } = Dimensions.get("screen");

export default () => {
  const opacityAnimationValue = new Animated.Value(1);
  const position = new Animated.ValueXY(0);
  const panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: (e, gestureState) => {
      position.setOffset({ x: position.x._value, y: position.y._value });
      position.setValue({ x: 0, y: 0 });
    },

    onPanResponderMove: (e, { dx, dy }) => {
      position.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: (e, { dx, dy }) => {
      position.flattenOffset();
    },
  });
  const themeContext = useContext(ThemeContext);

  return (
    <View>
      <CustomHeader title={"투표글 보기"}></CustomHeader>
      <Animated.View
        style={{
          backgroundColor: "blue",
          width: 200,
          height: 200,
          opacity: opacityAnimationValue,
          transform: [...position.getTranslateTransform()],
        }}
        {...panResponder.panHandlers}
      ></Animated.View>
    </View>
  );
};

const vote = {
  voteTitle: "4월 회식 날짜",
  voteMemo: "",
  voteList: "",
  deadline: "2020-05-14T15:43:54.107Z",
  multipleOption: "",
  anonymousOption: "",
  voteMemberList: "",
};
