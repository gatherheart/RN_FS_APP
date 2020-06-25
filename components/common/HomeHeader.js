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
import Icon from "./CustomIcon";
import { ThemeContext } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import TreeIcon from "./svg/TreeIcon";
import { EvilIcons } from "@expo/vector-icons";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Title = styled.Text``;

const LeftContainer = styled.View`
  width: ${(WIDTH * 33) / 100}px;
  left: 20px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;
const MiddleContainer = styled.View`
  width: ${(WIDTH * 33) / 100}px;
  justify-content: center;
  align-items: center;
`;
const RightContainer = styled.View`
  width: ${(WIDTH * 33) / 100}px;
  right: 20px;
  align-items: flex-end;
`;

const HomeHeader = ({ style }) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <>
      <View
        style={{
          height: StatusHeight,
          backgroundColor: "white",
        }}
      />
      <View
        style={{
          ...styles.header,
          ...style,
        }}
      >
        <LeftContainer>
          <View style={{ width: "30%" }}>
            <TouchableOpacity
              onPress={() => {}}
              title="goBack"
              activeOpacity={1}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TreeIcon
                height={`${(20 * WIDTH) / 100}%`}
                width={`${(20 * WIDTH) / 100}%`}
              ></TreeIcon>
            </TouchableOpacity>
          </View>
          <Text style={styles.appTitle}>포레스틴</Text>
        </LeftContainer>
        <MiddleContainer></MiddleContainer>
        <RightContainer>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GroupSearchNav");
            }}
          >
            <EvilIcons name={"search"} size={30}></EvilIcons>
          </TouchableOpacity>
        </RightContainer>
      </View>
    </>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: WIDTH,
    height: HeaderHeight,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  appTitle: {
    fontWeight: "600",
    fontSize: 18,
  },
});
HomeHeader.propTypes = {
  style: PropTypes.object,
  rightButtonEnabled: PropTypes.bool,
  rightButton: PropTypes.node,
  title: PropTypes.string,
};
