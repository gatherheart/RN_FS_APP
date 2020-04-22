import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import GroupButtonSearch from "../../../components/Group/GroupButtonSearch";
import { TextInput } from "react-native-gesture-handler";

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
];

const rowLength = 4;

const MainText = styled.Text`
  justify-content: center;
  font-size: 25px;
  font-weight: 500;
  opacity: 0.7;
  margin: 50px 0px 80px 0px;
`;

const goToSecond = (navigation, selected = 0) => {
  navigation.navigate("SecondCategory", { selected: selected });
};

export default () => {
  const navigation = useNavigation();
  let rows = [];
  for (let i = 0; i < rowLength; i++) {
    rows.push(categories.filter((_, index) => index % rowLength === i));
  }
  return (
    <Container style={styles.container}>
      <MainText>Group Searc h First Category</MainText>
      {rows.map((row, column) => (
        <View key={column} style={{ flexDirection: "row" }}>
          {row.map((category, index) => {
            return (
              <GroupButtonSearch
                size={"large"}
                key={rowLength * column + index}
                onPress={() =>
                  goToSecond(navigation, rowLength * column + index)
                }
                title={category}
                animation={
                  rowLength * column + index ===
                  Math.floor(Math.random() * 10 + 1)
                    ? true
                    : false
                }
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
    justifyContent: "center",
    alignItems: "center",
  },
});
