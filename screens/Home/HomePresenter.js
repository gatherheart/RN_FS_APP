import React from "react";
import styled from "styled-components/native";
import { Dimensions, TouchableOpacity, Text } from "react-native";
import ScrollContainer from "../../components/ScrollContainer";
import Horizontal from "../../components/Horizontal";
import List from "../../components/List";
import TodaySchedule from "../../components/TodaySchedule";
import GroupButton from "../../components/GroupButton";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const GroupContainer = styled.View`
  justify-content: center;
`;

const ScheduleContainer = styled.View`
  justify-content: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const result = {
  groups: [
    {
      groupName: "Golf Groups",
      id: 1,
      tag: ["Game", "Play", "Sports"],
      vote: "Vote #1",
      schedule: "Schedule #1",
      notice: "Go to Home",
      poster: "",
    },
    {
      groupName: "Soccer Groups",
      id: 2,
      tag: ["Game", "Sports"],
      vote: "Vote #2",
      schedule: "Schedule #1",
      notice: "Go to School",
      poster: "",
    },
    {
      groupName: "Golf Groups",
      id: 3,
      tag: [],
      vote: "Vote #3",
      schedule: "Schedule #3",
      notice: "Go to Home",
      poster: "",
    },
  ],
};

export default ({ refreshFn, loading, navigation }) => {
  const { groups } = result;
  const schedules = groups.map((group) => group.schedule);
  return (
    <ScrollContainer
      refreshFn={refreshFn}
      loading={loading}
      contentContainerStyle={contentContainerStyle}
    >
      <>
        <ScheduleContainer>
          <TodaySchedule schedules={schedules}></TodaySchedule>
        </ScheduleContainer>
        <GroupContainer>
          <List title={""}>
            {groups.map((group) => (
              <Horizontal key={group.id} {...group}></Horizontal>
            ))}
          </List>
          <ButtonContainer>
            <GroupButton
              title={"Group Create"}
              onclickFunc={() => {
                navigation.navigate("GroupCreate");
              }}
            ></GroupButton>
            <GroupButton
              title={"Group Search"}
              onclickFunc={() => {
                navigation.navigate("GroupSearch");
              }}
            ></GroupButton>
          </ButtonContainer>
        </GroupContainer>
      </>
    </ScrollContainer>
  );
};

const contentContainerStyle = {
  backgroundColor: "#fbfafc",
};
