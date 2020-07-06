import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import Poster from "../common/GroupPoster";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { trimText } from "../../utils/String";
import { LIGHT_GREY_COLOR, GREY_COLOR } from "../../constants/Color";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, scale } from "react-native-size-matters";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// Horizontal Components

/*
                Title
  [ Picture ]   Tag
                Schedule
                Notice
*/

const CardContainer = styled.View`
  width: ${(WIDTH * 90) / 100}px;
  height: ${(HEIGHT * 14) / 100}px;
  border-radius: 10px;
  border-color: grey;
  border-width: 1px;
`;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const Data = styled.View`
  width: 60%;
  border-width: 1px;
  margin-left: ${scale(12)}px;
`;

const Title = styled.Text`
  color: black;
  font-weight: bold;
  font-size: ${scale(14)}px;
`;

const Horizontal = ({
  id,
  groupName,
  isSchool,
  schedule,
  poster,
  tag,
  votes,
  notices,
}) => {
  const navigation = useNavigation();
  const themeContext = useContext(ThemeContext);
  const goToGroup = () => {
    navigation.navigate("GroupNav", { id, groupName });
  };
  return (
    <CardContainer style={styles.cardContainer}>
      <TouchableOpacity onPress={goToGroup} style={styles.button}>
        <Container>
          <View style={styles.posterContainer}>
            <Poster url={poster} />
          </View>
          <Data>
            {isSchool ? (
              <Text style={styles.isSchool}>교내</Text>
            ) : (
              <Text style={styles.isSchool}>연합</Text>
            )}
            <View style={styles.groupName}>
              {groupName ? <Title>{trimText(groupName, 30)}</Title> : null}
              <Ionicons
                name={"ios-arrow-forward"}
                style={styles.arrowIcon}
              ></Ionicons>
            </View>
            <View style={styles.noticeContainer}>
              <Text style={styles.notice}>공지</Text>
              {notices?.length != 0 ? (
                <Text style={styles.noticeContent}>
                  {trimText(notices[0].title, 20)}
                </Text>
              ) : null}
            </View>
          </Data>
        </Container>
      </TouchableOpacity>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: LIGHT_GREY_COLOR,
  },
  button: {
    width: "100%",
    height: "100%",
  },
  posterContainer: {
    marginLeft: scale(12),
  },
  isSchool: {
    color: GREY_COLOR,
    fontWeight: "600",
    fontSize: 13,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  groupName: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  noticeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  notice: {
    fontWeight: "600",
  },
  noticeContent: {
    marginLeft: 10,
  },
});

Horizontal.propTypes = {
  id: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  isSchool: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
  tag: PropTypes.array,
  votes: PropTypes.array,
  notices: PropTypes.array,
};

export default Horizontal;
