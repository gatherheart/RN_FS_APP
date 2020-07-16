import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import GroupSearchBtn from "../../../components/Group/GroupCategoryButton";
import { BG_COLOR } from "../../../constants/Color";
import { secondCategory, firstCategory } from "../../../constants/Names";
import Icon from "../../../components/common/CustomIcon";
import { HeaderHeight } from "../../../utils/HeaderHeight";
import CustomHeader from "../../../components/common/CustomHeader";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Container = styled.ScrollView``;

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
  const categories = secondCategory[firstSelected];

  return (
    <>
      <CustomHeader title={"숲 검색"}></CustomHeader>
      <ScrollView style={styles.container} alwaysBounceVertical={false}>
        <TextContainer>
          <MainText>어떤 숲을 검색해볼까요?</MainText>
        </TextContainer>
        <View style={{ marginLeft: "7%" }}>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {categories.map((category, idx) => (
              <GroupSearchBtn
                size={"small"}
                key={idx}
                onPress={() => goToSecond(navigation, firstSelected, idx)}
                title={category}
                animation={idx === 0 ? false : false}
              ></GroupSearchBtn>
            ))}
          </View>
        </View>
        <View style={styles.empty}></View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    paddingTop: HeaderHeight,
  },
  empty: {
    height: HeaderHeight,
  },
});
