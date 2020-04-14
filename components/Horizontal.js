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
  padding: 30px 30px 10px 10px;
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
  align-items: flex-start;
`;

const Data = styled.View`
  align-items: flex-start;
  width: 60%;
  margin-left: 25px;
`;

const Title = styled.Text`
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Schedule = styled.Text`
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Notice = styled.Text`
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Horizontal = ({ id, groupName, schedule, poster, tag, notice }) => {
  const navigation = useNavigation();
  const goToGroup = () => {
    navigation.navigate("Group", { id, groupName });
  };
  return (
    <CardContainer>
      <TouchableOpacity
        onPress={goToGroup}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Container>
          <Poster url={poster} />
          <Data>
            {groupName ? <Title>{trimText(groupName, 30)}</Title> : null}
            {schedule ? (
              <Schedule>sched: {trimText(schedule, 130)}</Schedule>
            ) : null}
            {notice ? <Notice> {trimText(notice, 130)}</Notice> : null}
          </Data>
        </Container>
      </TouchableOpacity>
    </CardContainer>
  );
};

Horizontal.propTypes = {};

export default Horizontal;
