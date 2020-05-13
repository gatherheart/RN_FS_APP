import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components/native";
import CustomHeader from "../../../components/CustomHeader";
import AnimatedCustomHeader from "../../../components/AnimatedCustomHeader";

const Container = styled.View`
  flex: 1;
`;

export default () => {
  const opacityAnimationValue = new Animated.Value(1);
  const moveAnimationValue = new Animated.ValueXY();

  Animated.parallel([
    Animated.timing(moveAnimationValue, {
      toValue: 100,
      duration: 500,
    }),
    Animated.timing(opacityAnimationValue, {
      toValue: 0,
      duration: 200,
    }),
  ]).start();

  return (
    <ScrollView>
      <CustomHeader></CustomHeader>
      <Animated.View
        style={{
          opacity: opacityAnimationValue,
          transform: moveAnimationValue.getTranslateTransform(),
        }}
      />
    </ScrollView>
  );
};
