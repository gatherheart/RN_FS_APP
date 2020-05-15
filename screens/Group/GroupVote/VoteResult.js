import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import PropTypes from "prop-types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions, View, ScrollView } from "react-native";
import CustomHeader from "../../../components/CustomHeader";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const EmptySpace = styled.View`
  height: ${(HEIGHT * 10) / 100}px;
`;

const VoteResult = () => {
  const themeContext = useContext(ThemeContext);
  const route = useRoute();
  console.log(route.params);
  return (
    <>
      <CustomHeader title={"투표 결과"}></CustomHeader>

      <ScrollView
        style={{
          backgroundColor: themeContext.backgroundColor,
          paddingTop: "15%",
        }}
        contentContainerStyle={{
          fontFamily: themeContext.regularFont,
        }}
        showsVerticalScrollIndicator={false}
      >
        <EmptySpace></EmptySpace>
        <EmptySpace></EmptySpace>
      </ScrollView>
    </>
  );
};

VoteResult.propTypes = {};

export default VoteResult;
