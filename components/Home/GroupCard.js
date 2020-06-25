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
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border-color: grey;
  margin: 0px 0px 15px 0px;
  padding: 5px 10px 0px 0px;
`;

const Container = styled.View`
  padding: 0px 0px 0px 30px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
`;

const Data = styled.View`
  width: 60%;
  margin: 10px 25px;
`;

const Title = styled.Text`
  color: black;
  font-weight: bold;
`;

const Vote = styled.Text`
  color: black;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Schedule = styled.Text`
  color: black;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Notice = styled.Text`
  color: black;
  font-weight: 500;
  margin-bottom: 5px;
`;

const HashContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const Hash = styled.View`
  background-color: #0f3;
  border-radius: 15px;
  margin-right: 2px;
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
      <TouchableOpacity onPress={goToGroup}>
        <Container>
          <Poster url={poster} />
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
  schedule: PropTypes.array.isRequired,
  poster: PropTypes.string.isRequired,
  tag: PropTypes.array,
  votes: PropTypes.array,
  notices: PropTypes.array,
};

export default Horizontal;
