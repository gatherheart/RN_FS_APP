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
import { GREEN_COLOR, BG_COLOR, DARK_GREEN_COLOR } from "../../constants/Color";
import HomeHeader from "../../components/common/HomeHeader";
import { UnderHeader, HeaderHeight } from "../../utils/HeaderHeight";
import { Ionicons } from "@expo/vector-icons";
import StarIcon from "../../components/common/svg/StarIcon";
import { moderateScale, scale } from "react-native-size-matters";

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
  let groupSched = [];

  groupSched = groups.map((group) => {
    return {
      schedules: group.schedules,
      groupId: group.id,
      groupName: group.groupName,
    };
  });
  const _test = [{ test: 1 }, { test: 1 }];
  return (
    <>
      <HomeHeader></HomeHeader>

      <ScrollView
        style={{
          backgroundColor: themeContext.backgroundColor,
        }}
        contentContainerStyle={styles.mainContainer}
        showsVerticalScrollIndicator={false}
      >
        <ScheduleContainer>
          <View style={styles.scheduleTitle}>
            <BoldText style={{ ...styles.scheduleText }}>오늘의 일정</BoldText>
            <TouchableOpacity
              style={styles.goToCalendar}
              onPress={() => {
                navigation.navigate("HomeSchedule", { groupSched });
              }}
            >
              <Text style={styles.goToCalendarText}>캘린더</Text>
              <Ionicons
                name={"ios-arrow-forward"}
                color={GREEN_COLOR}
                size={scale(15)}
              ></Ionicons>
            </TouchableOpacity>
          </View>
          <TodaySchedule groupSched={groupSched}></TodaySchedule>
        </ScheduleContainer>
        <GroupContainer>
          <View style={{ ...styles.groupTitle, borderWidth: 1 }}>
            <BoldText style={{ ...styles.scheduleText, marginTop: 0 }}>
              나의 숲
            </BoldText>
            <TouchableOpacity
              style={{
                ...styles.goToCreate,
                borderWidth: 0,
                backgroundColor: DARK_GREEN_COLOR,
              }}
              onPress={() => navigation.navigate("GroupCreateContainer")}
            >
              <Text style={{ ...styles.goToCalendarText, color: BG_COLOR }}>
                숲 만들기
              </Text>
              <Ionicons
                name={"ios-add"}
                color={BG_COLOR}
                size={scale(15)}
              ></Ionicons>
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
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  scheduleText: {
    fontWeight: "bold",
    fontSize: scale(15),
  },
  goToCalendar: {
    borderRadius: 4,
    backgroundColor: BG_COLOR,
    borderColor: GREEN_COLOR,
    borderWidth: 1,

    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: scale(5),
    width: "20%",
  },
  goToCalendarText: {
    color: GREEN_COLOR,
    fontSize: scale(14),
  },
  goToCreate: {
    borderRadius: 4,
    backgroundColor: BG_COLOR,
    borderColor: GREEN_COLOR,
    borderWidth: 1,
    width: "24%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: scale(5),
  },
  groupTitle: {
    flexDirection: "row",
    width: (WIDTH * 90) / 100,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: scale(20),
    marginTop: scale(30),
  },
});
const ads = {};
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
          date: new Date(),
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
          date: new Date(),
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
          date: new Date(),
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
