import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import {
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import ScrollContainer from "../../components/common/ScrollContainer";
import GroupCard from "../../components/Home/GroupCard";
import List from "../../components/common/List";
import TodaySchedule from "../../components/Home/TodaySchedule";
import GroupButton from "../../components/Home/HomeBottomBtn";
import { GREEN_COLOR, BG_COLOR } from "../../constants/Color";
import HomeHeader from "../../components/common/HomeHeader";
import { UnderHeader, HeaderHeight } from "../../utils/HeaderHeight";
import { Ionicons } from "@expo/vector-icons";
import StarIcon from "../../components/common/svg/StarIcon";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const GroupContainer = styled.View``;

const ScheduleContainer = styled.View`
  margin-top: ${(HEIGHT * 2) / 100}px;
  width: ${WIDTH}px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const EmptySpace = styled.View`
  height: ${HEIGHT / 15}px;
`;

const BoldText = styled.Text`
  color: black;
  font-weight: bold;
`;

const MONTH = "month";
const YEAR = "year";
const WEEK = "week";

export default ({ refreshFn, loading, navigation }) => {
  const { groups } = result;
  const themeContext = useContext(ThemeContext);
  const groupSched = groups.map((group) => {
    return {
      schedules: group.schedules,
      groupId: group.id,
      groupName: group.groupName,
    };
  });
  console.log(new Date());
  return (
    <>
      <HomeHeader></HomeHeader>

      <ScrollView
        style={{
          backgroundColor: themeContext.backgroundColor,
        }}
        contentContainerStyle={styles.mainContainer}
      >
        <ScheduleContainer>
          <View style={styles.scheduleTitle}>
            <BoldText style={{ ...styles.scheduleText }}>오늘의 일정</BoldText>
            <TouchableOpacity style={styles.goToCalendar}>
              <Text style={styles.goToCalendarText}>캘린더</Text>
              <Ionicons
                name={"ios-arrow-forward"}
                color={GREEN_COLOR}
              ></Ionicons>
            </TouchableOpacity>
          </View>
          <TodaySchedule groupSched={groupSched}></TodaySchedule>
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
  scheduleTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: (HEIGHT * 3) / 100,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  scheduleText: {
    fontWeight: "600",
    fontSize: 15,
  },
  goToCalendar: {
    borderRadius: 4,
    backgroundColor: BG_COLOR,
    borderColor: GREEN_COLOR,
    borderWidth: 1,
    width: 55,
    height: 20,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  goToCalendarText: {
    color: GREEN_COLOR,
  },
});

const result = {
  groups: [
    {
      groupName: "배그 마스터",
      id: "1",
      tag: ["Game", "Play", "Sports"],
      vote: "Vote #1",
      schedules: [
        {
          id: "24432",
          title: "매주 회식 일정",
          memo: "참여 부탁합니다",
          date: "2020-06-25T13:26:04.063Z",
          cycle: MONTH,
          issuedDate: "2020-06-24T16:30:59.554Z",
        },
      ],
      notice: "Go to Home",
      poster: "",
    },
    {
      groupName: "스위치 모임",
      id: "2",
      tag: ["Game", "Play", "Sports"],
      vote: "Vote #2",
      schedules: [
        {
          id: "22332",
          title: "매주 회의 일정",
          memo: "참여 부탁합니다",
          date: "2020-06-25T01:26:17.734Z",
          cycle: YEAR,
          issuedDate: "2020-06-24T16:30:59.554Z",
        },
      ],
      notice: "Go to School",
      poster: "",
    },
    {
      groupName: "플레이 그라운드",
      id: "3",
      tag: ["Play", "Soccer", "Sports"],
      vote: "Vote #3",
      schedules: [
        {
          id: "2342",
          title: "행사 일정",
          memo: "참여 부탁합니다",
          date: "2020-06-25T04:26:17.734Z",
          cycle: WEEK,
          issuedDate: "2020-06-24T16:30:59.554Z",
        },
      ],
      notice: "Go to Home",
      poster: "",
    },
  ],
};
