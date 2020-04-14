import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Poster from "./Poster";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { trimText } from "../utils/String";

// Horizontal Components

/*
                Title
  [ Picture ]   Tag
                Schedule
                Notice
*/

const CardContainer = styled.View`
  padding: 30px 30px 10px 0px;
  border-width: 0.2px;
  border-radius: 10px;
  border-color: grey;
  margin: 0px 15px 15px 15px;
  flex-direction: row;
  align-items: flex-start;
`;

const Container = styled.View`
  padding: 0px 30px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
`;

const Data = styled.View`
  align-items: flex-start;
  width: 60%;
  margin-left: 25px;
`;

const Title = styled.Text`
  color: black;
  font-weight: bold;
  margin-bottom: 13px;
`;

const Vote = styled.Text`
  color: black;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Schedule = styled.Text`
  color: black;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Notice = styled.Text`
  color: black;
  font-weight: 500;
  margin-bottom: 10px;
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
    <CardContainer>
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

Horizontal.propTypes = {};

export default Horizontal;
