import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import PropTypes from "prop-types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions, View, ScrollView } from "react-native";
import CustomHeader from "../../../components/CustomHeader";
import UsersTable from "../../../components/User/UsersTable";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const EmptySpace = styled.View`
  height: ${(HEIGHT * 10) / 100}px;
`;
const NanumText = styled.Text`
  font-family: ${(props) => props.theme.boldFont};
`;
const TitleContainer = styled.View`
  border-bottom-width: 1px;
  border-top-width: 1px;

  border-bottom-color: ${(props) => props.theme.lightGreyColor};
  border-top-color: ${(props) => props.theme.lightGreyColor};

  width: 100%;
  height: ${(HEIGHT * 6.5) / 100}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 5px 0px 10px;
`;

const VoteResult = () => {
  const themeContext = useContext(ThemeContext);
  const route = useRoute();
  console.log(route.params);
  const { users, vote } = route.params;
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
        <TitleContainer>
          <NanumText>{vote}</NanumText>
        </TitleContainer>
        <UsersTable users={users}></UsersTable>
        <EmptySpace></EmptySpace>
        <EmptySpace></EmptySpace>
      </ScrollView>
    </>
  );
};

VoteResult.propTypes = {};

export default VoteResult;
