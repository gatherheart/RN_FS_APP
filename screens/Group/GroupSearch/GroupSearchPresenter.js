import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import {
  Text,
  Dimensions,
  Animated,
  Platform,
  View,
  StyleSheet,
} from "react-native";
import ScrollContainer from "../../../components/common/AnimatedScrollContainer";
import styled from "styled-components/native";
import Input from "../../../components/common/SearchInput";
import SearchModal from "../../../components/Group/GroupSearchModal";
import HorizontalGroup from "../../../components/Group/SmallGroupCard";
import {
  schoolNames,
  areaNames,
  secondCategory,
  firstCategory,
} from "../../../constants/Names";
import { ThemeContext } from "styled-components";
import CustomHeader from "../../../components/common/CustomHeader";
import { UnderHeader, HeaderHeight } from "../../../utils/HeaderHeight";
import PropTypes from "prop-types";
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

const InputContainer = styled.View`
  align-self: center;
`;

const EmptySpace = styled.View`
  height: ${HEIGHT / 10}px;
`;
const HeaderRightBtn = styled.View`
  border: ${(props) => props.theme.lightGreyColor};
  border-radius: 7px;
  flex-direction: row;
  height: 25px;
  align-items: center;
  overflow: hidden;
`;

const ButtonText = styled.Text`
  margin: 0px 3px 0px 3px;
  font-size: 14px;
`;

const LeftButton = styled.TouchableOpacity`
  height: 100%;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;

const RightButton = styled.TouchableOpacity`
  height: 100%;

  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

/**
 * @param {Function} leftClick left button object
 * @param {Function} rightClick left button object
 * @return {node} View Component contains two row-direction button
 */
const RightHeaderButton = ({ leftClick, rightClick, pageType = 0 }) => {
  const themeContext = useContext(ThemeContext);
  const leftStyle =
    pageType == 0
      ? {
          border: themeContext.darkGreyColor,
          backgroundColor: themeContext.lightGreenColor,
        }
      : null;
  const rightStyle =
    pageType == 1
      ? {
          border: themeContext.darkGreyColor,
          backgroundColor: themeContext.lightGreenColor,
        }
      : null;
  return (
    <HeaderRightBtn>
      <LeftButton onPress={leftClick} style={leftStyle}>
        <ButtonText>대학</ButtonText>
      </LeftButton>
      <RightButton onPress={rightClick} style={rightStyle}>
        <ButtonText>연합</ButtonText>
      </RightButton>
    </HeaderRightBtn>
  );
};
RightHeaderButton.propTypes = {
  leftClick: PropTypes.func.isRequired,
  rightClick: PropTypes.func.isRequired,
};

export default ({
  refreshFn,
  loading,
  firstSelected,
  secondSelected,
  results,
  pageType,
  setPageType,
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

  const position = new Animated.ValueXY(0);

  const headerHeight = position.y.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: [0, -HEADER_MAX_HEIGHT],
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
      <CustomHeader
        title={firstCategory[firstSelected - 1]}
        rightButtonEnabled
        rightButton={
          <RightHeaderButton
            leftClick={() => {
              setPageType(0);
              setOption(0);
            }}
            rightClick={() => {
              setPageType(1);
              setOption(0);
            }}
            pageType={pageType}
          ></RightHeaderButton>
        }
      ></CustomHeader>

      <View style={styles.container}>
        <ScrollContainer
          style={{ flex: 1 }}
          refreshFn={refreshFn}
          loading={loading}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: position.y } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{}}
          HEADER_MAX_HEIGHT={HEADER_MAX_HEIGHT}
        >
          <View
            style={{
              paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT : 0,
            }}
          >
            {results?.groups
              ? results.groups.map((group, idx) => {
                  if (applicableFilter && !group.applicable) return null;
                  if (keyword != "" && !group.groupName.includes(keyword))
                    return null;
                  return (
                    <HorizontalGroup {...group} key={idx}></HorizontalGroup>
                  );
                })
              : null}
          </View>
          <EmptySpace></EmptySpace>
          <SearchModal
            pageType={pageType}
            setOption={setOption}
            changeModal={changeModal}
            isModalVisible={isModalVisible}
          ></SearchModal>
        </ScrollContainer>
        <Animated.View
          style={[
            {
              backgroundColor: "white",
              position: "absolute",
              top: HeaderHeight,
              left: 0,
              right: 0,
              overflow: "hidden",
              height: HEADER_MAX_HEIGHT,
              zIndex: 0,
            },
            {
              transform: [{ translateY: headerHeight }],
            },
          ]}
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
                {pageType == 0 ? schoolNames[option] : areaNames[option]}
              </OptionText>
            </OptionContainer>
            <InputContainer>
              <Input
                placeholder={"Write a keyword"}
                value={keyword}
                onChange={onChange}
                onSubmit={onSubmit}
                returnKeyType="search"
              ></Input>
            </InputContainer>
          </SearchContainer>
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
