import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import GroupButtonSearch from "../../../components/Group/GroupCategoryButton";
import { TextInput } from "react-native-gesture-handler";
import { BG_COLOR } from "../../../constants/Color";
import { firstCategory } from "../../../constants/Names";

const Container = styled.View``;

const categories = firstCategory;

const rowLength = 4;

const MainText = styled.Text`
  justify-content: center;
  font-size: 22px;
  font-weight: 500;
  opacity: 0.8;
  margin: 50px 0px 80px 0px;
  font-family: ${(props) => props.theme.regularFont};
`;

const goToSecond = (navigation, selected = 0) => {
  navigation.navigate("SecondCategory", { selected: selected });
};

export default () => {
  const navigation = useNavigation();

  useLayoutEffect(
    () =>
      navigation.setOptions({
        title: "숲 검색",
      }),
    []
  );

  let rows = [];
  for (let i = 0; i < rowLength; i++) {
    rows.push(categories.filter((_, index) => index % rowLength === i));
  }
  return (
    <Container style={styles.container}>
      <MainText>어떤 숲을 검색해볼까요?</MainText>
      {rows.map((row, column) => (
        <View key={column} style={{ flexDirection: "row" }}>
          {row.map((category, index) => {
            return (
              <GroupButtonSearch
                size={"large"}
                key={3 * column + index}
                onPress={() =>
                  goToSecond(navigation, column + rowLength * index)
                }
                title={category}
                animation={rowLength * column + index === 0 ? true : false}
              ></GroupButtonSearch>
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
