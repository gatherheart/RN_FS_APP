import React, { useEffect, useContext } from "react";
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
  Text,
} from "react-native";
import PropTypes from "prop-types";

import {
  HeaderHeight,
  StatusHeight,
  UnderHeader,
} from "../../utils/HeaderHeight";
import { ThemeContext } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

const { width: WIDTH, height } = Dimensions.get("screen");

const Title = styled.Text``;

const LeftContainer = styled.View`
  width: ${(WIDTH * 33) / 100}px;
  padding-left: 15px;
`;
const MiddleContainer = styled.View`
  width: ${(WIDTH * 33) / 100}px;
  justify-content: center;
  align-items: center;
`;
const RightContainer = styled.View`
  width: ${(WIDTH * 33) / 100}px;
  padding-right: 10px;
  align-items: flex-end;
`;

const NoticeHeader = ({
  styles,
  statusStyle,
  iconColor,
  rightButtonEnabled = true,
  rightButton,
  title = "",
}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          height: StatusHeight,
          backgroundColor: "white",
          zIndex: 10,
          ...statusStyle,
        }}
      />
      <View
        style={{
          top: StatusHeight,
          ...fixedStyles.header,
          ...styles,
          position: "absolute",
          borderWidth: 1,
        }}
      >
        <LeftContainer>
          <Text style={fixedStyles.title}>알림</Text>
        </LeftContainer>
        <MiddleContainer>
          <Text style={{ fontSize: 16 }}>{title}</Text>
        </MiddleContainer>
        <RightContainer>
          {rightButtonEnabled && rightButton ? (
            <View>{rightButton}</View>
          ) : null}
        </RightContainer>
      </View>
    </>
  );
};

export default NoticeHeader;

const fixedStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: WIDTH,
    height: HeaderHeight,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
NoticeHeader.propTypes = {
  style: PropTypes.object,
  statusStyle: PropTypes.object,
  iconColor: PropTypes.string,
  rightButtonEnabled: PropTypes.bool,
  rightButton: PropTypes.node,
  title: PropTypes.string,
};
