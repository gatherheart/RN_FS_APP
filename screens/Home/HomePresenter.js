import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import {
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import ScrollContainer from "../../components/common/ScrollContainer";
import GroupCard from "../../components/Home/GroupCard";
import List from "../../components/common/List";
import TodaySchedule from "../../components/Home/TodaySchedule";
import GroupButton from "../../components/Home/HomeBottomBtn";
import {} from "react-native-gesture-handler";
import { BG_COLOR } from "../../constants/Color";
import HomeHeader from "../../components/common/HomeHeader";
import { UnderHeader, HeaderHeight } from "../../utils/HeaderHeight";

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
    <>
      <HomeHeader></HomeHeader>
      <ScrollView
        style={{
          backgroundColor: themeContext.backgroundColor,
          top: HeaderHeight,
        }}
        contentContainerStyle={styles.mainContainer}
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
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: BG_COLOR,
    alignItems: "center",
  },
});

const result = {
  groups: [
    {
      groupName: "Golf Groups",
      id: "1",
      tag: ["Game", "Play", "Sports"],
      vote: "Vote #1",
      schedule: "Schedule #1",
      notice: "Go to Home",
      poster: "",
    },
    {
      groupName: "Soccer Groups",
      id: "2",
      tag: ["Game", "Play", "Sports"],
      vote: "Vote #2",
      schedule: "Schedule #1",
      notice: "Go to School",
      poster: "",
    },
    {
      groupName: "Golf Groups",
      id: "3",
      tag: ["Play", "Soccer", "Sports"],
      vote: "Vote #3",
      schedule: "Schedule #3",
      notice: "Go to Home",
      poster: "",
    },
  ],
};
