import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import ScrollContainer from "../../../components/ScrollContainer";
import styled from "styled-components/native";
import Input from "../../../components/Group/GroupSearchInput";
import SearchModal from "../../../components/Group/GroupSearchModal";
import HorizontalGroup from "../../../components/Group/SmallGroupCard";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const HEADER_MAX_HEIGHT = (HEIGHT * 12) / 100; // set the initial height
const HEADER_MIN_HEIGHT = HEIGHT / 30; // set the height on scroll
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${HEIGHT / 30}px;
`;

const Title = styled.Text`
  margin: 0px 0px 0px 30px;
  font-size: 20px;
  font-weight: 500;
`;

const SearchContainer = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: ${(HEIGHT * 30) / 100}px;
`;

const EmptySpace = styled.View`
  height: ${HEIGHT / 10}px;
`;

export default ({
  refreshFn,
  loading,
  selected,
  results,
  pageType,
  setSelection,
}) => {
  const [keyword, setKeyword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const position = new Animated.ValueXY();

  const headerHeight = position.y.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const onSubmit = () => {
    if (keyword === "") return;
    setKeyword("");
  };
  const onChange = (text) => setKeyword(text);
  const changeModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <>
      <Animated.View
        style={{ width: WIDTH, height: headerHeight, backgroundColor: "white" }}
      >
        <TitleContainer>
          <Title>{selected}</Title>
          <TouchableOpacity style={styles.ApplicableButton}>
            <Text>Available</Text>
          </TouchableOpacity>
        </TitleContainer>
        <SearchContainer>
          <TouchableOpacity onPress={changeModal}>
            <Text>Search</Text>
          </TouchableOpacity>
          <Input
            placeholder={"Write a keyword"}
            value={keyword}
            onChange={onChange}
            onSubmit={onSubmit}
          ></Input>
        </SearchContainer>
      </Animated.View>
      <ScrollContainer
        refreshFn={refreshFn}
        loading={loading}
        scrollEventThrottle={1}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: position.y } } },
        ])}
        contentContainerStyle={{ marginTop: 30 }}
      >
        {results?.groups
          ? results.groups.map((group, idx) => {
              return <HorizontalGroup {...group} key={idx}></HorizontalGroup>;
            })
          : null}
        <EmptySpace></EmptySpace>
        <SearchModal
          pageType={pageType}
          setSelection={setSelection}
          changeModal={changeModal}
          isModalVisible={isModalVisible}
        ></SearchModal>
      </ScrollContainer>
    </>
  );
};

const styles = StyleSheet.create({
  ApplicableButton: {
    marginRight: 30,
  },
  SearchButton: {},
});
