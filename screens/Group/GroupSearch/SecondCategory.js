import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import GroupSearchBtn from "../../../components/Group/GroupCategoryButton";
import { BG_COLOR } from "../../../constants/Color";
import { secondCategory, firstCategory } from "../../../constants/Names";
import Icon from "../../../components/Icon";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Container = styled.View``;

const MainText = styled.Text`
  justify-content: center;
  font-size: 22px;
  font-weight: 500;
  opacity: 0.8;
  margin: 50px 0px 80px 0px;
  font-family: ${(props) => props.theme.regularFont};
`;

const TextContainer = styled.View`
  align-items: center;
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
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            title="Refresh"
            color="#fff"
            style={{ marginRight: 20 }}
          >
            {false ? (
              <Loader size={"small"}></Loader>
            ) : (
              <Icon name={"refresh"} size={24}></Icon>
            )}
          </TouchableOpacity>
        ),
      }),
    []
  );

  for (let i = 0; i < rowLength; i++) {
    row = [categories[3 * i + 0], categories[3 * i + 1], categories[3 * i + 2]];
    row = row.filter((r) => r != undefined);
    rows.push(row);
  }

  return (
    <Container style={styles.container}>
      <TextContainer>
        <MainText>어떤 숲을 검색해볼까요?</MainText>
      </TextContainer>
      {rows.map((row, rowNum) => (
        <View
          key={rowNum}
          style={{
            flexDirection: "row",
            marginHorizontal: (WIDTH * 7) / 100,
          }}
        >
          {row.map((category, colNum) => {
            return (
              <GroupSearchBtn
                size={"small"}
                key={rowLength * rowNum + colNum}
                onPress={() =>
                  goToSecond(
                    navigation,
                    firstSelected,
                    rowNum * rowLength + colNum
                  )
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
  },
});
