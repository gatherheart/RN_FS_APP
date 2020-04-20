import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Dimensions, StyleSheet } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Card = styled.View`
  width: ${(WIDTH * 90) / 100}px;
  background-color: #b1fbb1;
  justify-content: center;
  margin: 20px 0px 0px 0px;
  padding-bottom: 10px;
  opacity: 10;
  border-radius: 15px;
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
  const defaultHeight = schedules ? 50 + schedules.length * 25 : 50;
  console.log(defaultHeight);
  return (
    <Card style={{ ...styles.withShadow, ...{ height: defaultHeight } }}>
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

const styles = StyleSheet.create({
  withShadow: {
    shadowColor: "#000000",
    borderWidth: 0,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 1,
    shadowOffset: {
      height: 2.5,
      width: 2.5,
    },
  },
});

TodaySchedule.prototype = {};

export default TodaySchedule;
