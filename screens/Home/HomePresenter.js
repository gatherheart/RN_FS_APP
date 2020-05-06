import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Dimensions, TouchableOpacity, Text } from "react-native";
import ScrollContainer from "../../components/ScrollContainer";
import GroupCard from "../../components/Home/GroupCard";
import List from "../../components/List";
import TodaySchedule from "../../components/Home/TodaySchedule";
import GroupButton from "../../components/Home/HomeBottomBtn";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const GroupContainer = styled.View``;

const ScheduleContainer = styled.View``;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const EmptySpace = styled.View`
  height: ${HEIGHT / 15}px;
`;

export default ({ refreshFn, loading, navigation }) => {
  const { groups } = result;
  const schedules = groups.map((group) => group.schedule);
  const themeContext = useContext(ThemeContext);
  return (
    <ScrollContainer
      refreshFn={refreshFn}
      loading={loading}
      contentContainerStyle={{ ...themeContext.backgroundColor }}
    >
      <ScheduleContainer>
        <TodaySchedule schedules={schedules}></TodaySchedule>
      </ScheduleContainer>
      <GroupContainer>
        <List title={""}>
          {groups.map((group) => (
            <GroupCard key={group.id} {...group}></GroupCard>
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
              navigation.navigate("GroupSearchNav");
            }}
          ></GroupButton>
        </ButtonContainer>
      </GroupContainer>
      <EmptySpace></EmptySpace>
    </ScrollContainer>
  );
};

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
      tag: ["Game", "Play", "Sports"],
      vote: "Vote #2",
      schedule: "Schedule #1",
      notice: "Go to School",
      poster: "",
    },
    {
      groupName: "Golf Groups",
      id: 3,
      tag: ["Play", "Soccer", "Sports"],
      vote: "Vote #3",
      schedule: "Schedule #3",
      notice: "Go to Home",
      poster: "",
    },
  ],
};
