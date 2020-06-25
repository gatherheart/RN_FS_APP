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

const GroupContainer = styled.View`
  align-items: center;
`;

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
          <View style={{ ...styles.groupTitle, marginTop: 30 }}>
            <BoldText style={{ ...styles.scheduleText, marginTop: 0 }}>
              나의 숲
            </BoldText>
            <TouchableOpacity
              style={styles.goToCreate}
              onPress={() => navigation.navigate("GroupCreate1")}
            >
              <Text style={styles.goToCalendarText}>숲 만들기</Text>
              <Ionicons name={"ios-add"} color={GREEN_COLOR}></Ionicons>
            </TouchableOpacity>
          </View>
          <List title={""}>
            {groups.map((group) => (
              <GroupCard key={group.id} {...group}></GroupCard>
            ))}
          </List>
        </GroupContainer>
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
    width: (WIDTH * 90) / 100,
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
  goToCreate: {
    borderRadius: 4,
    backgroundColor: BG_COLOR,
    borderColor: GREEN_COLOR,
    borderWidth: 1,
    width: 70,
    height: 20,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  groupTitle: {
    flexDirection: "row",
    width: (WIDTH * 90) / 100,
    justifyContent: "space-between",
    height: (HEIGHT * 3) / 100,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
});

const result = {
  groups: [
    {
      groupName: "배그 마스터",
      id: "1",
      tag: ["Game", "Play", "Sports"],
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
      votes: [
        {
          type: "vote",
          id: "132352",
          title: "4월 회식 날짜",
          date: "2020-04-21",
        },
        {
          type: "vote",
          id: "12341",
          title: "5월 회식 날짜",
          date: "2019-05-01",
        },
      ],
      notices: [
        {
          type: "notice",
          id: "112",
          title: "4월 회식",
          date: "2020-04-19",
        },
      ],
      poster: "",
      isSchool: true, // School or Union
    },
    {
      groupName: "스위치 모임",
      id: "2",
      tag: ["Game", "Play", "Sports"],
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
      votes: [
        {
          type: "vote",
          id: "132352",
          title: "4월 회식 날짜",
          date: "2020-04-21",
        },
        {
          type: "vote",
          id: "12341",
          title: "5월 회식 날짜",
          date: "2019-05-01",
        },
      ],
      notices: [
        {
          type: "notice",
          id: "112",
          title: "4월 회식",
          date: "2020-04-19",
        },
      ],
      poster:
        "https://images.unsplash.com/photo-1588785392665-f6d4a541417d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320",
      isSchool: true, // School or Union
    },
    {
      groupName: "플레이 그라운드",
      id: "3",
      tag: ["Play", "Soccer", "Sports"],
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
      votes: [
        {
          type: "vote",
          id: "132352",
          title: "4월 회식 날짜",
          date: "2020-04-21",
        },
        {
          type: "vote",
          id: "12341",
          title: "5월 회식 날짜",
          date: "2019-05-01",
        },
      ],
      notices: [
        {
          type: "notice",
          id: "112",
          title: "4월 회식",
          date: "2020-04-19",
        },
      ],
      poster: "",
      isSchool: false, // School or Union
    },
  ],
};
