import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Card = styled.View`
  background-color: #b1fbb1;
  justify-content: center;
  margin: 20px 20px 0px 20px;
  padding-bottom: 10px;
  opacity: 10;
  border-radius: 15px;
  box-shadow: 1px 1px 1px grey;
`;
const Title = styled.Text`
  margin: 20px 10px 20px 20px;
`;
const ScheduleConatiner = styled.View`
  padding: 0px 8px 5px 10px;
  flex-direction: row;
  justify-content: space-between;
`;
const LeftText = styled.Text`
  margin: 0px 0px 3px 10px;
`;
const RightText = styled.Text`
  margin: 0px 10px 3px 0px;
`;

const TodaySchedule = ({ schedules }) => {
  console.log(schedules);
  return (
    <Card style={schedules ? null : { height: 50 }}>
      <Title>Schedule 🗓</Title>
      {schedules
        ? schedules.map((schedule, index) => (
            <ScheduleConatiner key={index}>
              <LeftText>Group Name</LeftText>
              <RightText>{schedule}</RightText>
            </ScheduleConatiner>
          ))
        : null}
    </Card>
  );
};

TodaySchedule.prototype = {};

export default TodaySchedule;
