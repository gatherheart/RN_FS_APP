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
import Icon from "../common/CustomIcon";
import { ThemeContext } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

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

const ProfileHeader = ({
  styles: stylesProps,
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
          ...stylesProps,
          position: "absolute",
        }}
      >
        <LeftContainer>
          <View
            onPress={() => {
              navigation.goBack();
            }}
            title="goBack"
            style={{}}
          >
            <Text style={styles.messageTitle}>내 정보</Text>
          </View>
        </LeftContainer>
        <MiddleContainer>
          <Text style={{ fontSize: 16 }}>{title}</Text>
        </MiddleContainer>
        <RightContainer>
          <TouchableOpacity
            style={styles.createChat}
            onPress={() => {
              navigation.navigate("AppInfo", { from: "Profile" });
            }}
          >
            <SimpleLineIcons name="settings" size={24} color="black" />
          </TouchableOpacity>
        </RightContainer>
      </View>
    </>
  );
};

export default ProfileHeader;

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
});

const styles = StyleSheet.create({
  messageTitle: {
    marginLeft: 0,
    fontWeight: "bold",
    fontSize: 24,
  },
  createChat: {
    marginHorizontal: 10,
  },
});

ProfileHeader.propTypes = {
  style: PropTypes.object,
  statusStyle: PropTypes.object,
  iconColor: PropTypes.string,
  rightButtonEnabled: PropTypes.bool,
  rightButton: PropTypes.node,
  title: PropTypes.string,
};
