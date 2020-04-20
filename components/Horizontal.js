import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Poster from "./Poster";
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { trimText } from "../utils/String";

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
  margin-bottom: 10px;
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

const Text = styled.Text`
  color: black;
  font-weight: 500;
  padding: 2px;
  font-size: 11px;
`;

const Horizontal = ({ id, groupName, schedule, poster, tag, vote, notice }) => {
  const navigation = useNavigation();
  const goToGroup = () => {
    navigation.navigate("Group", { id, groupName });
  };
  return (
    <CardContainer style={styles.withShadow}>
      <TouchableOpacity onPress={goToGroup}>
        <Container>
          <Poster url={poster} />
          <Data>
            {groupName ? <Title>{trimText(groupName, 30)}</Title> : null}
            <HashContainer>
              {tag
                ? tag.map((hash, index) => (
                    <Hash key={id + index}>
                      <Text> #{trimText(hash, 7)} </Text>
                    </Hash>
                  ))
                : null}
            </HashContainer>
            {vote ? <Vote>{trimText(vote, 130)}</Vote> : null}
            {schedule ? (
              <Schedule>sched: {trimText(schedule, 130)}</Schedule>
            ) : null}
            {notice ? <Notice>{trimText(notice, 130)}</Notice> : null}
          </Data>
        </Container>
      </TouchableOpacity>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  withShadow: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 1,
    shadowOffset: {
      height: 2.5,
      width: 2.5,
    },
  },
});

Horizontal.propTypes = {};

export default Horizontal;
