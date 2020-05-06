import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import GroupSearchBtn from "../../../components/Group/GroupCategoryButton";
import { BG_COLOR } from "../../../constants/Color";
import { secondCategory, firstCategory } from "../../../constants/Names";

const Container = styled.View``;

const MainText = styled.Text`
  justify-content: center;
  font-size: 22px;
  font-weight: 500;
  opacity: 0.8;
  margin: 50px 0px 80px 0px;
  font-family: ${(props) => props.theme.regularFont};
`;

const goToSecond = (navigation, firstSelected = 0, secondSelected = 0) => {
  navigation.navigate("GroupSearch", {
    firstSelected,
    secondSelected,
  });
};

export default ({}) => {
  const navigation = useNavigation();

  const route = useRoute();
  const firstSelected = route?.params.selected;

  const rowLength = parseInt((secondCategory[firstSelected].length + 2) / 3);
  const categories = secondCategory[firstSelected];

  let rows = [];

  useLayoutEffect(
    () =>
      navigation.setOptions({
        title: firstCategory[firstSelected],
      }),
    []
  );

  for (let i = 0; i < rowLength; i++) {
    rows.push(categories.filter((_, index) => index % rowLength === i));
  }

  return (
    <Container style={styles.container}>
      <MainText>어떤 숲을 검색해볼까요?</MainText>
      {rows.map((row, rowNum) => (
        <View key={rowNum} style={{ flexDirection: "row" }}>
          {row.map((category, colNum) => {
            return (
              <GroupSearchBtn
                size={"small"}
                key={rowLength * rowNum + colNum}
                onPress={() =>
                  goToSecond(navigation, firstSelected, rowNum + 3 * colNum)
                }
                title={category}
                animation={rowLength * rowNum + colNum === 0 ? true : false}
              ></GroupSearchBtn>
            );
          })}
        </View>
      ))}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: BG_COLOR,
    alignItems: "center",
  },
});
