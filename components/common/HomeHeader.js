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
import { moderateScale } from "react-native-size-matters";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Title = styled.Text``;

const LeftContainer = styled.View`
  width: ${(WIDTH * 33) / 100}px;
  left: 10px;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: row;
  height: 100%;
`;
const MiddleContainer = styled.View`
  width: ${(WIDTH * 33) / 100}px;
  justify-content: center;
  align-items: center;
  align-items: flex-end;
`;
const RightContainer = styled.View`
  width: ${(WIDTH * 33) / 100}px;
  right: 20px;
  justify-content: flex-end;
  align-items: flex-end;

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
          borderWidth: 1,
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
                justifyContent: "flex-end",
                borderWidth: 1,
              }}
            >
              <TreeIcon
                height={`${(20 * WIDTH) / 100}%`}
                width={`${(20 * WIDTH) / 100}%`}
              ></TreeIcon>
            </TouchableOpacity>
          </View>
          <View style={styles.logoText}>
            <Text style={styles.appTitle}>포레스틴</Text>
          </View>
        </LeftContainer>
        <MiddleContainer></MiddleContainer>
        <RightContainer>
          <TouchableOpacity
            style={styles.rightButton}
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
    alignItems: "flex-end",
    zIndex: 2,
  },
  logoText: {
    height: `${(20 * WIDTH) / 100}%`,
    justifyContent: "center",
    borderWidth: 1,
  },
  appTitle: {
    fontWeight: "bold",
    fontSize: moderateScale(18),
  },
  rightButton: {
    height: `${(20 * WIDTH) / 100}%`,
    borderWidth: 1,
    justifyContent: "center",
  },
});
HomeHeader.propTypes = {
  style: PropTypes.object,
  rightButtonEnabled: PropTypes.bool,
  rightButton: PropTypes.node,
  title: PropTypes.string,
};
