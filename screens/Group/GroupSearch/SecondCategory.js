import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import GroupSearchBtn from "../../../components/Group/GroupButtonSearch";
import { BG_COLOR } from "../../../constants/Color";

const Container = styled.View``;

const categories = [
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
  "ABCD",
];

const rowLength = 7;

const MainText = styled.Text`
  justify-content: center;
  font-size: 25px;
  font-weight: 500;
  opacity: 0.7;
  margin: 50px 0px 50px 0px;
`;

const goToSecond = (navigation, firstSelected = 0, secondSelected = 0) => {
  navigation.navigate("GroupSearch", {
    firstSelected,
    secondSelected,
  });
};

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const firstSelected = route?.params.selected;

  let rows = [];
  for (let i = 0; i < rowLength; i++) {
    rows.push(categories.filter((_, index) => index % rowLength === i));
  }

  return (
    <Container style={styles.container}>
      <MainText>Group Search Second Category</MainText>
      {rows.map((row, column) => (
        <View key={column} style={{ flexDirection: "row" }}>
          {row.map((category, index) => {
            return (
              <GroupSearchBtn
                size={"small"}
                key={rowLength * column + index}
                onPress={() =>
                  goToSecond(navigation, firstSelected, 3 * column + index)
                }
                title={category}
                animation={
                  3 * column + index === Math.floor(Math.random() * 20 + 1)
                    ? true
                    : false
                }
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
