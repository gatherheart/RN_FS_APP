import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import ScrollContainer from "../../../components/ScrollContainer";
import styled from "styled-components/native";
import Input from "../../../components/Group/GroupSearchInput";
import SearchModal from "../../../components/Group/GroupSearchModal";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${WIDTH}px;
  height: ${HEIGHT / 30}px;
  border: black;
`;

const Title = styled.Text`
  margin: 0px 0px 0px 30px;
  font-size: 20px;
  font-weight: 500;
`;

const SearchContainer = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
  width: ${WIDTH}px;
  height: ${HEIGHT / 10}px;
  border: black;
`;

export default ({ refreshFn, loading, selected, results }) => {
  const [keyword, setKeyword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  // Select school or area for filtering data
  const [selection, setSelection] = useState(0);
  const [pageType, setPageType] = useState(1);

  const onSubmit = () => {
    if (keyword === "") return;
    console.log(keyword);
    setKeyword("");
  };
  const onChange = (text) => setKeyword(text);
  const changeModal = () => {
    setModalVisible((prev) => !prev);
    console.log(isModalVisible);
  };

  return (
    <ScrollContainer refreshFn={refreshFn} loading={loading}>
      <TitleContainer>
        <Title>{selected}</Title>
        <TouchableOpacity style={styles.ApplicableButton}>
          <Text>Available</Text>
        </TouchableOpacity>
      </TitleContainer>
      <SearchContainer>
        <TouchableOpacity onPress={() => changeModal()}>
          <Text>Search</Text>
        </TouchableOpacity>
        <Input
          placeholder={"Write a keyword"}
          value={keyword}
          onChange={onChange}
          onSubmit={onSubmit}
        ></Input>
      </SearchContainer>

      <SearchModal
        type={pageType}
        setSelection={setSelection}
        changeModal={changeModal}
        isModalVisible={isModalVisible}
      ></SearchModal>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  ApplicableButton: {
    marginRight: 30,
  },
  SearchButton: {},
});
