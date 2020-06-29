import React, { useEffect, useContext } from "react";
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import {
  HeaderHeight,
  StatusHeight,
  UnderHeader,
} from "../../utils/HeaderHeight";
import Icon from "./CustomIcon";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
const { width: WIDTH, height } = Dimensions.get("screen");

const LeftContainer = styled.View`
  width: ${(WIDTH * 33) / 100}px;
  left: 10px;
`;
const MiddleContainer = styled.View`
  width: ${(WIDTH * 33) / 100}px;
  justify-content: center;
  align-items: center;
`;
const RightContainer = styled.View`
  width: ${(WIDTH * 33) / 100}px;
  right: 10px;
  align-items: flex-end;
`;
const Title = styled.Text``;

const CustomHeader = ({
  headerPosition,
  headerOpacity,
  style,
  rightButtonEnabled = true,
  rightButton,
  title = "",
}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <>
      <Animated.View
        style={{
          height: StatusHeight,
          backgroundColor: "white",
          opacity: headerOpacity,
          ...style,
        }}
      />
      <Animated.View
        style={{
          transform: [{ translateY: headerPosition }],
          opacity: headerOpacity,
          ...styles.header,
          ...style,
        }}
      >
        <LeftContainer>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            title="goBack"
            style={{ marginHorizontal: 20 }}
          >
            <Icon
              name={"arrow-back"}
              color={themeContext.lightGreenColor}
              size={30}
            ></Icon>
          </TouchableOpacity>
        </LeftContainer>
        <MiddleContainer>
          <Title style={{ fontSize: 15, fontFamily: themeContext.regularFont }}>
            {title}
          </Title>
        </MiddleContainer>
        <RightContainer>
          {rightButtonEnabled && rightButton ? (
            <View>{rightButton}</View>
          ) : null}
        </RightContainer>
      </Animated.View>
    </>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    position: "absolute",
    width: WIDTH,
    height: HeaderHeight,
    top: StatusHeight,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
});

CustomHeader.propTypes = {
  headerPosition: PropTypes.object,
  headerOpacity: PropTypes.object,
  style: PropTypes.object,
  rightButtonEnabled: PropTypes.bool,
  rightButton: PropTypes.node,
  title: PropTypes.string,
};
