import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import GroupSearchBtn from "../../../components/Group/GroupCategoryButton";
import { BG_COLOR } from "../../../constants/Color";
import { firstCategory } from "../../../constants/Names";
import Icon from "../../../components/CustomIcon";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

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

const SearchButton = styled.TouchableOpacity`
  margin: 30px 0px 0px 0px;
  width: ${(WIDTH * 85) / 100}px;
  height: ${(HEIGHT * 5) / 100}px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.moreLightGreyColor};
  justify-content: center;
`;

const SearchButtonText = styled.Text`
  margin: 0px 0px 0px 20px;
  color: ${(props) => props.theme.greyColor};
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
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            title="goBack"
            style={{ marginHorizontal: 10 }}
          >
            <Icon name={"arrow-back"} size={32}></Icon>
          </TouchableOpacity>
        ),
      }),
    []
  );

  return (
    <Container style={styles.container}>
      <MainText>어떤 숲을 검색해볼까요?</MainText>
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {categories.map((category, idx) => (
          <GroupSearchBtn
            size={"small"}
            key={idx}
            onPress={() => goToSecond(navigation, idx)}
            title={category}
            animation={idx === 0 ? true : false}
          ></GroupSearchBtn>
        ))}
      </View>
      <SearchButton>
        <SearchButtonText>모임 명으로 검색하기</SearchButtonText>
      </SearchButton>
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
