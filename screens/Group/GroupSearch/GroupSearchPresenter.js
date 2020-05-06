import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
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
import {
  schoolNames,
  areasName,
  secondCategory,
} from "../../../constants/Names";
import { ThemeContext } from "styled-components";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const HEADER_MAX_HEIGHT = (HEIGHT * 17) / 100; // set the initial height
const HEADER_MIN_HEIGHT = HEIGHT / 9; // set the height on scroll
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${HEIGHT / 20}px;
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
`;

const OptionContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0px 0px 5px 0px;
  height: ${HEADER_MIN_HEIGHT - HEIGHT / 20}px;
`;

// School option or Area Option
const OptionButton = styled.TouchableOpacity`
  border-radius: 7px;
  padding: 5px 20px 5px 20px;
  border: ${(props) => props.theme.lightGreyColor};
  margin: 10px 0px 0px 20px;
`;

const OptionText = styled.Text`
  margin: 10px 0px 0px 20px;
  text-align: auto;
  color: #b2b2b2;
`;

// Applicable or not filtering
const FilterButton = styled.TouchableOpacity`
  border-radius: 7px;
  padding: 7px 10px 7px 10px;
  width: ${(WIDTH * 18) / 100}px;
  border: ${(props) => props.theme.lightGreyColor};
  margin: 0px 10px 0px 0px;
  text-align: center;
  align-items: center;
`;

const InputContainer = styled.View``;

const EmptySpace = styled.View`
  height: ${HEIGHT / 10}px;
`;

export default ({
  refreshFn,
  loading,
  firstSelected,
  secondSelected,
  results,
  pageType,
  setOption,
  option,
}) => {
  const themeContext = useContext(ThemeContext);
  // keyword for search textInput
  const [keyword, setKeyword] = useState("");
  // Modal for school or area selection
  const [isModalVisible, setModalVisible] = useState(false);
  // Applicable filtering
  const [applicableFilter, setApplicableFilter] = useState(false);

  const position = new Animated.ValueXY();

  const headerHeight = position.y.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 2],
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
          <Title>{secondCategory[firstSelected][secondSelected]}</Title>
          <FilterButton
            theme={themeContext}
            onPress={() => setApplicableFilter((prev) => !prev)}
          >
            <Text style={{ fontSize: 12 }}>
              {applicableFilter ? "전체" : "지원가능"}
            </Text>
          </FilterButton>
        </TitleContainer>
        <SearchContainer>
          <OptionContainer>
            <OptionButton onPress={changeModal} theme={themeContext}>
              <Text style={{ textAlign: "center" }}>
                {pageType == 0 ? "학교" : "지역"}
              </Text>
            </OptionButton>
            <OptionText>
              {pageType == 0 ? schoolNames[option] : areasName[option]}
            </OptionText>
          </OptionContainer>
          <InputContainer>
            <Input
              placeholder={"Write a keyword"}
              value={keyword}
              onChange={onChange}
              onSubmit={onSubmit}
            ></Input>
          </InputContainer>
        </SearchContainer>
      </Animated.View>
      <ScrollContainer
        refreshFn={refreshFn}
        loading={loading}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: position.y } } },
        ])}
        contentContainerStyle={{ marginTop: 30 }}
      >
        {results?.groups
          ? results.groups.map((group, idx) => {
              if (applicableFilter && !group.applicable) return null;
              if (keyword != "" && !group.groupName.includes(keyword))
                return null;
              return <HorizontalGroup {...group} key={idx}></HorizontalGroup>;
            })
          : null}
        <EmptySpace></EmptySpace>
        <SearchModal
          pageType={pageType}
          setOption={setOption}
          changeModal={changeModal}
          isModalVisible={isModalVisible}
        ></SearchModal>
      </ScrollContainer>
    </>
  );
};
